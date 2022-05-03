let userInput = document.getElementById("add-tast-input");
let addTaskBtn = document.getElementById("add-task-btn");
let showTaskes = document.querySelector(".show-tasks");
let tasks = [];
let errorMsg = document.querySelector(".error");
let deleteAllTasks = document.getElementById("del-all");
let confirmDelete = document.getElementById("confirm-delete");
let delAllBtnTrue = document.getElementById("del-all-true");
let delAllBtnFalse = document.getElementById("del-all-false");

// Start The Program With Data In Local Storage
if (window.localStorage.getItem("Tasks")) {
  JSON.parse(window.localStorage.getItem("Tasks")).forEach((element) => {
    let newTask = document.createElement("li");
    newTask.classList.add("task");
    newTask.textContent = element.title;

    tasks.push(element);

    // Create "Delete + Done" Container
    let containerBtns = document.createElement("div");
    containerBtns.className = "container-btns";

    // Create "Delete" Btn
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("data-id", element.id);

    // Create "Done" Btn
    let doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";

    // Append Elements
    containerBtns.append(doneBtn);
    containerBtns.append(deleteBtn);
    newTask.append(containerBtns);
    showTaskes.append(newTask);

    doneBtn.onclick = function () {
      this.parentElement.parentElement.classList.toggle("done");
    };

    // Delete Task
    deleteBtn.addEventListener("click", () => {
      if (JSON.parse(window.localStorage.getItem("Tasks")).length === 1) {
        window.localStorage.clear();
        location.reload();
      } else {
        tasks = [];
        JSON.parse(window.localStorage.getItem("Tasks")).forEach((e) => {
          if (deleteBtn.dataset.id !== e.id) {
            tasks.push(e);
            window.localStorage.setItem("Tasks", Array(JSON.stringify(tasks)));
            deleteBtn.parentElement.parentElement.remove();
            location.reload();
          }
        });
        tasks = [];
      }
    });
  });
  // Delete All Btn
  deleteAllTasks.style.display = "block";
}

// Add New Task
addTaskBtn.onclick = function () {
  addTask();
};

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// Add Task Function
function addTask() {
  if (userInput.value.trim() !== "") {
    let curretDate = Date.now();
    let newTask = document.createElement("li");
    let tasksObj = {
      id: `${curretDate}`,
      title: `${userInput.value}`,
      done: false,
    };
    newTask.classList.add("task");
    newTask.textContent = userInput.value;

    // Create "Delete + Done" Container
    let containerBtns = document.createElement("div");
    containerBtns.className = "container-btns";

    // Create "Delete" Btn
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("data-id", curretDate);

    // Create "Done" Btn
    let doneBtn = document.createElement("button");
    doneBtn.className = "done-btn";

    // Append Elements
    containerBtns.append(doneBtn);
    containerBtns.append(deleteBtn);
    newTask.append(containerBtns);
    showTaskes.append(newTask);

    doneBtn.onclick = function () {
      this.parentElement.parentElement.classList.toggle("done");
    };

    tasks.push({
      id: `${tasksObj.id}`,
      title: `${tasksObj.title}`,
      done: `${tasksObj.done}`,
    });

    window.localStorage.setItem("Tasks", Array(JSON.stringify(tasks)));
    location.reload();
    userInput.value = "";
  } else {
    errorMsg.style.display = "block";
    userInput.value = "";
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 3000);
  }
}

// Delete All Tasks At Once
deleteAllTasks.addEventListener("click", () => {
  document.getElementById("tasks-num").textContent = JSON.parse(
    window.localStorage.getItem("Tasks")
  ).length;
  confirmDelete.style.display = "flex";
});

delAllBtnFalse.onclick = () => {
  confirmDelete.style.display = "none";
};

delAllBtnTrue.onclick = () => {
  window.localStorage.clear();
  window.location.reload();
  confirmDelete.style.display = "none";
};
