'use strict';

// State
let tasks        = [];
let currentFilter = 'all';
let searchQuery   = '';
let editingId     = null;
let dragSrcIndex  = null;

// DOM References
const $ = id => document.getElementById(id);

const DOM = {
  taskList:       $('taskList'),
  emptyState:     $('emptyState'),
  taskTitle:      $('taskTitle'),
  taskDate:       $('taskDate'),
  taskPriority:   $('taskPriority'),
  taskRecurrence: $('taskRecurrence'),
  taskNotes:      $('taskNotes'),
  addBtn:         $('addBtn'),
  addTaskDetails: $('addTaskDetails'),
  expandBtn:      $('expandBtn'),
  charCount:      $('charCount'),
  searchInput:    $('searchInput'),
  searchClear:    $('searchClear'),
  sortSelect:     $('sortSelect'),
  filterBtns:     document.querySelectorAll('.filter-btn'),
  filterTitle:    $('filterTitle'),
  filterSubtitle: $('filterSubtitle'),
  themeToggle:    $('themeToggle'),
  themeIcon:      document.querySelector('.theme-icon'),
  menuToggle:     $('menuToggle'),
  sidebar:        document.querySelector('.sidebar'),
  clearCompleted: $('clearCompleted'),
  listCount:      $('listCount'),
  totalCount:     $('totalCount'),
  pendingCount:   $('pendingCount'),
  doneCount:      $('doneCount'),
  modalOverlay:   $('modalOverlay'),
  editModal:      $('editModal'),
  editTitle:      $('editTitle'),
  editDate:       $('editDate'),
  editPriority:   $('editPriority'),
  editRecurrence: $('editRecurrence'),
  editNotes:      $('editNotes'),
  modalClose:     $('modalClose'),
  cancelEdit:     $('cancelEdit'),
  saveEdit:       $('saveEdit'),
  toast:          $('toast'),
};

// Helpers
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const today = () => new Date().toISOString().split('T')[0];

function dateStatus(dateStr) {
  if (!dateStr) return null;
  if (dateStr < today())  return 'overdue';
  if (dateStr === today()) return 'today';
  return 'upcoming';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// LocalStorage
function saveTasks() {
  localStorage.setItem('tasko_tasks', JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem('tasko_tasks');
    tasks = raw ? JSON.parse(raw) : [];
  } catch {
    tasks = [];
  }
}

function saveTheme(theme) {
  localStorage.setItem('tasko_theme', theme);
}

function loadTheme() {
  return localStorage.getItem('tasko_theme') || 'light';
}

// Toast
let toastTimer;
function showToast(msg) {
  DOM.toast.textContent = msg;
  DOM.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), 2800);
}

// Theme
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  DOM.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  saveTheme(next);
}

// Recurring Task Spawner
function spawnRecurring() {
  const t = today();
  const toAdd = [];

  tasks.forEach(task => {
    if (!task.recurrence || task.recurrence === 'none') return;
    if (!task.completed) return;
    if (task.lastSpawned === t) return;

    const due = task.dueDate;
    let shouldSpawn = false;

    if (task.recurrence === 'daily' && due <= t) shouldSpawn = true;
    if (task.recurrence === 'weekly') {
      const diff = (new Date(t) - new Date(due)) / 86400000;
      if (diff >= 7) shouldSpawn = true;
    }

    if (shouldSpawn) {
      const newDue = task.recurrence === 'daily'
        ? t
        : (() => {
            const d = new Date(due);
            d.setDate(d.getDate() + 7);
            return d.toISOString().split('T')[0];
          })();

      toAdd.push({
        ...task,
        id: uid(),
        completed: false,
        createdAt: Date.now(),
        dueDate: newDue,
        lastSpawned: null,
      });
      task.lastSpawned = t;
    }
  });

  if (toAdd.length) {
    tasks.push(...toAdd);
    saveTasks();
    showToast(`🔁 ${toAdd.length} recurring task(s) added`);
  }
}

