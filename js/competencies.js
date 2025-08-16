document.addEventListener('DOMContentLoaded', () => {
    const userRole = localStorage.getItem('userRole');
    const tableBody = document.getElementById('competencies-table-body');

    // Mock data for competencies, with at least 10 records
    const competencies = [
        { id: 'C-001', employeeId: 'DBP-001', fullName: 'Abel Tesfaye', type: 'Leadership', group: 'Strategic Thinking', rating: 9 },
        { id: 'C-002', employeeId: 'DBP-002', fullName: 'John Doe', type: 'Technical', group: 'Data Analysis', rating: 8 },
        { id: 'C-003', employeeId: 'DBP-003', fullName: 'Jane Smith', type: 'Leadership', group: 'People Management', rating: 10 },
        { id: 'C-004', employeeId: 'DBP-004', fullName: 'Mark Johnson', type: 'Interpersonal', group: 'Communication', rating: 7 },
        { id: 'C-005', employeeId: 'DBP-005', fullName: 'Sarah Davis', type: 'Technical', group: 'Cybersecurity', rating: 9 },
        { id: 'C-006', employeeId: 'DBP-006', fullName: 'Alex Williams', type: 'Leadership', group: 'Change Management', rating: 9 },
        { id: 'C-007', employeeId: 'DBP-007', fullName: 'Michael Jordan', type: 'Interpersonal', group: 'Conflict Resolution', rating: 8 },
        { id: 'C-008', employeeId: 'DBP-008', fullName: 'Emily Clark', type: 'Technical', group: 'Cloud Computing', rating: 7 },
        { id: 'C-009', employeeId: 'DBP-009', fullName: 'David Lee', type: 'Technical', group: 'Financial Modeling', rating: 8 },
        { id: 'C-010', employeeId: 'DBP-010', fullName: 'Maria Rodriguez', type: 'Interpersonal', group: 'Teamwork', rating: 9 }
    ];

    // Function to generate the rating dropdown
    const getRatingDropdown = (currentRating) => {
        let options = '';
        for (let i = 1; i <= 10; i++) {
            options += `<option value="${i}" ${i === currentRating ? 'selected' : ''}>${i}</option>`;
        }
        return `
            <select class="rating-dropdown">
                ${options}
            </select>
        `;
    };

    // Function to render the table rows from the data
    const renderTable = (data) => {
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            let ratingCellHtml;
            let actionCellHtml;
            
            // Managers and Admins can rate, regular users can only see the rating
            if (userRole === 'admin' || userRole === 'manager') {
                ratingCellHtml = `<td>${getRatingDropdown(item.rating)}</td>`;
                actionCellHtml = `<td><button class="update-btn">Update</button></td>`;
            } else {
                ratingCellHtml = `<td>${item.rating}</td>`;
                actionCellHtml = `<td>-</td>`;
            }

            row.innerHTML = `
                <td>${item.employeeId}</td>
                <td>${item.fullName}</td>
                <td>${item.type}</td>
                <td>${item.group}</td>
                ${ratingCellHtml}
                ${actionCellHtml}
            `;
            tableBody.appendChild(row);
        });
    };

    // Initial render of the table with mock data
    renderTable(competencies);

    // Setup search functionality using the global function from script.js
    setupTableSearch('#competency-search', '#competencies-table');

    // Handle rating updates for Managers and Admins
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('update-btn')) {
            const row = e.target.closest('tr');
            const ratingDropdown = row.querySelector('.rating-dropdown');
            const newRating = ratingDropdown.value;
            const employeeId = row.querySelector('td:first-child').textContent;
            
            console.log(`Updating competency rating for ${employeeId} to ${newRating}`);
            
            // Find and update the competency in our mock data
            const competencyToUpdate = competencies.find(c => c.employeeId === employeeId);
            if (competencyToUpdate) {
                competencyToUpdate.rating = parseInt(newRating);
                renderTable(competencies); // Re-render the table to show the changes
            }
        }
    });
});