// ==UserScript==
// @namespace   Apigee
// @name        Scroll-org-list
// @description Scroll the organization dropdown list in the Apigee Edge Administrative UI
// @match       https://edge.apigee.com/platform/*
// @match       https://enterprise.apigee.com/platform/*
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant       none
// @copyright   2016 Apigee Corporation
// @version     0.1.0
// @run-at      document-end
// @license     Apache 2.0
// ==/UserScript==

(function (globalScope){
  var orgDropDiv;
  var delayAfterPageLoad = 1800;

  // This kicks off the page fixup logic
  setTimeout(function() {
    waitForKeyElements ("#organizationSelector ul.dropdown-menu", function() {
      setTimeout(myFixup, delayAfterPageLoad);
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
      items = getElementsByTagAndClass(orgdiv, 'ul', 'dropdown-menu');
      if (items && items[0]) {
        cb(items[0]);
      }
      else if (retry) {
        setTimeout(retry, 1000);
      }
    }
  }

  function myFixup() {
    mylog('fixup running - this is an Apigee page: ' + window.location.href);
    getOrgList(function(ul){
      ul.setAttribute("style", "max-height:500px;overflow:hidden; overflow-y:scroll;");
    }, myFixup);
  }

}(this));
