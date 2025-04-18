async function editMemo(event) {
    const id = event.target.dataset.id;
    const editInput = prompt('수정할 값을 입력하세요.');
    const res = await fetch(`/memos/${id}`, {
            method:"PUT",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({ //통신을 할때 문자열로만 할수 있다
                id, 
                content: editInput, //Memo라는 클래스 만들어서 id:int content:str 
            }),
        }); //POST
        readMemo();
    //console.log(editInput);
    //console.log(event.target.dataset.id); //속성
}

async function deleteMemo(event) {
    const id = event.target.dataset.id;
    const res = await fetch(`/memos/${id}`, {
        method : "DELETE",
    });
    readMemo();
}

function displayMemo(memo) {
    const ul = document.querySelector("#memo-ul");
    const li = document.createElement("li");
    const editBtn = document.createElement("button");
    li.innerText = `[id${memo/id}] ${memo.content}`;
    ul.appendChild(li);
    ul.appendChild(editBtn);
    ul.appendChild(delBtn);
    editBtn.innerText ="수정하기";
    editBtn.addEventListener("click");
    editBtn.dataset.id = memo.id; //html div id 가져오기

    const delBtn = document.createElement("button");
    delBtn.innerText = "삭제"
    delBtn.addEventListener("click", deleteMemo)
    delBtn.dataset.id = memo.id;
}

async function readMemo() { //프론트 앤드드
    const res = await fetch('/memos') //Get요청
    const jsonRes = await res.json();
    const ul = document.querySelector("#memo-ul");
    ul.innerHTML = "";
    //console.log(jsonRes);
    //jsonRes = [{id:123, content:'블라블라'}]
    //["a","b","c"].forEach(func);
    jsonRes.forEach(displayMemo); //array각각의 요소들 배열 
}

async function createMemo(value) {
    const res = await fetch("/memos", {
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ //통신을 할때 문자열로만 할수 있다
            id: new Date().getTime(), 
            content: value, //Memo라는 클래스 만들어서 id:int content:str 
        }),
    }); //POST
    //const jsonRes = await res.json();
    //console.log(jsonRes); //memos not found -> network탭 @app.post("/memos")해야
    //console.log("값은!", value);
    readMemo(); 
}

function handleSubmit(event) {
    event.preventDefault(); //이벤트 동작하는 것을 막는다 
    //console.log("동작하냐?");
    const input = document.querySelector("#memo-input");
    //console.log(input.value);
    input.value = ""
}

const form = document.querySelector('#memo-form');
form.addEventListener("submit", handleSubmit);
//form.addEventListener("submit", createMemo);

readMemo();





