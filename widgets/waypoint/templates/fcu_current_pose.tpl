<h4>FCU Current Pose</h4>

<br />

<div>
  <h4>Position</h4>
  <label>X:</label>
  <span>{{pose.position.x}}</span>
  <br />
  <label>Y:</label>
  <span>{{pose.position.y}}</span>
  <br />
  <label>Z:</label>
  <span>{{pose.position.z}}</span>
</div>

<br />

<div>
  <h4>Orientation Quaternion</h4>
  <label>W:</label>
  <span>{{pose.orientation.w}}</span>
  <br />
  <label>X:</label>
  <span>{{pose.orientation.x}}</span>
  <br />
  <label>Y:</label>
  <span>{{pose.orientation.y}}</span>
  <br />
  <label>Z:</label>
  <span>{{pose.orientation.z}}</span>
</div>

<br />

<div>
  <h4>Orientation RPY</h4>
  <label>Roll:</label>
  <span>{{rpy.roll_deg_f2}}</span>
  <br />
  <label>Pitch:</label>
  <span>{{rpy.pitch_deg_f2}}</span>
  <br />
  <label>Yaw:</label>
  <span>{{rpy.yaw_deg_f2}}</span>
</div>