// Filter & Sort
const filterMeta = {
  all:       { title: 'All Tasks',       subtitle: 'Everything on your plate' },
  pending:   { title: 'Pending',         subtitle: 'Tasks yet to be done' },
  completed: { title: 'Completed',       subtitle: 'Things you\'ve knocked out ✓' },
  high:      { title: 'High Priority',   subtitle: 'Urgent tasks needing attention' },
  medium:    { title: 'Medium Priority', subtitle: 'Important but not urgent' },
  low:       { title: 'Low Priority',    subtitle: 'When you get a chance' },
  overdue:   { title: 'Overdue',         subtitle: 'Past their due date ⚠️' },
  today:     { title: 'Due Today',       subtitle: 'On the agenda for today 📅' },
};

function getFilteredSorted() {
  const t = today();
  let list = tasks.filter(task => {
    // Search filter
    const q = searchQuery.toLowerCase();
    if (q && !task.title.toLowerCase().includes(q) && !(task.notes || '').toLowerCase().includes(q)) {
      return false;
    }
    // Category filter
    switch (currentFilter) {
      case 'all':       return true;
      case 'pending':   return !task.completed;
      case 'completed': return task.completed;
      case 'high':      return task.priority === 'high';
      case 'medium':    return task.priority === 'medium';
      case 'low':       return task.priority === 'low';
      case 'overdue':   return !task.completed && task.dueDate && task.dueDate < t;
      case 'today':     return !task.completed && task.dueDate === t;
      default:          return true;
    }
  });

  const sortVal = DOM.sortSelect.value;
  const pOrder = { high: 0, medium: 1, low: 2 };

  list.sort((a, b) => {
    switch (sortVal) {
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate);
      case 'priority':
        return (pOrder[a.priority] ?? 1) - (pOrder[b.priority] ?? 1);
      case 'alpha':
        return a.title.localeCompare(b.title);
      default: // created
        return b.createdAt - a.createdAt;
    }
  });

  return list;
}

// Render
function render() {
  const list = getFilteredSorted();

  // Stats
  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;

  DOM.totalCount.textContent   = total;
  DOM.pendingCount.textContent = pending;
  DOM.doneCount.textContent    = done;
  DOM.listCount.textContent    = `${list.length} task${list.length !== 1 ? 's' : ''}`;

  // Filter heading
  const meta = filterMeta[currentFilter] || filterMeta.all;
  DOM.filterTitle.textContent    = meta.title;
  DOM.filterSubtitle.textContent = meta.subtitle;

  // Empty state
  if (list.length === 0) {
    DOM.emptyState.classList.add('show');
    DOM.taskList.innerHTML = '';
    return;
  }
  DOM.emptyState.classList.remove('show');

  // Build items
  DOM.taskList.innerHTML = '';
  list.forEach(task => {
    const li = buildTaskEl(task);
    DOM.taskList.appendChild(li);
  });

  // Reinit drag & drop
  initDragDrop();
}

