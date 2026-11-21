// ===== 1. Things every page needs =====

// Show the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();

// Open and close the menu on small screens
var menuBtn = document.getElementById("menuBtn");
var navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

// Highlight the link of the page we are on
var currentPage = window.location.pathname.split("/").pop() || "index.html";
var links = document.querySelectorAll(".nav-links a");
for (var i = 0; i < links.length; i++) {
  if (links[i].getAttribute("href") === currentPage) {
    links[i].style.background = "#C8501E";
  }
}

// ===== 2. Academic Planner (only runs on planner.html) =====
var taskForm = document.getElementById("taskForm");

if (taskForm) {
  var taskInput = document.getElementById("taskInput");
  var taskList = document.getElementById("taskList");
  var taskMessage = document.getElementById("taskMessage");
  var taskCount = document.getElementById("taskCount");

  // Array that stores all tasks. Each task is an object: { text: "...", done: false }
  var tasks = [];

  // Load saved tasks from localStorage (if any)
  var saved = localStorage.getItem("plannerTasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }

  // Save the array to localStorage
  function saveTasks() {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
  }

  // Draw all tasks on the page
  function showTasks() {
    taskList.innerHTML = ""; // clear the old list

    for (var i = 0; i < tasks.length; i++) {
      var li = document.createElement("li");
      if (tasks[i].done) {
        li.classList.add("done");
      }

      // Checkbox to mark as completed
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = tasks[i].done;
      checkbox.style.width = "auto";
      checkbox.setAttribute("aria-label", "Mark task as completed");
      checkbox.addEventListener("change", makeToggle(i));

      // Task text
      var span = document.createElement("span");
      span.textContent = tasks[i].text;

      // Delete button
      var del = document.createElement("button");
      del.textContent = "Delete";
      del.addEventListener("click", makeDelete(i));

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(del);
      taskList.appendChild(li);
    }

    // Update the counter
    var doneCount = 0;
    for (var j = 0; j < tasks.length; j++) {
      if (tasks[j].done) { doneCount++; }
    }
    if (tasks.length === 0) {
      taskCount.textContent = "No tasks yet. Add your first task above.";
    } else {
      taskCount.textContent = doneCount + " of " + tasks.length + " tasks completed";
    }
  }

  // These small functions remember which task (index) was clicked
  function makeToggle(index) {
    return function () {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      showTasks();
    };
  }
  function makeDelete(index) {
    return function () {
      tasks.splice(index, 1); // remove 1 item at this position
      saveTasks();
      showTasks();
    };
  }

  // Add a task when the form is submitted
  taskForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading
    var text = taskInput.value.trim();

    if (text === "") {
      taskMessage.textContent = "Please type a task first.";
      taskMessage.className = "message error";
      return;
    }

    tasks.push({ text: text, done: false });
    saveTasks();
    showTasks();
    taskInput.value = "";
    taskMessage.textContent = "Task added.";
    taskMessage.className = "message success";
  });

  showTasks();
}

// ===== 3. Contact form validation (only runs on contact.html) =====
var contactForm = document.getElementById("contactForm");

if (contactForm) {
  var formMessage = document.getElementById("formMessage");

  // Email must look like name@site.com
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Phone must contain digits only
  function isDigitsOnly(phone) {
    return /^[0-9]+$/.test(phone);
  }

  function showError(text) {
    formMessage.textContent = text;
    formMessage.className = "message error";
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("fullName").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || phone === "" || message === "") {
      showError("Error: please fill in all fields.");
    } else if (!isValidEmail(email)) {
      showError("Error: please enter a valid email address.");
    } else if (!isDigitsOnly(phone)) {
      showError("Error: phone number must contain digits only.");
    } else {
      formMessage.textContent = "Success: your form is valid. (It was not emailed. Real sending needs a backend.)";
      formMessage.className = "message success";
      contactForm.reset();
    }
  });
}
