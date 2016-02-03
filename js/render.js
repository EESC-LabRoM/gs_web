GS.Render = function() {
  
  // ===== Private variables =====
  // =============================
  var self = this;
  
  // ===== Public methods =====
  // ==========================
  this.messageField = function(fieldId, fieldName, fieldType, fieldValue) {
    return Mustache.render(templates.messageField,
      {
        fieldId:fieldId,
        fieldName:fieldName,
        fieldType:fieldType,
        fieldValue:fieldValue
      }
     );
  }
  
  
  
}