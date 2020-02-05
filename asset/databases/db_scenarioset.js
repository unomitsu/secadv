
/* ========== create ========== */

function checkScenarioSet() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);

            // テーブルがなければ新規に作成する
            db.run(
                'CREATE TABLE IF NOT EXISTS scenarioset ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'title TEXT NOT NULL, '
                + 'level INTEGER, '
                + 'start INTEGER, '
                + 'FOREIGN KEY (start) REFERENCES scenario(id)'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM scenarioset', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO scenarioset (title, level, start) VALUES (?, ?, ?)');

                    stmt.run(['サンプルシナリオ1', 1, 1]);
                    stmt.finalize();

                    resolve("new");     // Promiseで返すresolveを設定
                }
                else {
                    resolve(row);     // Promiseで返すresolveを設定
                }

                db.close();             // DBを閉じる
            });
        });
    });
}