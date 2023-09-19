function addMainMenuToDom() {
    console.log("adding main menu to DOM");

    let mainMenuStyle = GM_getResourceText("mainMenuStyle");
    GM_addStyle(mainMenuStyle);

    let mainMenuHtml = GM_getResourceText("mainMenuHtml");
    let mainMenuElement = document.createElement("div");
    mainMenuElement.setAttribute("id", "checker-script"); // sets an ID to the checker div for future styling purposes
    mainMenuElement.innerHTML = mainMenuHtml;
    document.body.appendChild(mainMenuElement);

    GM_setValue("isMainMenuOpen", true); // hacky way of setting the default value of the menu status, probably dont need a GM_value to do this at all

    setHideAvatarLabels();
    setHideBadgesLabels();
    setHideSignatureLabels();

    registerButtonsCallbacks();
}

// atempt to make the main-menu-button show/hide the menu and change button label on click
function setMainMenuOpen() {
    let isMainMenuOpen = GM_getValue("isMainMenuOpen");
    if (isMainMenuOpen) {
        jQuery("#main-menu-button").html("Open Menu");
        jQuery(".main-menu-form-popup").slideUp(450);
    } else {
        jQuery("#main-menu-button").html("Close Menu");
        jQuery(".main-menu-form-popup").slideDown(450);
    };
};

function setHideAvatarLabels() {
    let isHidingAvatars = GM_getValue("isHidingAvatars");
    if (isHidingAvatars) {
        jQuery(".main-menu-form-popup #hide-avatar-button").html("Show Avatars");
        jQuery(".avatar").slideUp(400);
    } else {
        jQuery(".main-menu-form-popup #hide-avatar-button").html("Hide Avatars");
        jQuery(".avatar").slideDown(400);
    }
}

function setHideBadgesLabels() {
    let isHidingBadges = GM_getValue("isHidingBadges");
    if (isHidingBadges) {
        jQuery(".main-menu-form-popup #hide-badges-button").html("Show Badges");
        jQuery(".badges").slideUp(400);
    } else {
        jQuery(".main-menu-form-popup #hide-badges-button").html("Hide Badges");
        jQuery(".badges").slideDown(400);
    }
}

function setHideSignatureLabels() {
    let isHidingSignature = GM_getValue("isHidingSignature");
    if (isHidingSignature) {
        jQuery(".main-menu-form-popup #hide-signatures-button").html("Show Signatures");
        jQuery(".sig").hide();
    } else {
        jQuery(".main-menu-form-popup #hide-signatures-button").html("Hide Signatures");
        jQuery(".sig").show();
    }
}

function registerButtonsCallbacks() {
    console.log("Registering main menu buttons callbacks...");
    // shows the main menu
    if((document.URL.indexOf(collage_checker_string) >= 0) || (document.URL.indexOf(forum_checker_string) >= 0) || (document.URL.indexOf(torrent_checker_string) >= 0)){
        jQuery("body").on("click", "#main-menu-button", function () {
            let newestCommentId = -1;
            try {
                newestCommentId = parseInt(
                    jQuery("table[id^=post]").first().find(".post_id").html().replace("#", "")
                );
            } catch (error) {
                console.error(
                    `Couldn't find posts on this page... Something is very wrong... Resetting. Btw, caught this error ${error}`
                );
                clearSavedValues();
            }
            jQuery("#most-recent-comment-input").val(newestCommentId);
            jQuery(".main-menu-form-popup").slideDown(450);
        });
    } else {
        jQuery("body").on("click", "#main-menu-button", function () {
            try {
                newestCommentId = parseInt(
                    jQuery("div[id^=post]").attr("id").replace("post", "")
                );
            } catch (error) {
                console.error(
                    `Couldn't find posts on this page... Something is very wrong... Resetting. Btw, caught this error ${error}`
                );
                clearSavedValues();
            }
            jQuery("#most-recent-comment-input").val(newestCommentId);
            jQuery(".main-menu-form-popup").slideDown(450);
        });
    }

    // hides the main menu and clears saved data...
    jQuery("body").on("click", ".main-menu-form-popup #clear-data-button", function () {
        clearSavedValues();
        jQuery(".main-menu-form-popup").slideUp(450);
        jQuery("#main-menu-button").html("Open Menu");
        GM_setValue("isMainMenuOpen", true);
    });

    // shows settings modal
    jQuery("body").on("click", ".main-menu-form-popup #settings-button", function () {
        insertSettingsModalHtml();
        jQuery(".quote-comment-modal").show();
        jQuery(".main-menu-form-popup").slideDown(450);
        jQuery("#main-menu-button").html("Open Menu");
        GM_setValue("isMainMenuOpen", true);
    });

    // hide/show menu 
    jQuery("body").on("click", "#main-menu-button", function () {
        let isMainMenuOpen = GM_getValue("isMainMenuOpen");
        if (isMainMenuOpen) {
            isMainMenuOpen = !isMainMenuOpen;
        } else {
            isMainMenuOpen = !isMainMenuOpen;
        }
        GM_setValue("isMainMenuOpen", isMainMenuOpen);
        setMainMenuOpen(isMainMenuOpen);
    });

    // hide/show avatars
    jQuery("body").on("click", ".main-menu-form-popup #hide-avatar-button", function () {
        let isHidingAvatars = GM_getValue("isHidingAvatars");
        if (isHidingAvatars) {
            isHidingAvatars = !isHidingAvatars;
        } else {
            isHidingAvatars = !isHidingAvatars;
        }
        GM_setValue("isHidingAvatars", isHidingAvatars);
        setHideAvatarLabels(isHidingAvatars);
    });

    // hide/show badges
    jQuery("body").on("click", ".main-menu-form-popup #hide-badges-button", function () {
        let isHidingBadges = GM_getValue("isHidingBadges");
        if (isHidingBadges) {
            isHidingBadges = !isHidingBadges;
        } else {
            isHidingBadges = !isHidingBadges;
        }
        GM_setValue("isHidingBadges", isHidingBadges);
        setHideBadgesLabels(isHidingBadges);
    });

    // hide/show signatues
    jQuery("body").on("click", ".main-menu-form-popup #hide-signatures-button", function () {
        let isHidingSignature = GM_getValue("isHidingSignature");
        if (isHidingSignature) {
            isHidingSignature = !isHidingSignature;
        } else {
            isHidingSignature = !isHidingSignature;
        }
        GM_setValue("isHidingSignature", isHidingSignature);
        setHideSignatureLabels(isHidingSignature);
    });

    // starts comment scan
    jQuery("body").on("click", ".main-menu-form-popup #start-button", function () {
        let mostRecentComment = parseInt(jQuery("#most-recent-comment-input").val());
        let oldestComment = parseInt(jQuery("#oldest-comment-input").val());
        if (mostRecentComment == "" || oldestComment == "") {
            alert("Both fields for comment numbers must be filled");
        } else if (mostRecentComment <= oldestComment) {
            alert("Oldest comment must be a smaller number than the newest comment");
        } else {
            jQuery(".main-menu-form-popup").slideUp(450);;
            jQuery("#main-menu-button").html("Open Menu");
            GM_setValue("isMainMenuOpen", true);
            GM_setValue("mostRecentComment", mostRecentComment);
            GM_setValue("oldestComment", oldestComment);
            GM_setValue("previousPostId", mostRecentComment);
            GM_setValue("isScaning", true);
            scanPosts();
        }
    });
}

console.log("main-menu.js loaded...");