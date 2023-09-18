console.log("sandbox.js loaded!");

function addSandbox(){
    let sandboxHtml = GM_getResourceText("sandboxHtml");
    jQuery("#content").append(sandboxHtml);
}