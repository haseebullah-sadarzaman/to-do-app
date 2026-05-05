// eventHandlers.js
// Manage all event listeners

import { MESSAGES, FILTERS, PRIORITIES } from './constants.js';
import { UI } from './ui.js';
import { ThemeManager } from './themeManager.js';
import { NotificationManager } from './notificationManager.js';
import taskManager from './taskManager.js';
import { FilterManager } from './filterManager.js';

export const EventHandlers = {
    // Initialize all event listeners
    init() {
        this.handleAddTask();
        this.handleFilterButtons();
        this.handleClearCompleted();
        this.handleTaskActions();
        this.handleInputEnter();
        this.handleThemeToggle();
        this.requestNotificationPermission();
    },

    // Add task button and input enter
    handleAddTask() {
        UI.elements.addBtn.addEventListener('click', () => {
            this.addNewTask();
        });
    },

    // Handle Enter key in input
    handleInputEnter() {
        UI.elements.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addNewTask();
            }
        });
    },

    // Add new task logic with priority and reminder
    addNewTask() {
        const taskText = UI.getInputValue();
        const priority = UI.getPriorityValue();
        const reminderDate = UI.getReminderValue();

        if (!taskText) {
            UI.showAlert(MESSAGES.EMPTY_TASK);
            return;
        }

        if (taskText.length > MESSAGES.MAX_LENGTH) {
            UI.showAlert(MESSAGES.TASK_TOO_LONG);
            return;
        }

        const task = taskManager.addTask(taskText, priority, reminderDate);
        
        // Schedule reminder notification
        if (reminderDate) {
            NotificationManager.scheduleReminder(task.id, taskText, reminderDate);
        }

        UI.clearInput();
        UI.focusInput();
        UI.clearPriority();
        UI.clearReminder();
        this.refreshDisplay();
    },

    // Handle filter button clicks
    handleFilterButtons() {
        UI.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filterType = btn.dataset.filter;
                FilterManager.setFilter(filterType);
                UI.setActiveFilter(filterType);
                this.refreshDisplay();
            });
        });
    },

    // Handle clear completed button
    handleClearCompleted() {
        UI.elements.clearBtn.addEventListener('click', () => {
            if (taskManager.getCompletedTasks().length > 0) {
                if (confirm('Delete all completed tasks?')) {
                    taskManager.deleteCompleted();
                    this.refreshDisplay();
                }
            }
        });
    },

    // Handle task checkbox and delete button clicks
    handleTaskActions() {
        UI.elements.taskList.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            const taskId = parseInt(taskItem.dataset.taskId);

            if (e.target.classList.contains('task-checkbox')) {
                taskManager.toggleTask(taskId);
                taskItem.classList.toggle('completed');
                this.refreshDisplay();
            } else if (e.target.closest('.delete-btn')) {
                taskManager.deleteTask(taskId);
                taskItem.remove();
                this.refreshDisplay();
            }
        });
    },

    // Handle theme toggle
    handleThemeToggle() {
        if (UI.elements.themeToggle) {
            UI.elements.themeToggle.addEventListener('click', () => {
                ThemeManager.toggleTheme();
                this.updateThemeIcon();
            });
        }
    },

    // Update theme toggle icon
    updateThemeIcon() {
        if (UI.elements.themeToggle) {
            const isDark = ThemeManager.getTheme() === 'dark';
            UI.elements.themeToggle.textContent = isDark ? '☀️' : '🌙';
        }
    },

    // Request notification permission
    requestNotificationPermission() {
        if ('Notification' in window) {
            NotificationManager.requestPermission();
        }
    },

    // Refresh the display
    refreshDisplay() {
        const tasks = taskManager.getTasks();
        const filteredTasks = FilterManager.filterTasks(tasks);
        UI.renderTasks(filteredTasks);
        const activeCount = taskManager.getActiveTasks().length;
        UI.updateTaskCount(activeCount);
    }
};
