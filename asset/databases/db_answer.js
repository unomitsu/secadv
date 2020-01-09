
/* ========== insert ========== */

// quiz_answer にデータを挿入
function dbInsertQuizAnswer(answer) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run('INSERT INTO quiz_answer (answer, available) VALUES ($a, 1)',
                {
                    $a: answer
                },
                (err) => {
                    err ? resolve(err) : resolve("resolve");        // Promiseで返すresolveを設定
                }
            );
        });

        db.close();  // DBを閉じる
    });
}

// 可能であれば quiz_answer にデータを挿入し、その id を返す
async function insertQuizAnswer(answer) {
    let result = "reject";     // 処理の結果

    // 引数データの挿入
    await dbInsertQuizAnswer(answer).then(res => {
        if (res == "resolve") { console.log("挿入完了"); }
        else { console.log("挿入失敗 - ERR -> ", res); }
    });

    // 引数データのIDを取得する
    await selectQuizAnswerId(answer).then(res => {
        console.log("ABCDEFG -- ", res);
        if (res.length > 0) { result = res["id"]; }
    });

    return result;
}


/* ========== select ========== */

// quiz_answer テーブルから、指定した answer カラムの id カラムを返す
function selectQuizAnswerId(answer) {
    var db = new sqlite3.Database(dbName);  // DBを開く

    return new Promise(resolve => {
        db.serialize(() => {
            db.get('SELECT * FROM quiz_answer WHERE answer = $a',
                {
                    $a: answer
                },
                (err, row) => {
                    // エラーもしくは実行結果を返す
                    err ? resolve(err): resolve(row);
                }
            );
            db.close();     // DBを閉じる
        });
    });
}


/* ========== create ========== */

function checkQuizAnswer() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // テーブルが無ければ新規に作成する
            db.run(
                'CREATE TABLE IF NOT EXISTS quiz_answer ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'answer TEXT NOT NULL UNIQUE, '
                + 'available INTEGER NOT NULL'
                + ')'
            );

            // テーブル内にデータが無ければ新規に作成する
            db.get('SELECT * FROM quiz_answer', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quiz_answer (answer, available) VALUES (?, ?)');

                    stmt.run(["解答1", 1]);
                    stmt.run(["解答2", 1]);
                    stmt.run(["解答3", 1]);
                    stmt.run(["解答4", 1]);
                    stmt.run(["ハンバーガー", 1]);
                    stmt.run(["ポテト", 1]);
                    stmt.run(["ナゲット", 1]);
                    stmt.run(["コーラ", 1]);
                    stmt.run(["我", 1]);
                    stmt.run(["我々", 1]);
                    stmt.run(["我、天才", 1]);
                    stmt.run(["天才ですからー？", 1]);
                    stmt.run(["Lego", 1]);
                    stmt.run(["WinT", 1]);
                    stmt.run(["WinG", 1]);
                    stmt.run(["BeeCon", 1]);
                    stmt.run(["めざせポケモンマスター", 1]);
                    stmt.run(["1・2・3", 1]);
                    stmt.run(["ライバル!", 1]);
                    stmt.run(["チャレンジャー!!", 1]);
                    stmt.run(["クラッキング", 1]);
                    stmt.run(["バッファオーバーフロー", 1]);
                    stmt.run(["フィッシング", 1]);
                    stmt.run(["ボット", 1]);
                    stmt.finalize();

                    console.log("quiz_answer => new");
                }
                else {
                    console.log("quiz_answer => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}