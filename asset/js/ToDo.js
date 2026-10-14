
let workinput = document.querySelector('.workinput');
let btmSub = document.querySelector('.btmSub');
let result = document.querySelector('.result');
let worklist = []

workinput.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') btmSub.click()
})

btmSub.addEventListener('click', function () {
    let work = workinput.value.trim();
    if (work === "") {
        alert('please fill the box and try again :)');
        return;
    }
    document.querySelector('.item3').style.display = "block";

    let newItem = { workname: work, status: "pending" };
    worklist.push(newItem)
    SaveToLocalStorage()
    addItemToDOM(newItem);
    workinput.value = "";
})

function addItemToDOM(item) {
    let kar = document.createElement('li');
    kar.classList.add('result-item', 'd-flex', 'justify-content-between', 'align-items-center');
    
    let bgColor = "#ffffff";
    let textDecoration = "none";

    if (item.status === "done") {
        bgColor = "#457350ff";
        textDecoration = "line-through";
    }else if(item.status === "warning"){
        bgColor = "#cfc297ff";
    }

    kar.style.cssText = `
        width: 100%;
        border-radius: 20px;
        background: ${bgColor};
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #d2d2d2;
        margin-top: 2px;
    `;

    kar.innerHTML = `
        <span style="text-decoration:${textDecoration}">${item.workname}</span>
        <div>
            <button onclick="btnsuc(this)" ondblclick="btnsucc(this)" type="button" class="btn btn-success"><i class="bi bi-check-square"></i></button>
            <button onclick="btnwar(this)" ondblclick="btnwarr(this)" type="button" class="btn btn-warning"><i class="bi bi-hourglass-split"></i></button>
            <button onclick="btnhzf(this)" type="button" class="btn btn-danger"><i class="bi bi-trash"></i></button>
        </div>
    `;
    result.append(kar);
}

function btnsuc(btn) {
    let li = btn.closest('li');
    li.style.backgroundColor = "#589420";
    li.querySelector('span').style.textDecoration = "line-through";

    let text = li.querySelector('span').innerText;
    worklist.forEach(item => {
        if (item.workname === text) item.status = "done";
    });
    SaveToLocalStorage();
}

function btnwar(btn) {
    let li = btn.closest('li');
    li.style.backgroundColor = "#cfc297ff";
    li.querySelector('span').style.textDecoration = "none";

    let text = li.querySelector('span').innerText;
    worklist.forEach(item => {
        if (item.workname === text) item.status = "warning";
    });
    SaveToLocalStorage();
}

function btnhzf(btn) {
    let li = btn.closest('li');
    let text = li.querySelector('span').innerText;

    worklist = worklist.filter(item => item.workname !== text);
    SaveToLocalStorage();
    li.remove();

    if (result.children.length === 0) {
        document.querySelector('.item3').style.display = "none";
    }
}

function btnsucc(btn) {
    let li = btn.closest('li');
    li.style.backgroundColor = "#ffffff";
    li.querySelector('span').style.textDecoration = "none";

    let text = li.querySelector('span').innerText;
    worklist.forEach(item => {
        if (item.workname === text) item.status = "pending";
    });
    SaveToLocalStorage();
}

function btnwarr(btn) {
    let li = btn.closest('li');
    li.style.backgroundColor = "#ffffff";
    li.querySelector('span').style.textDecoration = "none";

    let text = li.querySelector('span').innerText;
    worklist.forEach(item => {
        if (item.workname === text) item.status = "pending";
    });
    SaveToLocalStorage();
}

// ذخیره در LocalStorage
function SaveToLocalStorage() {
    localStorage.setItem('name', JSON.stringify(worklist));
}

// لود صفحه
window.onload = () => {
    let save = localStorage.getItem('name');
    if (save) {
        worklist = JSON.parse(save)
        worklist.forEach(element => {
            document.querySelector('.item3').style.display = "block";
            addItemToDOM(element);
        });
    }
}