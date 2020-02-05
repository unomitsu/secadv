
/* ========== select ========== */

// 指定した id の全要素を返す
function dbSelectImagePath(sid) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースから全データを取得
        db.serialize(() => {
            db.all('SELECT * FROM scenario, image_type WHERE scenario.id = $a AND scenario.image = image_type.id',
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
async function selectImagePath(sid) {
    const result = await dbSelectImagePath(sid);
    console.log(`<SELECT * FROM scenario, image_type WHERE scenario.id = ${sid} AND scenario.image = image_type.id>`, result);
    return result;
}

/* ----- 画像テーブル image_type ----- */
function checkImageType() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // テーブルの確認と、無い場合の新規作成
            db.run(
                'CREATE TABLE IF NOT EXISTS image_type ('
                + 'id INTEGER PRIMARY KEY, '
                + 'type TEXT NOT NULL, '
                + 'path TEXT NOT NULL, '
                + 'available INTEGER NOT NULL'
                + ')'
            );

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM image_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    db.run('INSERT INTO image_type (type, path, available) VALUES '
                        + '("タイトル", "./asset/images/title.jpg", 1), '
                        + '("教室", "./asset/images/classroom.jpg", 1), '
                        + '("喜田研究室", "./asset/images/kidalabo.JPG", 1), '
                        + '("最所研究室", "./asset/images/saisyolabo.JPG", 1), '
                        + '("米谷研究室", "./asset/images/kometanilabo.JPG", 1), '
                        + '("富永研究室", "./asset/images/tomilabo.JPG", 1), '
                        + '("安藤研究室", "./asset/images/andolabo.JPG", 1), '
                        + '("香川大学", "./asset/images/kagawauniv.jpg", 1)'
                    );

                    resolve("new");     // Promiseで返すresolveを設定
                }
                else {
                    resolve(row);       // Promiseで返すresolveを設定
                }
                db.close();             // DBを閉じる
            });
        });
    });
}

                    /*
                    const stmt = db.prepare('INSERT INTO image_type (type, path, available) VALUES (?, ?, ?)');

                    stmt.run(['タイトル', './asset/images/title.jpg', 1]);
                    stmt.run(['教室', './asset/images/classroom.jpg', 1]);
                    stmt.run(['喜田研究室', './asset/images/kidalabo.JPG', 1]);
                    stmt.run(['最所研究室', './asset/images/saisyolabo.JPG', 1]);
                    stmt.run(['米谷研究室', './asset/images/kometanilabo.JPG', 1]);
                    stmt.run(['富永研究室', './asset/images/tomilabo.JPG', 1]);
                    stmt.run(['安藤研究室', './asset/images/andolabo.JPG', 1]);
                    stmt.run(['香川大学', './asset/images/kagawauniv.jpg', 1]);

                    stmt.finalize();
                    */