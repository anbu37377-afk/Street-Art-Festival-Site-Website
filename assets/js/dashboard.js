// ===================================
// STREET ART FESTIVAL - DASHBOARD JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Dashboard
    initializeDashboard();
    
    // Sidebar Navigation
    setupSidebarNavigation();
    
    // Data Charts
    initializeCharts();
    
    // Data Tables
    initializeDataTables();
    
    // Real-time Updates
    startRealTimeUpdates();
    
    // Form Handling
    setupDashboardForms();
    
    // Export Functionality
    setupExportFunctions();
    
    console.log('Dashboard initialized successfully!');
});

function initializeDashboard() {
    // Set current date/time
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Load initial data
    loadDashboardData();
}

function updateDateTime() {
    const dateTimeElement = document.getElementById('currentDateTime');
    if (dateTimeElement) {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

function setupSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show corresponding section
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
    
    // Set default active section
    const firstLink = document.querySelector('.sidebar .nav-link');
    if (firstLink) {
        firstLink.click();
    }
}

function initializeCharts() {
    // Visitors Chart
    const visitorsCtx = document.getElementById('visitorsChart');
    if (visitorsCtx) {
        new Chart(visitorsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Visitors',
                    data: [1200, 1900, 3000, 5000, 4200, 6300],
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'doughnut',
            data: {
                labels: ['Ticket Sales', 'Sponsorships', 'Merchandise', 'Workshops'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#FF6B35',
                        '#004E89',
                        '#1A1A2E',
                        '#F8F9FA'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    // Events Chart
    const eventsCtx = document.getElementById('eventsChart');
    if (eventsCtx) {
        new Chart(eventsCtx, {
            type: 'bar',
            data: {
                labels: ['Workshop', 'Exhibition', 'Performance', 'Talk', 'Tour'],
                datasets: [{
                    label: 'Attendees',
                    data: [150, 280, 200, 120, 180],
                    backgroundColor: '#004E89'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

function initializeDataTables() {
    // Users Table
    const usersTable = document.getElementById('usersTable');
    if (usersTable) {
        // Simple table initialization (in production, use DataTables.js)
        setupTableActions(usersTable);
    }
    
    // Orders Table
    const ordersTable = document.getElementById('ordersTable');
    if (ordersTable) {
        setupTableActions(ordersTable);
    }
    
    // Messages Table
    const messagesTable = document.getElementById('messagesTable');
    if (messagesTable) {
        setupTableActions(messagesTable);
    }
}

function setupTableActions(table) {
    // Add click handlers to action buttons
    const editButtons = table.querySelectorAll('.btn-edit');
    const deleteButtons = table.querySelectorAll('.btn-delete');
    const viewButtons = table.querySelectorAll('.btn-view');
    
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.dataset.id;
            editItem(id, row);
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.dataset.id;
            deleteItem(id, row);
        });
    });
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.dataset.id;
            viewItem(id, row);
        });
    });
}

function editItem(id, row) {
    // Simulate edit action
    showNotification(`Editing item #${id}`, 'info');
    
    // In a real application, this would open an edit modal
    console.log('Edit item:', id);
}

function deleteItem(id, row) {
    if (confirm('Are you sure you want to delete this item?')) {
        // Simulate delete action
        row.style.transition = 'opacity 0.3s';
        row.style.opacity = '0';
        
        setTimeout(() => {
            row.remove();
            showNotification(`Item #${id} deleted successfully`, 'success');
            updateStats();
        }, 300);
    }
}

function viewItem(id, row) {
    // Simulate view action
    showNotification(`Viewing item #${id}`, 'info');
    console.log('View item:', id);
}

function loadDashboardData() {
    // Simulate loading data from API
    setTimeout(() => {
        updateStats();
        loadRecentActivity();
    }, 1000);
}

function updateStats() {
    // Update statistics cards
    const stats = {
        totalVisitors: document.querySelectorAll('#usersTable tbody tr').length * 150,
        totalRevenue: 45678,
        totalEvents: 12,
        totalArtists: 28
    };
    
    updateStatCard('totalVisitors', stats.totalVisitors.toLocaleString());
    updateStatCard('totalRevenue', `$${stats.totalRevenue.toLocaleString()}`);
    updateStatCard('totalEvents', stats.totalEvents);
    updateStatCard('totalArtists', stats.totalArtists);
}

function updateStatCard(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function loadRecentActivity() {
    const activityContainer = document.getElementById('recentActivity');
    if (!activityContainer) return;
    
    const activities = [
        { type: 'user', message: 'New user registered: John Doe', time: '2 minutes ago' },
        { type: 'order', message: 'New ticket order: #1234', time: '5 minutes ago' },
        { type: 'message', message: 'New contact message received', time: '10 minutes ago' },
        { type: 'event', message: 'Workshop "Graffiti Basics" fully booked', time: '15 minutes ago' }
    ];
    
    activityContainer.innerHTML = activities.map(activity => `
        <div class="activity-item d-flex align-items-center p-3 border-bottom">
            <div class="activity-icon me-3">
                <i class="bi bi-${getActivityIcon(activity.type)} text-primary"></i>
            </div>
            <div class="activity-content flex-grow-1">
                <p class="mb-1">${activity.message}</p>
                <small class="text-muted">${activity.time}</small>
            </div>
        </div>
    `).join('');
}

function getActivityIcon(type) {
    const icons = {
        user: 'person-plus',
        order: 'bag-check',
        message: 'envelope',
        event: 'calendar-event'
    };
    return icons[type] || 'circle';
}

function startRealTimeUpdates() {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
        updateStats();
        loadRecentActivity();
    }, 30000);
}

function setupDashboardForms() {
    // User form
    const userForm = document.getElementById('userForm');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUser(this);
        });
    }
    
    // Event form
    const eventForm = document.getElementById('eventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveEvent(this);
        });
    }
    
    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings(this);
        });
    }
}

