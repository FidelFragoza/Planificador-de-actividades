const addButton = document.getElementById("add-activity");
const mainContent = document.getElementById("main-content");
const undoButton = document.getElementById("undo-button");
const notification = document.getElementById("undo-notification");

let deletedTasks = []; // Almacena tareas eliminadas

// Función para ocultar el botón de deshacer
function hideUndoButton() {
  undoButton.style.display = "none";
}

// Agrega un evento de clic al botón "Deshacer"
undoButton.addEventListener("click", function () {
  if (deletedTasks.length > 0) {
    const taskToRestore = deletedTasks.pop();
    addTaskToMainContent(taskToRestore);
    if (deletedTasks.length === 0) {
      notification.classList.remove("show");
      hideUndoButton();
    }
    // Guarda los datos actualizados en localStorage
    saveDataToLocalStorage();
  }
});

function addTaskToMainContent(taskInfo) {
  const newTaskColumn = document.createElement("div");
  newTaskColumn.classList.add("task-column");

  const title = document.createElement("h3");
  title.contentEditable = true;
  title.textContent = taskInfo.title;

  const completeImage = document.createElement("img");
  completeImage.src = "src/flag_7596686.png";
  completeImage.alt = "Completar";
  completeImage.classList.add("complete-image");

  const deleteImage = document.createElement("img");
  deleteImage.src = "src/remove_1828843.png";
  deleteImage.alt = "Eliminar";

  if (taskInfo.isCompleted) {
    completeImage.style.filter = "hue-rotate(0deg)";
  } else {
    
  }

  completeImage.addEventListener("click", function () {
    if (taskInfo.isCompleted) {
      taskInfo.isCompleted = false;
      completeImage.style.filter = "hue-rotate(60deg)"; 
    } else {
      taskInfo.isCompleted = true;
      completeImage.style.filter = "hue-rotate(120deg)"; 
    }
    // Guarda los datos actualizados en localStorage
    saveDataToLocalStorage();
  });

  deleteImage.addEventListener("click", function () {
    // Elimina la columna de la tarea al hacer clic en la "x"
    deletedTasks.push({
      title: title.textContent,
      isCompleted: taskInfo.isCompleted,
    });
    mainContent.removeChild(newTaskColumn);
    notification.classList.add("show");
    undoButton.style.display = "inline";
    setTimeout(hideUndoButton, 5000); // Ocultar el botón después de 5 segundos
    // Guarda los datos actualizados en localStorage
    saveDataToLocalStorage();
  });

  newTaskColumn.appendChild(title);
  newTaskColumn.appendChild(completeImage);
  newTaskColumn.appendChild(deleteImage);

  mainContent.appendChild(newTaskColumn);

  // Guarda los datos actualizados en localStorage
  saveDataToLocalStorage();
}

addButton.addEventListener("click", function () {
  // Crear nueva tarea
  const taskInfo = {
    title: "Título de la Tarea",
    isCompleted: false, // Nueva tarea, inicialmente no completada
  };
  addTaskToMainContent(taskInfo);
});

// Función para guardar los datos en localStorage
function saveDataToLocalStorage() {
  const dataToSave = {
    deletedTasks,
    tasks: Array.from(mainContent.querySelectorAll(".task-column")).map((taskColumn) => {
      const title = taskColumn.querySelector("h3").textContent;
      const isCompleted = taskColumn.querySelector(".complete-image").style.filter === "hue-rotate(120deg)";
      return { title, isCompleted };
    }),
  };
  localStorage.setItem("appData", JSON.stringify(dataToSave));
}

// Cargar datos almacenados en localStorage al cargar la página
window.addEventListener("load", function () {
  const savedData = localStorage.getItem("appData");
  if (savedData) {
    const data = JSON.parse(savedData);
    deletedTasks = data.deletedTasks;
    data.tasks.forEach((taskInfo) => addTaskToMainContent(taskInfo));
  }
});

// Llama a la función para guardar los datos en localStorage cuando se cargue la página
window.addEventListener("load", function () {
  saveDataToLocalStorage();
});

// ...
