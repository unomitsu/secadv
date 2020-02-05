
// 次のシナリオ
function checkRelationNextScenario() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);

            // テーブルがなければ新規に作成する
            db.run('CREATE TABLE IF NOT EXISTS relation_next_scenario ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'id_current INTEGER, '
                + 'id_next INTEGER, '
                + 'FOREIGN KEY(id_current) REFERENCES scenario(id), '
                + 'FOREIGN KEY(id_next) REFERENCES scenario(id), '
                + 'UNIQUE (id_current, id_next)'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM relation_next_scenario', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが無ければ作成する
                else if (row == null) {
                    db.run('INSERT INTO relation_next_scenario (id_current, id_next) VALUES '
                        + '(1, 2), '
                        + '(2, 3), (2, 4), '
                        + '(3, 5), (3, 6), '
                        + '(4, 3), (4, 5), '
                        + '(5, 6), (5, 10), '
                        + '(6, 7), '
                        + '(7, 8), '
                        + '(8, 9), '
                        + '(9, 10), '
                        + '(10, 11) '
                    );

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

/*
                    const stmt = db.prepare('INSERT INTO relation_next_scenario (id_current, id_next) VALUES (?, ?)');

                    stmt.run([1, 2]);

                    stmt.run([2, 3]);
                    stmt.run([2, 4]);

                    stmt.run([3, 5]);
                    stmt.run([3, 6]);

                    stmt.run([4, 3]);
                    stmt.run([4, 5]);

                    stmt.run([5, 6]);
                    stmt.run([5, 10]);

                    stmt.run([6, 7]);
                    stmt.run([7, 8]);
                    stmt.run([8, 9]);
                    stmt.run([9, 10]);

                    stmt.run([10, 11]);

                    stmt.finalize();
 */