function saveUser(form) {
    const formData = new FormData(form);
    const userData = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Saving...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showNotification('User saved successfully!', 'success');
        form.reset();
        
        // Refresh users table
        refreshUsersTable();
    }, 1500);
}

function saveEvent(form) {
    const formData = new FormData(form);
    const eventData = Object.fromEntries(formData);
    
    // Similar to saveUser but for events
    showNotification('Event saved successfully!', 'success');
    form.reset();
}

function saveSettings(form) {
    const formData = new FormData(form);
    const settings = Object.fromEntries(formData);
    
    // Save settings to localStorage for demo
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    
    showNotification('Settings saved successfully!', 'success');
}

function refreshUsersTable() {
    // In a real application, this would reload the table from the server
    console.log('Refreshing users table...');
}

function setupExportFunctions() {
    // Export to CSV
    const exportCsvBtn = document.getElementById('exportCsv');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', function() {
            exportToCSV('users');
        });
    }
    
    // Export to PDF
    const exportPdfBtn = document.getElementById('exportPdf');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', function() {
            exportToPDF('users');
        });
    }
    
    // Print
    const printBtn = document.getElementById('printData');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}

function exportToCSV(dataType) {
    // Simulate CSV export
    showNotification(`Exporting ${dataType} to CSV...`, 'info');
    
    setTimeout(() => {
        showNotification(`${dataType} exported successfully!`, 'success');
    }, 2000);
}

function exportToPDF(dataType) {
    // Simulate PDF export
    showNotification(`Exporting ${dataType} to PDF...`, 'info');
    
    setTimeout(() => {
        showNotification(`${dataType} exported successfully!`, 'success');
    }, 2000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('dashboardSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterTableRows(query);
    });
}

function filterTableRows(query) {
    const tables = document.querySelectorAll('table tbody');
    
    tables.forEach(table => {
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', setupSearch);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const activeForm = document.querySelector('form:focus-within');
        if (activeForm) {
            activeForm.dispatchEvent(new Event('submit'));
        }
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        const exportBtn = document.getElementById('exportCsv');
        if (exportBtn) {
            exportBtn.click();
        }
    }
});

// Dashboard utility functions
window.DashboardUtils = {
    showNotification,
    exportToCSV,
    exportToPDF,
    updateStats,
    refreshUsersTable
};
