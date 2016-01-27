GS.Html = function() {
  
  // ===== Private variables =====
  // =============================
  
  // ===== Private methods =====
  // ===========================
  // general html elements
  // ---------------------
  
  // ===== Public methods =====
  // ===========================
  // ros html elements
  // -----------------
  this.e = function(tag, content, options) {
    var attrs = "";
    for(i in options) {
      attrs += " " + i + "=\"" + options[i] + "\" ";
    }
    return "<" + tag + " " + attrs + ">" + content + "</" + tag + ">";
  }
  this.rosTopicLink = function(topicName) {
    return "<a href=\"#\" class=\"jsRosTopic\" data-topic-name=\"" + topicName + "\">" + topicName + "</a>";
  };
  this.rosNodeLink = function(nodeName) {
    return "<a href=\"#\" class=\"jsRosNode\" data-node-name=\"" + nodeName + "\">" + nodeName + "</a>";
  };
  this.rosServiceLink = function(serviceName) {
    return "<a href=\"#\" class=\"jsRosService\" data-service-name=\"" + serviceName + "\">" + serviceName + "</a>";
  };
  this.rosParamLink = function(paramName) {
    return "<a href=\"#\" class=\"jsRosParam\" data-param-name=\"" + paramName + "\">" + paramName + "</a>";
  };
  
}
