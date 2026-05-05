# To Do App - Advanced Task Manager

## 🎯 Features

✨ **Task Management**
- Add, complete, and delete tasks
- Set task priority levels (Low, Normal, High, Urgent)
- Set reminder notifications for tasks
- Auto-save to localStorage

🎨 **UI/UX**
- Modern, clean interface with smooth animations
- Dark theme and light theme toggle
- Responsive design (works on mobile, tablet, desktop)
- Priority-based color coding with visual badges

📊 **Filtering & Sorting**
- Filter by: All, Active, High Priority, Today, Completed
- Auto-sorted by priority
- Real-time task counter

🔔 **Reminders**
- Browser notification support
- Set reminder date and time
- Pulsing indicator for tasks with reminders

## Project Structure

The app is organized into modular files for easy maintenance and feature additions:

### Core Modules

#### `constants.js`
Contains all configuration, constants, and messages used throughout the app.
- **SELECTORS**: DOM element selectors
- **FILTERS**: Filter types (all, active, completed, high-priority, today)
- **PRIORITIES**: Priority levels (low, normal, high, urgent)
- **PRIORITY_COLORS**: Color mapping for priorities
- **THEME_KEY**: Local storage theme key
- **MESSAGES**: User-facing messages and validation rules

**Use this to:**
- Change UI text/messages
- Add new filter types or priorities
- Modify validation rules
- Update DOM selectors

#### `storage.js`
Handles all localStorage operations.
- `saveTasks(tasks)`: Save tasks to localStorage
- `loadTasks()`: Load tasks from localStorage
- `clearAll()`: Clear all stored tasks

**Use this to:**
- Change storage mechanism (e.g., to backend API)
- Add encryption/compression
- Implement cloud sync

#### `taskManager.js`
Manages task state and operations. Singleton pattern.
- `addTask(text, priority, reminderDate)`: Add a new task with priority and reminder
- `deleteTask(id)`: Delete a task
- `toggleTask(id)`: Mark as complete/incomplete
- `deleteCompleted()`: Remove all completed tasks
- `updatePriority(id, priority)`: Update task priority
- `updateReminder(id, reminderDate)`: Update reminder date
- `getTasks()`, `getActiveTasks()`, `getCompletedTasks()`: Get various task lists
- `getHighPriorityTasks()`: Get urgent and high priority tasks
- `getTasksWithReminders()`: Get tasks with active reminders
- `sortByPriority(tasks)`: Sort tasks by priority
- `getCount()`: Get task statistics

**Use this to:**
- Add new task properties (categories, tags, attachments, etc.)
- Add task editing functionality
- Add task search
- Implement task history/undo

#### `filterManager.js`
Handles filtering and sorting logic.
- `setFilter(filter)`: Set current filter
- `getFilter()`: Get current filter
- `filterTasks(tasks)`: Filter and sort tasks
- `setSortBy(sortBy)`: Change sort method
- `sortTasks(tasks)`: Custom sorting

**Use this to:**
- Add new filter types (search, by category, by date range)
- Implement custom sorting (alphabetical, by date)
- Add search functionality

#### `themeManager.js` ⭐ NEW
Handles dark theme and light theme switching.
- `init()`: Initialize theme from localStorage
- `applyTheme(theme)`: Apply theme to document
- `toggleTheme()`: Switch between light and dark
- `getTheme()`: Get current theme

**Use this to:**
- Add more theme variants
- Implement theme persistence
- Add custom theme colors

#### `notificationManager.js` ⭐ NEW
Handles reminder notifications.
- `requestPermission()`: Request notification permission
- `showNotification(title, options)`: Show a notification
- `scheduleReminder(taskId, taskText, reminderDate)`: Schedule reminder

**Use this to:**
- Add sound notifications
- Add desktop notifications with images
- Implement reminder history

#### `ui.js`
Manages all DOM manipulation and rendering.
- `init()`: Initialize DOM element references
- `renderTasks(tasks)`: Render tasks in the list
- `createTaskElement(task)`: Create a task DOM element
- `updateTaskCount(count)`: Update the counter
- `getInputValue()`, `getPriorityValue()`, `getReminderValue()`: Get form values
- `clearInput()`, `clearPriority()`, `clearReminder()`: Clear form fields
- Utility methods for UI updates

**Use this to:**
- Change styling dynamically
- Add animations
- Modify task display format
- Add new UI elements (modals, popovers, etc.)

