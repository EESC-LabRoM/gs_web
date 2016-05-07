GS.WIDGETS.Waypoint = function () {
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
    {name: "fcuStatus", file: "/templates/fcu_status.tpl", content: ""},
    {name: "fcuCurrentPose", file: "/templates/fcu_current_pose.tpl", content: ""}
  ];
  this.templates = new GS.Templates(path, templatesItems);

  // "inherited" attributes
  this.widgetId;

  // "inherited" callbacks
  this.onStart = function () {
    // set content selector
    selector = ".widgetContent[data-widget-id=" + self.widgetId + "]";
    // get main content
    $.get(path + "index.tpl", function (data) {
      $(".widgetContent[data-widget-id=" + self.widgetId + "]").html(data);
      self.updateSelectsOptions();
      // config functions
      self.configWaypointCommandInterface();
    });
    // load templates
    self.templates.loadAll();
  };

  // update selects' options
  this.updateSelectsOptions = function () {
    $(".jsWidgetSelectTopic").each(function (k1, v1) {
      $(v1).attr("data-widget-id", self.widgetId);
      var type = $(v1).attr("data-msg-type");
      $(v1).html("");
      ros.getTopicsForType(type, function (data) {
        $(v1).append(html.e("option", "-- select a topic to subscribe --", { value: "" }));
        data.forEach(function (v2, k2) {
          $(v1).append(html.e("option", v2, { value: v2 }));
        });
      });
    });
  };
  
  // init configuration functions
  this.gpsVars = {
    map: null,
    marker: null
  };
  this.configWaypointCommandInterface = function() {
    var map;
    var latLng = { lat: 0, lng: 0 };
    var element = $(selector + " .wFcuWaypointCommandInterface .wFcuWaypointCommandInterfaceMap")[0];
    console.log(element);
    self.gpsVars.map = new google.maps.Map(element, {
      center: latLng,
      zoom: 18
    });
    self.gpsVars.marker = new google.maps.Marker({
      position: latLng,
      map: self.gpsVars.map,
      title: 'I\'m here',
    });
  }

  // callback functions
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
    
    var content = Mustache.render(template, {pose: msg.pose, rpy: eulerXYZ});
    $(selector + " .wFcuCurrentPose").html(content);
  };
};
