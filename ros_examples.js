GS.RosUsing = function() {
  // Connecting to a ROS web socket server
  // -------------------------------------
  
  // ===== Private variables =====
  // =============================
  var ros = new ROSLIB.Ros();
  var interface = new GS.Interface();
  
  ros.on('connection', function() {
    console.log('Connected to websocket server.');
  });
  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ' + error);
  });
  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
  
  // ===== Public functions =====
  // ============================
  this.connect = function(addr) {
    ros.connect(addr);
  }
  // Publishing a Topic
  // ------------------
  this.publishing = function() {
    var cmdVel = new ROSLIB.Topic({
      ros : ros,
      name : '/cmd_vel',
      messageType : 'geometry_msgs/Twist'
    });

    var twist = new ROSLIB.Message({
      linear : {
        x : 0.1,
        y : 0.2,
        z : 0.3
      },
      angular : {
        x : -0.1,
        y : -0.2,
        z : -0.3
      }
    });
    cmdVel.publish(twist);
  };
  // Subscribing to a Topic
  // ----------------------
  this.subscribing = function() {
    var listener = new ROSLIB.Topic({
      ros : ros,
      name : '/listener',
      messageType : 'std_msgs/String'
    });

    listener.subscribe(function(message) {
      console.log('Received message on ' + listener.name + ': ' + message.data);
      listener.unsubscribe();
    });
  };
  // Calling a service
  // -----------------
  this.call_service = function() {
    var addTwoIntsClient = new ROSLIB.Service({
      ros : ros,
      name : '/add_two_ints',
      serviceType : 'rospy_tutorials/AddTwoInts'
    });

    var request = new ROSLIB.ServiceRequest({
      a : 1,
      b : 2
    });

    addTwoIntsClient.callService(request, function(result) {
      console.log('Result for service call on '
        + addTwoIntsClient.name
        + ': '
        + result.sum);
    });
  };
  // Getting and setting a param value
  // ---------------------------------
  this.get_set_param = function() {
    ros.getParams(function(params) {
      console.log(params);
    });

    var maxVelX = new ROSLIB.Param({
      ros : ros,
      name : 'max_vel_y'
    });

    maxVelX.set(0.8);
    maxVelX.get(function(value) {
      console.log('MAX VAL: ' + value);
    });
  };
}