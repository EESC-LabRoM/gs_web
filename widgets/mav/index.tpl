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
      <a href="#" class="jsDataGroup dataGroup">Orientation RPY</a>
      <div class="jsDataField dataField">
        <label>Roll</label>
        <span data-id="roll-value">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Pitch</label>
        <span data-id="pitch-value">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Yaw</label>
        <span data-id="yaw-value">-</span>
      </div>
    </div>
    
    <div>
      <a href="#" class="jsDataGroup dataGroup">Orientation Quaternion</a>
      <div class="jsDataField dataField">
        <label>W</label>
        <span data-id="w-value">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>X</label>
        <span data-id="x-value">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Y</label>
        <span data-id="y-value">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Z</label>
        <span data-id="z-value">-</span>
      </div>
    </div>
    
    <div>
      <a href="#" class="jsDataGroup dataGroup">Angular Velocity</a>
      <div class="jsDataField dataField">
        <label>X</label>
        <span data-id="ang-vel-x">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Y</label>
        <span data-id="ang-vel-y">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Z</label>
        <span data-id="ang-vel-z">-</span>
      </div>
    </div>
    
    <div>
      <a href="#" class="jsDataGroup dataGroup">Linear Velocity</a>
      <div class="jsDataField dataField">
        <label>X</label>
        <span data-id="lin-vel-x">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Y</label>
        <span data-id="lin-vel-y">-</span>
      </div>
      <div class="jsDataField dataField">
        <label>Z</label>
        <span data-id="lin-vel-z">-</span>
      </div>
    </div>
  </div>
</div>