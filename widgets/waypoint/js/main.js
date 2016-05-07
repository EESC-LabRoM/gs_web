GS.WIDGETS.Waypoint = function () {
  // important attributes and methods
  var self = this;
  var path = "/widgets/waypoint/";
  var selector;
  var subscriptions = [];
  this.templates = [
    { name: "fcuStatus", file: "templates/fcu_status.tpl", content: "" }
  ];
  /*
  [{
    subscriberId: 1,
    topicName: ""
  }]
  */

  // helpers
  var html = new GS.Html();
  var svg = new GS.Svg();

  // "inherited" attributes
  this.widgetId;

  // "inherited" callbacks
  this.onStart = function () {
    selector = ".widgetContent[data-widget-id=" + self.widgetId + "]";
    $.get(path + "index.tpl", function (data) {
      $(".widgetContent[data-widget-id=" + self.widgetId + "]").html(data);
      self.updateSelectsOptions();
    });
    self.getTemplates();
  };

  // update selects' options
  this.updateSelectsOptions = function () {
    $(".jsWidgetSelectTopic").each(function (k1, v1) {
      $(v1).attr("data-widget-id", self.widgetId);
      var type = $(v1).attr("data-msg-type");
      $(v1).html("");
      ros.getTopicsForType(type, function (data) {
        $(v1).append(html.e("option", "-- select a topic to subscribe --", { value: "" }));
        data.forEach(function (v2, k2) {
          $(v1).append(html.e("option", v2, { value: v2 }));
        });
      });
    });
  };
  
  // get templates
  this.getTemplates = function() {
    
  };

  // callback functions
  this.statusVisualizerCallback = function(msg) {
    var content = '';
    for(i in msg) {
      content += "<br />" + i + ":" + msg[i];
    };
    console.log(msg);
    $(selector).find(".wFcuStatus > .properties").html(content);
  };
  this.poseVisualizerCallback = function(msg) {
    
  };
};
