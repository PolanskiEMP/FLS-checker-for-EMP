console.log("progress-bar.js loaded!");

function loadProgressBarStyle(){
    let style = GM_getResourceText("progressBarStyle");
    GM_addStyle (style);
}


function insertProgressBarHtml(){
    let progressBarHtml = GM_getResourceText("progressBarHtml");
    jQuery("#content").prepend(progressBarHtml);

    // hides recent forum threads box
    if(document.URL.indexOf(forum_checker_string) >= 0){
        jQuery("body").find(".latest_threads").hide();
        jQuery("body").find(".box.pad.latest_threads").hide();
        jQuery("body").find("#forumfilterdiv.box.pad").hide()
        jQuery("body").find("a#forumfilterbutton").html("(Show)");
    }

}


function updateProgressBarValue(){
    let totalValue = -1;
    let currentValue = -1;
    if((document.URL.indexOf(collage_checker_string) >= 0) || (document.URL.indexOf(forum_checker_string) >= 0) || (document.URL.indexOf(torrent_checker_string) >= 0)){
        totalValue = jQuery("table[id^=post]").length;
        currentValue = jQuery("table[id^=post]").filter(":hidden").length;
    } else {
        totalValue = jQuery("div[id^=post]").length;
        currentValue = jQuery("div[id^=post]").filter(":hidden").length;
    }
    let value = ((currentValue / totalValue) * 100) + "%";
    jQuery("#progress-bar").css("width",value)
    jQuery("#progress-bar-lable").html(currentValue + " Out Of " + totalValue);

}


loadProgressBarStyle();
