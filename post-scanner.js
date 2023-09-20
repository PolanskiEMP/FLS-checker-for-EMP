function removePostsOnPage() {
    if((document.URL.indexOf(collage_checker_string) >= 0) || (document.URL.indexOf(forum_checker_string) >= 0) || (document.URL.indexOf(torrent_checker_string) >= 0)){
            jQuery("table[id^=post]").prev().remove();
            jQuery("table[id^=post]").remove();
        } else {
            jQuery("div[id^=post]").prev().remove();
            jQuery("div[id^=post]").remove();
        }
}

function clearSavedValues() {
    GM_deleteValue("mostRecentComment");
    GM_deleteValue("oldestComment");
    GM_deleteValue("storedPostsHtml");
    GM_deleteValue("isScaning");
    GM_deleteValue("previousPostId");
}

function scanPosts() {
    let mostRecentComment = GM_getValue("mostRecentComment");
    let oldestComment = GM_getValue("oldestComment");
    let storedPostsHtml = GM_getValue("storedPostsHtml");
    
    if (mostRecentComment === undefined || oldestComment === undefined) {
        console.log(
            "Both mostRecentComment and oldestComment should have been stored at this point... Something is wrong...Exiting function"
        );
        return;
    }

    if (storedPostsHtml === undefined) {
        storedPostsHtml = "";
    }

    let ans = iterateThroughPosts(mostRecentComment, oldestComment, storedPostsHtml);

    GM_setValue("storedPostsHtml", ans.storedHtml);

    removePostsOnPage();

    if (ans.isFinished) {
        console.log("Finished scanning posts...");
        jQuery(".linkbox").remove();
        insertProgressBarHtml();
        jQuery(".thin").append(ans.storedHtml);
        // refurbishes "to top" button on each post to scroll to the progress bar
        jQuery("a[href='#']").attr("href", "#progress-bar");
        // makes all post id links and reports to open in a new tab/window
        jQuery(".post_id").attr("target", "_blank");    
        jQuery("a[title='report this post to staff']").attr("target", "_blank");
        jQuery("a:contains('[Report]')").attr("target", "_blank"); // for requests

        // hide default quote button and hyphen separator
        jQuery("[title='quote this post']").hide();
        var i;
        for (i = 0; i < jQuery("tr.smallhead td span span.time").length ; i++) {
        jQuery("tr.smallhead td span span.time")[i].nextSibling.textContent = "" };

        GM_setValue("isScaning", false);
        addButtonsToPosts();
        addSandbox();
        updateProgressBarValue();
        document.getElementById('progress-bar').scrollIntoView();
        clearSavedValues();
        let pageHeader = jQuery("#content .thin h2")[0];
        jQuery(pageHeader).html(generateCheckingPageHeader(mostRecentComment, oldestComment));
        jQuery("#quickpost").val(generateReportHeader(mostRecentComment, oldestComment));
        
        // resize images
        jQuery("body").find(".post_content img.scale_image").attr("width","500");
        
        // to make youtube embeds work
        jQuery("div.youtube").on("click", function() {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("class", "youtube-iframe");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("src", "https://www.youtube-nocookie.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");
            this.innerHTML = "";
            this.appendChild(iframe);
        });

        // ask for confirmation before leaving the page while a check is in progress
        window.addEventListener("beforeunload", function (e) {
            var confMessage = "5G spreads Covid";
            (e || window.event).returnValue = confMessage;
            return confMessage;
            });

        // show "Finish report" button
        jQuery("#finish-report-button").show();
        jQuery("#finish-report-button").on("click", function() {
            finishReportPrematurely();
        });

    } else {
        setTimeout(function () {
            let next_page = jQuery(".pager_next");
            if (next_page.length != 0) {
                window.location.href = next_page[0].href;
            } else {
                console.error("Could not find next page! Re-setting!");
                clearSavedValues();
            }
        }, 1000);
    }
}

