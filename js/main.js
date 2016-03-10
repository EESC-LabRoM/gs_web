// My Debug function
db = function (data) {
  console.log(data);
}
// My Namespaces
// -------------
GS = {};
GS.WIDGETS = {};
GS.ROBOTICS = {};

// GLOBALS
// -------
ros = new ROSLIB.Ros();


// ===== Load templates =====
// ==========================
function loadTemplates() {
  var templateList = [
    {
      name: "messageField",
      file: "/templates/message_field.tpl"
    },
    {
      name: "widgetContent",
      file: "/templates/widget_content.tpl"
    },
  ];
  templateList.forEach(function (template, i) {
    $.ajax(template.file, function (data) {
      templates[template.name] = data;
    });
  });
};

$(document).ready(function () {
  // ===== Linking events functions =====
  // ====================================
  events = new GS.Events();
  events.declareTriggers();

  // ===== Widgets object =====
  // ==========================
  widgets = new GS.Widgets();

  // ===== Calling routines function =====
  // =====================================
  routines = new GS.Routines();
  window.setInterval(routines.do, 1000);

  // ===== Load templates =====
  // ==========================
  templates = new GS.Templates();
  templates.loadAll();
  //loadTemplates();
});