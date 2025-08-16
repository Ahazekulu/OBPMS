document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data: The "magic" is in how we use this data ---
    const mockEmployees = [
        { id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief', rank: 1, combinedScore: 5.0 },
        { id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst', rank: 2, combinedScore: 4.5 },
        { id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager', rank: 3, combinedScore: 4.2 },
        { id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst', rank: 4, combinedScore: 3.8 },
        { id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist', rank: 5, combinedScore: 3.5 },
        { id: 'DBP-006', fullName: 'Alex Williams', jobPosition: 'Senior Manager', rank: 6, combinedScore: 3.3 },
        { id: 'DBP-007', fullName: 'Michael Jordan', jobPosition: 'Manager', rank: 7, combinedScore: 3.0 },
    ];

    const mockRewards = [
        { id: 1, name: 'Top Performer Award', description: 'Awarded to the highest-ranking employee of the quarter.', criteria: { type: 'rank', value: 1 }, expectedReward: 'Certificate, Plaque, and a cash bonus.' },
        { id: 2, name: 'CEO\'s Circle', description: 'Recognizing employees in the top 5% of all ranks.', criteria: { type: 'rank_percentage', value: 5 }, expectedReward: 'Invitation to annual leadership summit and cash bonus.' },
        { id: 3, name: 'Outstanding Manager Award', description: 'For managers with a combined performance score above 4.5.', criteria: { type: 'score_and_role', value: 4.5, role: 'Manager' }, expectedReward: 'Promotion opportunity and a training voucher.' },
        { id: 4, name: 'Service Excellence Award', description: 'For employees with a long-term excellent service record.', criteria: { type: 'all', role: 'All' }, expectedReward: 'Extra vacation day and a special lunch.' },
        { id: 5, name: 'High-Potential Employee', description: 'For employees with a performance rank in the top 20%.', criteria: { type: 'rank_percentage', value: 20 }, expectedReward: 'Mentorship with an executive and a specialized training program.' }
    ];

    const mockAwardWinners = [
        { employeeId: 'DBP-001', rewardId: 1, date: '2025-07-01' },
        { employeeId: 'DBP-003', rewardId: 3, date: '2025-07-01' },
    ];
    
    // --- DOM Elements ---
    const tabsContainer = document.querySelector('.tabs');
    const tabContents = document.querySelectorAll('.tab-content');
    const bankRewardsTableBody = document.getElementById('bank-rewards-table-body');
    const myEligibilityTableBody = document.getElementById('my-eligibility-table-body');
    const awardWinnersTableBody = document.getElementById('award-winners-table-body');
    const addRewardBtn = document.getElementById('add-reward-btn');
    const addWinnerBtn = document.getElementById('add-winner-btn');
    const rewardModal = document.getElementById('reward-modal');
    const winnerModal = document.getElementById('winner-modal');
    const rewardForm = document.getElementById('reward-form');
    const winnerForm = document.getElementById('winner-form');
    const winnerEmployeeSelect = document.getElementById('winner-employee');
    const winnerRewardSelect = document.getElementById('winner-reward');

    // --- State variables ---
    const currentUser = {
        id: 'DBP-002', // Default to John Doe for demonstration purposes
        fullName: 'John Doe',
        jobPosition: 'Senior Analyst',
        rank: 2,
        combinedScore: 4.5,
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

    const getEmployee = (id) => mockEmployees.find(emp => emp.id === id);
    const getReward = (id) => mockRewards.find(rew => rew.id === id);

    const isEligible = (employee, reward) => {
        const criteria = reward.criteria;
        const totalEmployees = mockEmployees.length;

        switch (criteria.type) {
            case 'rank':
                return employee.rank === criteria.value;
            case 'rank_percentage':
                const topPercentage = Math.ceil((criteria.value / 100) * totalEmployees);
                return employee.rank <= topPercentage;
            case 'score_and_role':
                return employee.jobPosition.toLowerCase().includes(criteria.role.toLowerCase()) && employee.combinedScore >= criteria.value;
            case 'all':
                return true;
            default:
                return false;
        }
    };

    const renderTable = (tableBody, data) => {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="4" class="no-data">No data available.</td></tr>`;
            return;
        }

        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name || getEmployee(item.employeeId)?.fullName}</td>
                <td>${item.description || getReward(item.rewardId)?.name}</td>
                <td>${item.criteria ? item.criteria.type.replace(/_/g, ' ') : 'N/A'}</td>
                <td>${item.expectedReward || item.date}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    const renderBankRewards = () => {
        renderTable(bankRewardsTableBody, mockRewards);
    };

    const renderMyEligibility = () => {
        const eligibleRewards = mockRewards.filter(reward => isEligible(currentUser, reward));
        renderTable(myEligibilityTableBody, eligibleRewards);
    };

    const renderAwardWinners = () => {
        const winnersData = mockAwardWinners.map(winner => {
            return {
                employeeId: winner.employeeId,
                rewardId: winner.rewardId,
                date: winner.date,
                name: getEmployee(winner.employeeId)?.fullName,
                description: getReward(winner.rewardId)?.name,
                criteria: 'Awarded',
                expectedReward: winner.date
            };
        });
        renderTable(awardWinnersTableBody, winnersData);
    };

    const openModal = (modalElement) => {
        modalElement.style.display = 'flex';
        setTimeout(() => modalElement.classList.add('active'), 10);
    };

    const closeModal = (modalElement) => {
        modalElement.classList.remove('active');
        setTimeout(() => {
            modalElement.style.display = 'none';
        }, 300);
    };

    const populateWinnerForms = () => {
        mockEmployees.forEach(emp => {
            const option = document.createElement('option');
            option.value = emp.id;
            option.textContent = emp.fullName;
            winnerEmployeeSelect.appendChild(option);
        });

        mockRewards.forEach(rew => {
            const option = document.createElement('option');
            option.value = rew.id;
            option.textContent = rew.name;
            winnerRewardSelect.appendChild(option);
        });
    };
    
    // --- Event Listeners ---
    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabId = e.target.dataset.tab;
            switchTab(tabId);
            if (tabId === 'bank-rewards') {
                renderBankRewards();
            } else if (tabId === 'my-eligibility') {
                renderMyEligibility();
            } else if (tabId === 'award-winners') {
                renderAwardWinners();
            }
        }
    });

    addRewardBtn.addEventListener('click', () => {
        openModal(rewardModal);
    });

    addWinnerBtn.addEventListener('click', () => {
        populateWinnerForms();
        openModal(winnerModal);
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

    rewardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(rewardForm);
        const newReward = {
            id: mockRewards.length + 1,
            name: formData.get('rewardName'),
            description: formData.get('description'),
            criteria: { type: 'manual', value: formData.get('criteria') }, // A simplified approach
            expectedReward: formData.get('expectedReward')
        };
        mockRewards.push(newReward);
        alert(`Reward "${newReward.name}" declared successfully!`);
        closeModal(rewardModal);
        renderBankRewards();
    });

    winnerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(winnerForm);
        const newWinner = {
            employeeId: formData.get('winnerEmployeeId'),
            rewardId: parseInt(formData.get('winnerRewardId')),
            date: new Date().toISOString().slice(0, 10)
        };
        mockAwardWinners.push(newWinner);
        alert(`Award winner added successfully!`);
        closeModal(winnerModal);
        renderAwardWinners();
    });

    // Initial page load
    renderBankRewards();
    document.getElementById('my-eligibility').style.display = 'none';
    document.getElementById('award-winners').style.display = 'none';
});