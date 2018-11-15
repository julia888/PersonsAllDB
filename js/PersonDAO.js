let personDAO = null;
let personList = {};

function setWindowStorage() {
    personDAO = new PersonDAOWindow;
    personDAO.getAllPerson();
}

function setLocalStorage() {
    personDAO = new PersonDAOLS();
    personDAO.getAllPerson();
}

function setIndexedDBStorage() {
    personDAO = new PersonDAOIndexedDB();
    personDAO.getAllPerson();
}

function setServerStorage() {
    personDAO = new PersonDAOServerStorage();
    personDAO.getAllPerson();
}

class PersonDAOWindow {
    constructor() {
        if (PersonDAOWindow.instance) {
            return PersonDAOWindow.instance;
        } else {
            PersonDAOWindow.instance = this;
            personList = {};
        }
    }

    getAllPerson() {
        // rowFunc(personList);
      console.log(personList);
        let arr = [];
        for (let key in personList) {
            arr.push(personList[key]);
        }
        rowFunc(arr);
    };

    createPerson(item){
       personList[item.id] = item;
    }

    getPerson(id) {
        alert('id: ' + personList[id].id + ' First name: ' + personList[id].fname + ' Last name: ' + personList[id].lname + ' Age: ' + personList[id].age);
    };

    updatePerson(item) {
        personList[item.id] = item
    };

    deletePerson(id) {
        delete personList[id];
    };
}

class PersonDAOLS {
    constructor() {
        if (PersonDAOLS.instance) {
            return PersonDAOLS.instance;
        } else {
            PersonDAOLS.instance = this;
        }
    }

    getAllPerson() {
        const personList = JSON.parse(localStorage.getItem('item'));
        let arr = [];
        for (let key in personList) {
            arr.push(personList[key]);
        }
        rowFunc(arr);
    };

    createPerson(item){
        const personList = JSON.parse(localStorage.getItem("item"));
        personList[item.id] = item;
        localStorage.setItem("item", JSON.stringify(personList));
    }

    getPerson(id) {
        const personList = JSON.parse(localStorage.getItem('item'));
        alert('id: ' + personList[id].id + ' First name: ' + personList[id].fname + ' Last name: ' + personList[id].lname + ' Age: ' + personList[id].age);
    };

    updatePerson(item) {
        const personList = JSON.parse(localStorage.getItem("item"));
        personList[item.id] = item;
        localStorage.setItem("item", JSON.stringify(personList));
    };

    deletePerson(id) {
        const personList = JSON.parse(localStorage.getItem('item'));
        personList[id.id] = id;
        localStorage.removeItem('id');
    };
}

class PersonDAOIndexedDB {
    constructor() {
        if (PersonDAOWindow.instance) {
            return PersonDAOWindow.instance;
        } else {
            PersonDAOWindow.instance = this;
        }
    }

    getAllPerson() {
        dbPromise.then(function (db) {
            const tx = db.transaction('store', 'readonly');
            const store = tx.objectStore('store');
            return store.getAll();
        }).then(function (items) {
            rowFunc(items);
        });
    };

    createPerson(item){
        dbPromise.then(function(db) {
            const tx = db.transaction('store', 'readwrite');
            const store = tx.objectStore('store');
            store.add(item);
            return tx.complete;
        }).then(function() {
            console.log('added item to the store os!');
        });
    }

    getPerson(id) {
        dbPromise.then(function(db) {
            const tx = db.transaction('store', 'readonly');
            const store = tx.objectStore('store');
            return store.get(id);
        }).then(function(val) {
            // showRow(val);
            alert('id: ' + val.id + ' First name: ' + val.fname + ' Last name: ' + val.lname + ' Age: ' + val.age);
        });
    };

    updatePerson(item) {
        dbPromise.then(function(db) {
            const tx = db.transaction('store', 'readwrite');
            const store = tx.objectStore('store');
            store.put(item);
            return tx.complete;
        }).then(function() {
            console.log('item updated!');
        });
    };

    deletePerson(id) {
        dbPromise.then(function(db) {
            const tx = db.transaction('store', 'readwrite');
            const store = tx.objectStore('store');
            store.delete(id);
            return tx.complete;
        }).then(function() {
            console.log('Item deleted');
        });
    };
}

class PersonDAOServerStorage {
    constructor() {
        if (PersonDAOServerStorage.instance) {
            return PersonDAOServerStorage.instance;
        } else {
            PersonDAOServerStorage.instance = this;
        }
    }

    getAllPerson() {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM persons1', [], function (tx, results) {
                let len = results.rows.length, i;
                let arr = [];
                for (i = 0; i < len; i++) {
                    let getItem = results.rows.item(i);
                    arr.push(getItem);
                }
                rowFunc(arr);
            }, null);
        });
    };

    createPerson(item){
        db.transaction(function (tx) {
                tx.executeSql('INSERT INTO persons1 (id, fname, lname, age) VALUES (?, ?, ?, ?)', [item.id, item.fname, item.lname, item.age]);
        });
    }

    getPerson(id) {
        db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM persons1 WHERE id=?', [id], function (tx, results) {
            }, null);
        });
    };

    updatePerson(item) {
        db.transaction(function (tx) {
            tx.executeSql("UPDATE persons1 SET fname=?, lname=?, age=? WHERE id=?;",[item.fname, item.lname, item.age, item.id,]);
        });
    };

    deletePerson(id) {
        db.transaction(function (tx) {
            tx.executeSql('DELETE FROM persons1 WHERE id=?', [id], function (tx, results) {
            }, null);
        });
    };
}