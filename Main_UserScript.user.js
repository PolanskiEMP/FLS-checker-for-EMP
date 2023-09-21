// ==UserScript==
// @name         FLS Comment Checker
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  Credits to curtwagner who wrote and maintained the original script, and to Goodguygregg for bringing it back to life.
// @author       Polanski
// @include      https://www.empornium.*/torrents.php*allcomments
// @include      https://www.empornium.*/requests.php*allcomments
// @include      https://www.empornium.*/forum/recent*
// @include      https://www.empornium.*/collage/recent*
// @downloadURL  https://github.com/PolanskiEMP/FLS-checker-for-EMP/raw/main/Main_UserScript.user.js
// @updateURL    https://github.com/PolanskiEMP/FLS-checker-for-EMP/raw/main/Main_UserScript.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     mainMenuStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/main-menu/main-menu-style.css
// @resource     mainMenuHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/main-menu/main-menu-html.html
// @resource     addedPostButtonsHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/added-post-buttons/added-post-buttons-html.html
// @resource     addedPostButtonsStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/added-post-buttons/added-post-buttons-style.css
// @resource     progressBarHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/progress-bar/progress-bar-html.html
// @resource     progressBarStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/progress-bar/progress-bar-style.css
// @resource     modalHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/modal/modal-html.html
// @resource     modalSettingsHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/modal/modal-settings-html.html
// @resource     modalStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/modal/modal-style.css
// @resource     sandboxHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/sandbox/sandbox-html.html
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/gm-lib.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/sandbox/sandbox.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/modal/modal.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/progress-bar/progress-bar.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/added-post-buttons/added-post-buttons.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/post-scanner.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/main-menu/main-menu.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/main/main.js
// ==/UserScript==
// "use strict";