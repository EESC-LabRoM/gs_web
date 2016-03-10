GS.WIDGETS.Mav = function () {
  // important attributes and methods
  var self = this;
  var path = "/widgets/mav/";
  var selector;
  var subscriptions = [];
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
      self.generateAttitudeVisualizer();
    });
  };

  // other functions
  this.attitudeVisualizerConfiguration = {
    pixelsPerDegree: 3,
    svgWidth: 400,
    svgHeight: 400,
    crownWidth: 50
  };
  this.generateAttitudeVisualizer = function () {
    var jSvgElement = $(selector + " .wMavAttitude svg");
    var svgElement = jSvgElement[0];
    jSvgElement.css("width", self.attitudeVisualizerConfiguration.svgWidth);
    jSvgElement.css("height", self.attitudeVisualizerConfiguration.svgHeight);
    var svgWidth = self.attitudeVisualizerConfiguration.svgWidth;
    var svgHeight = self.attitudeVisualizerConfiguration.svgHeight;
    var crownWidth = self.attitudeVisualizerConfiguration.crownWidth;

    // container like
    var gContainer = svg.g({"data-id": "container"});
    svgElement.appendChild(gContainer);

    // pitch and roll areas
    var rect1 = svg.rect({
      x: 0,
      y: 0,
      width: svgWidth,
      height: svgHeight,
      "data-id": "rectSky"
    }, {
      fill: "#0080ff"
    });
    var rect2 = svg.rect({
      x: 0,
      y: svgHeight / 2,
      width: svgWidth,
      height: svgHeight,
      "data-id": "rectLand"
    }, {
      fill: "#5C4033"
    });
    gContainer.appendChild(rect1);

    var gRollAffected = svg.g({"data-id": "rollAffected"});

    gRollAffected.appendChild(rect2);

    // pitch grid
    var bx1, bx2, sx1, sx2, y1, y2, x, y;
    var pixel_per_degree = self.attitudeVisualizerConfiguration.pixelsPerDegree;
    var min = -7, max = 7;
    var bLineWidth = 20;
    var sLineWidth = 10;
    for (var i = min; i <= max; i++) {
      bx1 = (svgWidth/2) - (bLineWidth/2);
      bx2 = (svgWidth/2) + (bLineWidth/2);
      sx1 = (svgWidth/2) - (sLineWidth/2);
      sx2 = (svgWidth/2) + (sLineWidth/2);
      y1 = y2 = (self.attitudeVisualizerConfiguration.svgHeight / 2) - (5 * pixel_per_degree * i);
      x = bx2 + 5;
      y = y1 + 4;
      gRollAffected.appendChild(svg.line({
        x1: bx1,
        x2: bx2,
        y1: y1,
        y2: y2,
        stroke: "black",
        "stroke-width": 1
      }));

      if(i < max) {
        for (var j = 1; j <= 4; j++) {
          gRollAffected.appendChild(svg.line({
            x1: sx1,
            x2: sx2,
            y1: y1 - (pixel_per_degree * j),
            y2: y2 - (pixel_per_degree * j),
            stroke: "black",
            "stroke-width": 1
          }));
        }
      }
      gRollAffected.appendChild(svg.text(5 * i + "º", {
        x: bx2 + 5,
        y: y,
        "font-size": 12
      }));
    }


    // pitch and roll lines
    var pitchLine = svg.line({
      x1: 0,
      x2: svgWidth,
      y1: svgHeight / 2,
      y2: svgHeight / 2,
      stroke: "yellow",
      "stroke-width": 1,
      "data-id": "linePitch"
    });
    gRollAffected.appendChild(pitchLine);

    gContainer.appendChild(gRollAffected);

    var squareSide = svgWidth;
    var halfSquareSide = squareSide/2;
//    var quarterCircle1 = svg.quarterCircle({fill:"#ccc", stroke:"#ccc", "stroke-width":1},
//      crownWidth, halfSquareSide,
//      halfSquareSide, crownWidth,
//      crownWidth, crownWidth,
//      halfSquareSide, true);
//    gContainer.appendChild(quarterCircle1);
  };
  // update selects' options
  this.updateSelectsOptions = function () {
    $(".jsWidgetSelectTopic").each(function (k1, v1) {
      $(v1).attr("data-widget-id", self.widgetId);
      var type = $(v1).attr("data-msg-type");
      $(v1).html("");
      ros.getTopicsForType(type, function(data) {
        $(v1).append(html.e("option", "-- select a topic to subscribe --", {value: ""}));
        data.forEach(function(v2, k2) {
          $(v1).append(html.e("option", v2, {value: v2}));
        });
      });
    });
  };

  // callback functions
  // attitude visualizer
  // type: sensor_msgs/Imu
  this.attitudeVisualizerCallback = function (msg) {
    // quaternion
    var quaternion = new GS.ROBOTICS.Quaternion();
    quaternion.w = msg.orientation.w;
    quaternion.x = msg.orientation.x;
    quaternion.y = msg.orientation.y;
    quaternion.z = msg.orientation.z;

    // rpy
    var eulerXYZ = new GS.ROBOTICS.RPY();
    eulerXYZ = quaternion.toRPY();

    // show in text format
    $(selector + " span[data-id='roll-value']").html(eulerXYZ.roll_deg.toFixed(2) + "º");
    $(selector + " span[data-id='pitch-value']").html(eulerXYZ.pitch_deg.toFixed(2) + "º");
    $(selector + " span[data-id='yaw-value']").html(eulerXYZ.yaw_deg.toFixed(2) + "º");

    // svg transform
    var translateY = -eulerXYZ.pitch_deg * self.attitudeVisualizerConfiguration.pixelsPerDegree;
    var translate = " translate(0 " + translateY + ")";

    var rotateX = self.attitudeVisualizerConfiguration.svgWidth / 2;
    var rotateY = (self.attitudeVisualizerConfiguration.svgHeight / 2) + translateY;
    var rotateDeg = -eulerXYZ.roll_deg;
    var rotate = " rotate(" + rotateDeg + " " + rotateX + " " + rotateY + ")";

    //$(selector + " g[data-id='rollAffected']")[0].setAttributeNS(null, "transform", rotate);
    $(selector + " rect[data-id='rectLand']")[0].setAttributeNS(null, "transform", translate);
    $(selector + " line[data-id='linePitch']")[0].setAttributeNS(null, "transform", translate);
    $(selector + " g[data-id='rollAffected']")[0].setAttributeNS(null, "transform", rotate);
  };
};
