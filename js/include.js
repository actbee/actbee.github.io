// include.js
function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");
    elements.forEach(async (el) => {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        if (response.ok) {
            el.innerHTML = await response.text();
        } else {
            console.error(`Failed to load ${file}`);
        }
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);


// js/include.js
const LANG_KEY = "site-language";
const SUPPORTED = ["en", "zh", "ja"];
const DEFAULT_LANG = "en";

const I18N = {
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.blog": "Blog",
        "nav.project": "Project"
    },
    zh: {
        "nav.home": "主页",
        "nav.about": "关于",
        "nav.blog": "博客",
        "nav.project": "项目"
    },
    ja: {
        "nav.home": "ホーム",
        "nav.about": "自己紹介",
        "nav.blog": "ブログ",
        "nav.project": "プロジェクト"
    }
};

function applyLanguage(lang) {
    const safeLang = SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
    localStorage.setItem(LANG_KEY, safeLang);
    document.documentElement.lang = safeLang;

    // key-based translation
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        const value = I18N[safeLang]?.[key] || I18N[DEFAULT_LANG]?.[key];
        if (value) el.textContent = value;
    });

    // show/hide by language block
    document.querySelectorAll("[data-lang]").forEach((el) => {
        const langs = el.getAttribute("data-lang").split(",").map((s) => s.trim());
        el.hidden = !langs.includes(safeLang);
    });

    // active state on buttons
    document.querySelectorAll(".language-switcher button[data-language]").forEach((btn) => {
        btn.setAttribute("aria-pressed", btn.dataset.language === safeLang ? "true" : "false");
    });
}

function switchLanguage(lang) {
    applyLanguage(lang);
}
window.switchLanguage = switchLanguage;

async function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");
    await Promise.all(Array.from(elements).map(async (el) => {
        const file = el.getAttribute("data-include");
        const response = await fetch(file);
        if (response.ok) el.innerHTML = await response.text();
    }));
}

document.addEventListener("DOMContentLoaded", async () => {
    await includeHTML(); // nav is injected here
    const saved = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
    applyLanguage(saved);
});