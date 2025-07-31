document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const body = document.body;
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
            if (toggleButton) toggleButton.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
            // particles.js 颜色适配
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                window.pJSDom[0].pJS.particles.color.value = '#222222';
                window.pJSDom[0].pJS.particles.line_linked.color = '#333333';
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        } else {
            body.classList.remove('dark');
            if (toggleButton) toggleButton.textContent = '🌙';
            localStorage.setItem('theme', 'light');
            // particles.js 颜色适配
            if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
                window.pJSDom[0].pJS.particles.color.value = '#ffffff';
                window.pJSDom[0].pJS.particles.line_linked.color = '#ffffff';
                window.pJSDom[0].pJS.fn.particlesRefresh();
            }
        }
    }

    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDarkScheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('dark')) {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}); 