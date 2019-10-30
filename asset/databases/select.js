function dbSelectQuizAll() {
    var db = new sqlite3.Database(dbName);  // DBを開く
    
    // データベースから全問題データを取得
    db.all('SELECT * FROM quizzes', function (err, rows) {
        // エラーが発生した場合、エラーを返す
        if (err) { throw err; }
        // 
        rows.forEach(function (row) {
            console.log(row);
        });
    });

    db.close();  // DBを閉じる
}

function getScenario() {
    return new Promise(resolve => {
        var db = new sqlite3.Database(dbName);  // DBを開く

        // データベースから全シナリオデータを取得
        db.serialize(() => {
            db.all('SELECT * FROM scenarios', function (err, rows) {
                console.log("get -> ", rows);

                db.close();  // DBを閉じる
                resolve(rows);  // Promiseで返すresolveを設定
            });
        });
    });
}

async function dbSelectScenarioAll() {
    const result = await getScenario();
    console.log(result);
    return result;
}


/*
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./asset/databases/example.sqlite');

db.all('SELECT * FROM user', function(err, rows) {
    if (err) { throw err; }
    rows.forEach(function(row) {
	console.log(row.name + ' ' + row.age);
    });
});

db.close();
*/
