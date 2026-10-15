// Visitor analytics. Fill in one or both IDs below to turn tracking on.
(function () {
    var CONFIG = {
        GA4_ID: "",        // Google Analytics 4, e.g. "G-XXXXXXXXXX"
        GOATCOUNTER: ""    // GoatCounter site code, e.g. "actbee" -> actbee.goatcounter.com
    };

    var host = location.hostname;
    var isLocal = !host || host === "localhost" || host === "127.0.0.1" || location.protocol === "file:";
    var optedOut = navigator.doNotTrack === "1" || navigator.globalPrivacyControl === true;

    window.track = function () {};
    if (isLocal || optedOut) return;

    var sendGA = function () {};
    var sendGC = function () {};

    if (CONFIG.GA4_ID) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); };
        gtag("js", new Date());
        gtag("config", CONFIG.GA4_ID);

        var ga = document.createElement("script");
        ga.async = true;
        ga.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CONFIG.GA4_ID);
        document.head.appendChild(ga);

        sendGA = function (name, params) { gtag("event", name, params); };
    }

    if (CONFIG.GOATCOUNTER) {
        var gc = document.createElement("script");
        gc.async = true;
        gc.src = "https://gc.zgo.at/count.js";
        gc.dataset.goatcounter = "https://" + CONFIG.GOATCOUNTER + ".goatcounter.com/count";
        document.head.appendChild(gc);

        sendGC = function (name, params) {
            if (!window.goatcounter || !window.goatcounter.count) return;
            var detail = Object.keys(params || {}).map(function (k) { return params[k]; }).join(" / ");
            window.goatcounter.count({ path: "event/" + name, title: name + (detail ? ": " + detail : ""), event: true });
        };
    }

    window.track = function (name, params) {
        params = params || {};
        sendGA(name, params);
        sendGC(name, params);
    };

    // Delegated listeners so page scripts need no changes.
    document.addEventListener("click", function (e) {
        var t = e.target;
        if (!t || !t.closest) return;

        var link = t.closest("a[href]");
        if (link) {
            if (link.protocol === "mailto:") {
                track("contact_click", { method: "email" });
            } else if (link.host && link.host !== location.host) {
                track("outbound_click", { url: link.href });
            }
        }

        var art = t.closest(".artwork-item");
        if (art) {
            var al = art.querySelector(".artwork-label");
            track("artwork_open", { series: al ? al.textContent.trim() : "" });
        }

        var proj = t.closest(".project-item");
        if (proj) {
            var pl = proj.querySelector(".project-label");
            track("project_open", { project: pl ? pl.textContent.trim() : "" });
        }

        var lang = t.closest(".language-switcher button[data-language]");
        if (lang) track("language_switch", { lang: lang.dataset.language });

        var post = t.closest("#posts-list a");
        if (post) track("blog_post_open", { post: post.textContent.trim() });
    }, true);

    var depths = { 50: false, 90: false };
    window.addEventListener("scroll", function () {
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        if (max < 200) return;
        var pct = (window.scrollY / max) * 100;
        [50, 90].forEach(function (d) {
            if (!depths[d] && pct >= d) {
                depths[d] = true;
                track("scroll_depth", { percent: d, page: location.pathname });
            }
        });
    }, { passive: true });
})();