function generateCheckingPageHeader(mostRecentComment, oldestComment) {
    let numberOfComments = -1;
    if((document.URL.indexOf(collage_checker_string) >= 0) || (document.URL.indexOf(forum_checker_string) >= 0) || (document.URL.indexOf(torrent_checker_string) >= 0)){
        numberOfComments = jQuery("table[id^=post]").length;
    } else {
        numberOfComments = jQuery("div[id^=post]").length;
    }

    let headerString = default_settings.Page_Header.replace("{%olderPostId%}", oldestComment)
        .replace("{%newestPostId%}", mostRecentComment)
        .replace("{%totalPosts%}", numberOfComments);

    return headerString;
}

function generateReportHeader(mostRecentComment, oldestComment) {
    let numberOfComments = -1;
    if((document.URL.indexOf(collage_checker_string) >= 0) || (document.URL.indexOf(forum_checker_string) >= 0) || (document.URL.indexOf(torrent_checker_string) >= 0)){
        numberOfComments = jQuery("table[id^=post]").length;
    } else {
        numberOfComments = jQuery("div[id^=post]").length;
    }

    let headerString = default_settings.Report_Header.replace("{%olderPostId%}", oldestComment)
        .replace("{%newestPostId%}", mostRecentComment)
        .replace("{%totalPosts%}", numberOfComments);

    return headerString;
}

function iterateThroughPosts(mostRecentComment, oldestComment, storedPostsHtml) {
    let finished = false;
    let postId = -1;
    let previousPostId = GM_getValue("previousPostId");
    let postArray = [];
    let tempPostHtml = "";
    postArray.push(storedPostsHtml);

    //    checking if checker is torrent, collage or forum comments
    if((document.URL.indexOf(collage_checker_string) >= 0) || (document.URL.indexOf(forum_checker_string) >= 0) || (document.URL.indexOf(torrent_checker_string) >= 0)){
        jQuery("table[id^=post]").each(function () {
            postId = parseInt(jQuery(this).find(".smallhead").find(".post_id").text().replace("#", ""));
            if (postId < oldestComment) {
                finished = true;
                return false;
            } else if (postId > mostRecentComment) {
                return true;
            } else {
                if (postId < previousPostId || postId == mostRecentComment) {
                    //   re-populates posts after scanning, if there is a header then include those
                    if (jQuery("#post" + postId).prev().is("div.head")){
                        tempPostHtml = "\n" + jQuery(this).prev()[0].outerHTML + "\n" + jQuery(this)[0].outerHTML;
                        postArray.push(tempPostHtml);
                        previousPostId = postId;
                        GM_setValue("previousPostId", postId);
                    } else {
                        tempPostHtml = "\n" + jQuery(this)[0].outerHTML;
                        postArray.push(tempPostHtml);
                        previousPostId = postId;
                        GM_setValue("previousPostId", postId);
                    }
                } else {
                    console.log("Post with ID " + postId + " was ignored because it's a dupe.");
                }
            }
        });
    } else {  // requests
        jQuery("div[id^=post]").each(function () {
            postId = parseInt(jQuery(this).find(".smallhead").find(".post_id").text().replace("#", ""));
            if (postId < oldestComment) {
                finished = true;
                return false;
            } else if (postId > mostRecentComment) {
                return true;
            } else {
                if (postId < previousPostId || postId == mostRecentComment) {
                    tempPostHtml = "\n" + jQuery(this)[0].outerHTML;
                    postArray.push(tempPostHtml);
                    previousPostId = postId;
                    GM_setValue("previousPostId", postId);
                } else {
                    console.log("Comment with ID " + postId + " was ignored because it's a dupe.");
                }
            }
        });
    }
    postArray.reverse();
    storedPostsHtml = postArray.join("\n");

    return { isFinished: finished, storedHtml: storedPostsHtml };
}

function finishReportPrematurely() {
    alert("Work in progress");  // placeholder to test if the button is working
    
    /*  NEEDS DISCUSSION
    
        check if the first remaining post's id (oldest) is smaller than the greatest id of checked/hidden posts (newest)
        if false throw an error:
       
        "Your most recent checked post is "XXXXXX" and there are older posts still unchecked.
        Please go back and make sure to check everything before this post number
        and click the Finish Report button again"
       
        if true:
        modify the post report header to replace the newest post id with the greatest id of hidden posts
        hide all remaining posts */
    
};