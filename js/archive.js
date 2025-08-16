document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const mockEmployees = [
        { id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief' },
        { id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst' },
        { id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager' },
        { id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst' },
        { id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist' },
        { id: 'DBP-006', fullName: 'Alex Williams', jobPosition: 'Senior Manager' },
    ];

    // Consolidated mock data object for all archived items
    let mockArchivedData = {
        'employees': [
            { id: 'ARC-EMP-T1', type: 'Employee', name: 'Emily White', jobPosition: 'Marketing Specialist', status: 'Terminated', archivedDate: '2025-05-10' },
            { id: 'ARC-EMP-T2', type: 'Employee', name: 'David Brown', jobPosition: 'Financial Analyst', status: 'Resigned', archivedDate: '2025-06-25' },
        ],
        'reviews': [
            { id: 'ARC-REV-Q1', type: 'Review', employee: 'Mark Johnson', period: 'Q1 2025', archivedDate: '2025-07-20' },
            { id: 'ARC-REV-Q2', type: 'Review', employee: 'Sarah Davis', period: 'Q2 2025', archivedDate: '2025-07-28' },
        ],
        'surveys': [
            { id: 'ARC-SUR-Q1', type: 'Survey', name: 'Q1 2025 Engagement Survey', period: 'Q1 2025', archivedDate: '2025-07-15' },
            { id: 'ARC-SUR-Q2', type: 'Survey', name: 'Q2 2025 Engagement Survey', period: 'Q2 2025', archivedDate: '2025-07-30' },
        ]
    };

    // Mock logs, now filtered by role for more realism
    const mockLogs = {
        'admin': [
            { date: '2025-07-30', action: 'Employee Terminated', user: 'Admin', details: 'Terminated employee Emily White (ARC-EMP-T1).' },
            { date: '2025-07-29', action: 'Data Archived', user: 'Admin', details: 'Archived Q2 2025 performance review for Sarah Davis.' },
            { date: '2025-07-28', action: 'Review Locked', user: 'Admin', details: 'Locked the Q2 performance review for Mark Johnson.' },
            { date: '2025-07-25', action: 'Feedback Submitted', user: 'Jane Smith (Manager)', details: 'Submitted feedback to John Doe.' },
            { date: '2025-07-25', action: 'User Login', user: 'John Doe', details: 'User successfully logged in.' },
        ],
        'manager': [
            { date: '2025-07-28', action: 'Review Locked', user: 'Jane Smith (Manager)', details: 'Locked the Q2 performance review for Mark Johnson.' },
            { date: '2025-07-25', action: 'Feedback Submitted', user: 'Jane Smith (Manager)', details: 'Submitted feedback to John Doe.' },
        ],
        'user': [
            { date: '2025-07-25', action: 'Feedback Submitted', user: 'John Doe', details: 'Submitted feedback to Sarah Davis.' },
            { date: '2025-07-25', action: 'User Login', user: 'John Doe', details: 'User successfully logged in.' },
        ]
    };

    // --- DOM Elements ---
    const tabsContainer = document.querySelector('.tabs');
    const tabContents = document.querySelectorAll('.tab-content');
    const logsTableBody = document.getElementById('logs-table-body');
    const employeesTableBody = document.getElementById('employees-table-body');
    const reviewsTableBody = document.getElementById('reviews-table-body');
    const surveysTableBody = document.getElementById('surveys-table-body');
    const archiveSearchInput = document.getElementById('archive-search');
    const adminOnlyElements = document.querySelectorAll('.admin-only');
    const employeeCountBadge = document.getElementById('employee-count-badge');
    const reviewCountBadge = document.getElementById('review-count-badge');
    const surveyCountBadge = document.getElementById('survey-count-badge');

    // --- State variables ---
    const currentUser = {
        role: localStorage.getItem('userRole') || 'user'
    };

    // --- Core Functions ---
    const switchTab = (tabId) => {
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId).classList.add('active');

        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });
    };

    const renderLogsTable = () => {
        const userLogs = mockLogs[currentUser.role] || [];
        logsTableBody.innerHTML = '';
        if (userLogs.length === 0) {
            logsTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No log entries found for this role.</td></tr>';
            return;
        }

        userLogs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.date}</td>
                <td>${log.action}</td>
                <td>${log.user}</td>
                <td>${log.details}</td>
            `;
            logsTableBody.appendChild(row);
        });
    };

    const renderEmployeesTable = (data) => {
        employeesTableBody.innerHTML = '';
        employeeCountBadge.textContent = data.length;
        if (data.length === 0) {
            employeesTableBody.innerHTML = '<tr><td colspan="6" class="no-data">No terminated employees match your search.</td></tr>';
            return;
        }
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.jobPosition}</td>
                <td>${item.status}</td>
                <td>${item.archivedDate}</td>
                <td class="admin-only">
                    <button class="restore-btn" data-id="${item.id}" data-type="employees">
                        <i class="fas fa-undo"></i> Restore
                    </button>
                </td>
            `;
            employeesTableBody.appendChild(row);
        });
    };

    const renderReviewsTable = (data) => {
        reviewsTableBody.innerHTML = '';
        reviewCountBadge.textContent = data.length;
        if (data.length === 0) {
            reviewsTableBody.innerHTML = '<tr><td colspan="5" class="no-data">No archived reviews match your search.</td></tr>';
            return;
        }
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.employee}</td>
                <td>${item.period}</td>
                <td>${item.archivedDate}</td>
                <td class="admin-only">
                    <button class="restore-btn" data-id="${item.id}" data-type="reviews">
                        <i class="fas fa-undo"></i> Restore
                    </button>
                </td>
            `;
            reviewsTableBody.appendChild(row);
        });
    };
    
    const renderSurveysTable = (data) => {
        surveysTableBody.innerHTML = '';
        surveyCountBadge.textContent = data.length;
        if (data.length === 0) {
            surveysTableBody.innerHTML = '<tr><td colspan="5" class="no-data">No past surveys match your search.</td></tr>';
            return;
        }
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.period}</td>
                <td>${item.archivedDate}</td>
                <td class="admin-only">
                    <button class="restore-btn" data-id="${item.id}" data-type="surveys">
                        <i class="fas fa-undo"></i> Restore
                    </button>
                </td>
            `;
            surveysTableBody.appendChild(row);
        });
    };

    const renderArchivedTables = (searchTerm = '') => {
        const filteredEmployees = mockArchivedData.employees.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || item.jobPosition.toLowerCase().includes(searchTerm) || item.status.toLowerCase().includes(searchTerm)
        );
        const filteredReviews = mockArchivedData.reviews.filter(item => 
            item.employee.toLowerCase().includes(searchTerm) || item.period.toLowerCase().includes(searchTerm)
        );
        const filteredSurveys = mockArchivedData.surveys.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || item.period.toLowerCase().includes(searchTerm)
        );

        renderEmployeesTable(filteredEmployees);
        renderReviewsTable(filteredReviews);
        renderSurveysTable(filteredSurveys);
        showAdminFeatures();
    };
    
    const showAdminFeatures = () => {
        if (currentUser.role === 'admin') {
            adminOnlyElements.forEach(el => el.style.display = 'table-cell');
        } else {
            adminOnlyElements.forEach(el => el.style.display = 'none');
        }
    };
    
    // The magical restore function
    const handleRestore = (id, type) => {
        if (!confirm(`Are you sure you want to restore this ${type.slice(0, -1)}? This action cannot be undone.`)) {
            return;
        }

        let restoredItem;
        if (mockArchivedData[type]) {
            restoredItem = mockArchivedData[type].find(item => item.id === id);
            mockArchivedData[type] = mockArchivedData[type].filter(item => item.id !== id);
        }

        if (restoredItem) {
            mockLogs['admin'].unshift({
                date: new Date().toISOString().slice(0, 10),
                action: `${restoredItem.type} Restored`,
                user: currentUser.role,
                details: `Restored archived item "${restoredItem.name || restoredItem.employee}" (${restoredItem.id}).`
            });

            alert(`${restoredItem.type} "${restoredItem.name || restoredItem.employee}" has been successfully restored.`);
            renderArchivedTables(archiveSearchInput.value.toLowerCase());
        }
    };

    // --- Event Listeners ---
    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabId = e.target.dataset.tab;
            switchTab(tabId);
            if (tabId === 'logs') {
                renderLogsTable();
            } else if (tabId === 'archived-data') {
                renderArchivedTables();
            }
        }
    });

    archiveSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        renderArchivedTables(searchTerm);
    });

    document.getElementById('archived-data').addEventListener('click', (e) => {
        if (e.target.closest('.restore-btn') && currentUser.role === 'admin') {
            const btn = e.target.closest('.restore-btn');
            const id = btn.dataset.id;
            const type = btn.dataset.type;
            handleRestore(id, type);
        }
    });
    
    // Initial page load
    switchTab('logs');
    renderLogsTable();
    showAdminFeatures();
});