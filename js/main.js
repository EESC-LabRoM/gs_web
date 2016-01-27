// My Namespaces
// -------------
GS = {};
WIDGET = {};
WIDGET.GEOMETRY_MSGS = {};

// GLOBALS
// -------
ros = new ROSLIB.Ros();

$(document).ready(function() {
  // ===== Linking events functions =====
  // ====================================
  events = new GS.Events();
  // network events
  // --------------
  ros.on('connection', events.rosOnConnection);
  ros.on('error', events.rosOnError);
  ros.on('close', events.rosOnClose);
  // html events
  // -----------
  $("#btn_server_connect").click(events.btnServerConnectClick);
  $(document).delegate(".jsRosTopic", "click", events.linkRosTopicClick);
  
  // ===== Calling routines function =====
  // =====================================
  routines = new GS.Routines();
  window.setInterval(routines.do, 1000);
});

function getObjects() {
}

