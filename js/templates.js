GS.Templates = function (baseUrl, items) {

  var self = this;

  this.baseUrl = baseUrl;

  this.items = items;

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
