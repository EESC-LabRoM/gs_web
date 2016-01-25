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
    $("#nodes-list").append("<li>" + msg + "</li>");
  };
}