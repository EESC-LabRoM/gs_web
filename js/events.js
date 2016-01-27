GS.Events = function() {
  
  // ===== Private variables =====
  // =============================
  var interface = new GS.Interface();
  
  // ===== Public functions =====
  // ============================
  
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
      console.log(topicType);
    });
    e.preventDefault();
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