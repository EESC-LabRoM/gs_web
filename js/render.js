GS.Render = function () {

  // ===== Private variables =====
  // =============================
  var self = this;

  // ===== Public methods =====
  // ==========================
  this.messageField = function (fieldId, fieldName, fieldType, fieldValue) {
    var content = templates.getContent("messageField");
    return Mustache.render(content, {
      fieldId: fieldId,
      fieldName: fieldName,
      fieldType: fieldType,
      fieldValue: fieldValue
    });
  };

  this.widgetContent = function (widgetId) {
    var content = templates.getContent("widgetContent");
    return Mustache.render(content, {
      widgetId: widgetId
    });
  };



}