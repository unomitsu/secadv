
/* ========== select ========== */

// 指定した id の全要素を返す
function dbSelectScenario(sid) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースから全データを取得
        db.serialize(() => {
            db.all('SELECT * FROM scenario WHERE id = $a',
                {
                    $a: sid
                },
                (err, rows) => {
                    if (err) { resolve(err); }
                    else { resolve(rows); }

                    db.close();  // DBを閉じる
                });
        });
    });
}
async function selectScenario(sid) {
    const result = await dbSelectScenario(sid);
    console.log(`<SELECT * FROM scenario WHERE id = ${sid}>`, result);
    return result;
}


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
                + 'image INTEGER, '
                + 'FOREIGN KEY (image) REFERENCES image_type(id)'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM scenario', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが無ければ作成する
                else if (row == null) {
                    db.run(
                        'INSERT INTO scenario (id, title, level, image) VALUES '
                        + '(0, "終わり", 1, 1), '
                        + '(1, "申し込み", 1, 1), '
                        + '(2, "受付", 1, 1), '
                        + '(3, "喜田研", 1, 1), '
                        + '(4, "最所研", 1, 1), '
                        + '(5, "米谷研", 1, 1), '
                        + '(6, "富永研", 1, 1), '
                        + '(7, "富永研2", 3, 1), '
                        + '(8, "富永研3", 1, 1), '
                        + '(9, "富永研4", 1, 1), '
                        + '(10, "安藤研", 1, 1), '
                        + '(11, "OC終了", 1, 1), '
                        + '(15, "ポケットモンスターOP", 3, 1), '
                        + '(16, "お腹すいた", 1, 2)'
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
                    const stmt2 = db.prepare('INSERT INTO scenario (id, title, level, image) VALUES (?, ?, ?, ?)');

                    stmt2.run([0, '終わり', 1, 1]);
                    stmt2.run([1, '申し込み', 1, 1]);
                    stmt2.run([2, '受付', 1, 1]);
                    stmt2.run([3, '喜田研', 1, 1]);
                    stmt2.run([4, '最所研', 1, 1]);
                    stmt2.run([5, '米谷研', 1, 1]);
                    stmt2.run([6, '富永研', 1, 1]);
                    stmt2.run([7, '富永研2', 3, 1]);
                    stmt2.run([8, '富永研3', 1, 1]);
                    stmt2.run([9, '富永研4', 1, 1]);
                    stmt2.run([10, '安藤研', 1, 1]);
                    stmt2.run([11, 'OC終了', 1, 1]);
                    stmt2.run([15, 'ポケットモンスターOP', 3, 1]);
                    stmt2.run([16, 'お腹すいた', 1, 2]);
                    stmt2.finalize();
                    */