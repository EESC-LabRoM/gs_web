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
    <div class="wFcuWaypointCommandInterfaceControls"></div>


  </div>

  <div class="clearfix"></div>
</div>