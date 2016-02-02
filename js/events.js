GS.Events = function() {
  
  // ===== Private variables =====
  // =============================
  var interface = new GS.Interface();
  
  var listener;
  
  // ===== Private functions =====
  // =============================
  
  // Parse functions
  // ---------------
  var parse = function(type, value){
    if(type === "float32" || type === "float64") {
      return parseFloat(value);
    } else if(type === "int8" || type === "int16" || type === "int32" || type === "int64") {
      return parseInt(value);
    } else if(type === "uint8" || type === "uint16" || type === "uint32" || type === "uint64") {
      return parseInt(value);
    } else {
      return value;
    }
  };
  
  var keepType = function(value) {
    return isNaN(value) ? value : parseInt(value);
  };
  
  // ===== Public functions =====
  // ============================
  
  // Declare triggers
  // ----------------
  this.declareTriggers = function() {
    // network events
    // --------------
    ros.on('connection', this.rosOnConnection);
    ros.on('error', this.rosOnError);
    ros.on('close', this.rosOnClose);
    
    // html events
    // -----------
    // connect
    $("#btn_server_connect").click(this.btnServerConnectClick);
    // ros links
    // ---------
    $(document).delegate(".jsRosTopic", "click", this.linkRosTopicClick);
    $(document).delegate(".jsRosNode", "click", this.linkRosNodeClick);
    $(document).delegate(".jsRosService", "click", this.linkRosServiceClick);
    $(document).delegate(".jsRosParam", "click", this.linkRosParamClick);
    // ros buttons
    // -----------
    $(document).delegate("#btnSetParam", "click", this.btnSetParam);
    $(document).delegate("#btnCallService", "click", this.btnCallService);
    $(document).delegate("#btnRefreshService", "click", this.btnRefreshService);
  };
  
  // Server Connect Button Click
  // ---------------------------
  this.btnServerConnectClick = function() {
    var server_address = $("#txt_ros_server_address").val();
    $(this).attr("disabled", "disabled");
    if(!ros.isConnected) {
      ros.connect(server_address);
    } else {
      ros.close();
    }
  };
  
  // ROS Links
  // ---------
  this.linkRosNodeClick = function(e) {
    var nodeName = $(this).attr("data-node-name");
    e.preventDefault();
  };
  this.linkRosTopicClick = function(e) {
    var topicName = $(this).attr("data-topic-name");
    ros.getTopicType(topicName, function(topicType){
      ros.getMessageDetails(topicType, function(messageDetails) {
        interface.showTopicDetails(topicName,topicType,messageDetails);
      });
    });
    e.preventDefault();
  };
  this.linkRosServiceClick = function(e) {
    var serviceName = $(this).attr("data-service-name");
    ros.getServiceType(serviceName, function(serviceType){
      ros.getServiceRequestDetails(serviceType, function(requestDetails){
        ros.getServiceResponseDetails(serviceType, function(responseDetails){
          interface.showServiceDetails(serviceName, serviceType, requestDetails, responseDetails);
        });
      });
    });
    e.preventDefault();
  };
  this.linkRosParamClick = function(e) {
    var paramName = $(this).attr("data-param-name");
    var param = new ROSLIB.Param({ros : ros,name : paramName});
    param.get(function(value){
      interface.showParamDetails(paramName, value);
    });
    e.preventDefault();
  };
  
  // ROS Buttons
  // -----------
  this.btnSetParam = function(e){
    var paramName = $("#hdnParamName").val();
    var value = $("#txtSetParam").val();
    var param = new ROSLIB.Param({ros:ros,name:paramName});
    param.set(this.keepType(value));
    param.get(function(value){
      interface.showParamDetails(paramName, value);
      $("#txtSetParam").val("");
    });
    e.preventDefault();
  };
  this.btnSubscribeTopic = function(e) {
    if(typeof(listener) !== "undefined") listener.unsubscribe();
    
    var topicName;
    var topicType;

    listener = new ROSLIB.Topic({
      ros : ros,
      name : topicName,
      messageType : topicType
    });

    listener.subscribe(function(message) {
      listener.unsubscribe();
    }); 
  };
  this.btnCallService = function(e) {
    var serviceName = $("#hdnServiceName").val();
    var serviceType = $("#hdnServiceType").val();
    
    var service = new ROSLIB.Service({
      ros:ros,
      name: serviceName,
      serviceType: serviceType
    });
    
    var requestObj = {};
    var elements = document.querySelectorAll("input.jsInputServiceRequest");
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var type = element.getAttribute("data-type");
      var field = element.getAttribute("data-name");
      var value = element.value;
      requestObj[field] = parse(type, value);
    }
    var request = new ROSLIB.ServiceRequest(requestObj);
    
    $("#btnCallService").attr("disabled", "disabled");
    service.callService(requestObj, function(result) {
      $("#btnCallService").removeAttr("disabled");
    }, function(error) {
      $("#btnCallService").removeAttr("disabled");
    });
    
    e.preventDefault();
  };
  this.btnRefreshService = function(e) {
    $("input.jsInputServiceRequest").val("");
    e.preventDefault();
  };
  
  // ROS events
  // ----------
  this.rosOnConnection = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connected to websocket server.');
    $("#btn_server_connect").removeAttr("disabled");
  };
  this.rosOnError = function(error) {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Error connecting to websocket server: ' + error);
    $("#btn_server_connect").removeAttr("disabled");
  };
  this.rosOnClose = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connection to websocket server closed.');
    $("#btn_server_connect").removeAttr("disabled");
  };
  
};