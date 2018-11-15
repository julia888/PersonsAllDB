const dbName = "PersonsDB";
const dbVersion = "0.1";
const dbDisplayName = "PersonsDB";
const dbMaxSize = 2048;

const db = openDatabase(dbName, dbVersion, dbDisplayName, dbMaxSize);

db.transaction(function (tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS persons1 " +
        "(id INTEGER NOT NULL PRIMARY KEY, " +
        "fname TEXT NOT NULL, " +
        "lname TEXT NOT NULL, " +
        "age INTEGER NOT NULL);")
});

