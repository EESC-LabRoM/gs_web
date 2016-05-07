GS.Widgets = function() {
  
  // ===== Private properties =====
  // ==============================
  var self = this;
  var widgetsIdCounter = 0;
  var html = new GS.Html();
  var render = new GS.Render();
  
  // ===== Private methods =====
  // ===========================
  
  // ===== Public properties =====
  // =============================
  this.interface = new GS.Interface();
  this.list = ["Mav", "Turtlesim", "Waypoint"];
  this.opened = [];
  this.subscribers = [];
  /*
  [{
    widgetId: 1,
    listener: {Object},
    callbackFunctionName: ""
  }]
  */
  
  // ===== Private methods =====
  
  // ===== Public methods =====
  this.open = function(widgetName) {
    var widgetId = ++widgetsIdCounter;
    
    // widgets manager
    var widget = new GS.WIDGETS[widgetName]();
    widget.widgetId = widgetId;
    self.opened.push(widget);
    
    // interface
    this.interface.widgetOpen(widgetId, widgetName);
    
    // start
    this.widgetStart(widgetId);
  }
  this.show = function(widgetId) {
    this.interface.widgetShow(widgetId);
  }
  this.close = function(widgetId) {
    // interface
    this.interface.widgetClose(widgetId);
    this.interface.widgetShow(0);
    
    // widgets manager
    self.opened.splice(self.getWidgetIndex(widgetId), 1);
  }
  this.count = function() {
    return widgetsList.length;
  }
  
  // ===== Widgets Private Methods =====
  this.getWidgetIndex = function(widgetId) {
    for(var i in self.opened) {
      var widget = self.opened[i];
      if(widget.widgetId === widgetId) return i;
    }
    return false;
  }
  this.getWidget = function(widgetId) {
    return self.opened[self.getWidgetIndex(widgetId)];
  }
  
  // widget callbacks
  this.widgetStart = function(widgetId) {
    var widget = self.getWidget(widgetId);
    widget.onStart();
  }
  
}