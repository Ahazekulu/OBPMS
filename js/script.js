// Function to handle search input
const setupTableSearch = (inputSelector, tableSelector) => {
    const searchInput = document.querySelector(inputSelector);
    const table = document.querySelector(tableSelector);
    if (!searchInput || !table) return;

    const body = table.querySelector('tbody');
    const rows = body.querySelectorAll('tr');

    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(filter) ? '' : 'none';
        });
    });
};

// Function to make table headers sortable
const makeSortable = (table) => {
    if (!table) return;
    const headers = table.querySelectorAll('th');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.dataset.column;
            const body = table.querySelector('tbody');
            const rows = Array.from(body.querySelectorAll('tr'));
            const sortDirection = header.classList.contains('asc') ? 'desc' : 'asc';
            
            rows.sort((a, b) => {
                const aText = a.querySelector(`td[data-column="${column}"]`).textContent.toLowerCase();
                const bText = b.querySelector(`td[data-column="${column}"]`).textContent.toLowerCase();
                
                if (aText < bText) return sortDirection === 'asc' ? -1 : 1;
                if (aText > bText) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });

            headers.forEach(h => h.classList.remove('asc', 'desc'));
            header.classList.add(sortDirection);
            rows.forEach(row => body.appendChild(row));
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const userRoleSelect = document.getElementById('user-role');
    
    // Set initial role from localStorage or default to 'admin'
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
        userRoleSelect.value = storedRole;
    } else {
        localStorage.setItem('userRole', 'admin');
    }

    // Save the selected role to localStorage whenever it changes
    userRoleSelect.addEventListener('change', (e) => {
        localStorage.setItem('userRole', e.target.value);
        // Reload the current page to apply the new role
        location.reload(); 
    });

    // Common logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = '../pages/login.html';
        });
    }
});