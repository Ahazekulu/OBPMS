document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    const mockEmployees = [
        { id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief', managerId: null },
        { id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst', managerId: 'DBP-001' },
        { id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager', managerId: 'DBP-001' },
        { id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst', managerId: 'DBP-003' },
        { id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist', managerId: 'DBP-002' },
        { id: 'DBP-006', fullName: 'Alex Williams', jobPosition: 'Senior Manager', managerId: 'DBP-001' },
    ];

    const mockFeedback = [
        // Feedback given to John Doe
        { id: 1, fromEmployeeId: 'DBP-003', toEmployeeId: 'DBP-002', type: 'Positive', message: 'John did an excellent job leading the Q2 report project. His dedication is a great example for the team.', isPrivate: false, date: '2025-07-25' },
        { id: 2, fromEmployeeId: 'DBP-001', toEmployeeId: 'DBP-002', type: 'Constructive', message: 'Consider improving your presentation skills for larger stakeholder meetings.', isPrivate: false, date: '2025-07-20' },
        // Feedback given by John Doe
        { id: 3, fromEmployeeId: 'DBP-002', toEmployeeId: 'DBP-005', type: 'General', message: 'Sarah, your analysis on the market data was insightful. Keep up the great work!', isPrivate: false, date: '2025-07-22' },
        // Feedback from Jane Smith
        { id: 4, fromEmployeeId: 'DBP-003', toEmployeeId: 'DBP-004', type: 'Positive', message: 'Mark showed great initiative on the new client proposal. Very impressed!', isPrivate: false, date: '2025-07-24' },
    ];
    
    // --- DOM Elements ---
    const tabsContainer = document.querySelector('.tabs');
    const tabContents = document.querySelectorAll('.tab-content');
    const feedbackForm = document.getElementById('feedback-form');
    const employeeSearchInput = document.getElementById('employee-search');
    const employeeSelect = document.getElementById('employee-select');
    const employeeSuggestions = document.getElementById('employee-suggestions');
    const receivedTableBody = document.getElementById('received-feedback-table-body');
    const givenTableBody = document.getElementById('given-feedback-table-body');
    const receivedFilter = document.getElementById('received-filter');
    const givenFilter = document.getElementById('given-filter');
    const requestFeedbackBtn = document.getElementById('request-feedback-btn');

    // --- State variables ---
    const currentUser = {
        id: 'DBP-002', // Default to John Doe for demonstration
        fullName: 'John Doe',
        managerId: 'DBP-001',
    };

    // --- Functions ---
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

    const getEmployeeName = (id) => {
        const employee = mockEmployees.find(emp => emp.id === id);
        return employee ? employee.fullName : 'N/A';
    };

    const renderReceivedFeedback = (filterType = 'All') => {
        receivedTableBody.innerHTML = '';
        const received = mockFeedback.filter(f => f.toEmployeeId === currentUser.id);

        const filtered = filterType === 'All' ? received : received.filter(f => f.type === filterType);
        
        if (filtered.length === 0) {
            receivedTableBody.innerHTML = '<tr><td colspan="4" class="no-data">No feedback received yet.</td></tr>';
            return;
        }

        filtered.forEach(feedback => {
            const fromName = getEmployeeName(feedback.fromEmployeeId);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${fromName}</td>
                <td><span class="status-badge ${feedback.type.toLowerCase()}">${feedback.type}</span></td>
                <td>${feedback.message}</td>
                <td>${feedback.date}</td>
            `;
            receivedTableBody.appendChild(row);
        });
    };

    const renderGivenFeedback = (filterType = 'All') => {
        givenTableBody.innerHTML = '';
        const given = mockFeedback.filter(f => f.fromEmployeeId === currentUser.id);

        const filtered = filterType === 'All' ? given : given.filter(f => f.type === filterType);

        if (filtered.length === 0) {
            givenTableBody.innerHTML = '<tr><td colspan="4" class="no-data">You have not given any feedback yet.</td></tr>';
            return;
        }

        filtered.forEach(feedback => {
            const toName = getEmployeeName(feedback.toEmployeeId);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${toName}</td>
                <td><span class="status-badge ${feedback.type.toLowerCase()}">${feedback.type}</span></td>
                <td>${feedback.message}</td>
                <td>${feedback.date}</td>
            `;
            givenTableBody.appendChild(row);
        });
    };

    const handleEmployeeSearch = (searchTerm) => {
        employeeSuggestions.innerHTML = '';
        if (searchTerm.length < 2) return;

        const filteredEmployees = mockEmployees.filter(emp => 
            emp.id !== currentUser.id && emp.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredEmployees.length === 0) {
            employeeSuggestions.innerHTML = '<li>No employees found.</li>';
            return;
        }

        filteredEmployees.forEach(emp => {
            const li = document.createElement('li');
            li.textContent = `${emp.fullName} (${emp.jobPosition})`;
            li.dataset.id = emp.id;
            li.addEventListener('click', () => {
                employeeSearchInput.value = emp.fullName;
                employeeSelect.value = emp.id;
                employeeSuggestions.innerHTML = '';
                employeeSuggestions.style.display = 'none';
            });
            employeeSuggestions.appendChild(li);
        });
        employeeSuggestions.style.display = 'block';
    };

    // --- Event Listeners ---
    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabId = e.target.dataset.tab;
            switchTab(tabId);
            if (tabId === 'received-feedback') {
                renderReceivedFeedback(receivedFilter.value);
            } else if (tabId === 'given-feedback') {
                renderGivenFeedback(givenFilter.value);
            }
        }
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(feedbackForm);
        const newFeedback = {
            id: mockFeedback.length + 1,
            fromEmployeeId: currentUser.id,
            toEmployeeId: employeeSelect.value,
            type: formData.get('feedbackType'),
            message: formData.get('feedbackMessage'),
            isPrivate: formData.has('isPrivate'),
            date: new Date().toISOString().slice(0, 10)
        };

        if (!newFeedback.toEmployeeId) {
            alert('Please select an employee to give feedback to.');
            return;
        }
        
        mockFeedback.push(newFeedback);
        
        alert(`Feedback submitted successfully to ${getEmployeeName(newFeedback.toEmployeeId)}!`);
        feedbackForm.reset();
        employeeSearchInput.value = '';
        employeeSelect.value = '';
        employeeSuggestions.style.display = 'none';
        
        // After submitting, switch to the given feedback tab to show the new entry
        switchTab('given-feedback');
        renderGivenFeedback();
    });

    employeeSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        if (searchTerm.length > 1) {
            handleEmployeeSearch(searchTerm);
        } else {
            employeeSuggestions.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.form-group')) {
            employeeSuggestions.style.display = 'none';
        }
    });

    receivedFilter.addEventListener('change', (e) => {
        renderReceivedFeedback(e.target.value);
    });

    givenFilter.addEventListener('change', (e) => {
        renderGivenFeedback(e.target.value);
    });

    requestFeedbackBtn.addEventListener('click', () => {
        alert("A feedback request has been sent to your manager and peers. We will notify you when they respond.");
    });
    
    // --- Initial page load ---
    switchTab('give-feedback'); // Start on the "Give Feedback" tab
    renderReceivedFeedback();
    renderGivenFeedback();
});