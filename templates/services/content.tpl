<div id="serviceDetails" class="rosDetails">
  <h3>Service details</h3>
  <p class="name">
    <label>Service</label>
    <span>{{serviceName}}</span>
  </p>
  <p class="type">
    <label>Type</label>
    <span>{{serviceType}}</span>
  </p>
  <div class="request">
    <h4>Request</h4>
  </div>
  
  <div class="response">
    <h4>Response</h4>
  </div>

  <br />

  <div>
    <h4>Call service</h4>
    <input type="hidden" id="hdnServiceName" name="hdnServiceName" value="{{serviceName}}" />
    <input type="hidden" id="hdnServiceType" name="hdnServiceType" value="{{serviceType}}" />
    <button id="btnCallService">Call!</button>
    <button id="btnRefreshService">Refresh!</button>
  </div>
</div>