


// progress bar
document.getElementById("addProjectButton").addEventListener("click", (event) => {
    event.preventDefault();
  
    const newProject = {
      id: Date.now(),
      name: document.getElementById("company-name").value,
      service: document.getElementById("service").value,
      status: document.getElementById("status").value, // Capture status
    };
  
 
  });
  


  // new display showing

  document.getElementById("addProjectButton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    const project = {
        id: Date.now(), // Unique ID for the project
        companyName: document.getElementById("company-name").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone-number").value,
        address: document.getElementById("Address").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        managerName: document.getElementById("manager-name").value,
        companyActivity: document.getElementById("company-activity").value,
        service: document.getElementById("service").value,
        coordinator: document.getElementById("coordinator").value,
        status: document.getElementById("status").value,
        startDate: document.getElementById("start-date").value,
        endDate: document.getElementById("end-date").value,
        description: document.getElementById("description").value,
    };

    // Retrieve projects from localStorage
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push(project);

    // Save updated projects list back to localStorage
    localStorage.setItem("projects", JSON.stringify(projects));
    alert("Project added successfully!");

    // Redirect to dashboard
    window.location.href = "dashboard.html";
});

