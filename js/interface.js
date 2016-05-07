/// <reference path="render.js" />

GS.Interface = function() {

  // ===== Private variables =====
  var self = this;
  var html = new GS.Html();
  var render = new GS.Render();

  // ros connect
  this.rosConnect = function(connected) {
    ros_connected = connected;
    $("#btn_server_connect").html(connected ? "Disconnect" : "Connect");
    if (connected) {
      $("#txt_ros_server_address").attr("readonly", "readonly");
    } else {
      $("#txt_ros_server_address").removeAttr("readonly");
    }
  };

  // widgets
  this.widgetToggleList = function() {
    $("#widgetList").html("");
    for (i in widgets.list) {
      var widgetName = widgets.list[i];
      $("#widgetList").append(html.e("a", widgetName, { href: "#", "data-name": widgetName, "class": "jsWidgetItem" }));
    }
    if ($("#widgetList").is(":visible")) {
      $("#widgetList").toggle().css({ width: "", height: "", "min-height": "", "min-width": "" });;
    } else {
      $("#widgetList")
        .css({ width: 0, height: 0 })
        .toggle()
        .animate({ width: 300, height: 150 }, 300, "swing", function() {
          $(this).css({ width: "", height: "", "min-height": "150px", "min-width": "300px" });
        });
    }
  };

  // log message
  this.logMessage = function(msg) {
    $("#messages-list").append("<li>" + msg + "</li>");
    $("#messages-list").parent().scrollTop($("#messages-list").parent()[0].scrollHeight);
  };

  // ===== ROS panel =====
  // ----- ros nodes -----
  this.clearNodes = function() {
    $("#nodes-list tr.jsNode").remove();
  };
  this.listNodes = function(nodes) {
    for (i in nodes) {
      var nodeName = nodes[i];
      var link = html.rosNodeLink(nodeName);
      var td = html.e("td", link, { "class": "jsNodeName" });
      var tr = html.e("tr", td, { "data-node-name": nodeName, "class": "jsNode" });
      $("#nodes-list").append(tr);
    }
  };
  this.showNodeDetails = function(nodeName, nodeDetails) {
    var content = render.nodeDetails(nodeName, nodeDetails);
    $("#details").html(content).show();
  };

  // ----- ros topics -----
  this.clearTopics = function() {
    $("#topics-list tr.jsTopic").remove();
  };
  this.listTopics = function(topics) {
    for (i in topics) {
      var topicName = topics[i];
      var link = html.rosTopicLink(topicName);
      var td = html.e("td", link, { "class": "jsTopicName" });
      var tr = html.e("tr", td, { "data-topic-name": topicName, "class": "jsTopic" });
      $("#topics-list").append(tr);
    }
  };
  this.showTopicDetails = function(topicName, topicType, messageDetails) {
    var details = this.showTopicDetailsMessage(messageDetails, "", topicType);
    var content = render.topicDetails(topicName, topicType, details);
    $("#details").html(content);
  };
  this.showTopicDetailsBasic = function(topicName, topicType) {
    $(".rosDetails").hide();
    $("#topicDetails").show();
    $("#topicDetails p.name span").html(topicName);
    $("#topicDetails p.type span").html(topicType);
  };
  this.showTopicDetailsMessage = function(messageDetails, parentId, parentType) {
    var listItems = "";
    var item = "";
    for (var i = 0; i < messageDetails.length; i++) {
      var md = messageDetails[i];
      if (md.type === parentType) {
        for (var j = 0; j < md.fieldnames.length; j++) {
          var fieldName = md.fieldnames[j];
          var fieldType = (md.fieldarraylen[j] > -1) ? md.fieldtypes[j] + " [ ]" : md.fieldtypes[j];
          var fieldId = parentId === "" ? fieldName : parentId + "." + fieldName;
          listItems += render.topicField(fieldId, fieldName, fieldType, "");
          if (md.fieldarraylen[j] > -1) {
            item = render.topicList(fieldId);
          } else {
            item = this.showTopicDetailsMessage(messageDetails, fieldId, fieldType);
          }
          listItems += item;
        }
        return html.e("ul", listItems, {});
      }
    }
    return "";
  };
  this.getTopicFieldType = function(messageDetails, fieldName) {
    var md;
    for (var i = 0; i < messageDetails.length; i++) {
      md = messageDetails[i];
      for (var j = 0; j < md.fieldnames.length; j++) {
        if (md.fieldnames[j] === fieldName) return md.fieldtypes[j];
      }
    }
    return "";
  };
  this.showTopicMessage = function(messageDetails, message, fieldId, fieldName) {
    $(".messageDetails ul[data-list='1']").html("");
    switch (typeof (message)) {
      case "object":
        var childId = "";
        var childName = "";
        var childType = "";
        var element = "";
        if (Array.isArray(message)) {
          $("ul[data-id='" + fieldId + "']").html("");
        }
        for (i in message) {
          childId = (fieldId === "") ? i : fieldId + "." + i;
          childName = (fieldName === "") ? i : fieldName + "." + i;
          if (Array.isArray(message)) {
            var fieldType = self.getTopicFieldType(messageDetails, fieldName);
            var item = $("li[data-id='" + childId + "']");
            var value = message[i];
            element = render.topicField(childId, childName, fieldType, message[i]);
            $("ul[data-id='" + fieldId + "']").append(element);
          } else {
            self.showTopicMessage(messageDetails, message[i], childId, i);
          }
        }
        break;
      default:
        $("li[data-id='" + fieldId + "'] span.messageFieldValue").html(message);
        break;
    }
  };

  // ----- ros services -----
  this.clearServices = function() {
    $("#services-list tr.jsService").remove();
  };
  this.listServices = function(services) {
    for (i in services) {
      var serviceName = services[i];
      var classStr = "jsService";
      if (serviceName.indexOf("/rosapi/") > -1) classStr += " jsRosapiService";
      if (serviceName.indexOf("/rosbridge_websocket/") > -1) classStr += " jsRosbridgeWebsocketService";
      if (serviceName.indexOf("/rosout/") > -1) classStr += " jsRosoutService";
      var link = html.rosServiceLink(serviceName);
      var td = html.e("td", link, { "class": "jsServiceName" });
      var tr = html.e("tr", td, { "data-service-name": serviceName, "class": classStr });
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

    this.showServiceDetailsRequest(requestDetails, serviceType);

    this.showServiceDetailsResponse(responseDetails, serviceType);
  };
  this.showServiceDetailsRequest = function(requestDetails, serviceType) {
    var content = this.showTopicDetailsMessage(requestDetails.typedefs, "", serviceType + "Request");
    $("#serviceDetails div.request ul").remove();
    $("#serviceDetails div.request").append(content);
  }
  this.showServiceDetailsResponse = function(responseDetails, serviceType) {
    var content = this.showTopicDetailsMessage(responseDetails.typedefs, "", serviceType + "Response");
    $("#serviceDetails div.response ul").remove();
    $("#serviceDetails div.response").append(content);
  }

  // ----- ros params -----
  this.clearParams = function() {
    $("#params-list tr.jsParam").remove();
  };
  this.listParams = function(params) {
    for (i in params) {
      var paramName = params[i];
      var classStr = "jsParam";
      if (paramName.indexOf("/rosapi/") > -1) classStr += " jsRosapiParam";
      if (paramName.indexOf("/rosbridge_websocket/") > -1) classStr += " jsRosbridgeWebsocketParam";
      if (paramName.indexOf("/rosout/") > -1) classStr += " jsRosoutParam";
      var link = html.rosParamLink(paramName);
      var td = html.e("td", link, { "class": "jsParamName" });
      var tr = html.e("tr", td, { "data-param-name": paramName, "class": classStr });
      $("#params-list").append(tr);
    }
  };
  this.showParamDetails = function(paramName, paramValue) {
    var content = render.paramDetails(paramName, paramValue);
    $("#details").html(content).show();
    
    
    $("#paramDetails #hdnParamName").val(paramName);
    $("#paramDetails p.name span").html(paramName);
    paramValue = typeof (paramValue) === "boolean" ? (paramValue ? "True" : "False") : paramValue;
    $("#paramDetails p.type span").html(paramValue);
  };

  // ===== WIDGETS Methods =====
  // ----- Private methods -----
  var widgetOpenMenu = function(widgetId, widgetName) {
    var link = html.e("a", widgetName, { href: "#", "data-id": widgetId, "class": "jsWidgetShow" });
    var closeLink = html.e("a", "x", { href: "#", "class": "close jsWidgetClose", "data-id": widgetId });
    var item = html.e("li", link + closeLink, { "data-id": widgetId });
    $("#contentMenu > ul").append(item);
  };
  var widgetOpenContent = function(widgetId, widgetName) {
    var content = render.widgetContent(widgetId);
    $("#contentMain").append(content);
  };
  // ----- Public methods -----
  this.widgetOpen = function(widgetId, widgetName) {
    // interface
    widgetOpenMenu(widgetId, widgetName);
    widgetOpenContent(widgetId, widgetName);
    this.widgetShow(widgetId);
  };
  this.widgetShow = function(widgetId) {
    $("#contentMenu a.jsWidgetShow").removeClass("selectedWidget");
    $("#contentMenu a.jsWidgetShow[data-id=" + widgetId + "]").addClass("selectedWidget");

    $("#contentMain div.widgetContent").hide();
    $("#contentMain div[data-widget-id=" + widgetId + "]").show();
  }
  this.widgetClose = function(widgetId) {
    // interface
    $("#contentMenu ul li[data-id=" + widgetId + "]").remove();
    $("#contentMain div.widgetContent[data-widget-id=" + widgetId + "]").remove();
  }

}