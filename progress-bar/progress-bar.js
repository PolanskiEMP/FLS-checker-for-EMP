console.log("progress-bar.js loaded!");

function loadProgressBarStyle() {
    let style = GM_getResourceText("progressBarStyle");
    GM_addStyle (style);
};

function insertProgressBarHtml() {
    let progressBarHtml = GM_getResourceText("progressBarHtml");
    jQuery("#content").prepend(progressBarHtml);

    // hides recent forum threads box
    if (section.name === "forum") {
        jQuery("body").find(".latest_threads").hide();
        jQuery("body").find(".box.pad.latest_threads").hide();
        jQuery("body").find("#forumfilterdiv.box.pad").hide()
        jQuery("body").find("a#forumfilterbutton").html("(Show)");
    };
};

function updateProgressBarValue() {
    let totalValue = -1;
    let currentValue = -1;

    if (section.name === "requests") {
        totalValue = jQuery("div[id^=post]").length;
        currentValue = jQuery("div[id^=post]").filter(":hidden").length;
        
    } else {
        totalValue = jQuery("table[id^=post]").length;
        currentValue = jQuery("table[id^=post]").filter(":hidden").length;
    };

    let value = ((currentValue / totalValue) * 100) + "%";
    jQuery("#progress-bar").css("width",value)
    jQuery("#progress-bar-lable").html(currentValue + " Out Of " + totalValue);
};

loadProgressBarStyle();