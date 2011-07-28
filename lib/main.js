const tabs = require("tabs"),
      {Cc, Ci} = require('chrome'),
      eTLDSvc = Cc["@mozilla.org/network/effective-tld-service;1"].
                  getService(Ci.nsIEffectiveTLDService),
      ioSvc = Cc["@mozilla.org/network/io-service;1"].
                  getService(Ci.nsIIOService);

tabs.on('ready', function(tab) {
  try {
    if ("google.com" == eTLDSvc.getBaseDomain(ioSvc.newURI(tab.url,null,null))) {
      tab.attach({
        contentScript: 'var nav = document.getElementById("gb") || document.querySelector(\'[role="navigation"]\') || document.getElementById("mngb") || document.querySelector(".google-one-wrapper"); \n' +
                       'if (nav) { \n' +
                       'var style = window.getComputedStyle(nav,null); \n' +
                       'var height =  style.getPropertyValue("height"); \n' +
                       'window.scrollTo(window.scrollX, height.replace(/px/,"")); \n' +
                       '} \n'
      });
    }
  } catch(ignore){ /* if we couldn't get the domain it's probably not google */ }
});
