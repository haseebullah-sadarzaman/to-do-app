// ui.js
// Handle all DOM manipulation and rendering

import { SELECTORS, PRIORITIES, PRIORITY_COLORS } from './constants.js';

export const UI = {
    elements: {},

    // Initialize DOM elements
    init() {
        this.elements.taskInput = document.querySelector(SELECTORS.taskInput);
        this.elements.addBtn = document.querySelector(SELECTORS.addBtn);
        this.elements.taskList = document.querySelector(SELECTORS.taskList);
        this.elements.clearBtn = document.querySelector(SELECTORS.clearBtn);
        this.elements.taskCount = document.querySelector(SELECTORS.taskCount);
        this.elements.filterBtns = document.querySelectorAll(SELECTORS.filterBtns);
        this.elements.prioritySelect = document.querySelector(SELECTORS.prioritySelect);
        this.elements.reminderInput = document.querySelector(SELECTORS.reminderInput);
        this.elements.themeToggle = document.querySelector(SELECTORS.themeToggle);
    },

    // Render tasks in the DOM
    renderTasks(filteredTasks) {
        const taskList = this.elements.taskList;
        taskList.innerHTML = '';

        if (filteredTasks.length === 0) {
            taskList.innerHTML = '<div class="empty-state"><p>No tasks yet!</p></div>';
            return;
        }

        filteredTasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            taskList.appendChild(taskElement);
        });
    },

    // Create a task element
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''} priority-${task.priority}`;
        li.dataset.taskId = task.id;

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const leftSection = document.createElement('div');
        leftSection.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;

        const priorityBadge = document.createElement('span');
        priorityBadge.className = `priority-badge priority-${task.priority}`;
        priorityBadge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
        priorityBadge.title = `Priority: ${task.priority}`;

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        span.title = task.text;

        leftSection.appendChild(checkbox);
        leftSection.appendChild(priorityBadge);
        leftSection.appendChild(span);

        const rightSection = document.createElement('div');
        rightSection.className = 'task-right';

        // Add reminder indicator
        if (task.reminderDate) {
            const reminderIcon = document.createElement('span');
            reminderIcon.className = 'reminder-icon';
            reminderIcon.textContent = '🔔';
            reminderIcon.title = new Date(task.reminderDate).toLocaleString();
            rightSection.appendChild(reminderIcon);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete task';

        rightSection.appendChild(deleteBtn);

        taskContent.appendChild(leftSection);
        taskContent.appendChild(rightSection);

        li.appendChild(taskContent);

        return li;
    },

    // Update task count display
    updateTaskCount(activeCount) {
        const text = `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;
        this.elements.taskCount.textContent = text;
    },

    // Get input value
    getInputValue() {
        return this.elements.taskInput.value.trim();
    },

    // Clear input
    clearInput() {
        this.elements.taskInput.value = '';
    },

    // Focus input
    focusInput() {
        this.elements.taskInput.focus();
    },

    // Show alert
    showAlert(message) {
        alert(message);
    },

    // Set active filter button
    setActiveFilter(filterName) {
        this.elements.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filterName) {
                btn.classList.add('active');
            }
        });
    },

    // Get task element by ID
    getTaskElement(taskId) {
        return document.querySelector(`[data-task-id="${taskId}"]`);
    },

    // Remove task element from DOM
    removeTaskElement(taskId) {
        const element = this.getTaskElement(taskId);
        if (element) {
            element.remove();
        }
    },

    // Get priority select value
    getPriorityValue() {
        return this.elements.prioritySelect?.value || PRIORITIES.NORMAL;
    },

    // Get reminder date value
    getReminderValue() {
        return this.elements.reminderInput?.value || null;
    },

    // Set priority select value
    setPriorityValue(value) {
        if (this.elements.prioritySelect) {
            this.elements.prioritySelect.value = value;
        }
    },

    // Clear priority select
    clearPriority() {
        if (this.elements.prioritySelect) {
            this.elements.prioritySelect.value = PRIORITIES.NORMAL;
        }
    },

    // Clear reminder input
    clearReminder() {
        if (this.elements.reminderInput) {
            this.elements.reminderInput.value = '';
        }
    }
};
