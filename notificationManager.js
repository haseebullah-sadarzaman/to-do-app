// notificationManager.js
// Handle reminder notifications

export const NotificationManager = {
    // Request notification permission
    requestPermission() {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                return Promise.resolve();
            } else if (Notification.permission !== 'denied') {
                return Notification.requestPermission();
            }
        }
        return Promise.resolve();
    },

    // Show notification
    showNotification(title, options = {}) {
        if ('Notification' in window && Notification.permission === 'granted') {
            return new Notification(title, {
                icon: '📋',
                badge: '✓',
                ...options
            });
        }
    },

    // Schedule reminder notification
    scheduleReminder(taskId, taskText, reminderDate) {
        if (!reminderDate) return;

        const now = new Date();
        const reminderTime = new Date(reminderDate);
        const timeDiff = reminderTime - now;

        if (timeDiff > 0) {
            setTimeout(() => {
                this.showNotification('Task Reminder ⏰', {
                    body: taskText,
                    tag: `reminder-${taskId}`,
                    requireInteraction: true
                });
            }, timeDiff);
        }
    }
};
