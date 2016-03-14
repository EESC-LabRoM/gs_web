// My Debug function
db = function (data) {console.log(data);}
// My Namespaces
GS = {};
GS.WIDGETS = {};
GS.ROBOTICS = {};

// GLOBALS
// -------
ros = new ROSLIB.Ros();

$(document).ready(function () {
  // ===== Linking events functions =====
  events = new GS.Events();
  events.declareTriggers();

  // ===== Widgets object =====
  widgets = new GS.Widgets();

  // ===== Calling routines function =====
  // routines = new GS.Routines();
  window.setInterval(events.routines, 1000);

  // ===== Load templates =====
  templates = new GS.Templates();
  templates.loadAll();
});