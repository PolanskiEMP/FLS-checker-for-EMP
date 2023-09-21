console.log("added-post-buttons.js loaded...");

function loadStyle() {
    let buttonStyle = GM_getResourceText("addedPostButtonsStyle");
    GM_addStyle(buttonStyle);
};

function registerPostButtonCallbacks() {
    jQuery("body").on("click", "#added-buttons #comment-ok", function () {
        if (section.name === "requests") {
            let postIdString = jQuery(this).closest("div[id^=post]").attr("id");
            let thisVid = jQuery(this).closest("table[id^=post]").find('.youtube-iframe');  // does this even work ?
            if (thisVid.length) {
                jQuery(thisVid).attr('src', jQuery(thisVid).attr('src').replace("autoplay=1","autoplay=0"))
            };
            hidePost(postIdString);
            if (jQuery('#content .thin').children('div:visible').not('.head').length == 0) {
                jQuery(document).find('#new-undo').show();
            };
        } else {
            let postIdString = jQuery(this).closest("table[id^=post]").attr("id");
            let thisVid = jQuery(this).closest("table[id^=post]").find('.youtube-iframe');
            if (thisVid.length) {
                jQuery(thisVid).attr('src', jQuery(thisVid).attr('src').replace("autoplay=1","autoplay=0"))
            };
            hidePost(postIdString);
            if (jQuery('#content .thin').children('table:visible').length == 0) {
                jQuery(document).find('#new-undo').show();
            };
        };
    });

    jQuery("body").on("click", "#added-buttons #undo-ok", function () {
        undoHidePost();
    });

    jQuery(document).on("click", "#new-undo", function() {
        jQuery(this).hide();
        undoHidePost();
    });

    jQuery("body").on("click", "#added-buttons #quote-comment", function () {
        insertModalHtml();
        let commentHtml = undefined;
        let cloned = undefined;

        if (section.name === "requests") {
            let thisVid = jQuery(this).closest("table[id^=post]").find('.youtube-iframe');
            if (thisVid.length) {  // does this even work ?
                jQuery(thisVid).attr('src', jQuery(thisVid).attr('src').replace("autoplay=1","autoplay=0"))
            };  
            commentHtml = jQuery(this).closest("div[id^=post]").outerHTML;
            cloned = jQuery(this).closest("div[id^=post]").clone();
        } else {
            let thisVid = jQuery(this).closest("table[id^=post]").find('.youtube-iframe');
            if (thisVid.length) {
                jQuery(thisVid).attr('src', jQuery(thisVid).attr('src').replace("autoplay=1","autoplay=0"))
            };
            commentHtml = jQuery(this).closest("table[id^=post]").outerHTML;
            cloned = jQuery(this).closest("table[id^=post]").clone();
        };
                
        cloned.find(".smallhead").hide();
        cloned.find(".avatar").hide();
        cloned.find(".sig").hide();
        commentHtml = cloned[0].outerHTML;
        setModalContent(commentHtml);

        jQuery(".quote-comment-modal").show();
        jQuery("#comment-text-area").focus();
        document.getElementById('comment-text-area').scrollIntoView();
    });
};

function addButtonsToPosts() {
    let buttonsHtml = GM_getResourceText("addedPostButtonsHtml");

    if (section.name === "requests") {
        jQuery("div[id^=post]").each(function () {
            jQuery(this).find(".smallhead").find("td").append(buttonsHtml);
        });
    } else {
        jQuery("table[id^=post]").each(function () {
            jQuery(this).find(".smallhead").find("td").append(buttonsHtml);
        });
    };

    registerPostButtonCallbacks();
};

loadStyle();