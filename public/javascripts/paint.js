var paint = function () {
  this.canvas = null;
  this.context = null;
  this.width = 224;
  this.height = 224;

  this.color = '#fff';
  this.lineWidth = 10;
  this.drawing = false;
  var self = this;
  this.savedPosition = { x: 0, y: 0 };
  this.init = function () {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    document.getElementById("main").prepend(this.canvas);
    this.context.fillStyle = "black";
    this.context.fillRect(0,0,self.width,self.height);
    this.listenEvent();
  }
  this.listenEvent = function () {
    self.canvas.addEventListener('mousedown', self.processMouseDown);
    self.canvas.addEventListener('mouseup', self.processMouseUp);
    self.canvas.addEventListener('mousemove', self.processMouseMove);
  }
  this.processMouseDown = function (event) {
    self.drawing = true;
    self.savedPosition = self.getMousePosition(event);
  }

  this.processMouseUp = function (event) {
    self.drawing = false;
  }

  this.processMouseMove = function (event) {
    if (self.drawing == false)
      return;

    var newMousePosition = self.getMousePosition(event);
    self.drawLine(self.savedPosition.x,
      self.savedPosition.y,
      newMousePosition.x,
      newMousePosition.y);
    self.savedPosition = newMousePosition;
  }
  this.drawLine = function (startX, startY, endX, endY) {
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.stroke();
  }

  this.getMousePosition = function (event) {
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
  this.reset = function(){
    self.context.clearRect(0,0,self.width,self.height);
    self.context.fillStyle = "black";
    self.context.fillRect(0,0,self.width,self.height);
    for(i = 0 ; i < 10 ; i++){
      percent = (0+ "%");
      $("#"+i).css({"width":percent});
      $("#"+i).text('').css({"color":"black"});
    }
  }
  this.saveImage = function(){
      var image = self.canvas.toDataURL("image/png");   
      console.log(image)
      $.ajax({
        type:'POST',
        data:{
          imageURL: image
        },
        url: "/predict",
        success: function(resp){
          resp = resp.replace(/\[/g,'');
          resp = resp.replace(/\]/g,'');
          resp = resp.replace(/\n/g,'');
          data = resp.split(" ");
          var cur = data.indexOf("");
          if (cur > -1) {
            data.splice(cur, 1);
          }
          for(i = 0 ; i < 10 ; i++){
            percent = (data[i]*100).toFixed(5)+ "%";
            console.log(percent)
            $("#"+i).css({"width":percent});
            $("#"+i).text(percent).css({"color":"black"});
          }
        }
      })
  }
}

var p = new paint();
p.init();
function reset(){
  p.reset();
}
function save(){
  p.saveImage();
}
