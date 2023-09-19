console.log("modal.js loaded");

function loadModalStyle() {
    let style = GM_getResourceText("modalStyle");
    GM_addStyle(style);
}

function insertModalHtml() {
    if (jQuery("#quoteModal").length == 0) {
        let modalHtml = GM_getResourceText("modalHtml");
        jQuery("body").append(modalHtml);
    }

    registerQuoteModalButtonsCallbacks();
}

function insertSettingsModalHtml() {
    if (jQuery("#settingsModal").length == 0) {
        let modalHtml = GM_getResourceText("modalSettingsHtml");
        jQuery("body").append(modalHtml);
    }
    fillSettingsTextAreas();
    registerSettingsModalButtonsCallback();
}

function saveSettings() {
    if (user_settings === undefined) {
        user_settings = {};
    }
    user_settings.Page_Header = jQuery(".modal-content #page-header-setting-text-area").val();

    user_settings.Report_Header = jQuery(".modal-content #report-header-setting-text-area").val();

    user_settings.Report_Comment = jQuery(".modal-content #comment-quote-setting-text-area").val();

    user_settings.Report_Footer = jQuery(".modal-content #report-footer-setting-text-area").val();

    GM_SuperValue.set("user_settings", user_settings);
}

function fillSettingsTextAreas() {
    jQuery(".modal-content #page-header-setting-text-area").val(
        user_settings === undefined ? default_settings.Page_Header : user_settings.Page_Header
    );
    jQuery(".modal-content #report-header-setting-text-area").val(
        user_settings === undefined ? default_settings.Report_Header : user_settings.Report_Header
    );
    jQuery(".modal-content #comment-quote-setting-text-area").val(
        user_settings === undefined ? default_settings.Report_Comment : user_settings.Report_Comment
    );
    jQuery(".modal-content #report-footer-setting-text-area").val(
        user_settings === undefined ? default_settings.Report_Footer : user_settings.Report_Footer
    );
}

//  reset settings to default values
function resetSettingsToDefault() {
    jQuery(".modal-content #page-header-setting-text-area").val(default_settings.Page_Header);
    jQuery(".modal-content #report-header-setting-text-area").val(default_settings.Report_Header);
    jQuery(".modal-content #comment-quote-setting-text-area").val(default_settings.Report_Comment);
    jQuery(".modal-content #report-footer-setting-text-area").val(default_settings.Report_Footer);
    user_settings = undefined;
    GM_deleteValue("user_settings", user_settings);
}

function setModalContent(htmlContent) {
    jQuery(".quote-comment-modal .modal-body").html(htmlContent);
}

function unregisterModalButtonsCallbacks() {
    jQuery("body").off("click", ".quote-comment-modal .close");
    jQuery("body").off("click", ".quote-comment-modal #Cancel-button");
    jQuery("body").off("click", ".quote-comment-modal #Ok-button");
}

function registerSettingsModalButtonsCallback() {
    jQuery("body").on("click", ".quote-comment-modal .close", function () {
        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
    });

    jQuery("body").on("click", ".quote-comment-modal #Cancel-button", function () {
        resetSettingsToDefault();
    });

    jQuery("body").on("click", ".quote-comment-modal #Ok-button", function () {
        saveSettings();
    });
}

function registerQuoteModalButtonsCallbacks() {
    jQuery("body").on("click", ".quote-comment-modal .close", function () {
        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
    });

    jQuery("body").on("click", ".quote-comment-modal #Cancel-button", function () {
        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
    });

    jQuery("body").on("click", ".quote-comment-modal #Ok-button", function () {
        let postIdJquery = "";
        let postId;
        let threadId;
        let postLink;
        let section = GetSection();
        let username = jQuery(".modal-content").find(".user_name a").html().trim(/ +$/, "");
        let checkerComment = jQuery(".modal-content #comment-text-area").val();
        let sectionChar = section.name.charAt(0);
        console.log("I see you are checking " + section.name +"!")

        if (section.name == "requests") {
            postIdJquery = jQuery(".modal-content").find("div[id^=post]");
            postId = postIdJquery.attr("id").replace("post", "");
            threadId = postIdJquery.find(".post_id").attr("href").match(/.*?id=(\d+)/)[1];
            postLink = postIdJquery.find(".forum_post .post_id").attr("href");
        } else {
            postIdJquery = jQuery(".modal-content").find(".post_id");
            postId = postIdJquery.html().replace("#","");
            threadId = postIdJquery.attr("href").match(/[0-9]\d+.*?/);
            postLink = postIdJquery.attr("href");
        }
        let sectionArea = sectionChar+threadId;
        Quote(postId, sectionArea, username, postLink, checkerComment);

        jQuery(".modal-content #comment-text-area").val("");
        hidePost("post" + postId);

        if (section.name == "requests") {

            if(jQuery('#content .thin').children('div:visible').not('.head').length == 0) {
                jQuery(document).find('#new-undo').show();
            };

        } else {

            if(jQuery('#content .thin').children('table:visible').length == 0) {
                jQuery(document).find('#new-undo').show();
            };
        }

        jQuery(".quote-comment-modal").hide();
        unregisterModalButtonsCallbacks();
        updateProgressBarValue();
    });
};

const luminance = ['forum', 'collage', 'inbox'];

function Quote(post, sectionArea, user, postLink, checkerComment) {
    let username = user;
    let postid = post;
    let place = sectionArea;
    let section = GetSection();
    var ajaxurl = section.link + "?action=get_post&section=" + section.name + "&body=1&post=" + postid;
    if (luminance.includes(section.name)) {
        ajaxurl = section.endpoint + '/' + postid + '/get?&body=1';
    }
    ajax.get(ajaxurl, function(response) {
        if (luminance.includes(section.name)) {
            var x = json.decode(response);
        } else {
            var x = response;
        }
        var params = place != '' ? ","+place+","+postid : '';                                                                 
        var s = "\n" + postLink + "\n \n" + "[quote="+username+params+"]" +  html_entity_decode(x) + "[/quote]" + "\n";
        var fullComment = "Comment: " + checkerComment + "\n \n \n [hr]";
        if ( $('#quickpost').raw().value != '')   s = "\n" + s + "\n";
        let fullQuote = s + fullComment;
        Myinsert2(fullQuote, 'quickpost');
        resize('quickpost');
    });
}

function Myinsert2(f, textID) {
    var obj = document.getElementById(textID);

    if (document.selection) {
        var str = document.selection.createRange().text;
        obj.focus();
        var sel = document.selection.createRange();
        sel.text = f;
    } else {
        var len = obj.value.length;
        var start = obj.selectionStart;
        var end = obj.selectionEnd;
        var sel = obj.value.substring(start, end);
        obj.value = obj.value.substring(0, start) + f + obj.value.substring(end, len);
        obj.selectionStart = start + f.length;
        obj.selectionEnd = start + f.length;
    }
}

loadModalStyle();