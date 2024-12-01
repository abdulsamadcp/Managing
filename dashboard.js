// Toggle submenu visibility for "Projects"
document.getElementById("projectToggle").addEventListener("click", function () {
    const submenu = document.getElementById("projectSubmenu");
    if (submenu.classList.contains("hidden")) {
        submenu.classList.remove("hidden");
        submenu.classList.add("visible");
    } else {
        submenu.classList.remove("visible");
        submenu.classList.add("hidden");
    }
});


// Toggle dropdown visibility
document.getElementById("authButton").addEventListener("click", function () {
    const dropdown = document.getElementById("authDropdown");
    dropdown.classList.toggle("visible");
});

// Handle logout button
document.getElementById("logoutButton").addEventListener("click", function () {
    window.location.href = "index.html"; // Redirect to the login page
});







document.addEventListener("DOMContentLoaded", function () {
    // Translations for English and Arabic
    const translations = {
        en: {
            welcome: "Welcome Administrator!",
            login: "Log in",
            logout: "Log out",
        },
        ar: {
            welcome: "مرحباً المسؤول!",
            login: "تسجيل الدخول",
            logout: "تسجيل الخروج",
        },
    };

    // Initial language (default is English)
    let currentLanguage = "en";

    // Select necessary elements
    const welcomeText = document.getElementById("welcomeText");
    const authButton = document.getElementById("authButton");
    const logoutButton = document.getElementById("logoutButton");
    const languageToggle = document.getElementById("languageToggle");

    // Language toggle functionality
    languageToggle.addEventListener("click", function () {
        // Toggle between English and Arabic
        currentLanguage = currentLanguage === "en" ? "ar" : "en";

        // Update content
        welcomeText.textContent = translations[currentLanguage].welcome;
        authButton.textContent = translations[currentLanguage].login;
        logoutButton.textContent = translations[currentLanguage].logout;

        // Update the button label
        languageToggle.textContent = currentLanguage === "en" ? "عربي" : "English";

        // Update text direction
        document.body.classList.toggle("rtl", currentLanguage === "ar");
        document.body.classList.toggle("ltr", currentLanguage === "en");
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const projectsContainer = document.getElementById('projectsContainer'); // A container for displaying projects

    // Retrieve projects from localStorage
    const projects = JSON.parse(localStorage.getItem('projects')) || [];

    // Dynamically populate the dashboard with projects
    projects.forEach((project, index) => {
        const projectRow = document.createElement('tr');
        projectRow.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <a href="view_project.html?projectIndex=${index}">${project.projectName}</a>
                <br>
                <small>Due: ${project.endDate}</small>
            </td>
            <td>${project.startDate}</td>
            <td><span class="status ${project.status.replace(' ', '-').toLowerCase()}">${project.status}</span></td>
            <td>${project.projectManager}</td>
        `;
        projectsContainer.appendChild(projectRow);
    });
});


// Select the projects container
const projectsContainer = document.getElementById('projectsContainer');

// Retrieve and display projects from localStorage
function loadProjects() {
  const projects = JSON.parse(localStorage.getItem('projects')) || [];
  
  projectsContainer.innerHTML = ''; // Clear the container before adding

  projects.forEach((project, index) => {
    const projectRow = `
      <tr>
        <td>${index + 1}</td>
        <td><a href="./view_project.html" class="view-project" data-index="${index}">${project.companyName}</a></td>
        <td><progress value="${getStatusProgress(project.status)}" max="100"></progress></td>
        <td><span class="status ${getStatusClass(project.status)}">${project.status}</span></td>
        <td>${project.coordinator}</td>
      </tr>
    `;
    projectsContainer.innerHTML += projectRow;
  });

  // Add event listeners for "View Project" links
  const projectLinks = document.querySelectorAll('.view-project');
  projectLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const projectIndex = event.target.dataset.index;
      localStorage.setItem('selectedProjectIndex', projectIndex); // Save index of selected project
    });
  });
}

// Helper function to calculate progress bar value based on status
function getStatusProgress(status) {
  switch (status) {
    case 'Pending':
      return 20;
    case 'In Progress':
      return 70;
    case 'Completed':
      return 100;
    default:
      return 0;
  }
}

// Helper function to return the correct status class for styling
function getStatusClass(status) {
  switch (status) {
    case 'Pending':
      return 'pending';
    case 'In Progress':
      return 'on-progress';
    case 'Completed':
      return 'completed';
    default:
      return '';
  }
}

// Load projects on page load
document.addEventListener('DOMContentLoaded', loadProjects);


// Add event listeners for "View Project" links
const projectLinks = document.querySelectorAll('.view-project');
projectLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const projectIndex = event.target.dataset.index;
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const selectedProject = projects[projectIndex];
    localStorage.setItem('selectedProject', JSON.stringify(selectedProject)); // Save selected project
  });
});




// Populate projects in the Dashboard
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectsContainer = document.getElementById('projectsContainer');

    projectsContainer.innerHTML = projects.map((project, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${project.companyRegisterName}</td>
            <td>${project.service}</td>
            <td>${project.status}</td>
            <td>
                <button onclick="viewProject(${project.id})">View</button>
            </td>
        </tr>
    `).join('');
}

// Redirect to View Project page with selected project data
function viewProject(projectId) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const selectedProject = projects.find(p => p.id === projectId);

    if (selectedProject) {
        localStorage.setItem('selectedProject', JSON.stringify(selectedProject));
        window.location.href = 'view_project.html';
    }
}

// Load projects on page load
document.addEventListener('DOMContentLoaded', loadProjects);


// progress bar
// Fetch projects from localStorage or backend
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const projectsContainer = document.getElementById("projectsContainer");
  
    projectsContainer.innerHTML = ""; // Clear existing rows
    projects.forEach((project, index) => {
      // Determine progress percentage and color
      let progressPercentage = 20;
      let progressColor = "red";
  
      if (project.status === "In Progress") {
        progressPercentage = 70;
        progressColor = "yellow";
      } else if (project.status === "Completed") {
        progressPercentage = 100;
        progressColor = "green";
      }
  
      // Add rows dynamically
      projectsContainer.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${project.name}</td>
          <td>${project.service}</td>
          <td>${project.status}</td>
          <td>
            <div class="progress-bar-container">
              <div class="progress-bar ${progressColor}" style="width: ${progressPercentage}%;">
                ${progressPercentage}%
              </div>
            </div>
          </td>
          <td>
            <button onclick="viewProject(${project.id})">View</button>
          </td>
        </tr>
      `;
    });
  }
  
  // Call loadProjects when the dashboard loads
  document.addEventListener("DOMContentLoaded", loadProjects);
  

  // login authentication

  // Restrict access to the dashboard
if (localStorage.getItem("isLoggedIn") !== "true") {
  alert("Access denied. Please log in first.");
  window.location.href = "index.html"; // Redirect to login page
}



// new displaying project in dashboard

// Load projects and display them on the dashboard
function loadProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const projectsContainer = document.getElementById("projectsContainer");

  projectsContainer.innerHTML = ""; // Clear existing rows

  // Dynamically populate the dashboard with projects
  projects.forEach((project, index) => {
      const projectRow = document.createElement("tr");
      projectRow.innerHTML = `
          <td>${index + 1}</td>
          <td>${project.companyName}</td>
          <td>${project.service}</td>
          <td>
              <span class="status ${project.status.replace(" ", "-").toLowerCase()}">
                  ${project.status}
              </span>
          </td>
          <td>
              <div class="progress-bar-container">
                  <div class="progress-bar ${getStatusClass(project.status)}" 
                       style="width: ${getStatusProgress(project.status)}%;">
                      ${getStatusProgress(project.status)}%
                  </div>
              </div>
          </td>
          <td>
              <button onclick="viewProject(${project.id})">View</button>
          </td>
      `;
      projectsContainer.appendChild(projectRow);
  });
}

// Helper function to calculate progress percentage
function getStatusProgress(status) {
  switch (status) {
      case "Pending":
          return 20;
      case "In Progress":
          return 70;
      case "Completed":
          return 100;
      default:
          return 0;
  }
}

// Helper function to determine status color
function getStatusClass(status) {
  switch (status) {
      case "Pending":
          return "red";
      case "In Progress":
          return "yellow";
      case "Completed":
          return "green";
      default:
          return "";
  }
}

// Redirect to the "View Project" page
function viewProject(projectId) {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];
  const selectedProject = projects.find((project) => project.id === projectId);

  if (selectedProject) {
      localStorage.setItem("selectedProject", JSON.stringify(selectedProject));
      window.location.href = "view_project.html";
  }
}

// Load projects when the dashboard page is loaded
document.addEventListener("DOMContentLoaded", loadProjects);



function toggleLanguage() {
  document.body.classList.toggle('rtl');
}
