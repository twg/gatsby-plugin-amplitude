"use strict";

exports.onClientEntry = function (options, pluginOptions) {
  var _pluginOptions$apiKey = pluginOptions.apiKey,
    apiKey = _pluginOptions$apiKey === undefined ? "" : _pluginOptions$apiKey,
    _pluginOptions$enable = pluginOptions.enableOnDevMode,
    enableOnDevMode =
      _pluginOptions$enable === undefined ? false : _pluginOptions$enable,
    amplitudeConfig = pluginOptions.amplitudeConfig
      ? pluginOptions.amplitudeConfig
      : {};

  var isProduction = process.env.NODE_ENV === "production";
  var isEnabled = isProduction || enableOnDevMode;

  if (!isEnabled) {
    return;
  }

  // Load the library and attach to `window.amplitude`.
  (function (e, t) {
    var n = e.amplitude || { _q: [], _iq: {} };
    var r = t.createElement("script");
    r.type = "text/javascript";
    r.async = true;
    r.src = "https://cdn.amplitude.com/libs/amplitude-4.4.0-min.gz.js";
    r.onload = function () {
      if (e.amplitude.runQueuedFunctions) {
        e.amplitude.runQueuedFunctions();
      } else {
        console.log("[Amplitude] Error: could not load SDK");
      }
    };
    var i = t.getElementsByTagName("script")[0];
    i.parentNode.insertBefore(r, i);
    function s(e, t) {
      e.prototype[t] = function () {
        this._q.push([t].concat(Array.prototype.slice.call(arguments, 0)));
        return this;
      };
    }
    var o = function o() {
      this._q = [];
      return this;
    };
    var a = ["add", "append", "clearAll", "prepend", "set", "setOnce", "unset"];
    for (var u = 0; u < a.length; u++) {
      s(o, a[u]);
    }
    n.Identify = o;
    var c = function c() {
      this._q = [];
      return this;
    };
    var l = [
      "setProductId",
      "setQuantity",
      "setPrice",
      "setRevenueType",
      "setEventProperties",
    ];
    for (var p = 0; p < l.length; p++) {
      s(c, l[p]);
    }
    n.Revenue = c;
    var d = [
      "init",
      "logEvent",
      "logRevenue",
      "setUserId",
      "setUserProperties",
      "setOptOut",
      "setVersionName",
      "setDomain",
      "setDeviceId",
      "setGlobalUserProperties",
      "identify",
      "clearUserProperties",
      "setGroup",
      "logRevenueV2",
      "regenerateDeviceId",
      "logEventWithTimestamp",
      "logEventWithGroups",
      "setSessionId",
      "resetSessionId",
    ];
    function v(e) {
      function t(t) {
        e[t] = function () {
          e._q.push([t].concat(Array.prototype.slice.call(arguments, 0)));
        };
      }
      for (var n = 0; n < d.length; n++) {
        t(d[n]);
      }
    }
    v(n);
    n.getInstance = function (e) {
      e = (!e || e.length === 0 ? "$default_instance" : e).toLowerCase();
      if (!n._iq.hasOwnProperty(e)) {
        n._iq[e] = { _q: [] };
        v(n._iq[e]);
      }
      return n._iq[e];
    };
    e.amplitude = n;
  })(window, document);
  // Initialize the library with your `apiKey`.
  amplitude.getInstance().init(apiKey, null, amplitudeConfig);
};
