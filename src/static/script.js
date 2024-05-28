async function addTask() {
	var taskInput = document.getElementById("taskInput");
	var taskList = document.getElementById("taskList");
	taskList.classList.add("custom-list");	
	// newTask 변수에 새로 생성된 '<li>' 요소를 참조한다.
	// 이 변수에 할당된 요소는 이후에 HTML 문서에 추가되거나 수정될 수 있다.
	var newTask = document.createElement("li");

	newTask.textContent = taskInput.value;

	newTask.addEventListener("click", function(){
		newTask.classList.toggle("completed");
	});
	// newTask.classList.add("highlight")
	// taskList에 추가
	taskList.appendChild(newTask);
	//const output = document.getElementById("output")
	//const myButton = document.getElementById("myButton");
	//id = document.getElementById("id").value;
	//title = document.getElementById("title").value;
	
	//title = taskInput.value;
	// 서버로 POST 요청 보내기
	response = await fetch('http://172.30.1.53:8000/todos', {
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
	

	//myButton.addEventListener("click", async () => {
	//	const item = taskInput.value;
	//	if(!item) {
	//		alert("내용을 입력하세요.");
	//		return;
	//	}
	//	output.textContent = `입력된 내용: ${item}`;
	//});
	//});
}

// async + await = 비동기 코드를 동기 코드처럼 작성할 수 있어, 가독성 좋아지고 에러 처리가 간단
// Promise 는 비동기 함수의 결과를 담고 있는 객체
// 대기 / 성공 / 실패
/* await 키워드는 async 함수 내에서만 사용 가능
async : 해당 함수는 항상 프로미스를 반환하도록 지정 (이 함수는 비동기적인 함수이고 Promise 를 반환)
await : 프로미스가 처리되거나 거불될 때까지 실행을 일시 중지
*/
async function showTodos() {
	const response = await fetch('http://172.30.1.53:8000/todos/all');
	const todos = await response.json();
	const todoList = document.getElementById("taskList");
	todos.forEach(todo => {
		const listTodo = document.createElement("li");
		listTodo.textContent = `title: ${todo.title}`;
		todoList.appendChild(listTodo);
	});
}

// 웹 페이지가 완전히 로드되었을 대 실행되는 이벤트
window.onload =  function() {
	showTodos();
}
