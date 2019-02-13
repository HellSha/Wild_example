/*eslint no-console: 0, no-unused-vars: 0*/
"use strict";

var xsjs  = require("@sap/xsjs");
var xsenv = require("@sap/xsenv");
var port  = process.env.PORT || 3000;

var options = {
    //Only for the 3-4HW. For the 5-6HW to commit 10th string 
  	anonymous : true, 
    redirectUrl : "/node/index.xsjs"
};

//options = xsjs.extend(options, xsenv.getServices({ uaa: {tag: "xsuaa"} }));

// configure HANA
try {
    options = Object.assign(options, xsenv.getServices({ hana: {tag: "hana"} }));
} catch (err) {
    console.log("[ERROR]", err.message);
}

// configure UAA.  Our uaa is pt_uaa. UNCOMMIT FOR TH E5-6 HW.
/*
try {
    options = Object.assign(options, xsenv.getServices({ uaa: "pt_uaa" }));
} catch (err) {
    console.log("[ERROR]", err.message);
}
*/

// start server
xsjs(options).listen(port);

console.log("Server listening on port %d", port);