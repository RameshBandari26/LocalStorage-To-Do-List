var key = "Event";
document.getElementById("addTask").addEventListener("click", function (event) {
    event.preventDefault();

    var taskInput = document.getElementById("inputField");
    var input = taskInput.value;
    
    if (input.trim() !== "") {
        var tasklist = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
        
        var newTask = {
            id: Date.now(),
            value: input,
            status: "pending"
        };
        tasklist.unshift(newTask);
        localStorage.setItem(key, JSON.stringify(tasklist));
        taskInput.value = "";
        displayTasks();
    }
});

function displayTasks() {
    var tasklist = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
    var taskContainer = document.getElementById("eventId");
    if (tasklist.length !== 0) {
        var tasks = "";
        for (var task of tasklist) {
            if (task.status === "pending") {
                tasks += `
        <div class="bg-green-500 text-white mx-auto w-1/2 p-3 items-center hover:bg-green-600 transition-all duration-300 transform hover:scale-105">
        <ul class="justify-between ">
            <li>
                <div class="py-3 justify-between flex"><div>${task.value}</div><div>
                ${new Date(task.id).toLocaleString()}</div></div>
                <div class="justify-around">
                <button class="p-1 bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300 transform hover:scale-105" data-id="${task.id}" id="done">Done</button>
                <button class="p-1 bg-purple-500 rounded-md hover:bg-purple-600 transition duration-300 transform hover:scale-105" data-id="${task.id}" id="delete">Delete</button>
            </div></li>
        </ul>
    </div><br>`;
            } else {
                tasks += `
        <div class="bg-gray-500 text-white mx-auto w-1/2 p-3 items-center opacity-50 transition-all duration-300 transform hover:scale-105">
        <ul class="justify-between ">
            <li>
                <div class="py-3 line-through justify-between flex"><div>${task.value}</div><div>
                ${new Date(task.id).toLocaleString()}</div></div>
                <div class="justify-around">
                <button class="p-1 bg-gray-400 rounded-md cursor-not-allowed" disabled>Done</button>
                <button class="p-1 bg-purple-500 rounded-md hover:bg-purple-600 transition duration-300 transform hover:scale-105" data-id="${task.id}" id="delete">Delete</button>
            </div></li>
        </ul>
    </div><br>`;
            }
        }
        taskContainer.innerHTML = tasks;
    } else {
        taskContainer.innerHTML = "<p class='text-center text-gray-500'>No tasks available.</p>";
    }
}
window.onload = displayTasks;

document.getElementById("eventId").addEventListener("click", function (event){
    let targetElement = event.target;
    var tasklist = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];

    let taskId = Number(targetElement.getAttribute("data-id"));

    // Complete task
    if (targetElement.id === "done") {
        tasklist = tasklist.map(task => task.id === taskId ? { ...task, status: "completed" } : task);
        localStorage.setItem(key, JSON.stringify(tasklist));
        displayTasks();
    }

    // Delete task
    if (targetElement.id === "delete") {
        tasklist = tasklist.filter(task => task.id !== taskId);
        localStorage.setItem(key, JSON.stringify(tasklist));
        displayTasks();
    }
});
