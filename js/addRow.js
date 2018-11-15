window.onload = function () {
    init();
};

function init() {
    addEventListeners();
}

function addEventListeners() {
    let windowStorageBtn = document.getElementById('setWindowStorage');
    let localStorageBtn = document.getElementById('setLocalStorage');
    let indexedDBStorageBtn = document.getElementById('setIndexedDBStorage');
    let serverStorageBtn = document.getElementById('setServerStorage');

    windowStorageBtn.addEventListener('click', setWindowStorage);
    localStorageBtn.addEventListener('click', setLocalStorage);
    indexedDBStorageBtn.addEventListener('click', setIndexedDBStorage);
    serverStorageBtn.addEventListener('click', setServerStorage);

    let createBtn = document.getElementById('createBtn');
    let readBtn = document.getElementById('readBtn');
    let updateBtn = document.getElementById('updateBtn');
    let deleteBtn = document.getElementById('deleteBtn');

    createBtn.addEventListener('click', btnCreate);
    readBtn.addEventListener('click', btnRead);
    updateBtn.addEventListener('click', btnUpdate);
    deleteBtn.addEventListener('click', btnDelete);
}

//достаем все записи с БД
function rowFunc(items) {
    let tblBody = document.getElementById('tblBody');
    while (tblBody.firstChild) {
        tblBody.removeChild(tblBody.firstChild);
    }
    if (items.length !== 0) {
        for (let i = 0; i < items.length; i ++){
            this.tr = document.createElement('tr');
            this.tr.id = 'tr' + (items[i].id);
            this.idTd = document.createElement('td');
            this.idTd.id = 'id-td' + (i+1);
            this.fNameTd = document.createElement('td');
            this.fNameTd.id = 'fname-td' + (i+1);
            this.lNameTd = document.createElement('td');
            this.lNameTd.id = 'lname-td' + (i+1);
            this.ageTd = document.createElement('td');
            this.ageTd.id = 'age-td' + (i+1);
            this.textId = document.createTextNode(items[i].id);
            this.textFName = document.createTextNode(items[i].fname);
            this.texttLName = document.createTextNode(items[i].lname);
            this.textAge = document.createTextNode(items[i].age);
            this.idTd.appendChild(this.textId);
            this.fNameTd.appendChild(this.textFName);
            this.lNameTd.appendChild(this.texttLName);
            this.ageTd.appendChild(this.textAge);
            this.tr.appendChild(this.idTd);
            this.tr.appendChild(this.fNameTd);
            this.tr.appendChild(this.lNameTd);
            this.tr.appendChild(this.ageTd);
            tblBody.appendChild(this.tr);
        }
    }
}

//добавление в БД
function btnCreate() {
    const inputId = document.getElementById("inputId").value;
    const inputFName = document.getElementById('inputFName').value;
    const inputLName = document.getElementById('inputLName').value;
    const inputAge = document.getElementById('inputAge').value;
    if (inputId !== '' && inputFName !== '' && inputLName !== '' && inputAge !== ''){
        let item = {
            id: inputId,
            fname: inputFName,
            lname: inputLName,
            age: inputAge
        };
        personDAO.createPerson(item);
        personDAO.getAllPerson();
    }else{
        document.getElementById('warn').innerHTML = 'Заполните все поля';
        document.getElementById('warn').style.color = 'red';
    }
}

function btnRead() {
    let rInput = document.getElementById('inputId').value;
    personDAO.getPerson(rInput);
}

function btnUpdate() {
    const inputId = document.getElementById("inputId").value;
    const inputFName = document.getElementById('inputFName').value;
    const inputLName = document.getElementById('inputLName').value;
    const inputAge = document.getElementById('inputAge').value;
    let item = {
        id: inputId,
        fname: inputFName,
        lname: inputLName,
        age: inputAge
    };
    personDAO.updatePerson(item);
    personDAO.getAllPerson();
}

function btnDelete() {
    let dInput = document.getElementById('inputId').value;
    personDAO.deletePerson(dInput);
    personDAO.getAllPerson();
}

