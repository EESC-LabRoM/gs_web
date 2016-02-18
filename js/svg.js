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
  }

  this.line = function (properties, style) {
    var line = self.createElement("line", null, properties, style);
    return line;
  }
  this.text = function (text, properties, style) {
    var line = self.createElement("text", text, properties, style);
    return line;
  }
  this.rect = function (properties, style) {
    var rect = self.createElement("rect", null, properties, style);
    return rect;
  }

}