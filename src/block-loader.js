/*
Widget Loader
Author: Kyle Langford
*/

var widgetLoader = (function() {
  'use strict';

  var getData = function(url, callback) {
    var request = new XMLHttpRequest();

    if (typeof url !== 'string') {
      throw new Error('Invalid URL: ', url);
    } else if (typeof callback !== 'function') {
      throw new Error('Callback provided is not a function: ', callback);
    }

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        console.log('Connected');
        var json = JSON.parse(request.responseText);
        callback(json);
      } else {
        console.log('Connection has Failed');
      }
    };

    request.open('GET', url, true);
    request.send();
  };

  // Append HTML to target
  var appendHTML = function(json) {
    var data = json;
    var newDiv = document.createElement('div');
    _addAssets(data);
    newDiv.innerHTML = data.html;
    document.querySelector(data.target).appendChild(newDiv);
  };

  // Replace HTML to target
  var replaceHTML = function(json) {
    var data = json;
    _addAssets(data);
    document.querySelector(data.target).innerHTML = data.html;
  };

  // Checks to see if assets are available
  var _addAssets = function(data) {
    if (data.css) {
      _addCSS(data.css);
    }

    if (data.js) {
      _addJS(data.js);
    }
  };

  // Add CSS files to head
  var _addCSS = function(css) {
    css.forEach(function(index) {
      addCSS(index);
    });
    function addCSS(filename) {
      var head = document.getElementsByTagName('head')[0];
      var style = document.createElement('link');
      style.href = filename;
      style.type = 'text/css';
      style.rel = 'stylesheet';
      head.append(style);
    }
  };

  // Add JS files to head
  var _addJS = function(js) {
    js.forEach(function(index) {
      addScript(index);
    });
    function addScript(filename) {
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.src = filename;
      script.type = 'text/javascript';
      head.append(script);
    }
  };

  return {
    load: getData,
    append: appendHTML,
    replace: replaceHTML,
  };
})();
