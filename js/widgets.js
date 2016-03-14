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
  this.list = ["Mav", "Turtlesim"];
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
  var openMenu = function(widgetId, widgetName) {
    var link = html.e("a", widgetName, {href: "#", "data-id": widgetId, "class": "jsWidgetShow"});
    var closeLink = html.e("a", "x", {href: "#", "class": "close jsWidgetClose", "data-id": widgetId});
    var item = html.e("li", link + closeLink, {"data-id": widgetId});
    $("#contentMenu > ul").append(item);
  }
  var openContent = function(widgetId, widgetName) {
    var content = render.widgetContent(widgetId);
    $("#contentMain").append(content);
    self.widgetStart(widgetId);
  }
  
  // ===== Public methods =====
  this.open = function(widgetName) {
    var widgetId = ++widgetsIdCounter;
    
    // widgets manager
    var widget = new GS.WIDGETS[widgetName]();
    widget.widgetId = widgetId;
    self.opened.push(widget);
    
    // interface
    openMenu(widgetId, widgetName);
    openContent(widgetId, widgetName);
    self.show(widgetId);
  }
  this.show = function(widgetId) {
    $("#contentMenu a.jsWidgetShow").removeClass("selectedWidget");
    $("#contentMenu a.jsWidgetShow[data-id=" + widgetId + "]").addClass("selectedWidget");
    
    $("#contentMain div.widgetContent").hide();
    $("#contentMain div[data-widget-id=" + widgetId + "]").show();
  }
  this.close = function(widgetId) {
    // interface
    $("#contentMenu ul li[data-id=" + widgetId + "]").remove();
    $("#contentMain div.widgetContent[data-widget-id=" + widgetId + "]").remove();
    self.show(0);
    
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