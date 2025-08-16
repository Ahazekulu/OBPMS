document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data: The source of the magic ---
    // This represents the data for the currently logged-in user
    const currentUserProfile = {
        id: 'DBP-002',
        fullName: 'John Doe',
        jobPosition: 'Senior Analyst',
        managerName: 'Abel Tesfaye',
        email: 'john.d@dagnebank.com',
        profilePicture: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        performance: {
            reviewScore: 4.5,
            goalsCompleted: 7,
            rewardsCount: 2
        },
        competencies: [
            { id: 1, name: 'Leadership', selfRating: 3.5, managerRating: 4.0 },
            { id: 2, name: 'Technical Skills', selfRating: 4.5, managerRating: 4.5 },
            { id: 3, name: 'Communication', selfRating: 4.0, managerRating: 3.8 },
            { id: 4, name: 'Problem Solving', selfRating: 4.5, managerRating: 4.2 },
        ],
        role: localStorage.getItem('userRole') || 'user'
    };
    
    // --- DOM Elements ---
    const profileName = document.getElementById('profile-name');
    const profileJobTitle = document.getElementById('profile-job-title');
    const profileManager = document.getElementById('profile-manager');
    const profileEmail = document.getElementById('profile-email');
    const profilePicture = document.getElementById('profile-picture');
    const summaryCardsContainer = document.getElementById('summary-cards-container');
    const competenciesTableBody = document.getElementById('competencies-table-body');
    const careerPathContent = document.getElementById('career-path-content');
    const exportDataBtn = document.getElementById('export-data-btn');

    // --- Core Functions ---
    const renderProfileHeader = () => {
        profileName.textContent = currentUserProfile.fullName;
        profileJobTitle.textContent = currentUserProfile.jobPosition;
        profileManager.textContent = currentUserProfile.managerName;
        profileEmail.textContent = currentUserProfile.email;
        profilePicture.src = currentUserProfile.profilePicture;
    };

    const renderPerformanceSummary = () => {
        const summaryData = [
            { icon: 'fas fa-star', value: currentUserProfile.performance.reviewScore, label: 'Review Score' },
            { icon: 'fas fa-bullseye', value: currentUserProfile.performance.goalsCompleted, label: 'Goals Completed' },
            { icon: 'fas fa-gift', value: currentUserProfile.performance.rewardsCount, label: 'Awards Received' }
        ];

        summaryCardsContainer.innerHTML = summaryData.map(item => `
            <div class="summary-card">
                <i class="icon ${item.icon}"></i>
                <div class="value">${item.value}</div>
                <div class="label">${item.label}</div>
            </div>
        `).join('');
    };

    const renderCompetencies = () => {
        competenciesTableBody.innerHTML = '';
        currentUserProfile.competencies.forEach(comp => {
            const gap = comp.selfRating - comp.managerRating;
            const gapClass = gap > 0 ? 'positive' : (gap < 0 ? 'negative' : 'zero');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${comp.name}</td>
                <td>
                    <div class="rating-container">
                        <input type="number" class="rating-input" value="${comp.selfRating}" min="1" max="5" step="0.5" data-id="${comp.id}">
                    </div>
                </td>
                <td>
                    <div class="rating-bar-container">
                        <div class="rating-bar" style="width: ${comp.managerRating / 5 * 100}%;"></div>
                    </div>
                    <span>${comp.managerRating}</span>
                </td>
                <td>
                    <span class="gap-indicator ${gapClass}">${gap.toFixed(1)}</span>
                </td>
            `;
            competenciesTableBody.appendChild(row);
        });
    };

    const renderCareerPath = () => {
        let recommendations = [];
        if (currentUserProfile.jobPosition === 'Senior Analyst') {
            recommendations = [
                'Complete the "Leadership Essentials" training program to prepare for a managerial role.',
                'Find a mentor in your desired career track.',
                'Seek opportunities to lead a small project or initiative.',
                'Focus on improving your communication skills with cross-departmental teams.'
            ];
        } else {
            recommendations = ['Based on your role, we recommend speaking with your manager about potential career development opportunities.'];
        }

        careerPathContent.innerHTML = `
            <h3>Next Steps for Your Career:</h3>
            <ul>
                ${recommendations.map(rec => `<li><i class="fas fa-arrow-right"></i> ${rec}</li>`).join('')}
            </ul>
        `;
    };

    const updateRating = (id, newRating) => {
        const comp = currentUserProfile.competencies.find(c => c.id == id);
        if (comp) {
            comp.selfRating = parseFloat(newRating);
            renderCompetencies(); // Re-render to show updated gap
        }
    };

    const exportData = () => {
        const data = {
            profile: currentUserProfile,
            goals: [], // Placeholder for user's goals
            reviews: [], // Placeholder for user's reviews
            feedback: [] // Placeholder for user's feedback
        };
        const filename = `${currentUserProfile.fullName.replace(/\s/g, '_')}_profile_data.json`;
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- Event Listeners ---
    competenciesTableBody.addEventListener('input', (e) => {
        if (e.target.classList.contains('rating-input')) {
            updateRating(e.target.dataset.id, e.target.value);
        }
    });

    exportDataBtn.addEventListener('click', exportData);
    
    document.getElementById('edit-profile-btn').addEventListener('click', () => {
        alert("This feature is under construction. It will allow you to update your contact information.");
    });
    
    // Initial page load
    renderProfileHeader();
    renderPerformanceSummary();
    renderCompetencies();
    renderCareerPath();
});