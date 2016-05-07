<div class="wWaypointContent">
  <h4>Waypoint Visualizer</h4>

  <div class="wWaypointOptions">
    <label>FCU Status</label>
    <select class="jsWidgetSelectTopic" name="ddlFcuStatus" data-msg-type="asctec_hl_comm/mav_status" data-callback-function="statusVisualizerCallback">
      <option value=""></option>
    </select>
    
    <label>FCU Current Pose</label>
    <select class="jsWidgetSelectTopic" name="ddlFcuCurrentPose" data-msg-type="geometry_msgs/PoseStamped" data-callback-function="poseVisualizerCallback">
      <option value=""></option>
    </select>
  
    <br /><br />
  </div>
  
  <div class="wWaypointBox wFcuStatus">
    <h3>FCU Status</h3>
    <div class="properties">
      
    </div>
  </div>
  
  <div class="wWaypointBox wFcuCurrentPose">
    <h3>FCU Current Pose</h3>
    
  </div>

  <div class="clearfix"></div>
</div>