
var modal = document.querySelector('.modal-container');

document.getElementById('add-modal').addEventListener('click', () => {
    modal.style.display = 'flex';
})



var addTaskBtn = document.getElementById('add-task');


addTaskBtn.addEventListener('click', (ev) => {
    ev.preventDefault;

    var taskName = document.getElementById('task-name').value;
    var priority = document.getElementById('priority').value;
    var dueDate = document.getElementById('due-date').value;
    var status = document.getElementById('status').value;

    console.log(taskName,priority,dueDate,status);

    if(taskName == "" || priority == "" || dueDate == "" || status == ""){
        alert("Fill all fields");
    } else{
        var taskItem = document.createElement('div');
        taskItem.setAttribute('class', 'task-item');
        taskItem.innerHTML += `
        <h4 class="task-name" style="display:inline-block">${taskName}</h4>
        <span class="task-priority-${priority}">${priority}</span>
        <span class="task-due-date">${dueDate}</span>
        <span class="task-status-${status}">${status}</span>
        `;

       



        document.getElementById('completed').appendChild(taskItem);
        if(status == "Completed"){

            document.getElementById('completed').appendChild(taskItem);

        }else if(status == "In-Progress"){
        
            document.getElementById('in-progress').appendChild(taskItem);
        }else{
            document.getElementById('not-yet-started').appendChild(taskItem);
        }
        modal.style.display = 'none';
    }

    

})