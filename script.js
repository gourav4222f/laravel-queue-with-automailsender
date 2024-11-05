// Determine the event method to use based on browser compatibility
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
// Get the event listener method
var eventer = window[eventMethod];
// Determine the message event to listen for based on the event method
var messageEvent = "attachEvent" === eventMethod ? "onmessage" : "message";

// Function to get sources based on an event
function getSources(e) {
    // Clear the source guide and load new content
    $("#source-guide").empty(), $.get("/ajax/v2/episode/sources?id=" + e, (function(e) {
        var t;
        // Hide the loading indicator and process the response
        $("#embed-loading").hide(), e && (e.htmlGuide && ($("#content-guide").removeClass("only-one"), 
        $("#source-guide").html(e.htmlGuide)), "" !== e.link) && (t = e.link, 0 <= [ 1, 4 ].indexOf(parseInt(e.server)) && (t += "&autoPlay=" + userSettings.auto_play + "&oa=" + (userSettings.play_original_audio || 0) + "&asi=" + userSettings.auto_skip_intro, 
        continueWatch) && parseInt($(".ep-item.active").data("id")) === continueWatch.episode_id && (t += "&time=" + continueWatch.time), 
        // Update the iframe source and show it
        $("#iframe-embed").attr("src", t), $("#iframe-embed").show());
    }));
}

// Listen for messages
eventer(messageEvent, (function(e) {
    var t;
    // Parse the message data
    var n = e.data || e.message;
    try {
        // Check if the message is from the megacloud channel
        "megacloud" === (n = JSON.parse(n)).channel && (
            // Handle different events from the megacloud channel
            "complete" === n.event && 1 === parseInt(userSettings.auto_next) && nextEpisode(), 
            "time" === n.event && (playerCurrentTime = n.time, playerCurrentPercent = n.percent, 
            playerDuration = n.duration), 
            "error" === n.event && 0 < (t = $(".server-item .btn.active").parent().next()).length && ($(".server-item .btn").removeClass("active"), 
            t.find(".btn").addClass("active"), getSources(t.data("id")));
        );
    } catch (e) {}
})), $(document).on("click", ".player-time", (function() {
    // Handle click on player time
    var e = $(this).data("time");
    // Scroll to the top and post a message to the iframe to seek to the specified time
    $(window).scrollTo(0, {
        duration: 200
    }), document.getElementById("iframe-embed").contentWindow.postMessage(JSON.stringify({
        event: "seek",
        time: e
    }), "*");
})), $(document).on("click", ".ep-page-item", (function() {
    // Handle click on episode page item
    $(".ep-page-item").removeClass("active"), $(".ep-page-item .ic-active").hide(), 
    $(this).addClass("active"), $(this).find(".ic-active").show(), $(".ss-list-min").hide(), 
    $(".ss-list-min").removeClass("active"), $("#episodes-page-" + $(this).data("page")).show(), 
    $("#episodes-page-" + $(this).data("page")).addClass("active"), $("#current-page").text($(this).text().trim());
})), $(document).on("click", ".ep-item", (function(e) {
    // Handle click on episode item
    e.preventDefault(), playerCurrentTime = 0, commentLoaded = !1, $("#content-comments").empty(), 
    epId = $(this).data("id"), epNumber = $(this).data("number"), initContinueWatchingLog();
    var e = $(this).next();

    // Parse sync data
    var t = JSON.parse($("#syncData").text().trim());
    // Update sync data
    t.episode = $(this).data("number"), 0 < e.length ? t.next_episode_url = t.series_url + "?ep=" + e.data("id") : t.next_episode_url = "", 
    $("#syncData").text(JSON.stringify(t)), localStorageSet("watching." + movieId, epId), 
    getCommentWidgetMovie("episode"), firstLoad && currentUrl.search ? (firstLoad = !1, 
    history.pushState({}, "", window.location.origin + window.location.pathname + currentUrl.search + "&ep=" + epId)) : history.pushState({}, "", window.location.origin + window.location.pathname + "?ep=" + epId), 
    $(".ep-item").removeClass("active"), $(this).addClass("active"), $("#cm-episode-number").text($(this).find(".ssli-order").text()), 
    $("#servers-content").html('<div class="loading-relative"><div class="loading"><div class="span1"></div><div class="span2"></div><div class="span3"></div></div></div>'), 
    $("#episode-guide").empty(), $("#iframe-embed").hide(), $("#iframe-embed").attr("src", ""), 
    $("#embed-loading").show(), $.get("/ajax/v2/episode/servers?episodeId=" + epId, (function(e) {
        var t;

        
        var n;
        e && ($("#servers-content").html(e.html), $("#content-guide").addClass("only-one"), 
        $("#episode-guide").html(e.htmlGuide), $("#embed-loading").hide(), e = localStorageGet("currentSource"), 
        (e = (t = urlGetParamByName().source) ? t : e) && 0 < $(".servers-" + e).length ? (t = localStorageGet(keyLsCurrentServer), 
        n = $(".servers-" + e + " .server-item[data-server-id=" + t + "]"), (t && 0 < n.length ? n : $(".servers-" + e + " .server-item").first()).click()) : 1 === parseInt(userSettings.enable_dub) && (0 < $(".servers-mixed").length || 0 < $(".servers-dub").length) ? 0 < $(".servers-mixed").length ? $(".servers-mixed .server-item").first().click() : 0 < $(".servers-dub").length && $(".servers-dub .server-item").first().click() : (0 < $(".servers-sub").length ? $(".servers-sub .server-item") : $(".server-item")).first().click());
    })), (0 < $(".ss-list-min").length ? (console.log($(".ss-list.active")), $(".ss-list.active")) : $(".ss-list")).scrollTo(`.ep-item[data-id=${epId}]`, {
        duration: 300
    });
})), $(document).on("click", ".server-item", (function(e) {
    // Handle click on server item
    $("#iframe-embed").hide(), $("#iframe-embed").attr("src", ""), $("#embed-loading").show(), 
    $(".server-item .btn").removeClass("active"), $(this).find(".btn").addClass("active"), 
    getSources($(this).data("id")), localStorageSet("currentSource", $(this).data("type")), 
    localStorageSet(keyLsCurrentServer, $(this).data("server-id"));
}));