// ==UserScript==
// @name         FLS Comment Checker
// @namespace    http://tampermonkey.net/
// @version      1.94
// @description  Credits to curtwagner who wrote and maintained the original script, and to Goodguygregg for bringing it back to life.
// @author       Polanski
// @match        https://www.empornium.*/torrents.php*allcomments
// @include      https://www.empornium.*/requests.php*allcomments
// @include      https://www.empornium.*/forum/recent*
// @downloadURL  https://github.com/PolanskiEMP/FLS-checker-for-EMP/raw/dev/Main_UserScript.user.js //
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_openInTab
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @resource     mainMenuStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/main-menu/main-menu-style.css
// @resource     mainMenuHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/main-menu/main-menu-html.html
// @resource     addedPostButtonsHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/added-post-buttons/added-post-buttons-html.html
// @resource     addedPostButtonsStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/added-post-buttons/added-post-buttons-style.css
// @resource     progressBarHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/progress-bar/progress-bar-html.html
// @resource     progressBarStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/progress-bar/progress-bar-style.css
// @resource     modalHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/modal/modal-html.html
// @resource     modalSettingsHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/modal/modal-settings-html.html
// @resource     modalStyle https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/modal/modal-style.css
// @resource     sandboxHtml https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/sandbox/sandbox-html.html
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/gm-lib.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/sandbox/sandbox.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/modal/modal.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/progress-bar/progress-bar.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/added-post-buttons/added-post-buttons.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/post-scanner.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/main-menu/main-menu.js
// @require      https://raw.githubusercontent.com/PolanskiEMP/FLS-checker-for-EMP/dev/main.js
// ==/UserScript==
// "use strict";