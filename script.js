document.addEventListener('DOMContentLoaded', () => {
    const dailyForm = document.getElementById('daily-form');
    const activityList = document.getElementById('activity-list');
    const passwordModal = document.getElementById('password-modal');
    const closeModal = document.querySelector('.close');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    let selectedActivity;

    const correctPassword = '1234'; // Ganti dengan kata sandi yang Anda inginkan

    // Load saved activities from LocalStorage
    loadActivities();

    // Event listener for form submission
    dailyForm.addEventListener('submit', event => {
        event.preventDefault();
        
        const date = document.getElementById('date').value;
        const activity = document.getElementById('activity').value;

        if (date && activity) {
            saveActivity(date, activity);
            displayActivity(date, activity);
            dailyForm.reset();
        }
    });

    // Function to save activity to LocalStorage
    function saveActivity(date, activity) {
        const activities = JSON.parse(localStorage.getItem('activities')) || [];
        activities.push({ date, activity });
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    // Function to load activities from LocalStorage
    function loadActivities() {
        const activities = JSON.parse(localStorage.getItem('activities')) || [];
        activities.forEach(activity => displayActivity(activity.date, activity.activity));
    }

    // Function to display activity in the list
    function displayActivity(date, activity) {
        const li = document.createElement('li');
        li.textContent = `${date}: ${activity}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            selectedActivity = { date, activity, element: li };
            passwordModal.style.display = 'block';
        });

        li.appendChild(deleteButton);
        activityList.appendChild(li);
    }

    // Function to delete activity from LocalStorage
    function deleteActivity(date, activity) {
        let activities = JSON.parse(localStorage.getItem('activities')) || [];
        activities = activities.filter(act => act.date !== date || act.activity !== activity);
        localStorage.setItem('activities', JSON.stringify(activities));
    }

    // Close modal
    closeModal.addEventListener('click', () => {
        passwordModal.style.display = 'none';
    });

    // Confirm delete action
    confirmDeleteButton.addEventListener('click', () => {
        const passwordInput = document.getElementById('password').value;
        if (passwordInput === correctPassword) {
            deleteActivity(selectedActivity.date, selectedActivity.activity);
            selectedActivity.element.remove();
            passwordModal.style.display = 'none';
            document.getElementById('password').value = ''; // Clear password input
        } else {
            alert('Kata sandi salah!');
        }
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', event => {
        if (event.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });
});
