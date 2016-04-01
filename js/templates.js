GS.Templates = function () {

  var self = this;

  this.baseUrl = "/templates/";

  this.items = [
    { name: "topicContent", file: "topics/content.tpl", content: "" },
    { name: "topicField", file: "topics/field.tpl", content: "" },
    { name: "topicList", file: "topics/list.tpl", content: "" },
    { name: "widgetContent", file: "widgets/container.tpl", content: "" }
  ];

  this.loadAll = function () {
    self.items.forEach(function (template, i) {
      $.get(self.baseUrl + template.file, function (data) {
        self.items[i].content = data;
      });
    });
  };

  this.getContent = function (name) {
    var content = "";
    self.items.forEach(function (item, i) {
      if (item.name == name) {
        content = item.content;
      }
    });
    return content;
  };

};
