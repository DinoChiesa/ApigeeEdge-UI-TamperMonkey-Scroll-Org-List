// ==UserScript==
// @namespace   Apigee
// @name        Scroll-org-list
// @description Scroll the organization dropdown list in the Apigee Edge Administrative UI
// @match       https://edge.apigee.com/platform/*
// @match       https://enterprise.apigee.com/platform/*
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       none
// @copyright   2016 Apigee Corporation, 2019 Google LLC
// @version     0.1.1
// @run-at      document-end
// @license     Apache 2.0
// ==/UserScript==

(function (globalScope){
  var orgDropDiv;
  var delayAfterPageLoad = 1800;
  var delayAfterElements = 1000;

  // This kicks off the page fixup logic
  setTimeout(function() {
    waitForKeyElements ("#organizationSelector ul.dropdown-menu", function() {
      setTimeout(tryFixup, delayAfterElements);
    });
  }, delayAfterPageLoad);

  function mylog(){
    Function.prototype.apply.apply(console.log, [console, arguments]);
  }

  // ====================================================================

  function getElementsByTagAndClass(root, tag, clazz) {
    var nodes = root.getElementsByClassName(clazz);
    if (tag) {
      var tagUpper = tag.toUpperCase();
      nodes = Array.prototype.filter.call(nodes, function(testElement){
        return testElement.nodeName.toUpperCase() === tagUpper;
      });
    }
    return nodes;
  }

  function getDropdownDiv(){
    if ( ! orgDropDiv) {
      orgDropDiv = document.getElementById('organizationSelector');
    }
    return orgDropDiv;
  }

  function getOrgList(cb, retry) {
    var orgdiv = getDropdownDiv();
    if (orgdiv) {
      let items = getElementsByTagAndClass(orgdiv, 'ul', 'dropdown-menu');
      if (items && items[0]) {
        cb(items[0]);
      }
      else if (retry) {
        setTimeout(retry, 1000);
      }
    }
  }

  function changeHeight(ul){
      ul.setAttribute("style", "max-height:500px;overflow:hidden; overflow-y:scroll;");
  }

  function tryFixup() {
    mylog('fixup running - this is an Apigee page: ' + window.location.href);
    getOrgList(changeHeight, tryFixup);
  }

}(this));
