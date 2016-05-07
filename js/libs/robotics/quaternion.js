GS.ROBOTICS.rad2deg = function(rad) {
  var deg = (360 * rad) / (2 * Math.PI);
  return deg;
}

GS.ROBOTICS.Quaternion = function() {
  var self = this;

  this.w = 1;
  this.x = 0;
  this.y = 0;
  this.z = 0;

  this.toMatrix = function() {
    var matrix3x3 = new GS.ROBOTICS.Matrix3x3();

    var sqw = self.w*self.w;
    var sqx = self.x*self.x;
    var sqy = self.y*self.y;
    var sqz = self.z*self.z;

    // invs (inverse square length) is only required if quaternion is not already normalised
    var invs = 1 / (sqx + sqy + sqz + sqw);
    matrix3x3.r11 = ( sqx - sqy - sqz + sqw)*invs; // since sqw + sqx + sqy + sqz =1/invs*invs
    matrix3x3.r22 = (-sqx + sqy - sqz + sqw)*invs;
    matrix3x3.r33 = (-sqx - sqy + sqz + sqw)*invs;

    var tmp1, tmp2;

    tmp1 = self.x*self.y;
    tmp2 = self.z*self.w;
    matrix3x3.r21 = 2.0 * (tmp1 + tmp2)*invs;
    matrix3x3.r12 = 2.0 * (tmp1 - tmp2)*invs;

    tmp1 = self.x*self.z;
    tmp2 = self.y*self.w;
    matrix3x3.r31 = 2.0 * (tmp1 - tmp2)*invs;
    matrix3x3.r13 = 2.0 * (tmp1 + tmp2)*invs;

    tmp1 = self.y*self.z;
    tmp2 = self.x*self.w;
    matrix3x3.r32 = 2.0 * (tmp1 + tmp2)*invs;
    matrix3x3.r23 = 2.0 * (tmp1 - tmp2)*invs;

    return matrix3x3;
  };

  this.toRPY = function() {
    var matrix3x3 = new GS.ROBOTICS.Matrix3x3();
    matrix3x3 = self.toMatrix();

    var eulerXYZ = new GS.ROBOTICS.RPY();
    var num, den;
    
    num = matrix3x3.r21;
    den = matrix3x3.r11;
    eulerXYZ.yaw = Math.atan2(num, den);
    eulerXYZ.yaw_deg = GS.ROBOTICS.rad2deg(eulerXYZ.yaw);
    eulerXYZ.yaw_deg_f2 = eulerXYZ.yaw_deg.toFixed(2);
    
    num = -matrix3x3.r31;
    den = Math.pow(Math.pow(matrix3x3.r32, 2) + Math.pow(matrix3x3.r33, 2), 0.5);
    eulerXYZ.pitch = Math.atan2(num, den);
    eulerXYZ.pitch_deg = GS.ROBOTICS.rad2deg(eulerXYZ.pitch);
    eulerXYZ.pitch_deg_f2 = eulerXYZ.pitch_deg.toFixed(2);
    
    num = matrix3x3.r32;
    den = matrix3x3.r33;
    eulerXYZ.roll = Math.atan2(num, den);
    eulerXYZ.roll_deg = GS.ROBOTICS.rad2deg(eulerXYZ.roll);
    eulerXYZ.roll_deg_f2 = eulerXYZ.roll_deg.toFixed(2);


    return eulerXYZ;
  };

};
