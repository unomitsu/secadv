

/* ----- quiz にデータを挿入 ----- */
function dbInsertQuiz(title, problem, explanation, type, level) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run(`INSERT INTO quiz (title, problem, explanation, type, level) VALUES ("${title}", "${problem}", "${explanation}", ${type}, ${level})`);
        });

        db.close();  // DBを閉じる
        resolve("resolve");  // Promiseで返すresolveを設定
    });
}
async function insertQuiz(title, problem, explanation, type, level) {
    const result = await dbInsertQuiz(title, problem, explanation, type, level);
    console.log(`INSERT INTO quiz (title, problem, explanation, type, level) VALUES ("${title}", "${problem}", "${explanation}", ${type}, ${level})`);
    return result;
}

/* ----- quiz_answer にデータを挿入 ----- */
function dbInsertQuizAnswer(answer) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run(`INSERT INTO quiz_answer (answer, available) VALUES ("${answer}", 1)`, (err) => {
                err ? resolve(err) : resolve("resolve");        // Promiseで返すresolveを設定
            });
        });

        db.close();  // DBを閉じる
    });
}
async function insertQuizAnswer(answer) {
    let result = "reject";     // 処理の結果

    // 引数データの挿入
    await dbInsertQuizAnswer(answer).then(res => {
        if (res == "resolve") { console.log("挿入完了"); }
        else { console.log("挿入失敗 - 重複しました"); }
    });

    // 引数データのIDを取得する
    await dbSelectWhereAll("quiz_answer", `answer = "${answer}"`).then(res => {
        if (res.length > 0) { result = res[0]["id"]; }
    });
    
    return result;
}




function dbInsertQuiz() {
    var db = new sqlite3.Database(dbName);  // DBを開く

    // データベースへ追加
    db.serialize( () => {
	db.run('INSERT INTO user (name, age) VALUES ($i, $j)',
	       {
		   $i: "Poo",
		   $j: 987
	       });
    });		  

    db.close();  // DBを閉じる
}

function dbInsertScenario(id, snum, scenario) {
    var db = new sqlite3.Database(dbName);  // DBを開く

    db.serialize( () => {
	db.run('INSERT INTO scenarios (id, snum, scenario) VALUES ($a, $b, $c)',
	       {
		   $a: id,
		   $b: snum,
		   $c: scenario
	       });
    });

    db.close();  // DBを閉じる
}

/*
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./asset/databases/example.sqlite');

db.serialize( () => {
    db.run('CREATE TABLE IF NOT EXISTS user (name TEXT, age INTEGER)')

    const stmt = db.prepare('INSERT INTO user VALUES (?, ?)');
    stmt.run(['Foo', 25]);
    stmt.run(['Bar', 39]);
    stmt.run(['Baz', 31]);

    stmt.finalize();
});

db.close();

*/
