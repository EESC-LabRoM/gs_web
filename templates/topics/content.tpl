<div id="topicDetails" class="rosDetails">
  <h3>Topic details</h3>
  <p class="name">
    <label>Topic</label>
    <span>{{topicName}}</span>
  </p>

  <p class="type">
    <label>Type</label>
    <span>{{topicType}}</span>
  </p>

  <div class="messageDetails">
    <label>Message Details</label>
    {{{details}}}
  </div>
  
  <div class="actions">
    <input type="hidden" name="hdnTopicName" id="hdnTopicName" value="{{topicName}}" />
    <input type="hidden" name="hdnTopicType" id="hdnTopicType" value="{{topicType}}" />
    <button type="button" id="btnSubscribeTopic">Subscribe</button>
    <button type="button" id="btnUnsubscribeTopic" disabled="disabled">Unsubscribe</button>
  </div>
</div>