GS.Interface = function() {
  this.rosConnect = function(connected) {
    ros_connected = connected;
    $("#btn_server_connect").html(connected ? "Disconnect" : "Connect");
    if(connected) {
      $("#txt_ros_server_address").attr("readonly", "readonly");
    } else {
      $("#txt_ros_server_address").removeAttr("readonly");
    }
  };

  this.logMessage = function(msg) {
    $("#messages-list").append("<li>" + msg + "</li>");
  };
  
  
  // ros nodes
  // ---------
  this.cleanNodes = function(){
    $("#nodes-list").html("");
  };
  this.listNodes = function(nodes) {
    $("#nodes-list").html("");
    for(i in nodes) {
      $("#nodes-list").append("<li>" + nodes[i] + "</li>"); 
    }
  }
  
  // ros topics
  // ----------
  this.cleanTopics = function(){
    $("#topics-list").html("");
  };
  this.listTopics = function(nodes) {
    for(i in topics) {
      $("#topics-list").append("<li>" + topics[i] + "</li>"); 
    }
  }
}