function buildTaskEl(task) {
  const li = document.createElement('li');
  li.className = `task-item priority-${task.priority || 'medium'}${task.completed ? ' completed' : ''}`;
  li.dataset.id = task.id;
  li.setAttribute('draggable', 'true');

  const ds = dateStatus(task.dueDate);
  const priorityLabels = { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' };
  const recurLabels    = { daily: '🔁 Daily', weekly: '🔁 Weekly' };

  const dueBadge = task.dueDate
    ? `<span class="task-tag tag-date ${ds || ''}">${ds === 'overdue' ? '⚠️ Overdue · ' : ds === 'today' ? '📅 Today · ' : '📅 '}${formatDate(task.dueDate)}</span>`
    : '';

  const priorityBadge = `<span class="task-tag tag-priority-${task.priority || 'medium'}">${priorityLabels[task.priority] || '🟡 Medium'}</span>`;

  const recurBadge = (task.recurrence && task.recurrence !== 'none')
    ? `<span class="task-tag tag-recurrence">${recurLabels[task.recurrence]}</span>`
    : '';

  const noteEl = task.notes
    ? `<div class="task-notes">${escapeHtml(task.notes)}</div>`
    : '';

  li.innerHTML = `
    <span class="drag-handle" title="Drag to reorder">⋮⋮</span>
    <div class="task-checkbox${task.completed ? ' checked' : ''}" role="checkbox" aria-checked="${task.completed}" tabindex="0" data-id="${task.id}"></div>
    <div class="task-content">
      <div class="task-name">${escapeHtml(task.title)}</div>
      <div class="task-meta">
        ${priorityBadge}
        ${dueBadge}
        ${recurBadge}
      </div>
      ${noteEl}
    </div>
    <div class="task-actions">
      <button class="action-btn edit" data-id="${task.id}" title="Edit task">✏️</button>
      <button class="action-btn delete" data-id="${task.id}" title="Delete task">🗑️</button>
    </div>
  `;

  return li;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Add Task
function addTask() {
  const title = DOM.taskTitle.value.trim();
  if (!title) {
    DOM.taskTitle.focus();
    DOM.taskTitle.classList.add('shake');
    setTimeout(() => DOM.taskTitle.classList.remove('shake'), 500);
    showToast('⚠️ Please enter a task title');
    return;
  }

  const task = {
    id:         uid(),
    title,
    completed:  false,
    priority:   DOM.taskPriority.value,
    dueDate:    DOM.taskDate.value || null,
    recurrence: DOM.taskRecurrence.value,
    notes:      DOM.taskNotes.value.trim(),
    createdAt:  Date.now(),
    lastSpawned: null,
  };

  tasks.unshift(task);
  saveTasks();

  // Reset form
  DOM.taskTitle.value      = '';
  DOM.taskDate.value       = '';
  DOM.taskPriority.value   = 'medium';
  DOM.taskRecurrence.value = 'none';
  DOM.taskNotes.value      = '';
  DOM.charCount.textContent = '0 / 120';
  DOM.addTaskDetails.classList.remove('open');

  render();
  showToast('✅ Task added!');
}

// Toggle Complete
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  render();
  showToast(task.completed ? '🎉 Task completed!' : '↩️ Marked as pending');
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
  showToast('🗑️ Task deleted');
}

// Edit Modal
function openEditModal(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  editingId = id;

  DOM.editTitle.value      = task.title;
  DOM.editDate.value       = task.dueDate || '';
  DOM.editPriority.value   = task.priority || 'medium';
  DOM.editRecurrence.value = task.recurrence || 'none';
  DOM.editNotes.value      = task.notes || '';

  DOM.modalOverlay.classList.add('open');
  DOM.editTitle.focus();
}

function closeEditModal() {
  DOM.modalOverlay.classList.remove('open');
  editingId = null;
}

function saveEdit() {
  if (!editingId) return;
  const title = DOM.editTitle.value.trim();
  if (!title) {
    DOM.editTitle.focus();
    showToast('⚠️ Title cannot be empty');
    return;
  }
  const task = tasks.find(t => t.id === editingId);
  if (!task) return;

  task.title      = title;
  task.dueDate    = DOM.editDate.value || null;
  task.priority   = DOM.editPriority.value;
  task.recurrence = DOM.editRecurrence.value;
  task.notes      = DOM.editNotes.value.trim();

  saveTasks();
  closeEditModal();
  render();
  showToast('✏️ Task updated!');
}

// Drag & Drop
function initDragDrop() {
  const items = DOM.taskList.querySelectorAll('.task-item');

  items.forEach((item, idx) => {
    item.addEventListener('dragstart', e => {
      dragSrcIndex = idx;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      items.forEach(i => i.classList.remove('drag-over'));
    });

    item.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      items.forEach(i => i.classList.remove('drag-over'));
      item.classList.add('drag-over');
    });

    item.addEventListener('drop', e => {
      e.preventDefault();
      item.classList.remove('drag-over');
      if (dragSrcIndex === null || dragSrcIndex === idx) return;

      // Map rendered (filtered/sorted) indices back to tasks array
      const filteredList = getFilteredSorted();
      const srcId  = filteredList[dragSrcIndex]?.id;
      const destId = filteredList[idx]?.id;
      if (!srcId || !destId) return;

      const srcRealIdx  = tasks.findIndex(t => t.id === srcId);
      const destRealIdx = tasks.findIndex(t => t.id === destId);
      if (srcRealIdx === -1 || destRealIdx === -1) return;

      const [moved] = tasks.splice(srcRealIdx, 1);
      tasks.splice(destRealIdx, 0, moved);

      saveTasks();
      render();
    });
  });
}

