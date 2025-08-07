const initThemeSwitch = () => {
    const toggleButton = document.getElementById('toggleTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    const setTheme = (theme) => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    };

    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDark ? 'dark' : 'light');
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
};

initThemeSwitch();