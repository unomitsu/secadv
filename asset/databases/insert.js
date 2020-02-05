


/* ===== scenario にデータを挿入 ===== */
function dbInsertScenario(title, level, situation, image) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run('INSERT INTO scenario (title, level, situation, image) VALUES ($a, $b, $c, $d)',
                {
                    $a: title,
                    $b: level,
                    $c: situation,
                    $d: image
                },
                (err) => {
                    // Promiseで返すresolveを設定
                    err ? resolve(err) : resolve("resolve");
                });
        });

        db.close();  // DBを閉じる
    });
}

// 最大の scenario.id を返却する
function dbSelectScenarioMaxId() {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // IDが最大のものを返却する
        db.serialize(() => {
            db.get('SELECT max(id) FROM scenario',
                (err, row) => {
                    err ? resolve(err) : resolve(row);  // Promiseで返すresolveを設定
                }
            );
        });

        db.close();  // DBを閉じる
    });
}

// scenario にデータを挿入し、scenario の id を返す
async function insertScenario(title, level, situation, image) {
    let result = "reject";  // 結果変数

    // 引数データの挿入
    await dbInsertScenario(title, level, situation, image).then((res) => {
        console.log(`INSERT INTO scenario (${title}, ${level}, ${situation}, ${image}) -> `);
        (res == "resolve") ? console.log("挿入完了") : console.log("挿入失敗 - ERR -", res);
    });
    // IDが最大であるものを検索することで、挿入した引数データのIDを取得する
    await dbSelectScenarioMaxId().then((res) => {
        result = res;
    });

    return result;
}

/* ----- scenario_element にデータを挿入 ----- */
function dbInsertScenarioElement(scenarioId, text, sorder) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run('INSERT INTO scenario_element (id_scenario, text, sorder) VALUES ($a, $b, $c)',
                {
                    $a: scenarioId,
                    $b: text,
                    $c: sorder
                },
                (err) => {
                    // Promiseで返すresolveを設定
                    err ? resolve(err) : resolve("resolve");
                });
        });

        db.close();  // DBを閉じる
    });
}
async function insertScenarioElement(scenarioId, text, sorder) {
    // 引数データの挿入
    const result = await dbInsertScenarioElement(scenarioId, text, sorder).then(res => {
        console.log(`'INSERT INTO scenario_element (${scenarioId}, ${text}, ${sorder}) -> `);
        if (res == "resolve") { console.log("挿入完了"); }
        else { console.log("挿入失敗 - ERR -> ", res); }
    });
    return result;
}

// -- DBへのシナリオ追加
async function makeScenario(title, level, type, image, elem) {
    /* 入力データの確認 */
    // タイトルが空欄でないか
    // テキストが空欄でないか？

    let scenarioId; // シナリオID保持用

    // シナリオタイトルの挿入、シナリオのIDが返される
    await insertScenario(title, level, type, image).then((res) => {
        scenarioId = res["max(id)"];
    });

    // 挿入の確認
    getTableDataWhereAll("scenario", `id = ${scenarioId}`).then(res => {
        console.log(res);
    });

    // シナリオ要素の挿入
    console.log(elem.length);

    // シナリオ追加、INSERTを仮保持配列分ループ
    for (let i = 0; i < elem.length; i++) {
        await insertScenarioElement(scenarioId, elem[i], i);
    }

}


// -- データベースへ追加するイベント
async function makeQuiz(title, level, type, problem, answer, explanation) {
    let quizId;
    let selectId;
    
    console.log("挿入したいデータ ", title, level, type, problem, answer, explanation);

    /* 入力データの確認 */

    /* 問題の登録、問題のIDが返却される */
    await insertQuiz(title, problem, explanation, level, type).then(res => {
        quizId = res;
        console.log("quiz_ID", quizId);

        getTableDataWhereAll("quiz", `id = ${quizId}`).then(res => {
            console.log(res);
        });

    });

    /* 選択肢の登録、選択肢のIDが返却される */
    for (let a of answer) {
        console.log(a[0], a[1]);
        
        await insertQuizAnswer(a[0], a[1]).then(res => {
            selectId = res;
            console.log("quiz_answer ", selectId);

            insertRelationQuizAnswer(quizId, selectId, 1);    // 関連テーブルへの登録
        });
    }

}

/*
function dbInsertScenario(id, snum, scenario) {
    var db = new sqlite3.Database(dbName);  // DBを開く

    db.serialize( () => {
	db.run('INSERT INTO scenario (id, snum, scenario) VALUES ($a, $b, $c)',
	       {
		   $a: id,
		   $b: snum,
		   $c: scenario
	       });
    });

    db.close();  // DBを閉じる
}
*/

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