// Sidebar & Mobile
let sidebarOverlay;

function setupSidebarOverlay() {
  sidebarOverlay = document.createElement('div');
  sidebarOverlay.className = 'sidebar-overlay';
  document.body.appendChild(sidebarOverlay);
  sidebarOverlay.addEventListener('click', closeSidebar);
}

function openSidebar() {
  DOM.sidebar.classList.add('open');
  sidebarOverlay.classList.add('show');
}

function closeSidebar() {
  DOM.sidebar.classList.remove('open');
  sidebarOverlay.classList.remove('show');
}

// Event Listeners
function bindEvents() {
  // Add task
  DOM.addBtn.addEventListener('click', addTask);
  DOM.taskTitle.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  // Expand/collapse details
  DOM.expandBtn.addEventListener('click', () => {
    DOM.addTaskDetails.classList.toggle('open');
  });

  // Char counter
  DOM.taskTitle.addEventListener('input', () => {
    const len = DOM.taskTitle.value.length;
    DOM.charCount.textContent = `${len} / 120`;
    DOM.charCount.style.color = len > 100 ? 'var(--danger)' : '';
  });

  // Search
  DOM.searchInput.addEventListener('input', () => {
    searchQuery = DOM.searchInput.value;
    DOM.searchClear.classList.toggle('visible', searchQuery.length > 0);
    render();
  });

  DOM.searchClear.addEventListener('click', () => {
    DOM.searchInput.value = '';
    searchQuery = '';
    DOM.searchClear.classList.remove('visible');
    render();
  });

  // Sort
  DOM.sortSelect.addEventListener('change', render);

  // Filter buttons
  DOM.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
      if (window.innerWidth <= 768) closeSidebar();
    });
  });

  // Theme toggle
  DOM.themeToggle.addEventListener('click', toggleTheme);

  // Menu toggle (mobile)
  DOM.menuToggle.addEventListener('click', () => {
    if (DOM.sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  // Clear completed
  DOM.clearCompleted.addEventListener('click', () => {
    const beforeCount = tasks.length;
    tasks = tasks.filter(t => !t.completed);
    const removed = beforeCount - tasks.length;
    saveTasks();
    render();
    if (removed > 0) showToast(`🧹 Removed ${removed} completed task${removed > 1 ? 's' : ''}`);
    else showToast('No completed tasks to clear');
  });

  // Task list — event delegation
  DOM.taskList.addEventListener('click', e => {
    const checkbox = e.target.closest('.task-checkbox');
    const editBtn  = e.target.closest('.action-btn.edit');
    const delBtn   = e.target.closest('.action-btn.delete');

    if (checkbox) toggleTask(checkbox.dataset.id);
    else if (editBtn) openEditModal(editBtn.dataset.id);
    else if (delBtn) deleteTask(delBtn.dataset.id);
  });

  // Keyboard accessibility for checkboxes
  DOM.taskList.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const checkbox = e.target.closest('.task-checkbox');
      if (checkbox) {
        e.preventDefault();
        toggleTask(checkbox.dataset.id);
      }
    }
  });

  // Modal
  DOM.modalClose.addEventListener('click', closeEditModal);
  DOM.cancelEdit.addEventListener('click', closeEditModal);
  DOM.saveEdit.addEventListener('click', saveEdit);
  DOM.editTitle.addEventListener('keydown', e => { if (e.key === 'Enter') saveEdit(); });
  DOM.modalOverlay.addEventListener('click', e => {
    if (e.target === DOM.modalOverlay) closeEditModal();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeEditModal();
      closeSidebar();
    }
  });
}

// Shake animation (CSS injection)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
  .shake { animation: shake 0.4s ease; }
`;
document.head.appendChild(shakeStyle);

// Init
function init() {
  loadTasks();
  applyTheme(loadTheme());
  setupSidebarOverlay();
  spawnRecurring();
  bindEvents();
  render();
}

document.addEventListener('DOMContentLoaded', init);
