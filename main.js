console.log("main.js loaded...");

const section = GetSection();

let default_settings = {
    Page_Header: "Checking posts #{%olderPostId%} - #{%newestPostId%} ({%totalPosts%} posts)",
    Report_Header: "Checked posts {%olderPostId%} - {%newestPostId%} ({%totalPosts%} posts) :tick: \n \n[hr]",
    Report_Comment: "{%quotedPost%}\n \nComment: {%reviewerComment%}\n \n[hr]",
    Report_Footer: ""
};

var undoArray = [];

// checks if is still scanning
function scanCheck() {
    let isScaning = GM_getValue("isScaning");
    if (isScaning === undefined) {
        isScaning = false;
    };

    if (isScaning) {
        scanPosts();
    };
};

function hidePost(postIdString) {
    jQuery("#" + postIdString).hide();
    if (jQuery("#" + postIdString).prev().is("div.head")) {
        jQuery("#" + postIdString).prev().hide();
    };

    undoArray.push(postIdString);
    updateProgressBarValue();
};

function undoHidePost() {
    
    let postIdString = undoArray.pop();
    jQuery("#" + postIdString).show();
    if (jQuery("#" + postIdString).prev().is("div.head")) {
        jQuery("#" + postIdString).prev().show();
        jQuery("body").find(".post_content img.scale_image").attr("width","500");
    };

    updateProgressBarValue();
};

addMainMenuToDom();
scanCheck();