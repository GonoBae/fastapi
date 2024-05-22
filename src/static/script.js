function addTask() {
	var taskInput = document.getElementById("taskInput");
	var taskList = document.getElementById("taskList");

	var newTask = document.createElement("li");

	newTask.textContent = taskInput.value;
	taskList.appendChild(newTask)
	taskInput.value = "";

	newTask.addEventListener("click", function(){
		newTask.classList.toggle("completed");
	})
}