#### `eventHandlers.js`
Manages all event listeners and user interactions.
- `init()`: Initialize all event listeners
- `handleAddTask()`: Handle task addition
- `handleFilterButtons()`: Handle filter selection
- `handleClearCompleted()`: Handle clear completed tasks
- `handleTaskActions()`: Handle task interactions (toggle, delete)
- `handleThemeToggle()`: Handle theme switching
- `requestNotificationPermission()`: Request notification access
- `refreshDisplay()`: Update the display

**Use this to:**
- Add new user interactions
- Change button behavior
- Add keyboard shortcuts
- Add drag-and-drop
- Add task editing UI

#### `app.js`
Main application entry point that ties everything together.
- `init()`: Initialize the entire app
- `refresh()`: Refresh the display

**Use this to:**
- Initialize new modules
- Add startup logic
- Add global error handling

### HTML & CSS

#### `index.html`
Modern HTML structure with:
- Theme toggle button
- Priority selector dropdown
- Reminder datetime input
- Enhanced filter buttons
- Improved layout sections

#### `style.css`
Comprehensive styling with:
- CSS Variables for theming
- Dark theme support
- Priority-based color coding
- Responsive design
- Smooth animations
- Custom scrollbars
- Accessibility features

---

## How to Add New Features

### Example 1: Add Task Categories

1. **Update `constants.js`:**
   ```javascript
   export const CATEGORIES = {
       WORK: 'work',
       PERSONAL: 'personal',
       SHOPPING: 'shopping'
   };
   ```

2. **Update `taskManager.js`:**
   ```javascript
   addTask(taskText, priority = PRIORITIES.NORMAL, reminderDate = null, category = CATEGORIES.PERSONAL) {
       const newTask = {
           id: Date.now(),
           text: taskText,
           completed: false,
           priority: priority,
           reminderDate: reminderDate,
           category: category,  // Add this
           createdAt: new Date().toISOString()
       };
       // ...
   }
   ```

3. **Update `index.html`:** Add category selector
4. **Update `ui.js`:** Display category badge
5. **Update `filterManager.js`:** Add category filtering
6. **Update `style.css`:** Style category badges

### Example 2: Add Search Functionality

1. **Update `index.html`:** Add search input
2. **Update `ui.js`:** Add search input element reference
3. **Update `filterManager.js`:** Add search logic
4. **Update `eventHandlers.js`:** Handle search input
5. **Update `ui.js`:** Highlight search results

### Example 3: Add Task Editing

1. **Update `ui.js`:** Add edit button and inline editor
2. **Update `taskManager.js`:** Add updateTask method
3. **Update `eventHandlers.js`:** Handle edit button click
4. **Update `style.css`:** Style edit mode

### Example 4: Add Keyboard Shortcuts

Update `eventHandlers.js`:
```javascript
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'n') {
        UI.focusInput(); // Focus input on Ctrl+N
    }
    if (e.ctrlKey && e.key === 'k') {
        UI.elements.themeToggle.click(); // Toggle theme on Ctrl+K
    }
});
```

---

## File Dependencies

```
index.html (entry point)
    ↓
app.js (main controller)
    ├── ui.js
    │   └── constants.js
    ├── eventHandlers.js
    │   ├── taskManager.js
    │   │   └── storage.js
    │   ├── filterManager.js
    │   ├── themeManager.js
    │   ├── notificationManager.js
    │   ├── ui.js
    │   └── constants.js
    ├── filterManager.js
    ├── themeManager.js
    ├── taskManager.js
    └── constants.js

storage.js
    └── constants.js
```

---

## Browser Compatibility

- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ IE 11+ (limited support)

**Requirements:**
- ES6 modules support
- localStorage API
- CSS Variables support
- Notification API (for reminders, optional)

---

## Tips for Development

1. **Keep modules focused:** Each module should have a single responsibility
2. **Use constants:** Define magic strings/numbers in `constants.js`
3. **Test changes:** Test new features in all filter modes and themes
4. **Update related modules:** Changes to task structure require updates in multiple files
5. **Use the singleton pattern:** `taskManager` is a singleton (shared instance)
6. **CSS Variables:** Use CSS variables for consistent theming
7. **Responsive design:** Test on mobile and desktop

---

## Usage

1. Open `index.html` in a modern web browser
2. Add tasks with priority and optional reminder
3. Use filters to view different task categories
4. Toggle dark theme with the moon/sun button
5. Tasks are automatically saved to browser storage

---

## Future Enhancements

- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Due date management
- [ ] Task descriptions/notes
- [ ] Subtasks
- [ ] Task search
- [ ] Export/import tasks
- [ ] Drag and drop reordering
- [ ] Backend sync
- [ ] Collaboration features
- [ ] Task analytics

Enjoy building! 🚀
