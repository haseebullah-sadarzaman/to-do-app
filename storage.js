// storage.js
// Handle all localStorage operations

import { STORAGE_KEY } from './constants.js';

export const Storage = {
    // Save tasks to localStorage
    saveTasks(tasks) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    },

    // Load tasks from localStorage
    loadTasks() {
        try {
            const savedTasks = localStorage.getItem(STORAGE_KEY);
            return savedTasks ? JSON.parse(savedTasks) : [];
        } catch (error) {
            console.error('Error loading tasks:', error);
            return [];
        }
    },

    // Clear all tasks from localStorage
    clearAll() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing storage:', error);
        }
    }
};
