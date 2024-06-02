document.addEventListener("DOMContentLoaded", function() {
    var addTaskButton = document.getElementById('myButton');
    var deleteTaskButton = document.getElementById('deleteButton');
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    async function addTask() {
        var taskText = taskInput.value.trim();
        if (taskText === '') return;

        var listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Add event listeners for both click and touch events
        listItem.addEventListener('click', toggleTaskCompletion);
        listItem.addEventListener('touchend', function(event) {
            toggleTaskCompletion.call(this);
            event.preventDefault(); // Prevents click event from being triggered after touchend
        });
		// async + await = 비동기 코드를 동기 코드처럼 작성할 수 있어, 가독성 좋아지고 에러 처리가 간단
		// Promise 는 비동기 함수의 결과를 담고 있는 객체
		// 대기 / 성공 / 실패
		/* await 키워드는 async 함수 내에서만 사용 가능
		async : 해당 함수는 항상 프로미스를 반환하도록 지정 (이 함수는 비동기적인 함수이고 Promise 를 반환)
		await : 프로미스가 처리되거나 거불될 때까지 실행을 일시 중지
		*/
		response = await fetch('http://127.0.0.1:8000/guestbook', {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id: taskList.children.length - 1,
			title:taskInput.value
		})
	    });
        if(response.ok) {
		    const item = await response.json();
		    alert('Item added: ' + JSON.stringify(item));
	    } else {
		    alert('Failed to add item');
	    }
        taskList.appendChild(listItem);
        taskInput.value = '';
    }


    async function deleteSelectedItem() {
        id = 0;
        const response = await fetch('http://127.0.0.1:8000/guestbook', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id:-1,
                title:"aaa"
            })
        });
        if(response.ok) {
            alert('Item deleted: ');
        } else {
            alert('Failed to delete item');
        }
        showTodos();
    }

    function toggleTaskCompletion() {
        this.classList.toggle('completed');
    }

    addTaskButton.addEventListener('click', addTask);
    addTaskButton.addEventListener('touchend', function(event) {
        addTask();
        event.preventDefault(); // Prevents click event from being triggered after touchend
    });

    deleteTaskButton.addEventListener('click', deleteSelectedItem);

	async function showTodos() {
		const response = await fetch('http://127.0.0.1:8000/guestbook/all');
		const todos = await response.json();
		const todoList = document.getElementById("taskList");
		todoList.classList.add("custom-list");
		todos.forEach(todo => {
			const listTodo = document.createElement("li");
			listTodo.addEventListener("click", toggleTaskCompletion)
			listTodo.addEventListener('touchend', function(event) {
        	    toggleTaskCompletion.call(this);
            	event.preventDefault(); // Prevents click event from being triggered after touchend
	        });
			listTodo.textContent = todo.title;
			todoList.appendChild(listTodo);
		});
	}

	// 웹 페이지가 완전히 로드되었을 대 실행되는 이벤트
	window.onload =  function() {
		showTodos();
	}
});

