// My Debug function
db = function(data) { console.log(data); }
// My Namespaces
GS = {};
GS.WIDGETS = {};
GS.ROBOTICS = {};

// GLOBALS
// -------
ros = new ROSLIB.Ros();

$(document).ready(function() {
  /*
  $.getScript("events.js", function() {

  });
  */

  // ===== Linking events functions =====
  events = new GS.Events();
  events.declareTriggers();

  // ===== Widgets object =====
  widgets = new GS.Widgets();

  // ===== Calling routines function =====
  // routines = new GS.Routines();
  window.setInterval(events.routines, 1000);

  // ===== Load templates =====
  var items = [
    { name: "nodeDetails", file: "/nodes/content.tpl", content: "" },
    { name: "topicDetails", file: "/topics/content.tpl", content:""},
    { name: "topicContent", file: "/topics/content.tpl", content: "" },
    { name: "topicField", file: "/topics/field.tpl", content: "" },
    { name: "topicList", file: "/topics/list.tpl", content: "" },
    { name: "widgetContent", file: "/widgets/container.tpl", content: "" },
    { name: "paramDetails", file: "/params/content.tpl", content: ""}
  ];
  templates = new GS.Templates("/templates", items);
  templates.loadAll();
});