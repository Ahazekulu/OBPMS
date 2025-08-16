document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data ---
    let mockData = {
        positions: [
            { id: 'POS-001', name: 'Senior Analyst' },
            { id: 'POS-002', name: 'Manager' },
            { id: 'POS-003', name: 'Chief' },
            { id: 'POS-004', name: 'Data Scientist' },
        ],
        divisions: [
            { id: 'DIV-001', name: 'Corporate Banking' },
            { id: 'DIV-002', name: 'Retail Banking' },
        ],
        directorates: [
            { id: 'DIR-001', name: 'Financial Control' },
            { id: 'DIR-002', name: 'Risk Management' },
        ],
        chiefs: [
            { id: 'CHIEF-001', name: 'Abel Tesfaye' },
            { id: 'CHIEF-002', name: 'Selam Kebede' },
        ],
        competencies: [
            { id: 'COMP-001', name: 'Leadership', category: 'Soft Skills', description: 'Ability to guide and motivate teams.', avgRating: 4.5 },
            { id: 'COMP-002', name: 'Technical Proficiency', category: 'Hard Skills', description: 'Expertise in specialized tools and methods.', avgRating: 4.8 },
            { id: 'COMP-003', name: 'Problem Solving', category: 'Cognitive Skills', description: 'Capability to analyze issues and find solutions.', avgRating: 4.2 },
            { id: 'COMP-004', name: 'Communication', category: 'Soft Skills', description: 'Clear and effective exchange of information.', avgRating: 3.9 },
            { id: 'COMP-005', name: 'Adaptability', category: 'Behavioral', description: 'Ability to adjust to new conditions.', avgRating: 4.1 },
        ]
    };

    // --- DOM Elements ---
    const tabsContainer = document.querySelector('.tabs');
    const tabContents = document.querySelectorAll('.tab-content');
    const positionsTableBody = document.getElementById('positions-table-body');
    const divisionsTableBody = document.getElementById('divisions-table-body');
    const directoratesTableBody = document.getElementById('directorates-table-body');
    const chiefsTableBody = document.getElementById('chiefs-table-body');
    const competenciesTableBody = document.getElementById('competencies-table-body');
    const totalCompetenciesEl = document.getElementById('total-competencies');
    const avgRatingEl = document.getElementById('avg-rating');
    const totalCategoriesEl = document.getElementById('total-categories');
    const adminOnlyElements = document.querySelectorAll('.admin-only');

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

    const renderTable = (tableBody, data, type) => {
        tableBody.innerHTML = '';
        if (data.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="${type === 'competencies' ? '6' : '3'}" class="no-data">No data available.</td></tr>`;
            return;
        }

        data.forEach(item => {
            const row = document.createElement('tr');
            if (type === 'competencies') {
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.category}</td>
                    <td>${item.description}</td>
                    <td>${item.avgRating ? item.avgRating.toFixed(1) : 'N/A'}</td>
                    <td class="admin-only">
                        <button class="action-btn secondary edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="action-btn secondary delete-btn"><i class="fas fa-trash-alt"></i></button>
                    </td>
                `;
            } else {
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td class="admin-only">
                        <button class="action-btn secondary edit-btn"><i class="fas fa-edit"></i></button>
                        <button class="action-btn secondary delete-btn"><i class="fas fa-trash-alt"></i></button>
                    </td>
                `;
            }
            tableBody.appendChild(row);
        });
    };

    const renderCompetenciesDashboard = () => {
        const totalCompetencies = mockData.competencies.length;
        const totalRatings = mockData.competencies.reduce((sum, comp) => sum + comp.avgRating, 0);
        const avgRating = totalCompetencies > 0 ? (totalRatings / totalCompetencies).toFixed(1) : '0';
        const uniqueCategories = new Set(mockData.competencies.map(comp => comp.category)).size;

        totalCompetenciesEl.textContent = totalCompetencies;
        avgRatingEl.textContent = avgRating;
        totalCategoriesEl.textContent = uniqueCategories;
    };
    
    const showAdminFeatures = () => {
        if (currentUser.role === 'admin') {
            adminOnlyElements.forEach(el => el.style.display = 'table-cell');
        } else {
            adminOnlyElements.forEach(el => el.style.display = 'none');
        }
    };

    // --- Event Listeners ---
    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const tabId = e.target.dataset.tab;
            switchTab(tabId);
            if (tabId === 'positions') renderTable(positionsTableBody, mockData.positions);
            if (tabId === 'divisions') renderTable(divisionsTableBody, mockData.divisions);
            if (tabId === 'directorates') renderTable(directoratesTableBody, mockData.directorates);
            if (tabId === 'chiefs') renderTable(chiefsTableBody, mockData.chiefs);
            if (tabId === 'competencies') {
                renderCompetenciesDashboard();
                renderTable(competenciesTableBody, mockData.competencies, 'competencies');
            }
        }
    });

    // Initial page load
    switchTab('positions');
    renderTable(positionsTableBody, mockData.positions);
    showAdminFeatures();
});