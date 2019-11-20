
function dbSelectQuizMaxId() {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // IDが最大のものを返却する
        db.serialize(() => {
            db.get('SELECT max(id) FROM quiz',
                (err, row) => {
                    err ? resolve(err) : resolve(row);  // Promiseで返すresolveを設定
                }
            );
        });

        db.close();  // DBを閉じる
    });
}

/* ----- quiz にデータを挿入 ----- */
function dbInsertQuiz(title, problem, explanation, type, level) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run('INSERT INTO quiz (title, problem, explanation, type, level) VALUES ($a, $b, $c, $d, $e)',
                {
                    $a: title,
                    $b: problem,
                    $c: explanation,
                    $d: type,
                    $e: level
                },
                (err) => {
                    // Promiseで返すresolveを設定
                    err ? resolve(err) : resolve("resolve");
                });
        });

        db.close();  // DBを閉じる
    });
}
async function insertQuiz(title, problem, explanation, type, level) {
    let result = "reject";     // 処理の結果
    
    // 引数データの挿入
    await dbInsertQuiz(title, problem, explanation, type, level).then(res => {
        (res == "resolve") ? console.log("挿入完了") : console.log("挿入失敗 - ERR -> ", res);
    });

    // 最後に追加した行のROWIDを用いて、挿入した引数データのIDを取得する
    await dbSelectQuizMaxId().then(res => {
        console.log("BBB ", res);
        result = res["max(id)"];
    });

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
        else { console.log("挿入失敗 - ERR -> ", res); }
    });

    // 引数データのIDを取得する
    await dbSelectWhereAll("quiz_answer", `answer = "${answer}"`).then(res => {
        if (res.length > 0) { result = res[0]["id"]; }
    });
    
    return result;
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
