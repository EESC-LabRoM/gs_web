GS.Routines = function() {
  
  // ===== Private variables =====
  // =============================
  var interface = new GS.Interface();
  var resetPrevData = {nodes:[],topics:[],services:[]};
  var prevData = {nodes:[],topics:[],services:[]};
  
  // ===== Private methods =====
  // ===========================
  var compareArrays = function(arr1, arr2) {
    // compare size
    if(arr1.length !== arr2.length) return false;
    
    // compare items
    for(i in arr1) {
      if(arr1[i] !== arr2[i]) return false;
    }
    
    return true;
  };
  // get nodes
  // ---------
  var getNodes = function() {
    if(ros.isConnected) {
      ros.getNodes(function(nodes) {
        nodes.sort();
        if(!compareArrays(prevData.nodes, nodes)) {
          interface.logMessage("nodes refreshed");
          interface.clearNodes();
          interface.listNodes(nodes);
        }
        prevData.nodes = nodes;
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
        topics.sort();
        if(!compareArrays(prevData.topics, topics)) {
          interface.logMessage("topics refreshed");
          interface.clearTopics();
          interface.listTopics(topics);
        }
        prevData.topics = topics;
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
        services.sort();
        if(!compareArrays(prevData.services, services)) {
          interface.logMessage("services refreshed");
          interface.clearServices();
          interface.listServices(services);
        }
        prevData.services = services;
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
    if(!ros.isConnected) {
      prevData = {nodes:[],topics:[],services:[]};
    }
    getNodes();
    getTopics();
    getServices();
  };
}