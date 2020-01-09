
/* ========== create ========== */

function checkScenarioSet() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // テーブルがなければ新規に作成する
            db.run(
                'CREATE TABLE IF NOT EXISTS scenarioset ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'title TEXT NOT NULL, '
                + 'level INTEGER, '
                + 'start INTEGER NOT NULL'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM scenarioset', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO scenarioset (title, level, start) VALUES (?, ?, ?)');

                    stmt.run(['サンプルシナリオ1', 1, 1]);
                    stmt.finalize();

                    console.log("scenarioset => new");
                }
                else {
                    console.log("scenarioset => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}