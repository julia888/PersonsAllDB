window.onload = function () {
    init();
};

function init() {
    readAllRows();
}

//достаем все записи с БД
function rowFunc(items) {

    if (items.length !== 0) {
        for (let i = 0; i < items.length; i ++){
            let tbl = document.getElementById('tbl');
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
            tbl.appendChild(this.tr);
        }
    }
}

function readAllRows() {
    dbPromise.then(function(db) {
        const tx = db.transaction('store', 'readonly');
        const store = tx.objectStore('store');
        return store.getAll();
    }).then(function (items) {
        rowFunc(items);
    });
}

//добавление в БД
function btnCreate() {
    const inputId = document.getElementById("inputId").value;
    const inputFName = document.getElementById('inputFName').value;
    const inputLName = document.getElementById('inputLName').value;
    const inputAge = document.getElementById('inputAge').value;
    if (inputId !== '' && inputFName !== '' && inputLName !== '' && inputAge !== ''){
        // вывод сразу же на экран
        let tbl = document.getElementById('tbl');
        this.tr = document.createElement('tr');
        this.tr.id = 'tr' + inputId;
        this.idTd = document.createElement('td');
        this.idTd.id = 'id-td' + inputId;
        this.fNameTd = document.createElement('td');
        this.fNameTd.id = 'fname-td' + inputId;
        this.lNameTd = document.createElement('td');
        this.lNameTd.id = 'lname-td' + inputId;
        this.ageTd = document.createElement('td');
        this.ageTd.id = 'age-td' + inputId;
        this.textId = document.createTextNode(inputId);
        this.textFName = document.createTextNode(inputFName);
        this.texttLName = document.createTextNode(inputLName);
        this.textAge = document.createTextNode(inputAge);
        this.idTd.appendChild(this.textId);
        this.fNameTd.appendChild(this.textFName);
        this.lNameTd.appendChild(this.texttLName);
        this.ageTd.appendChild(this.textAge);
        this.tr.appendChild(this.idTd);
        this.tr.appendChild(this.fNameTd);
        this.tr.appendChild(this.lNameTd);
        this.tr.appendChild(this.ageTd);
        tbl.appendChild(this.tr);
        let item = {
            id: inputId,
            fname: inputFName,
            lname: inputLName,
            age: inputAge
        };
        //сохранение в БД
        createRow(item);
    }else{
        document.getElementById('warn').innerHTML = 'Заполните все поля';
        document.getElementById('warn').style.color = 'red';
    }
}

function createRow(item) {
    dbPromise.then(function(db) {
        const tx = db.transaction('store', 'readwrite');
        const store = tx.objectStore('store');
        store.add(item);

        return tx.complete;
    }).then(function() {
        console.log('added item to the store os!');
    });
}

function btnRead() {
    let rInput = document.getElementById('inputId').value;
    readRow(rInput);
}

function readRow(rInput) {
    dbPromise.then(function(db) {
        const tx = db.transaction('store', 'readonly');
        const store = tx.objectStore('store');
        return store.get(rInput);
    }).then(function(val) {
        showRow(val);
    });
}

function showRow(val) {
    alert('id: ' + val.id + ' First name: ' + val.fname + ' Last name: ' + val.lname + ' Age: ' + val.age);
}

function btnUpdate() {
    const inputId = document.getElementById("inputId").value;
    const inputFName = document.getElementById('inputFName').value;
    const inputLName = document.getElementById('inputLName').value;
    const inputAge = document.getElementById('inputAge').value;
    let parent = document.getElementById('tbl');
    let trChild = document.getElementById('tr' + inputId);
    //удаление сразу же с экрана
    parent.removeChild(trChild);
    //добавление сразу же на экран
    let tbl = document.getElementById('tbl');
    this.tr = document.createElement('tr');
    this.tr.id = 'tr' + inputId;
    this.idTd = document.createElement('td');
    this.idTd.id = 'id-td' + inputId;
    this.fNameTd = document.createElement('td');
    this.fNameTd.id = 'fname-td' + inputId;
    this.lNameTd = document.createElement('td');
    this.lNameTd.id = 'lname-td' + inputId;
    this.ageTd = document.createElement('td');
    this.ageTd.id = 'age-td' + inputId;
    this.textId = document.createTextNode(inputId);
    this.textFName = document.createTextNode(inputFName);
    this.texttLName = document.createTextNode(inputLName);
    this.textAge = document.createTextNode(inputAge);
    this.idTd.appendChild(this.textId);
    this.fNameTd.appendChild(this.textFName);
    this.lNameTd.appendChild(this.texttLName);
    this.ageTd.appendChild(this.textAge);
    this.tr.appendChild(this.idTd);
    this.tr.appendChild(this.fNameTd);
    this.tr.appendChild(this.lNameTd);
    this.tr.appendChild(this.ageTd);
    tbl.appendChild(this.tr);
    let item = {
        id: inputId,
        fname: inputFName,
        lname: inputLName,
        age: inputAge
    };
    updateRow(item);
}

function updateRow(item) {
    dbPromise.then(function(db) {
        const tx = db.transaction('store', 'readwrite');
        const store = tx.objectStore('store');
        store.put(item);
        return tx.complete;
    }).then(function() {
        console.log('item updated!');
    });
}

function btnDelete() {
    let dInput = document.getElementById('inputId').value;
    let parent = document.getElementById('tbl');
    let trChild = document.getElementById('tr' + dInput);
    deleteRow(dInput);
    parent.removeChild(trChild);
}

function deleteRow(dInput) {
    dbPromise.then(function(db) {
        const tx = db.transaction('store', 'readwrite');
        const store = tx.objectStore('store');
        store.delete(dInput);
        return tx.complete;
    }).then(function() {
        console.log('Item deleted');
    });
}

