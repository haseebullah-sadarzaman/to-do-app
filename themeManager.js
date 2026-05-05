// themeManager.js
// Handle dark theme and light theme switching

import { THEME_KEY, THEMES } from './constants.js';

export const ThemeManager = {
    currentTheme: THEMES.LIGHT,

    // Initialize theme
    init() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        this.currentTheme = savedTheme || THEMES.LIGHT;
        this.applyTheme(this.currentTheme);
    },

    // Apply theme to document
    applyTheme(theme) {
        const htmlElement = document.documentElement;
        
        if (theme === THEMES.DARK) {
            htmlElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
        
        this.currentTheme = theme;
        localStorage.setItem(THEME_KEY, theme);
    },

    // Toggle theme
    toggleTheme() {
        const newTheme = this.currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
        this.applyTheme(newTheme);
        return newTheme;
    },

    // Get current theme
    getTheme() {
        return this.currentTheme;
    }
};
