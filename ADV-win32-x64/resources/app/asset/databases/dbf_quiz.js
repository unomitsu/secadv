
/* ----- 分類テーブル quiz_type ----- */
function checkQuizType() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // テーブルの確認と、無い場合の新規作成
            db.run(
                'CREATE TABLE IF NOT EXISTS quiz_type ('
                + 'id INTEGER PRIMARY KEY, '
                + 'type TEXT NOT NULL, '
                + 'available INTEGER NOT NULL'
                + ')'
            );

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM quiz_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    db.run('INSERT INTO quiz_type (type, available) VALUES '
                        + '("CRYPTO", 1), '
                        + '("CALCULATION", 1), '
                        + '("KNOWLEDGE", 1), '
                        + '("WORK", 1)'
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
                    const stmt = db.prepare('INSERT INTO quiz_type (type, available) VALUES (?, ?)');

                    stmt.run(['CRYPTO', 1]);
                    stmt.run(['CALCULATION', 1]);
                    stmt.run(['KNOWLEDGE', 1]);
                    stmt.run(['WORK', 1]);
                    stmt.finalize();
                    */