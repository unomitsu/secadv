
/* ----- quizzes table から全データを取得 ----- */ 
function getQuizzes() {
    return new Promise(resolve => {
        var db = new sqlite3.Database(dbName);  // DBを開く

        // データベースから全クイズデータを取得
        db.serialize(() => {
            db.all('SELECT * FROM quizzes', function (err, rows) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                db.close();  // DBを閉じる
                resolve(rows);  // Promiseで返すresolveを設定
            });
        });
    });
}

async function dbSelectQuizzesAll() {
    const result = await getQuizzes();
    console.log("<SELECT quizzes>", result);
    return result;
}

/* ----- scenarios table から全データを取得 ----- */
function getScenario() {
    return new Promise(resolve => {
        var db = new sqlite3.Database(dbName);  // DBを開く

        // データベースから全シナリオデータを取得
        db.serialize(() => {
            db.all('SELECT * FROM scenarios', function (err, rows) {
                db.close();  // DBを閉じる
                resolve(rows);  // Promiseで返すresolveを設定
            });
        });
    });
}

async function dbSelectScenarioAll() {
    const result = await getScenario();
    console.log("<SELECT scenario>", result);
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
