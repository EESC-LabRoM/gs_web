<div class="wWaypointContent">
  <h3>Waypoint Visualizer</h3>

  <div class="wWaypointOptions">
    <label>FCU Status</label>
    <select class="jsWidgetSelectTopic" name="ddlFcuStatus" data-msg-type="asctec_hl_comm/mav_status" data-callback-function="statusVisualizerCallback">
      <option value=""></option>
    </select>

    <label>FCU Current Pose</label>
    <select class="jsWidgetSelectTopic" name="ddlFcuCurrentPose" data-msg-type="geometry_msgs/PoseStamped" data-callback-function="poseVisualizerCallback">
      <option value=""></option>
    </select>

    <br />
    <br />
  </div>

  <div class="wWaypointBox wFcuStatus">
  </div>

  <div class="wWaypointBox wFcuCurrentPose">
  </div>

  <div class="wWaypointBox wFcuWaypointCommandInterface">
    <h4>Waypoint Command Interface</h4>

    <div class="wFcuWaypointCommandInterfaceMap">

    </div>
    <div class="wFcuWaypointCommandInterfaceControls">
      <button type="button" class="btnWFcuWaypointUpdateGPSParameters">Update parameters</button>
      <button type="button" class="btnWFcuWaypointCenterReference">Center on Reference position</button>
      <button type="button" class="btnWFcuWaypointCenterCurrentPosition">Center on Current position</button>

      <br />

      <label>FCU Current Pose</label>
      <select class="jsWidgetSelectTopic" name="ddlFcuGps" data-msg-type="sensor_msgs/NavSatFix" data-callback-function="gpsVisualizerCallback">
        <option value=""></option>
      </select>
      
      <br /><br />
      
      <div>
        <h4>Waypoints</h4>
        <table class="wFcuWaypointList">
          <thead>
            <tr>
              <th>Lat</th>
              <th>Lng</th>
              <th>X</th>
              <th>Y</th>
              <th>Z</th>
            </tr>
          </thead>
        </table>
      </div>

      <br />
      <br />
    </div>


  </div>

  <div class="clearfix"></div>
</div>