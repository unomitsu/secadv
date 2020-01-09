
/* ========== create ========== */

/* ----- シナリオテーブル scenarios ----- */
function checkScenario() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);

            // テーブルがなければ新規に作成する  FOREIGN KEY(situation) REFERENCES list(title)
            db.run(
                'CREATE TABLE IF NOT EXISTS scenario ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'title TEXT NOT NULL, '
                + 'level INTEGER, '
                + 'situation INTEGER, '
                + 'image INTEGER'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM scenario', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt2 = db.prepare('INSERT INTO scenario (id, title, level, situation, image) VALUES (?, ?, ?, ?, ?)');

                    stmt2.run([1, 'サンプルシナリオ1', 1, 1, 1]);
                    stmt2.run([2, 'お腹すいた', 1, 2, 1]);
                    stmt2.run([3, '迷走', 1, 3, 1]);
                    stmt2.run([4, '情報環境実験２', 1, 3, 1]);
                    stmt2.run([5, 'ポケットモンスターOP', 1, 3, 1]);
                    stmt2.run([6, '終わり', 1, 3, 1]);
                    stmt2.finalize();

                    console.log("scenario => new");
                }
                else {
                    console.log("scenario => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}