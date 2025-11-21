// Tableau des tâches
let tasks = [
  {
    title: "Réviser le cours d'IHM",
    desc: "Relire les chapitres 1 à 3 du support de cours avant le prochain TP et prendre des notes sur les concepts clés...",
    priority: "Moderate",
    status: "Not Started",
    date: "20/06/2023"
  },
  {
    title: "Terminer le projet web",
    desc: "Finaliser le design et corriger les bugs.",
    priority: "High",
    status: "Completed",
    date: "30/06/2023"
  }
];

// Récupération des éléments
const modal = document.getElementById("taskModal");
const addBtn = document.getElementById("addTask");
const goBackBtn = document.querySelector(".go-back");
const doneBtn = document.querySelector(".done-btn");

const taskTitle = document.getElementById("taskTitle");
const taskDate = document.getElementById("taskDate");
const taskDesc = document.getElementById("taskDesc");
const taskList = document.getElementById("taskList");

// Ouvrir le modal
addBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

// Fermer le modal
goBackBtn.addEventListener("click", e => {
  e.preventDefault();
  modal.style.display = "none";
  clearForm();
});

// Ajouter une tâche
doneBtn.addEventListener("click", e => {
  e.preventDefault();

  const title = taskTitle.value.trim();
  const desc = taskDesc.value.trim();
  const date = taskDate.value;
  
  const checkedPriorities = Array.from(document.querySelectorAll('input[name="priority"]:checked'))
                                .map(cb => cb.value);
  const priority = checkedPriorities.join(", ") || "Low"; // défaut Low

  if (title === "") {
    alert("Le titre est obligatoire !");
    return;
  }

  tasks.push({ title, desc, priority, status: "Not Started", date });
  renderTasks();
  modal.style.display = "none";
  clearForm();
});

// Fonction d'affichage
function renderTasks() {
  taskList.innerHTML = "";

  // Séparer les tâches non terminées et terminées
  const ongoingTasks = tasks.filter(t => t.status !== "Completed");
  const completedTasks = tasks.filter(t => t.status === "Completed");

  // Afficher les tâches non terminées
  if (ongoingTasks.length > 0) {
    ongoingTasks.forEach((t, index) => {
      const div = createTaskElement(t, tasks.indexOf(t));
      taskList.appendChild(div);
    });
  }

  // Ligne de séparation si des tâches terminées existent
  if (completedTasks.length > 0) {
    const separator = document.createElement("hr");
    separator.className = "task-separator";
    taskList.appendChild(separator);

    // Afficher les tâches terminées
    completedTasks.forEach((t, index) => {
      const div = createTaskElement(t, tasks.indexOf(t));
      taskList.appendChild(div);
    });
  }
}

// Crée l'élément d'une tâche
function createTaskElement(t, index) {
  const div = document.createElement("div");
  div.className = "task-item";

  // Couleur du statut
  let statusColor = "";
  if (t.status === "Completed") statusColor = "green";
  else if (t.status === "In Progress") statusColor = "#f1c40f";
  else statusColor = "red";

  // Couleur de priorité
  let priorityColor = "";
  if (t.priority === "High") priorityColor = "red";
  else if (t.priority === "Moderate") priorityColor = "orange";
  else if (t.priority === "Low") priorityColor = "#7DB0CF"; // bleu doux
  else priorityColor = "gray";

  // Icône selon statut
  const iconClass = t.status === "Completed" ? "fas fa-check-circle" : "far fa-circle";
  const iconColor = t.status === "Completed" ? "green" : "#555";

  div.innerHTML = `
    <span class="task-select"><i class="${iconClass}" style="color:${iconColor}"></i></span>
    <div class="task-content">
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <div class="meta">
        <span style="color:${priorityColor}">Priority: ${t.priority}</span> <pre></pre> <pre></pre>
        <span style="color:${statusColor}">Status: ${t.status}</span> <pre></pre> <pre></pre>
        <span>Date: ${t.date || "Not set"}</span>
      </div>
    </div>
    <span class="task-delete"><i class="fas fa-trash-alt"></i></span>
  `;

  // Sélection / cocher
  const selectIcon = div.querySelector(".task-select i");
  selectIcon.addEventListener("click", () => {
    if (t.status !== "Completed") {
      t.status = "Completed";

      // déplacer en haut des tâches terminées
      const remainingCompleted = tasks.filter(tsk => tsk.status === "Completed" && tsk !== t);
      const remainingOthers = tasks.filter(tsk => tsk.status !== "Completed");
      tasks = [...remainingOthers, t, ...remainingCompleted];
    } else {
      t.status = "Not Started";
      // déplacer vers haut des non terminées
      const remainingOthers = tasks.filter(tsk => tsk.status !== "Completed" && tsk !== t);
      const remainingCompleted = tasks.filter(tsk => tsk.status === "Completed");
      tasks = [t, ...remainingOthers, ...remainingCompleted];
    }
    renderTasks();
  });

  // Supprimer
  const deleteIcon = div.querySelector(".task-delete");
  deleteIcon.addEventListener("click", () => {
    tasks.splice(index, 1);
    renderTasks();
  });

  return div;
}

// Réinitialiser le formulaire
function clearForm() {
  taskTitle.value = "";
  taskDesc.value = "";
  taskDate.value = "";
  document.querySelectorAll('input[name="priority"]').forEach(cb => cb.checked = false);
}

// Fermer le modal si clic en dehors
window.addEventListener("click", e => {
  if (e.target === modal) {
    modal.style.display = "none";
    clearForm();
  }
});

// Initial render
document.addEventListener("DOMContentLoaded", renderTasks);
