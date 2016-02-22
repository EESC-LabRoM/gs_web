GS.Svg = function () {

  var self = this;
  var svgNS = "http://www.w3.org/2000/svg";

  this.createElement = function (name, inner, properties, style) {
    var element = document.createElementNS(svgNS, name);
    element.innerHTML = inner;

    for (var k in properties) {
      var v = properties[k];
      element.setAttributeNS(null, k, v);
    }

    var inlineStyle = "";
    for (var k in style) {
      var v = style[k];
      inlineStyle += k + ":" + v + ";";
    }
    if (inlineStyle !== "") element.setAttributeNS(null, "style", inlineStyle);

    return element;
  };

  this.g = function(properties) {
    var g = self.createElement("g", null, properties);
    return g;
  };
  this.line = function (properties, style) {
    var line = self.createElement("line", null, properties, style);
    return line;
  };
  this.text = function (text, properties, style) {
    var line = self.createElement("text", text, properties, style);
    return line;
  };
  this.rect = function (properties, style) {
    var rect = self.createElement("rect", null, properties, style);
    return rect;
  };
  
  this.quarterCircle = function(properties, x1, y1, x2, y2, x3, y3, r, isClockwise) {
    var rx, ry, clockwise;
    rx = ry = r;
    clockwise = isClockwise ? 1 : 0;
    var d = "M " + x1 + " " + y1 + " A " + r + " " + r + " 0 0 " + clockwise + " " + x2 + " " + y2 + " L " + x3 + " " + y3;
    properties.d = d;
    var properties = {d: d, fill:"#ccc", stroke:"#ccc", "stroke-width":1};
    var quarterCircle = self.createElement("path", null, properties, {});
    return quarterCircle;
  }

}