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
  }
  
  // Server Connect Button Click
  // ---------------------------
  this.btnServerConnectClick = function() {
    var server_address = $("#txt_ros_server_address").val();
    if(!ros.isConnected) {
      ros.connect(server_address);
    } else {
      ros.close();
    }
  };
  
  // ROS Links
  // ---------
  this.linkRosTopicClick = function(e) {
    var topicName = $(this).attr("data-topic-name");
    ros.getTopicType(topicName, function(topicType){
      interface.showTopicType(topicName,topicType);
    });
    e.preventDefault();
  };
  this.linkRosNodeClick = function(e) {
    var nodeName = $(this).attr("data-node-name");
  };
  
  // ROS events
  // ----------
  this.rosOnConnection = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connected to websocket server.');
  }
  this.rosOnError = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Error connecting to websocket server: ' + error);
  }
  this.rosOnClose = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connection to websocket server closed.');
  }
  
};