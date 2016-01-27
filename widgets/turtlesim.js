WIDGET.Turtlesim = function() {
  
  this.start = function(id) {
    var html = '<div id="turltesim' + id + '" style="width:500px;height:500px;background-color:blue"><span id="turtle" style="float:left;width:20px;height:20px;background-color:white;border-radius:5px 15px 15px 5px;"></span></div>';
    $("#content-main").append(html);
  }
  
}