// constants.js
// Configuration and constants for the app

export const SELECTORS = {
    taskInput: '#taskInput',
    addBtn: '#addBtn',
    taskList: '#taskList',
    clearBtn: '#clearBtn',
    taskCount: '#taskCount',
    filterBtns: '.filter-btn',
    prioritySelect: '#prioritySelect',
    reminderInput: '#reminderInput',
    themeToggle: '#themeToggle',
    taskModal: '#taskModal',
    modalClose: '.modal-close'
};

export const FILTERS = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    HIGH_PRIORITY: 'high-priority',
    TODAY: 'today'
};

export const PRIORITIES = {
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high',
    URGENT: 'urgent'
};

export const PRIORITY_COLORS = {
    low: '#4CAF50',
    normal: '#2196F3',
    high: '#FF9800',
    urgent: '#F44336'
};

export const STORAGE_KEY = 'tasks';
export const THEME_KEY = 'theme';

export const MESSAGES = {
    EMPTY_TASK: 'Please enter a task!',
    TASK_TOO_LONG: 'Task is too long! Maximum 100 characters.',
    MAX_LENGTH: 100,
    REMINDER_SET: 'Reminder set successfully!',
    INVALID_DATE: 'Please select a valid date and time.'
};

export const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};
