document.addEventListener('DOMContentLoaded', () => {
    // Extensive Mock Data for Employees, Goals, and Competencies
    const mockEmployees = [
        {
            id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief', managerName: 'N/A', team: 'Executive', division: 'Management', directorate: 'N/A', chief: 'N/A', hireDate: '2010-01-01', mobile: '0911-234567', email: 'abel.t@dagnebank.com', remarks: 'N/A'
        },
        {
            id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst', managerName: 'Abel Tesfaye', team: 'Retail Banking', division: 'Branch Operations', directorate: 'North Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2019-05-15', mobile: '0911-345678', email: 'john.d@dagnebank.com', remarks: 'Promoted to Senior Analyst on Dec 5, 2024; done by Admin'
        },
        {
            id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager', managerName: 'Abel Tesfaye', team: 'Corporate Banking', division: 'Corporate Services', directorate: 'Central Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2015-08-20', mobile: '0911-456789', email: 'jane.s@dagnebank.com', remarks: 'N/A'
        },
        {
            id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst', managerName: 'Jane Smith', team: 'Corporate Banking', division: 'Corporate Services', directorate: 'Central Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2022-03-10', mobile: '0911-567890', email: 'mark.j@dagnebank.com', remarks: 'N/A'
        },
        {
            id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist', managerName: 'John Doe', team: 'IT', division: 'Technology', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2023-11-01', mobile: '0911-678901', email: 'sarah.d@dagnebank.com', remarks: 'N/A'
        },
        {
            id: 'DBP-006', fullName: 'Alex Williams', jobPosition: 'Senior Manager', managerName: 'Abel Tesfaye', team: 'HR', division: 'Human Resources', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2018-09-01', mobile: '0911-789012', email: 'alex.w@dagnebank.com', remarks: 'N/A'
        },
        {
            id: 'DBP-007', fullName: 'Michael Jordan', jobPosition: 'Manager', managerName: 'Alex Williams', team: 'Talent Acquisition', division: 'Human Resources', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2017-06-25', mobile: '0911-890123', email: 'michael.j@dagnebank.com', remarks: 'N/A'
        },
        {
            id: 'DBP-008', fullName: 'Emily Clark', jobPosition: 'Analyst', managerName: 'Michael Jordan', team: 'Talent Acquisition', division: 'Human Resources', directorate: 'HQ', chief: 'Abel Tesfaye', hireDate: '2024-01-20', mobile: '0911-901234', email: 'emily.c@dagnebank.com', remarks: 'N/A'
        },
        {
            id: 'DBP-009', fullName: 'David Lee', jobPosition: 'Team Lead', managerName: 'Jane Smith', team: 'Corporate Banking', division: 'Corporate Services', directorate: 'Central Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2016-04-30', mobile: '0911-012345', email: 'david.l@dagnebank.com', remarks: 'Transferred to Corporate Services on March 1, 2025; done by Admin'
        },
        {
            id: 'DBP-010', fullName: 'Maria Rodriguez', jobPosition: 'Teller', managerName: 'John Doe', team: 'Retail Banking', division: 'Branch Operations', directorate: 'North Addis Ababa', chief: 'Abel Tesfaye', hireDate: '2020-09-10', mobile: '0911-123456', email: 'maria.r@dagnebank.com', remarks: 'N/A'
        },
    ];

    const mockGoals = [
        // Goals for Abel Tesfaye (Chief)
        { id: 'goal-1', employeeId: 'DBP-001', goalGroup: 'Performance', goalName: 'Increase Efficiency', goalWeight: 30, planText: 'Reduce operational costs by 15%', metrics: 'Percent', dimension: 'High is good', progress: 75, status: 'In Progress', dueDate: '2025-12-31'},
        { id: 'goal-2', employeeId: 'DBP-001', goalGroup: 'Development', goalName: 'Mentor Junior Staff', goalWeight: 20, planText: 'Mentor two junior employees in Q4', metrics: 'Number', dimension: 'High is good', progress: 50, status: 'In Progress', dueDate: '2025-12-31'},
        // Goals for John Doe (Senior Analyst)
        { id: 'goal-3', employeeId: 'DBP-002', goalGroup: 'Performance', goalName: 'Grow Customer Base', goalWeight: 40, planText: 'Increase new customer acquisitions by 20% in Q3', metrics: 'Number', dimension: 'High is good', progress: 80, status: 'In Progress', dueDate: '2025-09-30'},
        { id: 'goal-4', employeeId: 'DBP-002', goalGroup: 'Development', goalName: 'Attend Leadership Seminar', goalWeight: 10, planText: 'Complete a professional leadership course', metrics: 'Number', dimension: 'High is good', progress: 100, status: 'Completed', dueDate: '2025-06-30'},
        // Goals for Jane Smith (Manager)
        { id: 'goal-5', employeeId: 'DBP-003', goalGroup: 'Performance', goalName: 'Improve Team KPI', goalWeight: 50, planText: 'Ensure the team meets all quarterly KPIs', metrics: 'Percent', dimension: 'High is good', progress: 90, status: 'In Progress', dueDate: '2025-09-30'},
        { id: 'goal-6', employeeId: 'DBP-003', goalGroup: 'Development', goalName: 'Get PMP Certification', goalWeight: 15, planText: 'Obtain Project Management Professional certification', metrics: 'Number', dimension: 'High is good', progress: 0, status: 'Not Started', dueDate: '2026-03-31'},
        // Goals for Mark Johnson (Analyst)
        { id: 'goal-7', employeeId: 'DBP-004', goalGroup: 'Performance', goalName: 'Support Team Initiatives', goalWeight: 40, planText: 'Successfully complete all assigned tasks on time', metrics: 'Number', dimension: 'High is good', progress: 60, status: 'In Progress', dueDate: '2025-12-31'},
        // Goals for Sarah Davis (Data Scientist)
        { id: 'goal-8', employeeId: 'DBP-005', goalGroup: 'Performance', goalName: 'Develop ML Model', goalWeight: 60, planText: 'Build and deploy a machine learning model for fraud detection', metrics: 'Number', dimension: 'High is good', progress: 95, status: 'In Progress', dueDate: '2025-10-15'},
        { id: 'goal-9', employeeId: 'DBP-005', goalGroup: 'Development', goalName: 'Publish Research Paper', goalWeight: 20, planText: 'Publish a paper in a peer-reviewed journal', metrics: 'Number', dimension: 'High is good', progress: 0, status: 'Not Started', dueDate: '2026-01-31'},
        // Goals for Alex Williams (Senior Manager)
        { id: 'goal-10', employeeId: 'DBP-006', goalGroup: 'Performance', goalName: 'Streamline Recruitment', goalWeight: 50, planText: 'Reduce average time-to-hire by 10%', metrics: 'Percent', dimension: 'Low is good', progress: 25, status: 'In Progress', dueDate: '2025-12-31'},
        { id: 'goal-11', employeeId: 'DBP-006', goalGroup: 'Development', goalName: 'HR Tech Certification', goalWeight: 15, planText: 'Complete HRIS software training', metrics: 'Number', dimension: 'High is good', progress: 100, status: 'Completed', dueDate: '2025-08-31'},
        // Goals for Michael Jordan (Manager)
        { id: 'goal-12', employeeId: 'DBP-007', goalGroup: 'Performance', goalName: 'Boost Employee Retention', goalWeight: 45, planText: 'Increase first-year retention rate by 5%', metrics: 'Percent', dimension: 'High is good', progress: 50, status: 'In Progress', dueDate: '2025-11-30'},
        { id: 'goal-13', employeeId: 'DBP-007', goalGroup: 'Development', goalName: 'Public Speaking Course', goalWeight: 10, planText: 'Complete a course on public speaking', metrics: 'Number', dimension: 'High is good', progress: 0, status: 'Not Started', dueDate: '2026-02-28'},
        // Goals for Emily Clark (Analyst)
        { id: 'goal-14', employeeId: 'DBP-008', goalGroup: 'Performance', goalName: 'Support Recruitment Drives', goalWeight: 30, planText: 'Assist in organizing and executing 3 campus recruitment events', metrics: 'Number', dimension: 'High is good', progress: 33, status: 'In Progress', dueDate: '2025-12-31'},
        // Goals for David Lee (Team Lead)
        { id: 'goal-15', employeeId: 'DBP-009', goalGroup: 'Performance', goalName: 'Lead Project Alpha', goalWeight: 60, planText: 'Successfully launch Project Alpha by Q4', metrics: 'Number', dimension: 'High is good', progress: 70, status: 'In Progress', dueDate: '2025-12-31'},
        // Goals for Maria Rodriguez (Teller)
        { id: 'goal-16', employeeId: 'DBP-010', goalGroup: 'Performance', goalName: 'Improve Customer Service', goalWeight: 50, planText: 'Achieve 95% customer satisfaction score', metrics: 'Percent', dimension: 'High is good', progress: 95, status: 'Completed', dueDate: '2025-08-15'},
    ];
    
    const mockCompetencies = [
        // Competencies for Abel Tesfaye
        { id: 'comp-1', employeeId: 'DBP-001', competencyType: 'Behavioral', competencyGroup: 'Strategic Vision', description: 'Exceptional ability to set long-term strategic goals.', notes: 'Continues to develop this skill effectively.'},
        // Competencies for John Doe
        { id: 'comp-2', employeeId: 'DBP-002', competencyType: 'Technical', competencyGroup: 'Financial Modeling', description: 'Advanced knowledge of financial modeling techniques.', notes: 'John is an expert in this area.'},
        { id: 'comp-3', employeeId: 'DBP-002', competencyType: 'Behavioral', competencyGroup: 'Team Collaboration', description: 'Excellent at working with and motivating team members.', notes: 'Needs to take on a larger mentorship role.'},
        // Competencies for Jane Smith
        { id: 'comp-4', employeeId: 'DBP-003', competencyType: 'Technical', competencyGroup: 'Data Analysis', description: 'Expert in using statistical software for data analysis.', notes: 'Needs to train Mark on this skill.'},
        { id: 'comp-5', employeeId: 'DBP-003', competencyType: 'Behavioral', competencyGroup: 'Leadership', description: 'Demonstrates strong leadership qualities in daily tasks.', notes: 'Continue to delegate more responsibilities.'},
        // Competencies for Mark Johnson
        { id: 'comp-6', employeeId: 'DBP-004', competencyType: 'Technical', competencyGroup: 'Problem Solving', description: 'Can quickly identify and solve complex issues.', notes: ''},
        { id: 'comp-7', employeeId: 'DBP-004', competencyType: 'Behavioral', competencyGroup: 'Communication', description: 'Clear and concise communicator in both written and verbal forms.', notes: ''},
        // Competencies for Sarah Davis
        { id: 'comp-8', employeeId: 'DBP-005', competencyType: 'Technical', competencyGroup: 'Machine Learning', description: 'Proficient in Python, TensorFlow, and PyTorch.', notes: 'Exhibits strong technical skills, a key asset for the team.'},
        // Competencies for Alex Williams
        { id: 'comp-9', employeeId: 'DBP-006', competencyType: 'Behavioral', competencyGroup: 'Change Management', description: 'Skilled in leading teams through organizational changes.', notes: 'Excellent at managing team transitions.'},
        // Competencies for Michael Jordan
        { id: 'comp-10', employeeId: 'DBP-007', competencyType: 'Behavioral', competencyGroup: 'Conflict Resolution', description: 'Adept at mediating and resolving workplace disputes.', notes: 'Has successfully mediated two recent conflicts.'},
        // Competencies for Emily Clark
        { id: 'comp-11', employeeId: 'DBP-008', competencyType: 'Technical', competencyGroup: 'Recruitment Software', description: 'Familiar with applicant tracking systems.', notes: ''},
        // Competencies for David Lee
        { id: 'comp-12', employeeId: 'DBP-009', competencyType: 'Technical', competencyGroup: 'Project Management', description: 'Experienced with Agile and Scrum methodologies.', notes: 'Strong project management skills, can lead major initiatives.'},
        // Competencies for Maria Rodriguez
        { id: 'comp-13', employeeId: 'DBP-010', competencyType: 'Behavioral', competencyGroup: 'Customer Empathy', description: 'Excellent at understanding and addressing customer needs.', notes: 'Always receives positive customer feedback.'},
    ];

    // DOM Element References
    const goalsListView = document.getElementById('goals-list-view');
    const employeeDetailView = document.getElementById('employee-detail-view');
    const goalsEmployeesTableBody = document.getElementById('goals-employees-table-body');
    const employeeGoalsTableBody = document.getElementById('employee-goals-table-body');
    const employeeCompetenciesTableBody = document.getElementById('employee-competencies-table-body');
    const backBtn = document.getElementById('back-btn');
    const employeeDetailName = document.getElementById('employee-detail-name');
    const toggleColumnsBtn = document.getElementById('toggle-columns-btn');
    const columnTogglerContainer = document.getElementById('column-toggler-container');
    const goalsEmployeesTable = document.getElementById('goals-employees-table');
    const addGoalBtn = document.getElementById('add-goal-btn');
    const addCompetencyBtn = document.getElementById('add-competency-btn');
    const goalsSearchInput = document.getElementById('goals-search-input');
    const goalModal = document.getElementById('goal-modal');
    const competencyModal = document.getElementById('competency-modal');
    const goalForm = document.getElementById('goal-form');
    const competencyForm = document.getElementById('competency-form');

    let selectedEmployeeId = null;
    let originalEmployeeData = [];
    
    // Get columns from the employee goals table for dynamic column toggling
    const employeeColumns = Array.from(goalsEmployeesTable.querySelectorAll('th')).map(th => ({
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

    // Function to handle showing/hiding table columns for the main employee table only
    const updateTableVisibility = () => {
        const visibleColumnsFromTogglers = Array.from(columnTogglerContainer.querySelectorAll('input:checked')).map(input => input.dataset.column);

        const headers = goalsEmployeesTable.querySelectorAll('th');
        const rows = goalsEmployeesTable.querySelectorAll('tr');

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

    // Function to populate and render the main employee goals table
    const renderGoalsEmployeesTable = (data, isActionable) => {
        goalsEmployeesTableBody.innerHTML = '';
        data.forEach(employee => {
            const numGoals = mockGoals.filter(g => g.employeeId === employee.id).length;
            const numCompetencies = mockCompetencies.filter(c => c.employeeId === employee.id).length;
            
            const row = document.createElement('tr');
            row.dataset.employeeId = employee.id;
            
            row.innerHTML = `
                <td data-column="id">${employee.id}</td>
                <td data-column="fullName">${employee.fullName}</td>
                <td data-column="jobPosition">${employee.jobPosition}</td>
                <td data-column="division">${employee.division}</td>
                <td data-column="managerName">${employee.managerName}</td>
                <td data-column="numGoals">${numGoals}</td>
                <td data-column="numCompetencies">${numCompetencies}</td>
                <td data-column="action" class="actions">
                    ${isActionable ? `
                    <div class="action-dropdown">
                        <i class="fas fa-ellipsis-v dropdown-toggle"></i>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-menu-item view-details-btn"><i class="fas fa-eye"></i> View Details</a>
                        </div>
                    </div>` : '-'}
                </td>
            `;

            row.querySelector('.view-details-btn')?.addEventListener('click', () => displayEmployeeDetails(employee));
            row.querySelector('.dropdown-toggle')?.addEventListener('click', (e) => {
                const menu = e.target.closest('.action-dropdown').querySelector('.dropdown-menu');
                document.querySelectorAll('.dropdown-menu.show').forEach(m => {
                    if (m !== menu) m.classList.remove('show');
                });
                menu.classList.toggle('show');
            });

            goalsEmployeesTableBody.appendChild(row);
        });
        updateTableVisibility();
    };

    // Function to render employee's detailed goals and competencies
    const renderEmployeeDetails = (employeeId) => {
        const goals = mockGoals.filter(g => g.employeeId === employeeId);
        employeeGoalsTableBody.innerHTML = '';
        if (goals.length > 0) {
            goals.forEach(goal => {
                const row = document.createElement('tr');
                row.dataset.goalId = goal.id;
                row.innerHTML = `
                    <td data-column="goalGroup">${goal.goalGroup}</td>
                    <td data-column="goalName">${goal.goalName}</td>
                    <td data-column="goalWeight">${goal.goalWeight}%</td>
                    <td data-column="planText">${goal.planText}</td>
                    <td data-column="metrics">${goal.metrics}</td>
                    <td data-column="dimension">${goal.dimension}</td>
                    <td data-column="progress">${goal.progress}%</td>
                    <td data-column="status">${goal.status}</td>
                    <td data-column="dueDate">${goal.dueDate}</td>
                    <td data-column="action" class="actions">
                        <div class="action-dropdown">
                            <i class="fas fa-ellipsis-v dropdown-toggle"></i>
                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-menu-item edit-btn"><i class="fas fa-edit"></i> Edit</a>
                                <a href="#" class="dropdown-menu-item delete-item delete-btn"><i class="fas fa-trash-alt"></i> Delete</a>
                            </div>
                        </div>
                    </td>
                `;
                employeeGoalsTableBody.appendChild(row);
            });
        } else {
            employeeGoalsTableBody.innerHTML = `<tr><td colspan="10" class="no-data">No goals found for this employee.</td></tr>`;
        }
       
        const competencies = mockCompetencies.filter(c => c.employeeId === employeeId);
        employeeCompetenciesTableBody.innerHTML = '';
        if (competencies.length > 0) {
            competencies.forEach(comp => {
                const row = document.createElement('tr');
                row.dataset.competencyId = comp.id;
                row.innerHTML = `
                    <td data-column="competencyType">${comp.competencyType}</td>
                    <td data-column="competencyGroup">${comp.competencyGroup}</td>
                    <td data-column="description">${comp.description}</td>
                    <td data-column="notes">${comp.notes ? `<textarea readonly>${comp.notes}</textarea>` : '-'}</td>
                    <td data-column="action" class="actions">
                        <div class="action-dropdown">
                            <i class="fas fa-ellipsis-v dropdown-toggle"></i>
                            <div class="dropdown-menu">
                                <a href="#" class="dropdown-menu-item edit-btn"><i class="fas fa-edit"></i> Edit</a>
                                <a href="#" class="dropdown-menu-item delete-item delete-btn"><i class="fas fa-trash-alt"></i> Delete</a>
                            </div>
                        </div>
                    </td>
                `;
                employeeCompetenciesTableBody.appendChild(row);
            });
        } else {
            employeeCompetenciesTableBody.innerHTML = `<tr><td colspan="5" class="no-data">No competencies found for this employee.</td></tr>`;
        }
        
        // Add event listeners for all dropdowns on the page
        document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const menu = e.target.closest('.action-dropdown').querySelector('.dropdown-menu');
                document.querySelectorAll('.dropdown-menu.show').forEach(m => {
                    if (m !== menu) m.classList.remove('show');
                });
                menu.classList.toggle('show');
            });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                alert('Edit functionality triggered.');
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm("Are you sure you want to delete this item?")) {
                    alert('Item deleted.');
                }
            });
        });
    };

    // Function to switch to the employee detail view
    const displayEmployeeDetails = (employee) => {
        goalsListView.style.display = 'none';
        employeeDetailView.style.display = 'block';
        employeeDetailName.textContent = `${employee.fullName}'s Goals & Competencies`;
        selectedEmployeeId = employee.id;
        renderEmployeeDetails(selectedEmployeeId);
    };

    // Function to open a modal
    const openModal = (modalElement) => {
        modalElement.style.display = 'flex';
        setTimeout(() => modalElement.classList.add('active'), 10);
    };

    // Function to close a modal
    const closeModal = (modalElement) => {
        modalElement.classList.remove('active');
        setTimeout(() => modalElement.style.display = 'none', 300);
    };

    // Function to handle initial page render based on role
    const renderPageBasedOnRole = () => {
        const role = localStorage.getItem('userRole') || 'admin';
        let dataToDisplay = [];
        let isActionable = false;
        
        // Hide all action buttons by default, then show based on role
        const roleBasedButtons = [addGoalBtn, addCompetencyBtn, document.getElementById('add-employee-btn'), document.getElementById('import-goals-btn'), document.getElementById('export-goals-btn')];
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
            addGoalBtn.style.display = 'block';
            addCompetencyBtn.style.display = 'block';
        } else if (role === 'user') {
            const user = mockEmployees.find(e => e.fullName === 'Mark Johnson');
            if (user) {
                displayEmployeeDetails(user);
                return;
            }
        }

        originalEmployeeData = dataToDisplay;
        renderGoalsEmployeesTable(dataToDisplay, isActionable);
    };

    // New search functionality
    const setupSearch = () => {
        goalsSearchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredEmployees = originalEmployeeData.filter(employee => {
                return Object.values(employee).some(value => 
                    (value?.toString()?.toLowerCase() ?? '').includes(searchTerm)
                );
            });
            const role = localStorage.getItem('userRole') || 'admin';
            let isActionable = (role === 'admin' || role === 'manager');
            renderGoalsEmployeesTable(filteredEmployees, isActionable);
        });
    };

    // Event Listeners
    backBtn.addEventListener('click', () => {
        goalsListView.style.display = 'block';
        employeeDetailView.style.display = 'none';
        renderPageBasedOnRole();
    });

    toggleColumnsBtn.addEventListener('click', () => {
        columnTogglerContainer.style.display = columnTogglerContainer.style.display === 'flex' ? 'none' : 'flex';
    });

    addGoalBtn.addEventListener('click', () => openModal(goalModal));
    addCompetencyBtn.addEventListener('click', () => openModal(competencyModal));
    
    // Close modals on button click or overlay click
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

    // Populate column toggler with checkboxes
    employeeColumns.forEach(col => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" data-column="${col.dataKey}" checked> ${col.name}`;
        columnTogglerContainer.appendChild(label);
        label.querySelector('input').addEventListener('change', updateTableVisibility);
    });

    // Handle form submissions
    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! In a real app, this would save the new goal.');
        closeModal(goalModal);
    });

    competencyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! In a real app, this would save the new competency.');
        closeModal(competencyModal);
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