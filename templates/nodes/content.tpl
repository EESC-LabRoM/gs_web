<div id="nodeDetails" class="rosDetails">
  <h3>Node details</h3>
  <p class="name">
    <label>Node</label>
    <span>{{nodeName}}</span>
  </p>

  <div class="publishing">
    <h4>Publishing</h4>
    <ul>
      {{#publishing}}
        <li>{{.}}</li>
      {{/publishing}}
    </ul>
  </div>

  <div class="subscribing">
    <h4>Subscribing</h4>
    <ul>
      {{#subscribing}}
        <li>{{.}}</li>
      {{/subscribing}}
    </ul>
  </div>

  <div class="services">
    <h4>Services</h4>
    <ul>
      {{#services}}
        <li>{{.}}</li>
      {{/services}}
    </ul>
  </div>
</div>