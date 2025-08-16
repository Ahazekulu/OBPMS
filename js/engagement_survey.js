document.addEventListener('DOMContentLoaded', () => {
    // --- Mock Data: The "supermagic" comes from processing this data ---
    const mockEmployees = [
        { id: 'DBP-001', fullName: 'Abel Tesfaye', jobPosition: 'Chief', division: 'Executive' },
        { id: 'DBP-002', fullName: 'John Doe', jobPosition: 'Senior Analyst', division: 'Corporate Banking' },
        { id: 'DBP-003', fullName: 'Jane Smith', jobPosition: 'Manager', division: 'Corporate Banking' },
        { id: 'DBP-004', fullName: 'Mark Johnson', jobPosition: 'Analyst', division: 'Retail Banking' },
        { id: 'DBP-005', fullName: 'Sarah Davis', jobPosition: 'Data Scientist', division: 'Technology' },
    ];
    
    // Daniel Pink's Motivation Theory categories: Mastery, Autonomy, Purpose
    const mockSurveyQuestions = [
        { id: 'q1', category: 'Mastery', text: 'I am given opportunities to grow and develop my skills.' },
        { id: 'q2', category: 'Mastery', text: 'My work challenges me to improve my abilities.' },
        { id: 'q3', category: 'Autonomy', text: 'I have the freedom to decide how to do my work.' },
        { id: 'q4', category: 'Autonomy', text: 'My manager trusts me to manage my own tasks and schedule.' },
        { id: 'q5', category: 'Purpose', text: 'I understand how my work contributes to the bank\'s overall mission.' },
        { id: 'q6', category: 'Purpose', text: 'The work I do feels important and meaningful.' },
        { id: 'q7', category: 'Overall', text: 'Overall, I feel engaged and enthusiastic about my job.' },
    ];

    const mockSurveyResponses = [
        // Q1 2025 responses
        { employeeId: 'DBP-001', surveyPeriod: 'Q1 2025', responses: { q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5 } },
        { employeeId: 'DBP-002', surveyPeriod: 'Q1 2025', responses: { q1: 4, q2: 4, q3: 4, q4: 4, q5: 5, q6: 5, q7: 4 } },
        { employeeId: 'DBP-003', surveyPeriod: 'Q1 2025', responses: { q1: 4, q2: 3, q3: 5, q4: 4, q5: 4, q6: 4, q7: 4 } },
        { employeeId: 'DBP-004', surveyPeriod: 'Q1 2025', responses: { q1: 3, q2: 3, q3: 2, q4: 3, q5: 3, q6: 3, q7: 2 } },
        { employeeId: 'DBP-005', surveyPeriod: 'Q1 2025', responses: { q1: 5, q2: 4, q3: 4, q4: 5, q5: 5, q6: 5, q7: 5 } },

        // Q2 2025 responses
        { employeeId: 'DBP-001', surveyPeriod: 'Q2 2025', responses: { q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5 } },
        { employeeId: 'DBP-002', surveyPeriod: 'Q2 2025', responses: { q1: 5, q2: 4, q3: 4, q4: 4, q5: 5, q6: 5, q7: 5 } },
        { employeeId: 'DBP-003', surveyPeriod: 'Q2 2025', responses: { q1: 4, q2: 4, q3: 5, q4: 5, q5: 4, q6: 4, q7: 4 } },
        { employeeId: 'DBP-004', surveyPeriod: 'Q2 2025', responses: { q1: 4, q2: 3, q3: 3, q4: 3, q5: 4, q6: 4, q7: 3 } },
    ];
    
    // --- DOM Elements ---
    const dashboardView = document.getElementById('survey-dashboard-view');
    const surveyFormView = document.getElementById('survey-form-view');
    const surveyForm = document.getElementById('engagement-survey-form');
    const surveyQuestionsContainer = document.getElementById('survey-questions-container');
    const viewMyResultsBtn = document.getElementById('view-my-results-btn');
    const surveyPeriodFilter = document.getElementById('survey-period-filter');
    const teamFilter = document.getElementById('team-filter');
    const overallScoreKPI = document.getElementById('overall-score-kpi');
    const responseRateKPI = document.getElementById('response-rate-kpi');
    const questionResultsTableBody = document.getElementById('question-results-table-body');
    
    // --- Chart Instances ---
    let engagementTrendChartInstance;
    let categoryAvgChartInstance;

    // --- State Variables ---
    const currentUser = {
        id: 'DBP-004', // Mark Johnson (User role)
        fullName: 'Mark Johnson',
        role: localStorage.getItem('userRole') || 'user',
        division: 'Retail Banking'
    };
    
    // --- Core Functions ---
    const populateFilters = () => {
        const uniquePeriods = [...new Set(mockSurveyResponses.map(r => r.surveyPeriod))];
        uniquePeriods.sort().reverse().forEach(period => {
            const option = document.createElement('option');
            option.value = period;
            option.textContent = period;
            surveyPeriodFilter.appendChild(option);
        });

        const uniqueDivisions = [...new Set(mockEmployees.map(e => e.division))];
        uniqueDivisions.sort().forEach(division => {
            const option = document.createElement('option');
            option.value = division;
            option.textContent = division;
            teamFilter.appendChild(option);
        });

        const allOption = document.createElement('option');
        allOption.value = 'All';
        allOption.textContent = 'All Teams/Divisions';
        teamFilter.insertBefore(allOption, teamFilter.firstChild);
    };

    const processDashboardData = (period, division) => {
        let filteredResponses = mockSurveyResponses.filter(r => r.surveyPeriod === period);
        
        if (division !== 'All') {
            const employeeIdsInDivision = mockEmployees.filter(e => e.division === division).map(e => e.id);
            filteredResponses = filteredResponses.filter(r => employeeIdsInDivision.includes(r.employeeId));
        }
        
        const totalEmployees = (division === 'All') ? mockEmployees.length : mockEmployees.filter(e => e.division === division).length;
        const responseRate = totalEmployees > 0 ? (filteredResponses.length / totalEmployees * 100).toFixed(0) : 0;
        
        const aggregatedData = {
            totalScore: 0,
            count: 0,
            categories: { Mastery: 0, Autonomy: 0, Purpose: 0 },
            categoryCounts: { Mastery: 0, Autonomy: 0, Purpose: 0 },
            questionAverages: {}
        };

        if (filteredResponses.length === 0) {
            return {
                overallScore: 0,
                responseRate: 0,
                categoryAverages: {},
                questionAverages: {}
            };
        }

        filteredResponses.forEach(response => {
            const scores = response.responses;
            Object.keys(scores).forEach(qId => {
                const question = mockSurveyQuestions.find(q => q.id === qId);
                if (question) {
                    if (!aggregatedData.questionAverages[qId]) {
                        aggregatedData.questionAverages[qId] = { sum: 0, count: 0 };
                    }
                    aggregatedData.questionAverages[qId].sum += scores[qId];
                    aggregatedData.questionAverages[qId].count++;

                    if (question.category !== 'Overall') {
                        aggregatedData.categories[question.category] += scores[qId];
                        aggregatedData.categoryCounts[question.category]++;
                    }
                    if (question.category === 'Overall') {
                        aggregatedData.totalScore += scores[qId];
                        aggregatedData.count++;
                    }
                }
            });
        });

        const overallScore = aggregatedData.count > 0 ? (aggregatedData.totalScore / aggregatedData.count).toFixed(1) : 0;
        const categoryAverages = {};
        Object.keys(aggregatedData.categories).forEach(cat => {
            if (aggregatedData.categoryCounts[cat] > 0) {
                categoryAverages[cat] = (aggregatedData.categories[cat] / aggregatedData.categoryCounts[cat]).toFixed(1);
            }
        });

        const questionAverages = {};
        Object.keys(aggregatedData.questionAverages).forEach(qId => {
            const avg = aggregatedData.questionAverages[qId].sum / aggregatedData.questionAverages[qId].count;
            questionAverages[qId] = avg.toFixed(1);
        });

        return { overallScore, responseRate, categoryAverages, questionAverages };
    };

    const renderDashboard = () => {
        const selectedPeriod = surveyPeriodFilter.value;
        const selectedTeam = teamFilter.value;

        // Process data for the selected filters
        const { overallScore, responseRate, categoryAverages, questionAverages } = processDashboardData(selectedPeriod, selectedTeam);

        // Update KPIs
        overallScoreKPI.textContent = overallScore !== 0 ? overallScore : 'N/A';
        responseRateKPI.textContent = `${responseRate}%`;

        // Render charts
        renderTrendChart();
        renderCategoryAvgChart(categoryAverages);

        // Render table
        renderQuestionResultsTable(questionAverages);
    };

    const renderTrendChart = () => {
        const uniquePeriods = [...new Set(mockSurveyResponses.map(r => r.surveyPeriod))].sort();
        const trendData = uniquePeriods.map(period => {
            const { overallScore } = processDashboardData(period, teamFilter.value);
            return overallScore;
        });

        const ctx = document.getElementById('engagementTrendChart').getContext('2d');
        if (engagementTrendChartInstance) {
            engagementTrendChartInstance.destroy();
        }
        engagementTrendChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: uniquePeriods,
                datasets: [{
                    label: 'Overall Engagement Score',
                    data: trendData,
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 1,
                        max: 5,
                        title: { display: true, text: 'Score (1-5)' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    };

    const renderCategoryAvgChart = (categoryAverages) => {
        const labels = Object.keys(categoryAverages);
        const data = Object.values(categoryAverages);

        const ctx = document.getElementById('categoryAvgChart').getContext('2d');
        if (categoryAvgChartInstance) {
            categoryAvgChartInstance.destroy();
        }
        categoryAvgChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Avg. Score',
                    data: data,
                    backgroundColor: ['#007bff', '#28a745', '#ffc107'],
                    borderColor: '#fff',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        min: 1,
                        max: 5,
                        title: { display: true, text: 'Score (1-5)' }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    };
    
    const renderQuestionResultsTable = (questionAverages) => {
        questionResultsTableBody.innerHTML = '';
        if (Object.keys(questionAverages).length === 0) {
            questionResultsTableBody.innerHTML = '<tr><td colspan="3" class="no-data">No survey results available for this period and team.</td></tr>';
            return;
        }
        
        mockSurveyQuestions.forEach(q => {
            const avgScore = questionAverages[q.id] || '-';
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${q.text}</td>
                <td>${q.category}</td>
                <td>${avgScore}</td>
            `;
            questionResultsTableBody.appendChild(row);
        });
    };

    const renderSurveyForm = () => {
        surveyQuestionsContainer.innerHTML = '';
        mockSurveyQuestions.forEach(q => {
            const questionBlock = document.createElement('div');
            questionBlock.className = 'question-block';
            questionBlock.innerHTML = `
                <h4>${q.text}</h4>
                <div class="rating-scale">
                    <label>
                        <input type="radio" name="${q.id}" value="1" required> 1<br>Strongly Disagree
                    </label>
                    <label>
                        <input type="radio" name="${q.id}" value="2"> 2<br>Disagree
                    </label>
                    <label>
                        <input type="radio" name="${q.id}" value="3"> 3<br>Neutral
                    </label>
                    <label>
                        <input type="radio" name="${q.id}" value="4"> 4<br>Agree
                    </label>
                    <label>
                        <input type="radio" name="${q.id}" value="5"> 5<br>Strongly Agree
                    </label>
                </div>
            `;
            surveyQuestionsContainer.appendChild(questionBlock);
        });
    };
    
    const renderPageBasedOnRole = () => {
        if (currentUser.role === 'admin' || currentUser.role === 'manager') {
            dashboardView.style.display = 'block';
            surveyFormView.style.display = 'none';
            populateFilters();
            renderDashboard();
        } else {
            dashboardView.style.display = 'none';
            surveyFormView.style.display = 'block';
            renderSurveyForm();
        }
    };
    
    // --- Event Listeners ---
    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(surveyForm);
        const newResponses = {};
        for (const [key, value] of formData.entries()) {
            newResponses[key] = parseInt(value);
        }

        const surveyPeriod = 'Q3 2025'; // New period for new survey
        mockSurveyResponses.push({
            employeeId: currentUser.id,
            surveyPeriod,
            responses: newResponses
        });
        
        alert(`Thank you, ${currentUser.fullName}, for completing the survey!`);
        surveyForm.reset();
        
        // After submission, maybe take them to their results page or the dashboard
        // For now, we'll just alert and refresh
        renderPageBasedOnRole();
    });
    
    surveyPeriodFilter.addEventListener('change', renderDashboard);
    teamFilter.addEventListener('change', renderDashboard);

    viewMyResultsBtn.addEventListener('click', () => {
        // Simple logic to show employee's results. In a real app, this would be a new view.
        const myResults = mockSurveyResponses.filter(r => r.employeeId === currentUser.id);
        const latestResults = myResults.length > 0 ? myResults[myResults.length - 1] : null;

        if (latestResults) {
            let resultsMessage = `Your latest survey results from **${latestResults.surveyPeriod}**:\n\n`;
            mockSurveyQuestions.forEach(q => {
                resultsMessage += `${q.text}: ${latestResults.responses[q.id]} / 5\n`;
            });
            alert(resultsMessage);
        } else {
            alert("You have not completed any surveys yet.");
        }
    });

    // Initial page load
    renderPageBasedOnRole();
});