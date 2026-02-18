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