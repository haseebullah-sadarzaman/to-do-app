// taskManager.js
// Manage task state and operations

import { Storage } from './storage.js';
import { PRIORITIES } from './constants.js';

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    // Initialize with tasks from storage
    init() {
        this.tasks = Storage.loadTasks();
    }

    // Add a new task with priority and reminder
    addTask(taskText, priority = PRIORITIES.NORMAL, reminderDate = null) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: priority,
            reminderDate: reminderDate,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(newTask);
        this.save();
        return newTask;
    }

    // Delete a task by id
    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
    }

    // Toggle task completion status
    toggleTask(id) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        this.save();
    }

    // Delete all completed tasks
    deleteCompleted() {
        this.tasks = this.tasks.filter(task => !task.completed);
        this.save();
    }

    // Update task priority
    updatePriority(id, priority) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, priority } : task
        );
        this.save();
    }

    // Update task reminder
    updateReminder(id, reminderDate) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, reminderDate } : task
        );
        this.save();
    }

    // Get all tasks
    getTasks() {
        return this.tasks;
    }

    // Get active (not completed) tasks
    getActiveTasks() {
        return this.tasks.filter(task => !task.completed);
    }

    // Get completed tasks
    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }

    // Get high priority tasks
    getHighPriorityTasks() {
        return this.tasks.filter(task => 
            !task.completed && (task.priority === PRIORITIES.HIGH || task.priority === PRIORITIES.URGENT)
        );
    }

    // Get tasks with reminders
    getTasksWithReminders() {
        return this.tasks.filter(task => task.reminderDate && !task.completed);
    }

    // Update task text
    updateTask(id, newText) {
        this.tasks = this.tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        );
        this.save();
    }

    // Save tasks to storage
    save() {
        Storage.saveTasks(this.tasks);
    }

    // Clear all tasks
    clearAll() {
        this.tasks = [];
        Storage.clearAll();
    }

    // Get task count
    getCount() {
        return {
            total: this.tasks.length,
            active: this.getActiveTasks().length,
            completed: this.getCompletedTasks().length
        };
    }

    // Get task by id
    getTask(id) {
        return this.tasks.find(task => task.id === id);
    }

    // Sort tasks by priority
    sortByPriority(tasks) {
        const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
        return [...tasks].sort((a, b) => 
            priorityOrder[a.priority] - priorityOrder[b.priority]
        );
    }
}

export default new TaskManager();
