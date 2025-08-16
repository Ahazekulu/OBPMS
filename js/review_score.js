document.addEventListener('DOMContentLoaded', () => {
    // Extensive Mock Data for employees (for summary table)
    const mockEmployees = [
        { id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief', managerName: 'N/A', division: 'Executive', directorate: 'N/A' },
        { id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst', managerName: 'Abel Tesfaye', division: 'Corporate Banking', directorate: 'Corporate Lending' },
        { id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager', managerName: 'Abel Tesfaye', division: 'Corporate Banking', directorate: 'Corporate Lending' },
        { id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst', managerName: 'Jane Smith', division: 'Corporate Banking', directorate: 'Corporate Lending' },
        { id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist', managerName: 'John Doe', division: 'Technology', directorate: 'Data Services' },
        { id: 'DBP-006', fullName: 'Alex Williams', jobPosition: 'Senior Manager', managerName: 'Abel Tesfaye', division: 'Retail Banking', directorate: 'Branch Operations' },
        { id: 'DBP-007', fullName: 'Michael Jordan', jobPosition: 'Manager', managerName: 'Alex Williams', division: 'Human Resources', directorate: 'Talent Acquisition' },
        { id: 'DBP-008', fullName: 'Emily Clark', jobPosition: 'Analyst', managerName: 'Michael Jordan', division: 'Human Resources', directorate: 'Talent Acquisition' },
        { id: 'DBP-009', fullName: 'David Lee', jobPosition: 'Team Lead', managerName: 'Jane Smith', division: 'Corporate Banking', directorate: 'Trade Finance' },
        { id: 'DBP-010', fullName: 'Maria Rodriguez', jobPosition: 'Teller', managerName: 'John Doe', division: 'Retail Banking', directorate: 'Branch Operations' },
    ];
    
    // Mock Data for individual goals (for detail table)
    const mockGoals = [
        // Abel Tesfaye's Goals
        { id: 'DBP-001', goalId: 'goal-1', goalGroup: 'Strategic', goalName: 'Increase Market Share', goalWeight: 50, planText: 'Increase Dagne Bank\'s retail market share to 25%', planNumber: 25, dimension: 'High is good', actualPerformance: 23, status: 'In Progress', done: false, },
        { id: 'DBP-001', goalId: 'goal-2', goalGroup: 'Operational', goalName: 'Reduce Operational Costs', goalWeight: 50, planText: 'Reduce Q4 operational costs by 5% compared to Q3', planNumber: 5, dimension: 'Low is good', actualPerformance: 4.5, status: 'Completed', done: true, },

        // John Doe's Goals
        { id: 'DBP-002', goalId: 'goal-3', goalGroup: 'Client Relations', goalName: 'New Client Acquisition', goalWeight: 40, planText: 'Acquire 10 new high-net-worth corporate clients', planNumber: 10, dimension: 'High is good', actualPerformance: 12, status: 'Completed', done: true, },
        { id: 'DBP-002', goalId: 'goal-4', goalGroup: 'Productivity', goalName: 'Loan Processing Efficiency', goalWeight: 60, planText: 'Process 100 loan applications per month', planNumber: 100, dimension: 'High is good', actualPerformance: 95, status: 'In Progress', done: false, },

        // Jane Smith's Goals
        { id: 'DBP-003', goalId: 'goal-5', goalGroup: 'Team Development', goalName: 'Mentor Junior Analysts', goalWeight: 30, planText: 'Conduct monthly mentoring sessions for junior analysts', planNumber: 12, dimension: 'High is good', actualPerformance: 12, status: 'Completed', done: true, },
        { id: 'DBP-003', goalId: 'goal-6', goalGroup: 'Financial Targets', goalName: 'Corporate Loan Growth', goalWeight: 70, planText: 'Achieve a 15% increase in corporate loan portfolio', planNumber: 15, dimension: 'High is good', actualPerformance: 16.5, status: 'Completed', done: true, },

        // Mark Johnson's Goals
        { id: 'DBP-004', goalId: 'goal-7', goalGroup: 'Research', goalName: 'Market Analysis Report', goalWeight: 50, planText: 'Submit a comprehensive market analysis report for Q3', planNumber: 1, dimension: 'High is good', actualPerformance: 1, status: 'Completed', done: true, },
        { id: 'DBP-004', goalId: 'goal-8', goalGroup: 'Efficiency', goalName: 'Reduce Report Generation Time', goalWeight: 50, planText: 'Decrease average report generation time to 2 hours', planNumber: 2, dimension: 'Low is good', actualPerformance: 2.1, status: 'In Progress', done: false, },

        // Sarah Davis's Goals
        { id: 'DBP-005', goalId: 'goal-9', goalGroup: 'Project Management', goalName: 'Develop a new AI model', goalWeight: 80, planText: 'Develop a new AI model for fraud detection', planNumber: 1, dimension: 'High is good', actualPerformance: 1, status: 'Completed', done: true, },
        { id: 'DBP-005', goalId: 'goal-10', goalGroup: 'Learning', goalName: 'Complete Python Course', goalWeight: 20, planText: 'Complete an advanced Python programming course', planNumber: 1, dimension: 'High is good', actualPerformance: 0.8, status: 'In Progress', done: false, },
    ];
    
    // Mock Data for competencies to calculate scores
    const mockCompetencies = [
        { id: 'DBP-001', competencyId: 'comp-1', competencyName: 'Leadership', score: 5 }, 
        { id: 'DBP-001', competencyId: 'comp-2', competencyName: 'Communication', score: 4.8 }, 
        { id: 'DBP-002', competencyId: 'comp-3', competencyName: 'Analytical Thinking', score: 4 },
        { id: 'DBP-002', competencyId: 'comp-4', competencyName: 'Client Management', score: 3.5 },
        { id: 'DBP-003', competencyId: 'comp-5', competencyName: 'Team Management', score: 5 }, 
        { id: 'DBP-003', competencyId: 'comp-6', competencyName: 'Strategic Planning', score: 4.5 },
        { id: 'DBP-004', competencyId: 'comp-7', competencyName: 'Report Writing', score: 4.5 },
        { id: 'DBP-005', competencyId: 'comp-8', competencyName: 'Machine Learning', score: 3 }, 
        { id: 'DBP-006', competencyId: 'comp-9', competencyName: 'Public Relations', score: 4.9 },
        { id: 'DBP-007', competencyId: 'comp-10', competencyName: 'Recruiting', score: 5 },
        { id: 'DBP-008', competencyId: 'comp-11', competencyName: 'HRIS Management', score: 3.5 },
        { id: 'DBP-009', competencyId: 'comp-12', competencyName: 'Risk Assessment', score: 4 },
        { id: 'DBP-010', competencyId: 'comp-13', competencyName: 'Customer Service', score: 4.3 },
    ];

    // DOM Element References
    const summaryTableBody = document.getElementById('reviews-table-body');
    const goalDetailTableBody = document.getElementById('goal-details-table-body');
    const competencyDetailTableBody = document.getElementById('competency-details-table-body');
    const reviewSearchInput = document.getElementById('review-search-input');
    const reviewSummarySection = document.getElementById('review-summary-section');
    const reviewDetailsSection = document.getElementById('review-details-section');
    const backToSummaryBtn = document.getElementById('back-to-summary');
    const detailsEmployeeName = document.getElementById('details-employee-name');

    const goalModal = document.getElementById('goal-modal');
    const goalForm = document.getElementById('goal-form');
    const addGoalDetailBtn = document.getElementById('add-goal-detail-btn');

    const competencyModal = document.getElementById('competency-modal');
    const competencyForm = document.getElementById('competency-form');
    const addCompetencyBtn = document.getElementById('add-competency-btn');
    
    const kpiSection = document.querySelector('.kpi-section');
    const alertsList = document.querySelector('.alerts-list');
    
    let originalReviewData = [];
    let isEditMode = false;
    let currentEmployeeId = null;

    // Helper Functions
    const getAllSubordinates = (managerName) => {
        const subordinates = mockEmployees.filter(e => e.managerName === managerName);
        const all = [...subordinates];
        subordinates.forEach(sub => all.push(...getAllSubordinates(sub.fullName)));
        return all;
    };

    const calculatePercentageOfPerformance = (plan, actual, dimension) => {
        if (!actual || actual === 0) return 0;
        if (dimension === 'High is good') {
            return (actual / plan) * 100;
        } else { // Low is good
            return (plan / actual) * 100;
        }
    };

    const createKPICard = (iconClass, value, label) => {
        return `
            <div class="kpi-card">
                <i class="${iconClass} icon"></i>
                <div class="value">${value}</div>
                <div class="label">${label}</div>
            </div>
        `;
    };

    const createAlertItem = (message) => {
        return `<li>${message}</li>`;
    };

    // Data Aggregation Logic for Summary Table
    const createSummaryData = (employeeData) => {
        const summary = employeeData.map(employee => {
            const employeeGoals = mockGoals.filter(g => g.id === employee.id);
            const employeeCompetencies = mockCompetencies.filter(c => c.id === employee.id);
            
            const numGoals = employeeGoals.length;
            const numCompetencies = employeeCompetencies.length;
            
            let finalGoalScore = 0;
            if (employeeGoals.length > 0) {
                finalGoalScore = employeeGoals.reduce((sum, goal) => {
                    const percentage = calculatePercentageOfPerformance(goal.planNumber, goal.actualPerformance, goal.dimension);
                    const final = (goal.goalWeight / 100) * (percentage / 100) * 5; // Scale to 5-point
                    return sum + final;
                }, 0);
            }
            
            const competencyScore = employeeCompetencies.length > 0 ? (employeeCompetencies.reduce((sum, c) => sum + c.score, 0) / employeeCompetencies.length) : 0;
            
            const combinedScore = (finalGoalScore + competencyScore) / 2;
            
            return {
                id: employee.id,
                fullName: employee.fullName,
                jobPosition: employee.jobPosition,
                numGoals: numGoals,
                numCompetencies: numCompetencies,
                finalGoalScore: finalGoalScore.toFixed(1),
                competencyScore: competencyScore.toFixed(1),
                combinedScore: combinedScore.toFixed(1),
                rawCombinedScore: combinedScore // for ranking
            };
        });
        
        // Calculate rank based on combined score
        summary.sort((a, b) => b.rawCombinedScore - a.rawCombinedScore);
        summary.forEach((item, index) => item.rank = index + 1);

        return summary;
    };
    
    const renderSummaryTable = (data) => {
        summaryTableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.dataset.employeeId = item.id;
            
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.fullName}</td>
                <td>${item.jobPosition}</td>
                <td>${item.numGoals}</td>
                <td>${item.numCompetencies}</td>
                <td>${item.finalGoalScore}</td>
                <td>${item.competencyScore}</td>
                <td>${item.combinedScore}</td>
                <td>${item.rank}</td>
                <td class="actions">
                    <button class="action-btn secondary view-detail-btn" data-employee-id="${item.id}" data-employee-name="${item.fullName}"><i class="fas fa-eye"></i> View Detail</button>
                </td>
            `;
            summaryTableBody.appendChild(row);
        });

        document.querySelectorAll('.view-detail-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const employeeId = e.target.dataset.employeeId;
                const employeeName = e.target.dataset.employeeName;
                viewReviewDetails(employeeId, employeeName);
            });
        });
    };

    const renderGoalDetailsTable = (employeeId, employee) => {
        goalDetailTableBody.innerHTML = '';

        const employeeGoals = mockGoals
            .filter(g => g.id === employeeId)
            .sort((a, b) => a.goalId.localeCompare(b.goalId));

        // Calculate ranks
        const allGoalsWithPerformance = mockGoals.map(g => ({
            ...g,
            percentageOfPerformance: calculatePercentageOfPerformance(g.planNumber, g.actualPerformance, g.dimension)
        }));

        const divisionGoalsWithPerformance = allGoalsWithPerformance.filter(g => mockEmployees.find(e => e.id === g.id)?.division === employee.division);
        const directorateGoalsWithPerformance = allGoalsWithPerformance.filter(g => mockEmployees.find(e => e.id === g.id)?.directorate === employee.directorate);

        const rankGoals = (goals) => {
            if (!goals || goals.length === 0) return {};
            const sortedGoals = [...goals].sort((a, b) => b.percentageOfPerformance - a.percentageOfPerformance);
            const ranks = {};
            sortedGoals.forEach((goal, index) => {
                ranks[goal.goalId] = index + 1;
            });
            return ranks;
        };
        
        const bankRanks = rankGoals(allGoalsWithPerformance);
        const divisionRanks = rankGoals(divisionGoalsWithPerformance);
        const directorateRanks = rankGoals(directorateGoalsWithPerformance);
        
        employeeGoals.forEach(goal => {
            const percentageOfPerformance = calculatePercentageOfPerformance(goal.planNumber, goal.actualPerformance, goal.dimension);
            const finalScore = (goal.goalWeight / 100) * (percentageOfPerformance / 100) * 5;
            
            const row = document.createElement('tr');
            row.dataset.goalId = goal.goalId;
            
            row.innerHTML = `
                <td><input type="checkbox" class="goal-done-checkbox" ${goal.done ? 'checked' : ''}></td>
                <td>${goal.goalGroup}</td>
                <td>${goal.goalName}</td>
                <td>${goal.goalWeight}</td>
                <td>${goal.planText}</td>
                <td>${goal.planNumber}</td>
                <td>${goal.dimension}</td>
                <td>${goal.actualPerformance || '-'}</td>
                <td>${percentageOfPerformance ? percentageOfPerformance.toFixed(1) : '-'}%</td>
                <td>${finalScore ? finalScore.toFixed(1) : '-'}</td>
                <td>${divisionRanks[goal.goalId] ? divisionRanks[goal.goalId] : '-'}</td>
                <td>${directorateRanks[goal.goalId] ? directorateRanks[goal.goalId] : '-'}</td>
                <td>${bankRanks[goal.goalId] ? bankRanks[goal.goalId] : '-'}</td>
                <td class="actions">
                    <div class="action-dropdown">
                        <i class="fas fa-ellipsis-v dropdown-toggle"></i>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-menu-item edit-btn" data-goal-id="${goal.goalId}"><i class="fas fa-edit"></i> Edit</a>
                            <a href="#" class="dropdown-menu-item delete-item delete-btn" data-goal-id="${goal.goalId}"><i class="fas fa-trash-alt"></i> Delete</a>
                        </div>
                    </div>
                </td>
            `;

            row.querySelector('.edit-btn')?.addEventListener('click', () => editGoal(goal.goalId));
            row.querySelector('.delete-btn')?.addEventListener('click', () => deleteGoal(goal.goalId));
            row.querySelector('.dropdown-toggle')?.addEventListener('click', (e) => {
                const menu = e.target.closest('.action-dropdown').querySelector('.dropdown-menu');
                document.querySelectorAll('.dropdown-menu.show').forEach(m => {
                    if (m !== menu) m.classList.remove('show');
                });
                menu.classList.toggle('show');
            });

            goalDetailTableBody.appendChild(row);
        });
    };

    const renderCompetencyDetailsTable = (employeeId) => {
        competencyDetailTableBody.innerHTML = '';
        const employeeCompetencies = mockCompetencies.filter(c => c.id === employeeId);

        employeeCompetencies.forEach(comp => {
            const row = document.createElement('tr');
            row.dataset.competencyId = comp.competencyId;
            row.innerHTML = `
                <td>${comp.competencyName}</td>
                <td>${comp.score}</td>
                <td class="actions">
                    <div class="action-dropdown">
                        <i class="fas fa-ellipsis-v dropdown-toggle"></i>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-menu-item edit-btn" data-competency-id="${comp.competencyId}"><i class="fas fa-edit"></i> Edit</a>
                            <a href="#" class="dropdown-menu-item delete-item delete-btn" data-competency-id="${comp.competencyId}"><i class="fas fa-trash-alt"></i> Delete</a>
                        </div>
                    </div>
                </td>
            `;
            
            row.querySelector('.edit-btn')?.addEventListener('click', () => editCompetency(comp.competencyId));
            row.querySelector('.delete-btn')?.addEventListener('click', () => deleteCompetency(comp.competencyId));
            row.querySelector('.dropdown-toggle')?.addEventListener('click', (e) => {
                const menu = e.target.closest('.action-dropdown').querySelector('.dropdown-menu');
                document.querySelectorAll('.dropdown-menu.show').forEach(m => {
                    if (m !== menu) m.classList.remove('show');
                });
                menu.classList.toggle('show');
            });

            competencyDetailTableBody.appendChild(row);
        });
    };

    const viewReviewDetails = (employeeId, employeeName) => {
        reviewDetailsSection.style.display = 'block';
        reviewSummarySection.style.display = 'none';
        detailsEmployeeName.textContent = employeeName;
        currentEmployeeId = employeeId;
        
        const employee = mockEmployees.find(e => e.id === employeeId);
        
        renderGoalDetailsTable(employeeId, employee);
        renderCompetencyDetailsTable(employeeId);
    };

    const backToSummary = () => {
        reviewSummarySection.style.display = 'block';
        reviewDetailsSection.style.display = 'none';
        currentEmployeeId = null;
    };

    const openModal = (modalElement) => {
        modalElement.style.display = 'flex';
        setTimeout(() => modalElement.classList.add('active'), 10);
    };

    const closeModal = (modalElement) => {
        modalElement.classList.remove('active');
        setTimeout(() => {
            modalElement.style.display = 'none';
            goalForm.reset();
            competencyForm.reset();
            isEditMode = false;
        }, 300);
    };

    const renderKPIs = () => {
        const totalGoals = mockGoals.length;
        const completedGoals = mockGoals.filter(g => g.done).length;
        const completionRate = totalGoals > 0 ? ((completedGoals / totalGoals) * 100).toFixed(0) : 'N/A';
        
        kpiSection.innerHTML = `
            ${createKPICard('fas fa-bullseye', totalGoals, 'Total Goals')}
            ${createKPICard('fas fa-check-circle', completedGoals, 'Goals Completed')}
            ${createKPICard('fas fa-percentage', completionRate, 'Completion Rate')}
        `;
    };

    const renderAlerts = () => {
        alertsList.innerHTML = '';
        const alerts = [];
        const today = new Date();
        
        mockGoals.forEach(goal => {
            if (goal.status !== 'Completed' && new Date(goal.dueDate) < today) {
                alerts.push(`Goal **"${goal.goalName}"** for employee **${mockEmployees.find(e => e.id === goal.id)?.fullName}** is overdue.`);
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

    let goalsStatusChartInstance = null;
    const renderGoalsStatusChart = () => {
        const statusCounts = mockGoals.reduce((acc, goal) => {
            acc[goal.status] = (acc[goal.status] || 0) + 1;
            return acc;
        }, {});

        const labels = ['Not Started', 'In Progress', 'Completed', 'Overdue'];
        const counts = labels.map(label => statusCounts[label] || 0);

        if (goalsStatusChartInstance) {
            goalsStatusChartInstance.destroy();
        }

        const ctx = document.getElementById('reviewScoreChart').getContext('2d');
        goalsStatusChartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Goal Status',
                    data: counts,
                    backgroundColor: ['#adb5bd', '#007bff', '#28a745', '#dc3545'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        text: 'Goal Status Distribution'
                    }
                }
            }
        });
    };
    
    const renderPageBasedOnRole = () => {
        const role = localStorage.getItem('userRole') || 'admin';
        const userFullName = 'Mark Johnson';
        const managerFullName = 'Jane Smith';
        
        let employeeDataToDisplay = [];
        
        const roleBasedButtons = [addGoalDetailBtn, addCompetencyBtn, document.getElementById('export-btn')];
        roleBasedButtons.forEach(btn => btn.style.display = 'none');

        if (role === 'admin') {
            employeeDataToDisplay = mockEmployees;
            roleBasedButtons.forEach(btn => btn.style.display = 'block');
        } else if (role === 'manager') {
            const managerSubordinates = getAllSubordinates(managerFullName).map(e => e.fullName);
            employeeDataToDisplay = mockEmployees.filter(e => e.fullName === managerFullName || managerSubordinates.includes(e.fullName));
            roleBasedButtons.forEach(btn => btn.style.display = 'block');
        } else if (role === 'user') {
            employeeDataToDisplay = mockEmployees.filter(e => e.fullName === userFullName);
        }

        const summaryData = createSummaryData(employeeDataToDisplay);
        originalReviewData = summaryData;
        
        renderSummaryTable(summaryData);
        renderKPIs();
        renderAlerts();
        renderGoalsStatusChart();
    };

    const setupSearch = () => {
        reviewSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredData = originalReviewData.filter(item => {
                return Object.values(item).some(value => 
                    (value?.toString()?.toLowerCase() ?? '').includes(searchTerm)
                );
            });
            renderSummaryTable(filteredData);
        });
    };

    const editGoal = (goalId) => {
        const goal = mockGoals.find(g => g.goalId === goalId);
        if (goal) {
            document.getElementById('modal-employee-id').value = goal.id;
            document.getElementById('modal-goal-id').value = goal.goalId;
            document.getElementById('goal-group').value = goal.goalGroup;
            document.getElementById('goal-name').value = goal.goalName;
            document.getElementById('goal-weight').value = goal.goalWeight;
            document.getElementById('goal-plan-text').value = goal.planText;
            document.getElementById('goal-plan-number').value = goal.planNumber;
            document.getElementById('goal-dimension').value = goal.dimension;
            document.getElementById('goal-actual').value = goal.actualPerformance;
            document.getElementById('goal-status').value = goal.status;
            
            isEditMode = true;
            document.querySelector('#goal-modal h3').textContent = 'Edit Goal';
            openModal(goalModal);
        }
    };

    const editCompetency = (competencyId) => {
        const competency = mockCompetencies.find(c => c.competencyId === competencyId);
        if (competency) {
            document.getElementById('modal-competency-employee-id').value = competency.id;
            document.getElementById('modal-competency-id').value = competency.competencyId;
            document.getElementById('competency-name').value = competency.competencyName;
            document.getElementById('competency-score').value = competency.score;

            isEditMode = true;
            document.querySelector('#competency-modal h3').textContent = 'Edit Competency';
            openModal(competencyModal);
        }
    };
    
    const deleteGoal = (goalId) => {
        if (confirm("Are you sure you want to delete this goal?")) {
            alert(`Goal ID: ${goalId} deleted.`);
            // In a real app, this would be an API call to delete the goal
            // For now, re-render the table with mock data
            const employee = mockEmployees.find(e => e.id === currentEmployeeId);
            renderGoalDetailsTable(currentEmployeeId, employee);
        }
    };

    const deleteCompetency = (competencyId) => {
        if (confirm("Are you sure you want to delete this competency?")) {
            alert(`Competency ID: ${competencyId} deleted.`);
            // In a real app, this would be an API call to delete the competency
            renderCompetencyDetailsTable(currentEmployeeId);
        }
    };

    addGoalDetailBtn.addEventListener('click', () => {
        document.getElementById('modal-employee-id').value = currentEmployeeId;
        
        document.querySelector('#goal-modal h3').textContent = 'Add New Goal';
        isEditMode = false;
        openModal(goalModal);
    });

    addCompetencyBtn.addEventListener('click', () => {
        document.getElementById('modal-competency-employee-id').value = currentEmployeeId;

        document.querySelector('#competency-modal h3').textContent = 'Add New Competency';
        isEditMode = false;
        openModal(competencyModal);
    });

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

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(goalForm);
        const goalData = Object.fromEntries(formData.entries());
        
        if (isEditMode) {
            alert(`Form submitted in edit mode. Updating goal with ID: ${goalData.goalId}`);
        } else {
            alert(`Form submitted in add mode. Adding new goal for employee: ${goalData.id}`);
        }
        
        console.log(goalData);
        closeModal(goalModal);
        const employee = mockEmployees.find(e => e.id === currentEmployeeId);
        renderGoalDetailsTable(currentEmployeeId, employee);
        renderPageBasedOnRole();
    });

    competencyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(competencyForm);
        const competencyData = Object.fromEntries(formData.entries());

        if (isEditMode) {
            alert(`Form submitted in edit mode. Updating competency with ID: ${competencyData.competencyId}`);
        } else {
            alert(`Form submitted in add mode. Adding new competency for employee: ${competencyData.id}`);
        }

        console.log(competencyData);
        closeModal(competencyModal);
        renderCompetencyDetailsTable(currentEmployeeId);
        renderPageBasedOnRole();
    });

    backToSummaryBtn.addEventListener('click', (e) => {
        e.preventDefault();
        backToSummary();
    });

    renderPageBasedOnRole();
    setupSearch();
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.action-dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
});