// display project

// Fetch the selected project data from localStorage
document.addEventListener("DOMContentLoaded", () => {
    const selectedProject = JSON.parse(localStorage.getItem("selectedProject"));

    if (selectedProject) {
        // Populate the project details
        document.getElementById("companyName").textContent = selectedProject.companyName || "N/A";
        document.getElementById("email").textContent = selectedProject.email || "N/A";
        document.getElementById("phoneNumber").textContent = selectedProject.phoneNumber || "N/A";
        document.getElementById("address").textContent = selectedProject.address || "N/A";
        document.getElementById("city").textContent = selectedProject.city || "N/A";
        document.getElementById("country").textContent = selectedProject.country || "N/A";
        document.getElementById("description").textContent = selectedProject.description || "N/A";

        document.getElementById("startDate").textContent = selectedProject.startDate || "N/A";
        document.getElementById("endDate").textContent = selectedProject.endDate || "N/A";
        document.getElementById("managerName").textContent = selectedProject.managerName || "N/A";
        document.getElementById("companyActivity").textContent = selectedProject.companyActivity || "N/A";
        document.getElementById("service").textContent = selectedProject.service || "N/A";
        document.getElementById("coordinator").textContent = selectedProject.coordinator || "N/A";
        document.getElementById("status").textContent = selectedProject.status || "N/A";
        document.getElementById("uploadedFiles").textContent = selectedProject.uploadedFiles || "N/A";
    } else {
        alert("No project selected. Please navigate from the dashboard.");
        window.location.href = "dashboard.html";
    }
});

// Edit Project functionality (if required)
document.getElementById("editProjectButton").addEventListener("click", () => {
    const selectedProject = JSON.parse(localStorage.getItem("selectedProject"));
    if (selectedProject) {
        // Pre-fill the modal form with existing project details
        document.getElementById("editCompanyName").value = selectedProject.companyName || "";
        document.getElementById("editEmail").value = selectedProject.email || "";
        document.getElementById("editPhoneNumber").value = selectedProject.phoneNumber || "";
        document.getElementById("editAddress").value = selectedProject.address || "";
        document.getElementById("editCity").value = selectedProject.city || "";
        document.getElementById("editCountry").value = selectedProject.country || "";
        document.getElementById("editManagerName").value = selectedProject.managerName || "";
        document.getElementById("editCompanyActivity").value = selectedProject.companyActivity || "";
        document.getElementById("editService").value = selectedProject.service || "";
        document.getElementById("editCoordinator").value = selectedProject.coordinator || "";
        document.getElementById("editStatus").value = selectedProject.status || "";
        document.getElementById("editStartDate").value = selectedProject.startDate || "";
        document.getElementById("editEndDate").value = selectedProject.endDate || "";
        document.getElementById("editDescription").value = selectedProject.description || "";
        
        // Open the modal
        document.getElementById("editModal").classList.remove("hidden");
    }
});

// Close Edit Modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("editModal").classList.add("hidden");
});







// delete and edit button

const editModal = document.getElementById('editModal');
const editProjectButton = document.getElementById('editProjectButton');
const closeModalButton = document.getElementById('closeModal');
const editProjectForm = document.getElementById('editProjectForm');

// Show Edit Modal
editProjectButton.addEventListener('click', function () {
    const project = JSON.parse(localStorage.getItem('selectedProject'));
    if (project) {
        // Populate modal fields with existing data
        document.getElementById('editCompanyName').value = project.companyName || '';
        document.getElementById('editService').value = project.service || '';
        document.getElementById('editDescription').value = project.description || '';
        document.getElementById('editStartDate').value = project.startDate || '';
        document.getElementById('editEndDate').value = project.endDate || '';
        document.getElementById('editStatus').value = project.status || 'Pending';
        document.getElementById('editManagerName').value = project.managerName || '';
    }
    editModal.classList.remove('hidden');
});

// Close Edit Modal
closeModalButton.addEventListener('click', function () {
    editModal.classList.add('hidden');
});

// Save Changes
editProjectForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const project = JSON.parse(localStorage.getItem('selectedProject'));
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    // Update project data
    if (project) {
        project.companyName = document.getElementById('editCompanyName').value;
        project.service = document.getElementById('editService').value;
        project.description = document.getElementById('editDescription').value;
        project.startDate = document.getElementById('editStartDate').value;
        project.endDate = document.getElementById('editEndDate').value;
        project.status = document.getElementById('editStatus').value;
        project.managerName = document.getElementById('editManagerName').value;

        // Save changes to localStorage
        const projectIndex = projects.findIndex(p => p.id === project.id);
        if (projectIndex !== -1) {
            projects[projectIndex] = project;
            localStorage.setItem('projects', JSON.stringify(projects));
            localStorage.setItem('selectedProject', JSON.stringify(project));
            alert('Project updated successfully!');
            location.reload();
        }
    }
});

// Delete Confirmation
document.getElementById('deleteProjectButton').addEventListener('click', function () {
    if (confirm('Are you sure you want to delete this project?')) {
        const project = JSON.parse(localStorage.getItem('selectedProject'));
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const updatedProjects = projects.filter(p => p.id !== project.id);

        localStorage.setItem('projects', JSON.stringify(updatedProjects));
        localStorage.removeItem('selectedProject');
        alert('Project deleted successfully!');
        window.location.href = 'dashboard.html';
    }
});



// scrolling for the popup window

document.addEventListener('DOMContentLoaded', () => {
    const editModal = document.getElementById('editModal');
    const editProjectButton = document.getElementById('editProjectButton');
    const closeModal = document.getElementById('closeModal');

    // Open the modal
    editProjectButton.addEventListener('click', () => {
        editModal.classList.remove('hidden');
    });

    // Close the modal
    closeModal.addEventListener('click', () => {
        editModal.classList.add('hidden');
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.classList.add('hidden');
        }
    });
});



// progress bar
document.getElementById("editProjectForm").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const projectId = JSON.parse(localStorage.getItem("selectedProject")).id;
    const projects = JSON.parse(localStorage.getItem("projects"));
  
    const updatedProject = {
      id: projectId,
      name: document.getElementById("editCompanyName").value,
      service: document.getElementById("editService").value,
      status: document.getElementById("editStatus").value, // Updated status
    };

  });
  