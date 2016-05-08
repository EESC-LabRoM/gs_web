GS.Render = function () {

  // ===== Private variables =====
  // =============================
  var self = this;

  // ===== Public methods =====
  // ==========================
  this.nodeDetails = function(nodeName, nodeDetails) {
    var content = templates.getContent("nodeDetails");
    return Mustache.render(content, {
      nodeName: nodeName,
      publishing: nodeDetails.publishing,
      subscribing: nodeDetails.subscribing,
      services: nodeDetails.services
    });
  };
  
  this.topicDetails = function(topicName, topicType, details) {
    var content = templates.getContent("topicDetails");
    return Mustache.render(content, {
      topicName: topicName,
      topicType: topicType,
      details: details
    });
  };
  
  this.topicField = function (fieldId, fieldName, fieldType, fieldValue) {
    var content = templates.getContent("topicField");
    return Mustache.render(content, {
      fieldId: fieldId,
      fieldName: fieldName,
      fieldType: fieldType,
      fieldValue: fieldValue
    });
  };

  this.topicList = function (fieldId) {
    var content = templates.getContent("topicList");
    return Mustache.render(content, {
      fieldId: fieldId
    });
  };
  
  this.serviceDetails = function(serviceName, serviceType) {
    var content = templates.getContent("serviceDetails");
    return Mustache.render(content, {
      serviceName: serviceName,
      serviceType: serviceType
    });
  };
  
  this.paramDetails = function(paramName, paramValue) {
    var content = templates.getContent("paramDetails");
    return Mustache.render(content, {
      paramName: paramName,
      paramValue: paramValue
    });
  };

  this.widgetContent = function (widgetId) {
    var content = templates.getContent("widgetContent");
    return Mustache.render(content, {
      widgetId: widgetId
    });
  };



}