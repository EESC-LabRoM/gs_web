<div class="wMavContent">
  <h4>MAV</h4>
  
  <div class="wMavOptions">
    <label>Attitude visualizer</label>
    <select
      class="jsWidgetSelectTopic"
      name="ddlAttitudeVisualizer"
      data-msg-type="sensor_msgs/Imu"
      data-callback-function="attitudeVisualizerCallback">
      <option value="">blablabla</option>
    </select>
  </div>
  
  <br />

  <div class="wMavAttitude">
    <svg>
    </svg>
    <div>
      <label>Roll</label>
      <span data-id="roll-value"></span>
    </div>
    <div>
      <label>Pitch</label>
      <span data-id="pitch-value"></span>
    </div>
    <div>
      <label>Yaw</label>
      <span data-id="yaw-value"></span>
    </div>
  </div>
</div>