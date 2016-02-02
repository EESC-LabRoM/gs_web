// My Debug function
db = function(data){console.log(data);}
// My Namespaces
// -------------
GS = {};
WIDGET = {};
WIDGET.GEOMETRY_MSGS = {};

// GLOBALS
// -------
ros = new ROSLIB.Ros();
templates = {};

$(document).ready(function() {
  // ===== Linking events functions =====
  // ====================================
  events = new GS.Events();
  events.declareTriggers();
  
  // ===== Calling routines function =====
  // =====================================
  routines = new GS.Routines();
  window.setInterval(routines.do, 1000);
  
  // ===== Load templates =====
  // ==========================
  $.get("/templates/message_field.tpl", function(data){templates.messageField = data;});
});
