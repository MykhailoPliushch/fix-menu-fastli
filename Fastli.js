(function() {
    'use strict';

    function initAccordionMenu() {
        const menu = document.querySelector('div:has(> button)') || document.querySelector('.categories, .menu, .some-class');
        if (!menu) return;

        // Проверим, не добавляли ли уже аккордеон
        if (document.getElementById("accordionToggle")) return;

        // Оборачиваем меню в контейнер
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.maxHeight = "0px";
        wrapper.style.transition = "max-height 0.4s ease";

        menu.parentNode.insertBefore(wrapper, menu);
        wrapper.appendChild(menu);

        // Создаем кнопку
        const toggleBtn = document.createElement("button");
        toggleBtn.id = "accordionToggle";
        toggleBtn.textContent = "Категории ▾";
        toggleBtn.style.display = "block";
        toggleBtn.style.width = "100%";
        toggleBtn.style.padding = "10px";
        toggleBtn.style.fontSize = "16px";
        toggleBtn.style.textAlign = "left";
        toggleBtn.style.border = "1px solid #ccc";
        toggleBtn.style.borderRadius = "6px";
        toggleBtn.style.background = "#fff";
        toggleBtn.style.cursor = "pointer";
        toggleBtn.style.marginBottom = "6px";

        wrapper.parentNode.insertBefore(toggleBtn, wrapper);

        let open = false;
        toggleBtn.addEventListener("click", () => {
            open = !open;
            if (open) {
                wrapper.style.maxHeight = menu.scrollHeight + "px";
                toggleBtn.textContent = "Категории ▴";
            } else {
                wrapper.style.maxHeight = "0px";
                toggleBtn.textContent = "Категории ▾";
            }
        });
    }

    // Ждем пока SPA подгрузит меню
    const observer = new MutationObserver(() => {
        if (document.querySelectorAll('button, a').length > 10) {
            initAccordionMenu();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();