// 유저가 값을 입력할 수 있게 만든다
// + 버튼을 클릭하면 할 일이 추가된다.
// delete 버튼을 누르면 할 일이 삭제된다.
// check버튼을 누르면 할 일이 끝나면서 밑줄이 쳐진다.
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난거로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// 진행 중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남 탭은, 끝난 아이템만, 진행중 탬은 진행중인 아이템만
// 전체 탭을 누르면 다시 전체 아이템으로 돌아옵니다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
// 쿼리 셀렉터를 하면 그 이하에 있는 모든 소스를 가져온다.
let taskList = [];
let filterList =[];
let mode = "all";

addButton.addEventListener("click",addTask);

for(let i = 1; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)});
}

function addTask(){
    let task = {
        id:randomIDGernerate(),
        taskContent: taskInput.value,
        isComplete: false,
    };
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    let list = [];
    if(mode == "all"){
        list = taskList;
    }else if(mode == "onGoing" || mode == "done"){
        list = filterList;
    }

    let resultHTML = '';
    for(let i = 0; i < list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        }else{
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id:", id);
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
    console.log(taskList);
}

function deleteTask(id){
    for(let i = 0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    render();
}

function filter(event){
    mode = event.target.id;
    filterList = []
    if(mode == "all"){
        render()
    }else if(mode == "onGoing"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i]);
            }
        }
        render();
    }else if(mode == "done"){
        for(let i = 0; i < taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}

function randomIDGernerate(){
    return '_' + Math.random().toString(36).substring(2, 9);
}