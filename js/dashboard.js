document.addEventListener('DOMContentLoaded', () => {
    // Mock data for the dashboard
    const mockEmployees = [
        { id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief', managerName: 'N/A' },
        { id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst', managerName: 'Abel Tesfaye' },
        { id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager', managerName: 'Abel Tesfaye' },
        { id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst', managerName: 'Jane Smith' },
        { id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist', managerName: 'John Doe' },
        { id: 'DBP-006', fullName: 'Alex Williams', jobPosition: 'Senior Manager', managerName: 'Abel Tesfaye' },
        { id: 'DBP-007', fullName: 'Michael Jordan', jobPosition: 'Manager', managerName: 'Alex Williams' },
        { id: 'DBP-008', fullName: 'Emily Clark', jobPosition: 'Analyst', managerName: 'Michael Jordan' },
        { id: 'DBP-009', fullName: 'David Lee', jobPosition: 'Team Lead', managerName: 'Jane Smith' },
        { id: 'DBP-010', fullName: 'Maria Rodriguez', jobPosition: 'Teller', managerName: 'John Doe' },
    ];

    const mockGoals = [
        { id: 'goal-1', employeeId: 'DBP-001', goalName: 'Increase Efficiency', status: 'In Progress', dueDate: '2025-12-31' },
        { id: 'goal-2', employeeId: 'DBP-001', goalName: 'Mentor Junior Staff', status: 'In Progress', dueDate: '2025-12-31' },
        { id: 'goal-3', employeeId: 'DBP-002', goalName: 'Grow Customer Base', status: 'In Progress', dueDate: '2025-09-30' },
        { id: 'goal-4', employeeId: 'DBP-002', goalName: 'Attend Leadership Seminar', status: 'Completed', dueDate: '2025-06-30' },
        { id: 'goal-5', employeeId: 'DBP-003', goalName: 'Improve Team KPI', status: 'In Progress', dueDate: '2025-09-30' },
        { id: 'goal-6', employeeId: 'DBP-003', goalName: 'Get PMP Certification', status: 'Not Started', dueDate: '2026-03-31' },
        { id: 'goal-7', employeeId: 'DBP-004', goalName: 'Support Team Initiatives', status: 'In Progress', dueDate: '2025-12-31' },
        { id: 'goal-8', employeeId: 'DBP-005', goalName: 'Develop ML Model', status: 'In Progress', dueDate: '2025-10-15' },
        { id: 'goal-9', employeeId: 'DBP-005', goalName: 'Publish Research Paper', status: 'Not Started', dueDate: '2026-01-31' },
        { id: 'goal-10', employeeId: 'DBP-006', goalName: 'Streamline Recruitment', status: 'In Progress', dueDate: '2025-12-31' },
        { id: 'goal-11', employeeId: 'DBP-006', goalName: 'HR Tech Certification', status: 'Completed', dueDate: '2025-08-31' },
        { id: 'goal-12', employeeId: 'DBP-007', goalName: 'Boost Employee Retention', status: 'In Progress', dueDate: '2025-11-30' },
        { id: 'goal-13', employeeId: 'DBP-007', goalName: 'Public Speaking Course', status: 'Not Started', dueDate: '2026-02-28' },
        { id: 'goal-14', employeeId: 'DBP-008', goalName: 'Support Recruitment Drives', status: 'In Progress', dueDate: '2025-12-31' },
        { id: 'goal-15', employeeId: 'DBP-009', goalName: 'Lead Project Alpha', status: 'In Progress', dueDate: '2025-12-31' },
        { id: 'goal-16', employeeId: 'DBP-010', goalName: 'Improve Customer Service', status: 'Completed', dueDate: '2025-08-15' },
        { id: 'goal-17', employeeId: 'DBP-004', goalName: 'Overdue Goal Test', status: 'In Progress', dueDate: '2025-01-01' } // Overdue goal for alert test
    ];

    const dashboardTitle = document.getElementById('dashboard-title');
    const dashboardContent = document.getElementById('dashboard-content');
    const kpiSection = dashboardContent.querySelector('.kpi-section');
    const alertsList = dashboardContent.querySelector('.alerts-list');
    const goalsTableContainer = document.getElementById('goals-table-container');

    // Function to get all subordinates of a manager
    const getAllSubordinates = (managerId) => {
        const manager = mockEmployees.find(e => e.id === managerId);
        if (!manager) return [];

        let directSubordinates = mockEmployees.filter(e => e.managerName === manager.fullName);
        let allSubordinates = [...directSubordinates];
        directSubordinates.forEach(sub => {
            allSubordinates = allSubordinates.concat(getAllSubordinates(sub.id));
        });
        return allSubordinates;
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

    // Function to render the dashboard based on user role
    const renderDashboard = (role) => {
        const user = mockEmployees.find(e => e.fullName === 'Mark Johnson'); // Example user
        const manager = mockEmployees.find(e => e.fullName === 'Jane Smith'); // Example manager

        let dataToDisplay;
        let title;
        let employeeId;

        dashboardContent.style.display = 'block';

        if (role === 'admin') {
            title = 'Administrator Dashboard';
            dataToDisplay = {
                employees: mockEmployees,
                goals: mockGoals
            };
        } else if (role === 'manager' && manager) {
            title = 'Manager Dashboard';
            const subordinates = getAllSubordinates(manager.id);
            dataToDisplay = {
                employees: [manager, ...subordinates],
                goals: mockGoals.filter(goal => [manager.id, ...subordinates.map(s => s.id)].includes(goal.employeeId))
            };
            employeeId = manager.id;
        } else if (role === 'user' && user) {
            title = 'My Dashboard';
            dataToDisplay = {
                employees: [user],
                goals: mockGoals.filter(goal => goal.employeeId === user.id)
            };
            employeeId = user.id;
        } else {
            // Fallback for roles not found or handled
            title = 'Dashboard';
            dataToDisplay = { employees: [], goals: [] };
        }

        dashboardTitle.textContent = title;
        renderKPIs(dataToDisplay);
        renderAlerts(dataToDisplay, employeeId);
        renderGoalStatusChart(dataToDisplay.goals);
        renderGoalsTable(dataToDisplay.goals, dataToDisplay.employees, role);
    };

    // Render KPI cards
    const renderKPIs = (data) => {
        const totalEmployees = data.employees.length;
        const totalGoals = data.goals.length;
        const completedGoals = data.goals.filter(g => g.status === 'Completed').length;
        const completionRate = totalGoals > 0 ? ((completedGoals / totalGoals) * 100).toFixed(1) : 0;
        
        kpiSection.innerHTML = `
            ${createKPICard('fas fa-users', totalEmployees, 'Total Employees')}
            ${createKPICard('fas fa-bullseye', totalGoals, 'Total Goals')}
            ${createKPICard('fas fa-check-circle', `${completionRate}%`, 'Goal Completion Rate')}
        `;
    };

    // Render alerts
    const renderAlerts = (data, employeeId) => {
        alertsList.innerHTML = '';
        const today = new Date();
        const alerts = [];

        // Find overdue goals
        const overdueGoals = data.goals.filter(goal => new Date(goal.dueDate) < today && goal.status !== 'Completed');
        overdueGoals.forEach(goal => {
            const employee = mockEmployees.find(e => e.id === goal.employeeId);
            if (employee) {
                alerts.push(`Goal "${goal.goalName}" for ${employee.fullName} is overdue.`);
            }
        });
        
        // Find employees without goals (for admins/managers)
        if (employeeId) {
            const employeesWithoutGoals = data.employees.filter(emp => !data.goals.some(g => g.employeeId === emp.id));
            employeesWithoutGoals.forEach(emp => {
                alerts.push(`${emp.fullName} has no goals assigned.`);
            });
        }
        
        if (alerts.length > 0) {
            alerts.forEach(alert => {
                alertsList.innerHTML += createAlertItem(alert);
            });
        } else {
            alertsList.innerHTML = '<li class="no-alerts">No alerts at this time.</li>';
        }
    };

    // Render the goal status pie chart
    let goalStatusChartInstance = null;
    const renderGoalStatusChart = (goals) => {
        const statusCounts = goals.reduce((acc, goal) => {
            acc[goal.status] = (acc[goal.status] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(statusCounts);
        const data = Object.values(statusCounts);
        
        if (goalStatusChartInstance) {
            goalStatusChartInstance.destroy();
        }

        const ctx = document.getElementById('goalStatusChart').getContext('2d');
        goalStatusChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Goal Status',
                    data: data,
                    backgroundColor: [
                        '#ffc107', // Not Started (Yellow)
                        '#007bff', // In Progress (Blue)
                        '#28a745', // Completed (Green)
                        '#6c757d', // Other/Placeholder (Grey)
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Ensures the chart respects the container's size
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Goal Status Distribution'
                    }
                }
            }
        });
    };

    // Render a simple table of goals for the manager/user view
    const renderGoalsTable = (goals, employees, role) => {
        if (role === 'user' || role === 'manager') {
            const tableHTML = `
                <div class="content-section">
                    <div class="section-header">
                        <h3><i class="fas fa-bullseye"></i> My Goals</h3>
                    </div>
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Goal Name</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                    <th>Employee</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${goals.map(goal => {
                                    const employee = employees.find(e => e.id === goal.employeeId);
                                    return `
                                        <tr>
                                            <td>${goal.goalName}</td>
                                            <td>${goal.status}</td>
                                            <td>${goal.dueDate}</td>
                                            <td>${employee ? employee.fullName : '-'}</td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
            goalsTableContainer.innerHTML = tableHTML;
        } else {
            goalsTableContainer.innerHTML = '';
        }
    };

    // Initial render based on role from localStorage
    const userRole = localStorage.getItem('userRole') || 'admin';
    renderDashboard(userRole);
});