GS.ROBOTICS.RPY = function() {
  var self = this;

  this.roll = 0;
  this.pitch = 0;
  this.yaw = 0;
  
  this.roll_deg = 0;
  this.pitch_deg = 0;
  this.yaw_deg = 0;

  this.toQuaternion = function() {
    var roll = self.roll;
    var pitch = self.pitch;
    var yaw = self.yaw;

    var roll_h = self.roll/2;
    var pitch_h = self.pitch/2;
    var yaw_h = self.yaw/2;

    var c_roll_h = Math.cos(roll_h);
    var c_pitch_h = Math.cos(pitch_h);
    var c_yaw_h = Math.cos(yaw_h);

    var s_roll_h = Math.sin(roll_h);
    var s_pitch_h = Math.sin(pitch_h);
    var s_yaw_h = Math.sin(yaw_h);

    var quaternion = new GS.ROBOTICS.Quaternion();
    quaternion.q0 = (c_roll_h * c_pitch_h * c_yaw_h) + (s_roll_h * s_pitch_h * s_yaw_h);
    quaternion.q1 = (s_roll_h * c_pitch_h * c_yaw_h) - (c_roll_h * s_pitch_h * s_yaw_h);
    quaternion.q2 = (c_roll_h * s_pitch_h * c_yaw_h) + (s_roll_h * c_pitch_h * s_yaw_h);
    quaternion.q3 = (c_roll_h * c_pitch_h * s_yaw_h) - (s_roll_h * s_pitch_h * c_yaw_h);
    
    return quaternion;
  };
};