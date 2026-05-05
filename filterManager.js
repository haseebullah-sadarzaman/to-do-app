// filterManager.js
// Handle filtering logic

import { FILTERS, PRIORITIES } from './constants.js';

export const FilterManager = {
    currentFilter: FILTERS.ALL,
    sortBy: 'priority', // 'priority', 'date', 'recent'

    // Set current filter
    setFilter(filter) {
        if (Object.values(FILTERS).includes(filter)) {
            this.currentFilter = filter;
        }
    },

    // Get current filter
    getFilter() {
        return this.currentFilter;
    },

    // Filter tasks based on current filter
    filterTasks(tasks) {
        let filtered = tasks;

        switch (this.currentFilter) {
            case FILTERS.ACTIVE:
                filtered = tasks.filter(task => !task.completed);
                break;
            case FILTERS.COMPLETED:
                filtered = tasks.filter(task => task.completed);
                break;
            case FILTERS.HIGH_PRIORITY:
                filtered = tasks.filter(task => 
                    !task.completed && (task.priority === PRIORITIES.HIGH || task.priority === PRIORITIES.URGENT)
                );
                break;
            case FILTERS.TODAY:
                const today = new Date().toDateString();
                filtered = tasks.filter(task => {
                    if (task.reminderDate) {
                        return !task.completed && new Date(task.reminderDate).toDateString() === today;
                    }
                    return false;
                });
                break;
            case FILTERS.ALL:
            default:
                filtered = tasks;
        }

        // Sort by priority by default
        return this.sortTasks(filtered);
    },

    // Sort tasks
    sortTasks(tasks) {
        const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
        return [...tasks].sort((a, b) => {
            // First sort by completion status
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            // Then by priority
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    },

    // Set sort method
    setSortBy(sortBy) {
        this.sortBy = sortBy;
    }
};
