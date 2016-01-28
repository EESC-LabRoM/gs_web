GS.Events = function() {
  
  // ===== Private variables =====
  // =============================
  var interface = new GS.Interface();
  
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
    $("#btn_server_connect").click(this.btnServerConnectClick);
    $(document).delegate(".jsRosTopic", "click", this.linkRosTopicClick);
    $(document).delegate(".jsRosNode", "click", this.linkRosNodeClick);
    $(document).delegate(".jsRosService", "click", this.linkRosServiceClick);
    $(document).delegate(".jsRosParam", "click", this.linkRosParamClick);
    $(document).delegate("#btnSetParam", "click", this.btnSetParam);
  }
  
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
  this.btnSetParam = function(e){
    var paramName = $("#hdnParamName").val();
    var value = $("#txtSetParam").val();
    var param = new ROSLIB.Param({ros:ros,name:paramName});
    param.set(value);
    param.get(function(value){
      interface.showParamDetails(paramName, value);
      $("#txtSetParam").val("");
    });
    e.preventDefault();
  };
  
  // ROS events
  // ----------
  this.rosOnConnection = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connected to websocket server.');
    $("#btn_server_connect").removeAttr("disabled");
  }
  this.rosOnError = function(error) {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Error connecting to websocket server: ' + error);
    $("#btn_server_connect").removeAttr("disabled");
  }
  this.rosOnClose = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connection to websocket server closed.');
    $("#btn_server_connect").removeAttr("disabled");
  }
  
};