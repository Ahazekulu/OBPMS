document.addEventListener('DOMContentLoaded', () => {
    // Extensive Mock Data for Employees
    const mockEmployees = [
        {
            id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief', managerName: 'N/A', team: 'Executive', division: 'Management', directorate: 'N/A', chief: 'N/A', hireDate: '2010-01-01', mobile: '0911-234567', email: 'abel.t@dagnebank.com', remarks: 'N/A', lastReview: '2025-01-01', nextReview: '2026-01-01'
        },
        {
            id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst', managerName: 'Abel Tesfaye', team: 'Retail Banking', division: 'Branch Operations', directorate: 'North Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2019-05-15', mobile: '0911-345678', email: 'john.d@dagnebank.com', remarks: 'Promoted to Senior Analyst on Dec 5, 2024; done by Admin', lastReview: '2025-05-15', nextReview: '2026-05-15'
        },
        {
            id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager', managerName: 'Abel Tesfaye', team: 'Corporate Banking', division: 'Corporate Services', directorate: 'Central Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2015-08-20', mobile: '0911-456789', email: 'jane.s@dagnebank.com', remarks: 'N/A', lastReview: '2025-08-20', nextReview: '2026-08-20'
        },
        {
            id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst', managerName: 'Jane Smith', team: 'Corporate Banking', division: 'Corporate Services', directorate: 'Central Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2022-03-10', mobile: '0911-567890', email: 'mark.j@dagnebank.com', remarks: 'N/A', lastReview: '2025-03-10', nextReview: '2026-03-10'
        },
        {
            id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist', managerName: 'John Doe', team: 'IT', division: 'Technology', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2023-11-01', mobile: '0911-678901', email: 'sarah.d@dagnebank.com', remarks: 'N/A', lastReview: '2025-11-01', nextReview: '2026-11-01'
        },
        {
            id: 'DBP-006', fullName: 'Alex Williams', jobPosition: 'Senior Manager', managerName: 'Abel Tesfaye', team: 'HR', division: 'Human Resources', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2018-09-01', mobile: '0911-789012', email: 'alex.w@dagnebank.com', remarks: 'N/A', lastReview: '2025-09-01', nextReview: '2026-09-01'
        },
        {
            id: 'DBP-007', fullName: 'Michael Jordan', jobPosition: 'Manager', managerName: 'Alex Williams', team: 'Talent Acquisition', division: 'Human Resources', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2017-06-25', mobile: '0911-890123', email: 'michael.j@dagnebank.com', remarks: 'N/A', lastReview: '2025-06-25', nextReview: '2026-06-25'
        },
        {
            id: 'DBP-008', fullName: 'Emily Clark', jobPosition: 'Analyst', managerName: 'Michael Jordan', team: 'Talent Acquisition', division: 'Human Resources', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2024-01-20', mobile: '0911-901234', email: 'emily.c@dagnebank.com', remarks: 'N/A', lastReview: '2025-01-20', nextReview: '2026-01-20'
        },
        {
            id: 'DBP-009', fullName: 'David Lee', jobPosition: 'Team Lead', managerName: 'Jane Smith', team: 'Corporate Banking', division: 'Corporate Services', directorate: 'Central Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2016-04-30', mobile: '0911-012345', email: 'david.l@dagnebank.com', remarks: 'Transferred to Corporate Services on March 1, 2025; done by Admin', lastReview: '2025-04-30', nextReview: '2026-04-30'
        },
        {
            id: 'DBP-010', fullName: 'Maria Rodriguez', jobPosition: 'Teller', managerName: 'John Doe', team: 'Retail Banking', division: 'Branch Operations', directorate: 'North Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2020-09-10', mobile: '0911-123456', email: 'maria.r@dagnebank.com', remarks: 'N/A', lastReview: '2025-09-10', nextReview: '2026-09-10'
        },
    ];

    // DOM Element References
    const employeesTableBody = document.getElementById('employees-table-body');
    const employeeSearchInput = document.getElementById('employee-search-input');
    const employeeModal = document.getElementById('employee-modal');
    const employeeForm = document.getElementById('employee-form');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const toggleColumnsBtn = document.getElementById('toggle-columns-btn');
    const columnTogglerContainer = document.getElementById('column-toggler-container');
    const employeesTable = document.getElementById('employees-table');
    const kpiSection = document.querySelector('.kpi-section');
    const alertsList = document.querySelector('.alerts-list');
    
    let originalEmployeeData = [];
    let isEditMode = false;
    let currentEmployeeId = null;

    // Get columns from the employee table for dynamic column toggling
    const employeeColumns = Array.from(employeesTable.querySelectorAll('th')).map(th => ({
        name: th.textContent,
        dataKey: th.dataset.column
    }));

    // Helper Functions
    const getAllSubordinates = (managerName) => {
        const subordinates = mockEmployees.filter(e => e.managerName === managerName);
        const all = [...subordinates];
        subordinates.forEach(sub => all.push(...getAllSubordinates(sub.fullName)));
        return all;
    };

    // Function to handle showing/hiding table columns
    const updateTableVisibility = () => {
        const visibleColumnsFromTogglers = Array.from(columnTogglerContainer.querySelectorAll('input:checked')).map(input => input.dataset.column);

        const headers = employeesTable.querySelectorAll('th');
        const rows = employeesTable.querySelectorAll('tr');

        headers.forEach(header => {
            const columnKey = header.dataset.column;
            header.style.display = visibleColumnsFromTogglers.includes(columnKey) ? '' : 'none';
        });

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                const columnKey = cell.dataset.column;
                cell.style.display = visibleColumnsFromTogglers.includes(columnKey) ? '' : 'none';
            });
        });
    };

    // Helper function to create KPI card HTML
    const createKPICard = (iconClass, value, label) => {
        return `
            <div class="kpi-card">
                <i class="${iconClass} icon"></i>
                <div class="value">${value}</div>
                <div class="label">${label}</div>
            </div>
        `;
    };

    // Helper function to create alert list item HTML
    const createAlertItem = (message) => {
        return `<li>${message}</li>`;
    };
    
    // Function to render the main employee table
    const renderEmployeesTable = (data, isActionable) => {
        employeesTableBody.innerHTML = '';
        const role = localStorage.getItem('userRole') || 'admin';
        
        data.forEach(employee => {
            const row = document.createElement('tr');
            row.dataset.employeeId = employee.id;
            
            row.innerHTML = `
                <td data-column="id">${employee.id}</td>
                <td data-column="fullName">${employee.fullName}</td>
                <td data-column="jobPosition">${employee.jobPosition}</td>
                <td data-column="division">${employee.division}</td>
                <td data-column="managerName">${employee.managerName || '-'}</td>
                <td data-column="hireDate">${employee.hireDate}</td>
                <td data-column="remarks">${employee.remarks || '-'}</td>
                <td data-column="action" class="actions">
                    ${role === 'admin' ? `
                    <div class="action-dropdown">
                        <i class="fas fa-ellipsis-v dropdown-toggle"></i>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-menu-item" data-action="promote"><i class="fas fa-arrow-up"></i> Promote</a>
                            <a href="#" class="dropdown-menu-item" data-action="demote"><i class="fas fa-arrow-down"></i> Demote</a>
                            <a href="#" class="dropdown-menu-item" data-action="transfer"><i class="fas fa-exchange-alt"></i> Transfer</a>
                            <a href="#" class="dropdown-menu-item" data-action="redeploy"><i class="fas fa-map-marked-alt"></i> Redeploy</a>
                            <a href="#" class="dropdown-menu-item delete-item" data-action="terminate"><i class="fas fa-times-circle"></i> Terminate</a>
                        </div>
                    </div>` : '-'}
                </td>
            `;

            if (role === 'admin') {
                const dropdownItems = row.querySelectorAll('[data-action]');
                dropdownItems.forEach(item => {
                    const action = item.dataset.action;
                    item.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (action === 'promote') {
                            promoteEmployee(employee.id);
                        } else if (action === 'demote') {
                            demoteEmployee(employee.id);
                        } else if (action === 'transfer') {
                            transferEmployee(employee.id);
                        } else if (action === 'redeploy') {
                            redeployEmployee(employee.id);
                        } else if (action === 'terminate') {
                            terminateEmployee(employee.id);
                        }
                    });
                });
                row.querySelector('.dropdown-toggle')?.addEventListener('click', (e) => {
                    const menu = e.target.closest('.action-dropdown').querySelector('.dropdown-menu');
                    document.querySelectorAll('.dropdown-menu.show').forEach(m => {
                        if (m !== menu) m.classList.remove('show');
                    });
                    menu.classList.toggle('show');
                });
            }

            employeesTableBody.appendChild(row);
        });
        updateTableVisibility();
    };


    // Function to open a modal
    const openModal = (modalElement) => {
        modalElement.style.display = 'flex';
        setTimeout(() => modalElement.classList.add('active'), 10);
    };

    // Function to close a modal
    const closeModal = (modalElement) => {
        modalElement.classList.remove('active');
        setTimeout(() => {
            modalElement.style.display = 'none';
            // Clear form on close
            employeeForm.reset();
            isEditMode = false;
            currentEmployeeId = null;
        }, 300);
    };

    // Render KPI cards
    const renderKPIs = (data) => {
        const today = new Date();
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);
        
        const totalEmployees = data.length;
        const newHires = data.filter(emp => new Date(emp.hireDate) >= oneMonthAgo).length;
        const managers = new Set(data.map(emp => emp.managerName)).size;
        
        kpiSection.innerHTML = `
            ${createKPICard('fas fa-users', totalEmployees, 'Total Employees')}
            ${createKPICard('fas fa-user-plus', newHires, 'New Hires (Last 30 Days)')}
            ${createKPICard('fas fa-user-tie', managers, 'Managers')}
        `;
    };

    // Render alerts
    const renderAlerts = (data) => {
        alertsList.innerHTML = '';
        const alerts = [];
        const today = new Date();
        
        data.forEach(employee => {
            // Alert for upcoming review
            if (employee.nextReview) {
                const nextReviewDate = new Date(employee.nextReview);
                const diffTime = nextReviewDate.getTime() - today.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays <= 30 && diffDays > 0) {
                    alerts.push(`Upcoming review for **${employee.fullName}** in ${diffDays} days.`);
                } else if (diffDays <= 0) {
                    alerts.push(`Review for **${employee.fullName}** is overdue.`);
                }
            }
            
            // Alert for incomplete profile
            if (!employee.managerName || !employee.email) {
                alerts.push(`Profile incomplete for **${employee.fullName}**.`);
            }
        });
        
        if (alerts.length > 0) {
            alerts.forEach(alert => {
                alertsList.innerHTML += createAlertItem(alert);
            });
        } else {
            alertsList.innerHTML = '<li class="no-alerts">No alerts at this time.</li>';
        }
    };

    // Render the employees by division bar chart
    let employeesChartInstance = null;
    const renderEmployeesChart = (data) => {
        const divisionCounts = data.reduce((acc, employee) => {
            acc[employee.division] = (acc[employee.division] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(divisionCounts);
        const counts = Object.values(divisionCounts);
        
        if (employeesChartInstance) {
            employeesChartInstance.destroy();
        }

        const ctx = document.getElementById('employeesChart').getContext('2d');
        employeesChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Employees',
                    data: counts,
                    backgroundColor: 'rgba(0, 123, 255, 0.7)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Employees'
                        }
                    },
                    x: {
                         title: {
                            display: true,
                            text: 'Division'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Employee Distribution by Division'
                    }
                }
            }
        });
    };
    
    // Function to handle initial page render based on role
    const renderPageBasedOnRole = () => {
        const role = localStorage.getItem('userRole') || 'admin';
        let dataToDisplay = [];
        let isActionable = false;
        
        const roleBasedButtons = [addEmployeeBtn, document.getElementById('import-btn'), document.getElementById('export-btn')];
        roleBasedButtons.forEach(btn => btn.style.display = 'none');

        if (role === 'admin') {
            dataToDisplay = mockEmployees;
            isActionable = true;
            roleBasedButtons.forEach(btn => btn.style.display = 'block');
        } else if (role === 'manager') {
            const manager = mockEmployees.find(e => e.fullName === 'Jane Smith');
            const subordinates = getAllSubordinates(manager.fullName);
            dataToDisplay = [manager, ...subordinates];
            isActionable = true;
        } else if (role === 'user') {
            const user = mockEmployees.find(e => e.fullName === 'Mark Johnson');
            dataToDisplay = user ? [user] : [];
        }

        originalEmployeeData = dataToDisplay;
        renderEmployeesTable(dataToDisplay, isActionable);
        renderKPIs(dataToDisplay);
        renderAlerts(dataToDisplay);
        renderEmployeesChart(dataToDisplay);
    };

    // New search functionality
    const setupSearch = () => {
        employeeSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredEmployees = originalEmployeeData.filter(employee => {
                return Object.values(employee).some(value => 
                    (value?.toString()?.toLowerCase() ?? '').includes(searchTerm)
                );
            });
            const role = localStorage.getItem('userRole') || 'admin';
            let isActionable = (role === 'admin' || role === 'manager');
            renderEmployeesTable(filteredEmployees, isActionable);
            renderEmployeesChart(filteredEmployees);
        });
    };
    
    // Employee Actions (Admin Only)
    const promoteEmployee = (id) => {
        alert(`Promote action for Employee ID: ${id}. In a real application, a modal would appear to select a new position.`);
    };

    const demoteEmployee = (id) => {
        alert(`Demote action for Employee ID: ${id}. In a real application, a modal would appear to select a new position.`);
    };

    const transferEmployee = (id) => {
        alert(`Transfer action for Employee ID: ${id}. In a real application, a modal would appear to select a new manager.`);
    };

    const redeployEmployee = (id) => {
        alert(`Redeploy action for Employee ID: ${id}. In a real application, a modal would appear to select a new division/directorate.`);
    };
    
    const terminateEmployee = (id) => {
        if (confirm(`Are you sure you want to terminate Employee ID: ${id}? This action cannot be undone.`)) {
            alert(`Employee with ID: ${id} has been terminated.`);
            // In a real app, this would be an API call to terminate the employee, then re-render the table
        }
    };

    // Event Listeners
    addEmployeeBtn.addEventListener('click', () => {
        document.querySelector('#employee-modal h3').textContent = 'Add New Employee';
        openModal(employeeModal);
    });

    // Close modal on button click or overlay click
    document.querySelectorAll('.modal-overlay .close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => closeModal(e.target.closest('.modal-overlay')));
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                closeModal(e.target);
            }
        });
    });

    // Handle form submissions
    employeeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(employeeForm);
        const employeeData = Object.fromEntries(formData.entries());
        
        if (isEditMode) {
            alert('Form submitted in edit mode. In a real app, this would update the employee data.');
        } else {
            alert('Form submitted in add mode. In a real app, this would create a new employee.');
        }
        
        console.log(employeeData);
        closeModal(employeeModal);
    });
    
    toggleColumnsBtn.addEventListener('click', () => {
        columnTogglerContainer.style.display = columnTogglerContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    // Populate column toggler with checkboxes
    employeeColumns.forEach(col => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" data-column="${col.dataKey}" checked> ${col.name}`;
        columnTogglerContainer.appendChild(label);
        label.querySelector('input').addEventListener('change', updateTableVisibility);
    });

    // Initial setup
    renderPageBasedOnRole();
    setupSearch();
    
    // Global click listener to close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.action-dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
});