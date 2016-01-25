GS.Routines = function() {
  
  // ===== Private variables =====
  // =============================
  var interface = new GS.Interface();
  
  // ===== Private methods =====
  // ===========================
  // get nodes
  // ---------
  var getNodes = function() {
    if(ros.isConnected) {
      ros.getNodes(function(nodes) {
        interface.listNodes(nodes);
      });
    }
  };
  // get topics
  // ----------
  var getTopics = function() {
    if(ros.isConnected) {
      ros.getTopics(function(topics) {
        interface.listTopics(topics);
      });
    }
  };
  
  // ===== Public methods =====
  // ==========================
  // main routine
  // ------------
  this.do = function() {
    getNodes();
    getTopics();
  };
}