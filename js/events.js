GS.Events = function() {

  // ===== Private variables =====

  // "this"
  var self = this;
  var interface = new GS.Interface();
  this.topicListener = null;
  this.messageDetails = null;


  // ===== Private functions =====

  // Util functions
  this.cancelSubscription = function() {
    if (self.topicListener !== null) {
      self.topicListener.unsubscribe();
      $("#btnSubscribeTopic").removeAttr("disabled");
      $("#btnUnsubscribeTopic").attr("disabled", "disabled");
    }
  };


  // ===== Public functions =====

  // Declare triggers
  this.declareTriggers = function() {
    // network events
    // --------------
    ros.on('connection', this.rosOnConnection);
    ros.on('error', this.rosOnError);
    ros.on('close', this.rosOnClose);

    // html events
    // -----------
    // connect
    $("#btn_server_connect").click(this.btnServerConnectClick);

    // widgets
    // -------
    $("#widgetAdd").click(this.widgetAdd);
    $(document).delegate(".jsWidgetItem", "click", this.widgetAddItem);
    $(document).delegate(".jsWidgetClose", "click", this.widgetClose);
    $(document).delegate(".jsWidgetShow", "click", this.widgetShow);

    // ros links
    // ---------
    $(document).delegate(".jsRosTopic", "click", this.linkRosTopicClick);
    $(document).delegate(".jsRosNode", "click", this.linkRosNodeClick);
    $(document).delegate(".jsRosService", "click", this.linkRosServiceClick);
    $(document).delegate(".jsRosParam", "click", this.linkRosParamClick);

    // ros buttons
    // -----------
    $(document).delegate("#btnSetParam", "click", this.btnSetParam);
    $(document).delegate("#btnCallService", "click", this.btnCallService);
    $(document).delegate("#btnRefreshService", "click", this.btnRefreshService);
    $(document).delegate("#btnSubscribeTopic", "click", this.btnSubscribeTopic);
    $(document).delegate("#btnUnsubscribeTopic", "click", this.btnUnsubscribeTopic);

    // ROS WIDGETS selected topic
    // --------------------------
    $(document).delegate(".jsWidgetSelectTopic", "change", this.rosWidgetSelectedTopic);
  };

  // Parse functions
  this.parse = function(type, value) {
    if (type === "float32" || type === "float64") {
      return parseFloat(value);
    } else if (type === "int8" || type === "int16" || type === "int32" || type === "int64") {
      return parseInt(value);
    } else if (type === "uint8" || type === "uint16" || type === "uint32" || type === "uint64") {
      return parseInt(value);
    } else {
      return value;
    }
  };
  this.keepType = function(value) {
    return isNaN(value) ? value : parseInt(value);
  };

  // Server Connect Button Click
  this.btnServerConnectClick = function() {
    var server_address = $("#txt_ros_server_address").val();
    $(this).attr("disabled", "disabled");
    if (!ros.isConnected) {
      ros.connect(server_address);
    } else {
      ros.close();
    }
  };

  // Widget Add
  this.widgetAdd = function(e) {
    interface.widgetToggleList();
    e.preventDefault();
  };
  this.widgetAddItem = function(e) {
    var widgetName = $(this).attr("data-name");
    widgets.open(widgetName);
    self.widgetAdd(e);
    e.preventDefault();
  };
  this.widgetClose = function(e) {
    var widgetId = $(this).attr("data-id");
    widgets.close(widgetId);
    e.preventDefault();
  };
  this.widgetShow = function(e) {
    var widgetId = $(this).attr("data-id");
    widgets.show(widgetId);
    e.preventDefault();
  };

  // ROS Links
  this.linkRosNodeClick = function(e) {
    self.cancelSubscription();
    var nodeName = $(this).attr("data-node-name");
    ros.getNodeDetails(nodeName, function(nodeDetails) {
      interface.showNodeDetails(nodeName, nodeDetails);
    });
    e.preventDefault();
  };
  this.linkRosTopicClick = function(e) {
    self.cancelSubscription();
    var topicName = $(this).attr("data-topic-name");
    ros.getTopicType(topicName, function(topicType) {
      ros.getMessageDetails(topicType, function(messageDetails) {
        self.messageDetails = messageDetails;
        interface.showTopicDetails(topicName, topicType, messageDetails);
      });
    });
    e.preventDefault();
  };
  this.linkRosServiceClick = function(e) {
    self.cancelSubscription();
    var serviceName = $(this).attr("data-service-name");
    ros.getServiceType(serviceName, function(serviceType) {
      ros.getServiceRequestDetails(serviceType, function(requestDetails) {
        ros.getServiceResponseDetails(serviceType, function(responseDetails) {
          interface.showServiceDetails(serviceName, serviceType, requestDetails, responseDetails);
        });
      });
    });
    e.preventDefault();
  };
  this.linkRosParamClick = function(e) {
    self.cancelSubscription();
    var paramName = $(this).attr("data-param-name");
    var param = new ROSLIB.Param({
      ros: ros,
      name: paramName
    });
    param.get(function(value) {
      interface.showParamDetails(paramName, value);
    });
    e.preventDefault();
  };

  // ROS Buttons
  this.btnSubscribeTopic = function(e) {
    self.cancelSubscription();

    var topicName = $("#hdnTopicName").val();
    var topicType = $("#hdnTopicType").val();

    self.topicListener = new ROSLIB.Topic({
      ros: ros,
      name: topicName,
      messageType: topicType
    });

    self.topicListener.subscribe(self.rosSubscriptionCallback);
    
    $("#btnSubscribeTopic").attr("disabled", "disabled");
    $("#btnUnsubscribeTopic").removeAttr("disabled");
  };
  this.btnUnsubscribeTopic = function(e) {
    self.cancelSubscription();
  };
  this.btnCallService = function(e) {
    var serviceName = $("#hdnServiceName").val();
    var serviceType = $("#hdnServiceType").val();

    var service = new ROSLIB.Service({
      ros: ros,
      name: serviceName,
      serviceType: serviceType
    });

    var requestObj = {};
    var elements = document.querySelectorAll("input.jsInputServiceRequest");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var type = element.getAttribute("data-type");
      var field = element.getAttribute("data-name");
      var value = element.value;
      requestObj[field] = self.parse(type, value);
    }
    var request = new ROSLIB.ServiceRequest(requestObj);

    $("#btnCallService").attr("disabled", "disabled");
    service.callService(requestObj, function(result) {
      $("#btnCallService").removeAttr("disabled");
    }, function(error) {
      $("#btnCallService").removeAttr("disabled");
    });

    e.preventDefault();
  };
  this.btnRefreshService = function(e) {
    $("input.jsInputServiceRequest").val("");
    e.preventDefault();
  };
  this.btnSetParam = function(e) {
    var paramName = $("#hdnParamName").val();
    var value = $("#txtSetParam").val();
    var param = new ROSLIB.Param({
      ros: ros,
      name: paramName
    });
    param.set(self.keepType(value));
    param.get(function(value) {
      interface.showParamDetails(paramName, value);
      $("#txtSetParam").val("");
    });
    e.preventDefault();
  };

  // ROS Subscription callback
  this.rosSubscriptionCallback = function(message) {
    interface.showTopicMessage(self.messageDetails, message, "", "");
  };

  // ROS WIDGETS selected topic
  this.rosWidgetSelectedTopic = function(e) {
    var widgetId = parseInt($(this).attr("data-widget-id"));
    var topicName = $(this).children("option:selected").val();
    var messageType = $(this).attr("data-message-type");
    var callbackFunctionName = $(this).attr("data-callback-function");
    var listener = new ROSLIB.Topic({
      ros: ros,
      name: topicName,
      messageType: messageType
    });
    var subscriber = {
      widgetId: widgetId,
      callbackFunctionName: callbackFunctionName,
      listener: listener
    }
    listener.subscribe(widgets.getWidget(widgetId)[callbackFunctionName]);
    widgets.subscribers.push(subscriber);
  };

  // ROS events
  this.rosOnConnection = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connected to websocket server.');
    $("#btn_server_connect").removeAttr("disabled");
  };
  this.rosOnError = function(error) {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Error connecting to websocket server: ' + error);
    $("#btn_server_connect").removeAttr("disabled");
  };
  this.rosOnClose = function() {
    interface.rosConnect(ros.isConnected);
    interface.logMessage('Connection to websocket server closed.');
    $("#btn_server_connect").removeAttr("disabled");
  };

  // ROS Routines
  var prevData = { nodes: [], topics: [], services: [], params: [] };
  var showHideRosObjects = function() {
    if ($("#ckbRosapiServiceParam").is(":checked")) {
      $(".jsRosapiService").hide();
      $(".jsRosapiParam").hide();
    } else {
      $(".jsRosapiService").show();
      $(".jsRosapiParam").show();
    }

    if ($("#ckbRosoutServiceParam").is(":checked")) {
      $(".jsRosoutService").hide();
      $(".jsRosoutParam").hide();
    } else {
      $(".jsRosoutService").show();
      $(".jsRosoutParam").show();
    }

    if ($("#ckbRosbridgeWebsocketServiceParam").is(":checked")) {
      $(".jsRosbridgeWebsocketService").hide();
      $(".jsRosbridgeWebsocketParam").hide();
    } else {
      $(".jsRosbridgeWebsocketService").show();
      $(".jsRosbridgeWebsocketParam").show();
    }
  }
  var rosGetNodes = function() {
    if (ros.isConnected) {
      ros.getNodes(function(nodes) {
        nodes.sort();
        if (!compareArrays(prevData.nodes, nodes)) {
          interface.logMessage("nodes refreshed");
          interface.clearNodes();
          interface.listNodes(nodes);
        }
        prevData.nodes = nodes;
      });
    } else {
      interface.clearNodes();
    }
  };
  var rosGetTopics = function() {
    if (ros.isConnected) {
      ros.getTopics(function(topics) {
        topics.sort();
        if (!compareArrays(prevData.topics, topics)) {
          interface.logMessage("topics refreshed");
          interface.clearTopics();
          interface.listTopics(topics);
        }
        prevData.topics = topics;
      });
    } else {
      interface.clearTopics();
    }
  };
  var rosGetServices = function() {
    if (ros.isConnected) {
      ros.getServices(function(services) {
        services.sort();
        if (!compareArrays(prevData.services, services)) {
          interface.logMessage("services refreshed");
          interface.clearServices();
          interface.listServices(services);
        }
        prevData.services = services;
      });
    } else {
      interface.clearServices();
    }
  };
  var rosGetParams = function() {
    if (ros.isConnected) {
      ros.getParams(function(params) {
        params.sort();
        if (!compareArrays(prevData.params, params)) {
          interface.logMessage("params refreshed");
          interface.clearParams();
          interface.listParams(params);
        }
        prevData.params = params;
      });
    } else {
      interface.clearParams();
    }
  };
  this.routines = function() {
    if (!ros.isConnected) {
      prevData = {
        nodes: [],
        topics: [],
        services: [],
        params: []
      };
    }
    rosGetNodes();
    rosGetTopics();
    rosGetServices();
    rosGetParams();
    showHideRosObjects();
  };


};