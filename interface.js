GS.Interface = function() {
  
  // ros connect
  // -----------
  this.rosConnect = function(connected) {
    ros_connected = connected;
    $("#btn_server_connect").html(connected ? "Disconnect" : "Connect");
    if(connected) {
      $("#txt_ros_server_address").attr("readonly", "readonly");
    } else {
      $("#txt_ros_server_address").removeAttr("readonly");
    }
  };
  
  // log message
  // -----------
  this.logMessage = function(msg) {
    $("#messages-list").append("<li>" + msg + "</li>");
  };
  
  // ros nodes
  // ---------
  this.clearNodes = function(){
    $("#nodes-list").html("");
  };
  this.listNodes = function(nodes) {
    for(i in nodes) {
      $("#nodes-list").append("<li>" + nodes[i] + "</li>"); 
    }
  }
  
  // ros topics
  // ----------
  this.clearTopics = function(){
    $("#topics-list").html("");
  };
  this.listTopics = function(topics) {
    for(i in topics) {
      $("#topics-list").append("<li>" + topics[i] + "</li>"); 
    }
  }
  
  // ros services
  // ----------
  this.clearServices = function(){
    $("#services-list").html("");
  };
  this.listServices = function(services) {
    for(i in services) {
      $("#services-list").append("<li>" + services[i] + "</li>"); 
    }
  }
  
}