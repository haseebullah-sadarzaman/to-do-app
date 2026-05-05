// app.js
// Main application entry point

import { UI } from './ui.js';
import { EventHandlers } from './eventHandlers.js';
import { FilterManager } from './filterManager.js';
import { ThemeManager } from './themeManager.js';
import taskManager from './taskManager.js';
import { FILTERS } from './constants.js';

class App {
    init() {
        // Initialize theme manager
        ThemeManager.init();

        // Initialize UI elements
        UI.init();

        // Initialize task manager
        taskManager.init();

        // Set default filter
        FilterManager.setFilter(FILTERS.ALL);
        UI.setActiveFilter(FILTERS.ALL);

        // Initialize event handlers
        EventHandlers.init();

        // Update theme icon
        EventHandlers.updateThemeIcon();

        // Initial render
        this.refresh();
    }

    refresh() {
        const tasks = taskManager.getTasks();
        const filteredTasks = FilterManager.filterTasks(tasks);
        UI.renderTasks(filteredTasks);
        const activeCount = taskManager.getActiveTasks().length;
        UI.updateTaskCount(activeCount);
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

