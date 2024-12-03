// Helper to get data from localStorage safely
const getFromLocalStorage = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || null;
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
        return null;
    }
};

// Helper to set data in localStorage
const setToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error setting ${key} to localStorage:`, error);
    }
};

// Populate project details on page load
document.addEventListener("DOMContentLoaded", () => {
    const selectedProject = getFromLocalStorage("selectedProject");

    if (!selectedProject) {
        alert("No project selected. Please navigate from the dashboard.");
        window.location.href = "dashboard.html";
        return;
    }

    const details = {
        companyName: "companyName",
        email: "email",
        phoneNumber: "phoneNumber",
        address: "address",
        city: "city",
        country: "country",
        description: "description",
        startDate: "startDate",
        endDate: "endDate",
        managerName: "managerName",
        companyActivity: "companyActivity",
        service: "service",
        coordinator: "coordinator",
        status: "status",
        uploadedFiles: "uploadedFiles"
    };

    // Populate project details
    for (const [key, id] of Object.entries(details)) {
        document.getElementById(id).textContent = selectedProject[key] || "N/A";
    }
});

// Edit Project functionality
const editModal = document.getElementById("editModal");
const editProjectForm = document.getElementById("editProjectForm");
const closeModalButton = document.getElementById("closeModal");

document.getElementById("editProjectButton").addEventListener("click", () => {
    const selectedProject = getFromLocalStorage("selectedProject");
    if (!selectedProject) return;

    // Populate modal form
    for (const field of editProjectForm.elements) {
        if (field.id.startsWith("edit") && field.id.slice(4).toLowerCase() in selectedProject) {
            const key = field.id.slice(4).charAt(0).toLowerCase() + field.id.slice(5);
            field.value = selectedProject[key] || "";
        }
    }

    editModal.classList.remove("hidden");
});

// Close Modal
closeModalButton.addEventListener("click", () => {
    editModal.classList.add("hidden");
});

// Save Changes
editProjectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const selectedProject = getFromLocalStorage("selectedProject");
    const projects = getFromLocalStorage("projects") || [];

    if (!selectedProject) return;

    // Update project with form data
    for (const field of editProjectForm.elements) {
        if (field.id.startsWith("edit")) {
            const key = field.id.slice(4).charAt(0).toLowerCase() + field.id.slice(5);
            selectedProject[key] = field.value;
        }
    }

    // Update projects in localStorage
    const projectIndex = projects.findIndex((p) => p.id === selectedProject.id);
    if (projectIndex !== -1) {
        projects[projectIndex] = selectedProject;
        setToLocalStorage("projects", projects);
        setToLocalStorage("selectedProject", selectedProject);

        alert("Project updated successfully!");
        location.reload();
    }
});

// Delete Project
document.getElementById("deleteProjectButton").addEventListener("click", () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const selectedProject = getFromLocalStorage("selectedProject");
    const projects = getFromLocalStorage("projects") || [];

    if (selectedProject) {
        const updatedProjects = projects.filter((p) => p.id !== selectedProject.id);
        setToLocalStorage("projects", updatedProjects);
        localStorage.removeItem("selectedProject");
        alert("Project deleted successfully!");
        window.location.href = "dashboard.html";
    }
});

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.classList.add("hidden");
    }
});
