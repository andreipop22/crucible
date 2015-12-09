"use strict";

var m = require("mithril");

require("./global.css");

m.route.mode = "pathname";
m.route(document.body, "/", {
    "/"            : require("./pages/home"),
    "/schemas"     : require("./pages/schemas"),
    "/schemas/new" : require("./pages/schemas-new"),
    "/schemas/:id" : require("./pages/schemas-edit"),
    "/content"     : require("./pages/content"),
    
    "/content/:schema/:id" : require("./pages/content-edit")
});
