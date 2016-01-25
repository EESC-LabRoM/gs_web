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
        interface.clearNodes();
        interface.listNodes(nodes);
      });
    } else {
      interface.clearNodes();
    }
  };
  // get topics
  // ----------
  var getTopics = function() {
    if(ros.isConnected) {
      ros.getTopics(function(topics) {
        interface.clearTopics();
        interface.listTopics(topics);
      });
    } else {  
      interface.clearTopics();
    }
  };
  // get services
  // ----------
  var getServices = function() {
    if(ros.isConnected) {
      ros.getServices(function(services) {
        interface.clearServices();
        interface.listServices(services);
      });
    } else {  
      interface.clearServices();
    }
  };
  
  // ===== Public methods =====
  // ==========================
  // main routine
  // ------------
  this.do = function() {
    getNodes();
    getTopics();
    getServices();
  };
}