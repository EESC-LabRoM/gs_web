WIDGETS.Mav = function() {
  var self = this;
  var path = "/widgets/mav/";
  var html = new GS.Html();
  var svg = new GS.Svg();
  
  // auto completed attributes
  this.widgetId;
  
  // callbacks
  this.onStart = function() {
    $.get(path + "index.tpl", function(data) {
      $(".widgetContent[data-widget-id=" + self.widgetId + "]").html(data);
      self.generateAttitudeVisualizer();
    });
  }
  
  var getSelector = function() {
    return ".widgetContent[data-widget-id=" + self.widgetId + "]";
  }
  
  // other functions
  this.generateAttitudeVisualizer = function() {
    var jSvgElement = $(getSelector() + " .wMavAttitude svg");
    var svgElement = jSvgElement[0];
    var svgWidth = parseInt(jSvgElement.css("width"));
    var svgHeight = parseInt(jSvgElement.css("height"));
    
    // pitch and roll areas
    var rect1 = svg.rect({x:0,y:0,width:svgWidth,height:svgHeight}, {fill:"#0080ff"});
    var rect2 = svg.rect({x:0,y:svgHeight/2,width:svgWidth,height:svgHeight}, {fill:"#5C4033"});
    svgElement.appendChild(rect1);
    svgElement.appendChild(rect2);
    
    // pitch grid
    var x1,x2,y1,y2,x,y;
    var pixel_per_degree = 4;
    var min = -5, max = 5;
    for(var i=min; i <= max; i++) {
      x1 = 0;
      x2 = 20;
      y1 = y2 = (svgHeight/2) + 5 * pixel_per_degree * i;
      x = 25;
      y = y1 + 4;
      svgElement.appendChild(svg.line({x1:x1,x2:x2,y1:y1,y2:y2,stroke:"black","stroke-width":1}));
      if(i>min) {
        for(var j = 1; j <= 4; j++) {
          svgElement.appendChild(svg.line({x1:x1,x2:x2/2,y1:y1-(pixel_per_degree*j),y2:y2-(pixel_per_degree*j),stroke:"black","stroke-width":1}));
        }
      }
      svgElement.appendChild(svg.text(5*i + "º", {x:x,y:y, "font-size": 12}));
    }
    
    
    // pitch and roll lines
    var pitchLine = svg.line({x1:0,x2:svgWidth,y1:svgHeight/2,y2:svgHeight/2,stroke:"yellow","stroke-width":1});
    svgElement.appendChild(pitchLine);
  }
}
