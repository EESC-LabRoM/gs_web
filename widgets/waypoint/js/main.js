GS.WIDGETS.Waypoint = function() {
  // important attributes and methods
  var self = this;
  var path = "/widgets/waypoint/";
  var selector;
  var subscriptions = [];
  /*
  [{
    subscriberId: 1,
    topicName: ""
  }]
  */

  // helpers
  var html = new GS.Html();
  var svg = new GS.Svg();
  var templatesItems = [
    { name: "fcuStatus", file: "/templates/fcu_status.tpl", content: "" },
    { name: "fcuCurrentPose", file: "/templates/fcu_current_pose.tpl", content: "" },
    { name: "fcuWaypointList", file: "/templates/fcu_waypoint_list.tpl", content: "" }
  ];
  this.templates = new GS.Templates(path, templatesItems);

  // "inherited" attributes
  this.widgetId;

  // "inherited" callbacks
  this.onStart = function() {
    // set content selector
    selector = ".widgetContent[data-widget-id=" + self.widgetId + "]";
    // get main content
    $.get(path + "index.tpl", function(data) {
      $(".widgetContent[data-widget-id=" + self.widgetId + "]").html(data);
      self.updateSelectsOptions();
      // config functions
      self.configWaypointCommandInterface();
    });
    // load templates
    self.templates.loadAll();
    self.declareTriggers();
  };

  this.declareTriggers = function() {
    $(document).delegate(selector + " .btnWFcuWaypointUpdateGPSParameters", "click", self.btnWFcuWaypointUpdateGPSParameters);
    $(document).delegate(selector + " .btnWFcuWaypointCenterReference", "click", self.btnWFcuWaypointCenterReference);
    $(document).delegate(selector + " .btnWFcuWaypointCenterCurrentPosition", "click", self.btnWFcuWaypointCenterCurrentPosition);
  };

  // triggers
  this.btnWFcuWaypointUpdateGPSParameters = function(e) {
    var latParam = new ROSLIB.Param({
      ros: ros,
      name: "/gps_ref_latitude"
    });
    var lngParam = new ROSLIB.Param({
      ros: ros,
      name: "/gps_ref_longitude"
    });
    latParam.get(function(value1) {
      lngParam.get(function(value2) {
        var latLng = { lat: value1, lng: value2 };
        self.refGpsVars.marker.setPosition(latLng);
      });
    });
    e.preventDefault();
  };
  this.btnWFcuWaypointCenterReference = function(e) {
    self.map.setCenter(self.refGpsVars.marker.position);
  };
  this.btnWFcuWaypointCenterCurrentPosition = function(e) {
    self.map.setCenter(self.currentGpsVars.marker.position);
  };

  // update selects' options
  this.updateSelectsOptions = function() {
    $(".jsWidgetSelectTopic").each(function(k1, v1) {
      $(v1).attr("data-widget-id", self.widgetId);
      var type = $(v1).attr("data-msg-type");
      $(v1).html("");
      ros.getTopicsForType(type, function(data) {
        $(v1).append(html.e("option", "-- select a topic to subscribe --", { value: "" }));
        data.forEach(function(v2, k2) {
          $(v1).append(html.e("option", v2, { value: v2 }));
        });
      });
    });
  };

  // init configuration functions
  this.map;
  this.refGpsVars = {
    marker: null
  };
  this.currentGpsVars = {
    marker: null
  };
  this.configWaypointCommandInterface = function() {
    var map;
    var latLng = { lat: 0, lng: 0 };
    var element = $(selector + " .wFcuWaypointCommandInterface .wFcuWaypointCommandInterfaceMap")[0];
    self.map = new google.maps.Map(element, {
      center: latLng,
      zoom: 18
    });
    this.mapCallbacks();
    self.refGpsVars.marker = new google.maps.Marker({
      position: latLng,
      map: self.map,
      label: "R",
      title: 'I\'ve started here',
    });
    self.currentGpsVars.marker = new google.maps.Marker({
      position: latLng,
      map: self.map,
      label: "C",
      title: 'I\'m here',
    });
  };
  this.waypoints = [];
  this.waypointsInfo = [];

  // map callbacks
  this.mapCallbacks = function() {
    self.map.addListener('click', self.mapClick);
  };
  this.mapClick = function(e) {
    var label = (self.waypoints.length + 1);
    var wp = {relativePosition: {x:0, y:0, z:0}, globalPosition: null, marker: null};
    var marker = new google.maps.Marker({
      position: e.latLng,
      map: self.map,
      label: 'W',
      title: 'Waypoint ' + label,
    });
    wp.marker = marker;
    wp.globalPosition = {lat: marker.position.lat(), lng: marker.position.lng()};
    
    var info = new google.maps.InfoWindow({
      content: "Waypoint " + label
    });
    wp.marker.addListener('click', function() { info.open(self.map, wp) });
    
    var service = new ROSLIB.Service({
      ros: ros,
      name: "/gps_to_local_enu",
      serviceType: "asctec_hl_comm/Wgs84ToEnu"
    });
    var requestObj = {lat: marker.position.lat(), lon: marker.position.lng(), alt:1000};
    service.callService(requestObj, function(result) {
      wp.relativePosition.x = result.x;
      wp.relativePosition.y = result.y;
      wp.relativePosition.z = result.z;
      self.waypoints.push(wp);
      self.waypointsInfo.push(info);
      self.updateWaypointList();
    }, function(error) {
      wp.marker.setMap(null);
    });
  };
  this.updateWaypointList = function() {
    var wps = [];
    var wp, waypoint;
    for(i in self.waypoints) {
      waypoint = self.waypoints[i];
      
      gp = waypoint.globalPosition;
      gp.lat = gp.lat.toFixed(6);
      gp.lng = gp.lng.toFixed(6);
      
      lp = waypoint.relativePosition;
      lp.x = (lp.x).toFixed(2);
      lp.y = (lp.y).toFixed(2);
      lp.z = (lp.z).toFixed(2);
      
      wp = {i:i, gp: gp, lp: lp};
      wps.push(wp);
    }
    var template = self.templates.getContent("fcuWaypointList");
    var content = Mustache.render(template, wps);
    $(selector + " " + ".wFcuWaypointList tbody").html(content);
  };

  // subscriptions callback functions
  this.statusVisualizerCallback = function(msg) {
    var template = self.templates.getContent("fcuStatus");
    var content = Mustache.render(template, msg);
    $(selector + " .wFcuStatus").html(content);
  };
  this.poseVisualizerCallback = function(msg) {
    var template = self.templates.getContent("fcuCurrentPose");

    // quaternion to RPY conversion
    var quaternion = new GS.ROBOTICS.Quaternion();
    quaternion.w = msg.pose.orientation.w;
    quaternion.x = msg.pose.orientation.x;
    quaternion.y = msg.pose.orientation.y;
    quaternion.z = msg.pose.orientation.z;
    var eulerXYZ = new GS.ROBOTICS.RPY();
    eulerXYZ = quaternion.toRPY();

    var content = Mustache.render(template, { pose: msg.pose, rpy: eulerXYZ });
    $(selector + " .wFcuCurrentPose").html(content);
  };
  this.gpsVisualizerCallback = function(msg) {
    var latLng = { lat: msg.latitude, lng: msg.longitude };
    self.currentGpsVars.marker.setPosition(latLng);
  };

};
