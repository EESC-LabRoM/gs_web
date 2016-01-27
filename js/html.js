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
    return "<" + tag + ">" + content + "</" + tag + ">";
  }
  this.rosTopicLink = function(topicName) {
    return "<a href=\"#\" class=\"jsRosTopic\" data-topic-name=\"" + topicName + "\">" + topicName + "</a>";
  };
  
}
