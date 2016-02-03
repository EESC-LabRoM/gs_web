GS.Interface = function() {
  
  // ===== Private variables =====
  // =============================
  var self = this;
  var html = new GS.Html();
  var render = new GS.Render();
  
  // ros connect
  // -----------
  this.rosConnect = function(connected) {
    ros_connected = connected;
    $("#btn_server_connect").html(connected ? "Disconnect" : "Connect");
    if(connected) {
      $("#txt_ros_server_address").attr("readonly", "readonly");
    } else {
      $("#txt_ros_server_address").removeAttr("readonly");
    }
  };
  
  // log message
  // -----------
  this.logMessage = function(msg) {
    $("#messages-list").append("<li>" + msg + "</li>");
    $("#messages-list").parent().scrollTop($("#messages-list").parent()[0].scrollHeight);
  };
  
  // ros nodes
  // ---------
  this.clearNodes = function(){
    $("#nodes-list tr.jsNode").remove();
  };
  this.listNodes = function(nodes) {
    for(i in nodes) {
      var nodeName = nodes[i];
      var link = html.rosNodeLink(nodeName);
      var td = html.e("td", link, {"class":"jsNodeName"});
      var tr = html.e("tr", td, {"data-node-name":nodeName,"class":"jsNode"});
      $("#nodes-list").append(tr);
    }
  };
  this.showNodeInfo = function(nodeInfo) {
    
  };
  
  // ros topics
  // ----------
  this.clearTopics = function(){
    $("#topics-list tr.jsTopic").remove();
  };
  this.listTopics = function(topics) {
    for(i in topics) {
      var topicName = topics[i];
      var link = html.rosTopicLink(topicName);
      var td = html.e("td", link, {"class":"jsTopicName"});
      var tr = html.e("tr", td, {"data-topic-name":topicName, "class":"jsTopic"});
      $("#topics-list").append(tr);
    }
  };
  this.showTopicDetails = function(topicName, topicType, messageDetails) {
    this.showTopicDetailsBasic(topicName, topicType);
    
    var details = this.showTopicDetailsMessage(messageDetails, "", topicType);
    $("#topicDetails .messageDetails").html(details);
    
    $("#hdnTopicName").val(topicName);
    $("#hdnTopicType").val(topicType);
      
  };
  this.showTopicDetailsBasic = function(topicName, topicType) {
    $(".rosDetails").hide();
    $("#topicDetails").show();
    $("#topicDetails p.name span").html(topicName);
    $("#topicDetails p.type span").html(topicType);
  }
  this.showTopicDetailsMessage = function(messageDetails, parentId, parentType) {
    var listItems = "";
    var item = "";
    for(var i = 0; i < messageDetails.length; i++) {
      var md = messageDetails[i];
      if(md.type === parentType) {
        for(var j = 0; j < md.fieldnames.length; j++) {
          var fieldName = md.fieldnames[j];
          var fieldType = (md.fieldarraylen[j] > -1) ? md.fieldtypes[j] + " [ ]" : md.fieldtypes[j];
          var fieldId = parentId === "" ? fieldName : parentId + "." + fieldName;
          listItems += render.messageField(fieldId, fieldName, fieldType, "");
          if(md.fieldarraylen[j] > -1) {
            item = html.e("ul", "", {"data-id": "ul-" + fieldId});
          } else {
            item = this.showTopicDetailsMessage(messageDetails, fieldId, fieldType);
          }
          listItems += item;
        }
        return html.e("ul", listItems, {});
      }
    }
    return "";
  }
  this.getTopicFieldType = function(messageDetails, fieldName) {
    var md;
    for(var i = 0; i < messageDetails.length; i++) {
      md = messageDetails[i];
      for(var j = 0; j < md.fieldnames.length; j++) {
        if(md.fieldnames[j] === fieldName) return md.fieldtypes[j];
      }
    }
    return "";
  }
  this.showTopicMessage = function(messageDetails, message, fieldId, fieldName) {
    switch(typeof(message)) {
      case "object":
        var childId = "";
        var childName = "";
        var element = "";
        for(i in message) {
          childId = (fieldId === "") ? i : fieldId + "." + i;
          childName = (fieldName === "") ? i : fieldName + "." + i;
          if(Array.isArray(message)) {
            console.log(messageDetails);
            var fieldType = self.getTopicFieldType(messageDetails, fieldName);
            console.log(fieldName);
            console.log(fieldType);
            element = render.messageField(childId, childName, fieldType, message[i]);
            $("ul[data-id='ul-" + fieldId + "']").append(element);
          } else {
            self.showTopicMessage(messageDetails, message[i], childId, i);
          }
        }
        break;
      default:
        $("li[data-id='" + fieldId + "'] span.messageFieldValue").html(message);
        break;
    }
  }
  
  // ros services
  // ----------
  this.clearServices = function(){
    $("#services-list tr.jsService").remove();
  };
  this.listServices = function(services) {
    for(i in services) {
      var serviceName = services[i];
      var classStr = "jsService";
      if(serviceName.indexOf("/rosapi/") > -1) classStr += " jsRosapiService";
      if(serviceName.indexOf("/rosbridge_websocket/") > -1) classStr += " jsRosbridgeWebsocketService";
      if(serviceName.indexOf("/rosout/") > -1) classStr += " jsRosoutService";
      var link = html.rosServiceLink(serviceName);
      var td = html.e("td", link, {"class":"jsServiceName"});
      var tr = html.e("tr", td, {"data-service-name":serviceName, "class":classStr});
      $("#services-list").append(tr);
    }
  };
  this.showServiceDetails = function(serviceName, serviceType, requestDetails, responseDetails) {
    $(".rosDetails").hide();
    $("#serviceDetails").show();
    $("#serviceDetails p.name span").html(serviceName);
    $("#serviceDetails p.type span").html(serviceType);
    $("#hdnServiceName").val(serviceName);
    $("#hdnServiceType").val(serviceType);
    
    this.showServiceDetailsRequest(requestDetails);
    
    this.showServiceDetailsResponse(responseDetails);
  };
  this.showServiceDetailsRequest = function(requestDetails) {
    $("#serviceDetails .requestList .field").remove();
    for(i in requestDetails.typedefs[0].fieldnames){
      var name = requestDetails.typedefs[0].fieldnames[i];
      var type = requestDetails.typedefs[0].fieldtypes[i];
      var elementName = html.e("td", name);
      var elementType = html.e("td", type);
      var input = html.e("td", html.e("input", null, {autoclose:true, "class": "jsInputServiceRequest", "data-name": name, "data-type": type}));
      var tr = html.e("tr", elementType + elementName + input, {"class":"field"});
      $("#serviceDetails .requestList").append(tr);
    }
  }
  this.showServiceDetailsResponse = function(responseDetails) {
    $("#serviceDetails .responseList .field").remove();
    for(i in responseDetails.typedefs[0].fieldnames){
      var name = responseDetails.typedefs[0].fieldnames[i];
      var type = responseDetails.typedefs[0].fieldtypes[i];
      var elementName = html.e("td", name);
      var elementType = html.e("td", type);
      var input = html.e("td", html.e("input", null, {autoclose:true, readonly:"readonly"}));
      var tr = html.e("tr", elementType + elementName + input, {"class":"field"});
      $("#serviceDetails .responseList").append(tr);
    }
  }
  
  // ros params
  // ----------
  this.clearParams = function() {
    $("#params-list tr.jsParam").remove();
  };
  this.listParams = function(params) {
    for(i in params) {
      var paramName = params[i];
      var classStr = "jsParam";
      if(paramName.indexOf("/rosapi/") > -1) classStr += " jsRosapiParam";
      if(paramName.indexOf("/rosbridge_websocket/") > -1) classStr += " jsRosbridgeWebsocketParam";
      if(paramName.indexOf("/rosout/") > -1) classStr += " jsRosoutParam";
      var link= html.rosParamLink(paramName);
      var td = html.e("td", link, {"class":"jsParamName"});
      var tr = html.e("tr", td, {"data-param-name":paramName, "class":classStr});
      $("#params-list").append(tr);
    }
  };
  this.showParamDetails = function(paramName, paramValue) {
    $(".rosDetails").hide();
    $("#paramDetails").show();
    $("#paramDetails #hdnParamName").val(paramName);
    $("#paramDetails p.name span").html(paramName);
    $("#paramDetails p.type span").html(paramValue);
  };
  
}