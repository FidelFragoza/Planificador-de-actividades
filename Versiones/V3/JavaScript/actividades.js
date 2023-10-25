// Variables para almacenar datos
let deletedTasks = [];
let mainContent; // Variable para el contenido principal
let undoButton;
let notification;

// Función para agregar una tarea al contenido principal
function addTaskToMainContent(taskInfo) {
  // Crear el contenedor de la tarea
  const newTaskColumn = document.createElement("div");
  newTaskColumn.classList.add("task-column");
  newTaskColumn.classList.add("state-" + taskInfo.state); // Asigna clase de estado

  // Crear el título editable
  const title = document.createElement("h3");
  title.contentEditable = true;
  title.textContent = taskInfo.title;

  // Mapea estados a rutas de imágenes
  const stateImageMap = {
    1: "src/state-1.png",
    2: "src/state-2.png",
    3: "src/state-3.png",
  };

  // Crea la imagen y asigna la ruta
  const flagImage = document.createElement("img");
  flagImage.src = stateImageMap[taskInfo.state]; // Asigna la ruta de la imagen según el estado
  flagImage.alt = "Bandera"; // Asigna un atributo alt para accesibilidad

  // Crear un elemento <img> para el botón de eliminación
  const deleteIcon = document.createElement("img");
  deleteIcon.src = "src/remove_1828843.png"; // Reemplaza con la ruta de tu icono
  deleteIcon.alt = "Eliminar";

  // Agregar el icono al botón de eliminación
  const deleteButton = document.createElement("button");
  deleteButton.appendChild(deleteIcon);
  deleteButton.classList.add("delete-button"); // Referencial al CSS

  // Agregar el botón de eliminación a la tarea
  newTaskColumn.appendChild(title);
  newTaskColumn.appendChild(flagImage);
  newTaskColumn.appendChild(deleteButton);

  // Agrupa las tareas por estado
  mainContent.querySelector(`#state-${taskInfo.state}`).appendChild(newTaskColumn);

  // Asigna eventos a los botones
  title.addEventListener("blur", function () {
    // Guarda el título actualizado en el objeto de la tarea
    taskInfo.title = title.textContent;
    saveDataToLocalStorage(); // Guarda los datos al editar el título
  });

  flagImage.addEventListener("click", function () {
    // Cambia el estado de la bandera y actualiza la imagen
    taskInfo.state = (taskInfo.state % 3) + 1;

    // Actualiza la imagen en función del estado
    flagImage.src = stateImageMap[taskInfo.state];
    newTaskColumn.classList.remove("state-1", "state-2", "state-3");
    newTaskColumn.classList.add("state-" + taskInfo.state);
    saveDataToLocalStorage(); // Guarda los datos al cambiar el estado

    // Llama a la función para reorganizar tareas según el estado
    updateTaskPosition(newTaskColumn, taskInfo.state);
  });

  deleteButton.addEventListener("click", function () {
    // Elimina la tarea del DOM para liberar memoria
    if (newTaskColumn.parentNode) {
      newTaskColumn.parentNode.removeChild(newTaskColumn);
      deletedTasks.push(taskInfo); // Agrega la tarea eliminada al arreglo
      saveDataToLocalStorage(); // Guarda los datos al eliminar una tarea
      
      // Muestra la notificación
      notification.classList.add("show");
      undoButton.style.display = "block"; // Asegura que el botón "Deshacer" sea visible

      // Oculta el botón "Deshacer" después de 5 segundos si hay tareas para deshacer
      if (deletedTasks.length > 0) {
        setTimeout(function () {
          undoButton.style.display = "none";
        }, 5000); // 5000 milisegundos (5 segundos)
      } else {
        // Si no hay tareas para deshacer, ocúltalo inmediatamente
        undoButton.style.display = "none";
      }
    }
  });
}

// Función para deshacer la eliminación de una tarea
function undoDelete() {
  if (deletedTasks.length > 0) {
    const lastDeletedTask = deletedTasks.pop();
    addTaskToMainContent(lastDeletedTask);
    saveDataToLocalStorage();
  }
}

// Función para reorganizar tareas según el estado
function updateTaskPosition(taskColumn, newState) {
  const taskGroup = mainContent.querySelector(`#state-${newState}`);
  if (newState === 2) {
    mainContent.insertBefore(taskColumn, mainContent.firstChild);
  } else {
    taskGroup.appendChild(taskColumn);
  }
}

// Función para guardar los datos en localStorage
function saveDataToLocalStorage() {
  const tasks = Array.from(mainContent.querySelectorAll(".task-column")).map((taskColumn) => {
    const title = taskColumn.querySelector("h3").textContent;
    const state = parseInt(taskColumn.classList[1].split("-")[1]);
    return { title, state };
  });

  const dataToSave = {
    deletedTasks,
    tasks,
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

document.addEventListener('DOMContentLoaded', function () {
  mainContent = document.getElementById("main-content");
  const newTaskButton = document.getElementById("add-activity");
  undoButton = document.getElementById("undo-button");
  notification = document.getElementById("undo-notification");

  let taskId = 1; // Variable para asignar un ID único a cada tarea

  newTaskButton.addEventListener("click", function () {
    // Crear una nueva tarea
    const taskInfo = {
      title: "Título de la Tarea",
      state: 1, // Estado inicial
    };

    // Llama a la función para agregar la tarea al contenido principal
    addTaskToMainContent(taskInfo);
  });

  // Agrega un evento al botón "Deshacer"
  undoButton.addEventListener("click", undoDelete);
});
