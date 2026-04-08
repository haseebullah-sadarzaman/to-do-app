const taskInput = document.getElementById('taskInput');
const priorityInput = document.getElementById('priorityInput');
const datetimeInput = document.getElementById('datetimeInput');
const notifCheck = document.getElementById('notifCheck');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function requestPermission() {
    Notification.requestPermission().then(perm => {
        if (perm === 'granted') {
            document.getElementById('notifStatus').innerText = "🔔 Notifications Active";
            document.getElementById('notifStatus').style.color = "#10b981";
        }
    });
}

function renderTasks() {
    taskList.innerHTML = '';

    // Priority sorting logic (High > Medium > Low)
    const priorityMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
    
    let sortedTasks = [...tasks].sort((a, b) => {
        return priorityMap[b.priority] - priorityMap[a.priority];
    });

    const filtered = sortedTasks.filter(t => {
        if (currentFilter === 'active') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    filtered.forEach((task) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.priority} ${task.completed ? 'completed' : ''}`;
        
        const displayTime = task.datetime ? task.datetime.replace('T', ' ') : 'No schedule';

        li.innerHTML = `
            <div>
                <span style="font-weight: 600;">${task.text}</span>
                <div style="font-size: 0.75rem; color: #94a3b8; margin-top: 5px;">
                    ${displayTime} ${task.notify ? '• 🔔' : ''} • <strong>${task.priority}</strong>
                </div>
            </div>
            <div class="task-actions">
                <i class="fas fa-check" onclick="toggleTask(${tasks.indexOf(task)})"></i>
                <i class="fas fa-trash" onclick="deleteTask(${tasks.indexOf(task)})"></i>
            </div>
        `;
        taskList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        text: text,
        priority: priorityInput.value,
        datetime: datetimeInput.value, 
        notify: notifCheck.checked,
        notified: false,
        completed: false
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    datetimeInput.value = '';
    renderTasks();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

setInterval(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${year}-${month}-${day}T${hours}:${minutes}`;

    tasks.forEach(t => {
        if (t.notify && !t.notified && !t.completed && t.datetime === currentTimeStr) {
            new Notification("My Tasks", { body: `Reminder: ${t.text}` });
            t.notified = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    });
}, 30000);

function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(i) {
    tasks.splice(i, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

renderTasks();