GS.Routines = function() {
  
  window.setInterval(this.getNodes, 1000);
  window.setInterval(this.getTopics, 1000);
  
  this.getNodes = function() {
    if(ros.isConnected) {
      ros.getNodes();
    }
  };
  
  this.getTopics = function() {
    if(ros.isConnected) {
      
    }
  };
}