
/* ========== select ========== */

// 指定した シナリオid の全要素を返す
function dbSelectScenarioSetAll() {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースから全データを取得
        db.serialize(() => {
            db.all('SELECT * FROM scenarioset',
                (err, rows) => {
                    if (err) { resolve(err); }
                    else { resolve(rows); }

                    db.close();  // DBを閉じる
                });
        });
    });
}
async function selectScenarioSetAll() {
    const result = await dbSelectScenarioSetAll();
    console.log(`<SELECT * FROM scenarioset>`, result);
    return result;
}

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
                    db.run(
                        'INSERT INTO scenarioset (title, level, start) VALUES '
                        + '("サンプルシナリオ1", 1, 1) '
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
const stmt = db.prepare('INSERT INTO scenarioset (title, level, start) VALUES (?, ?, ?)');

stmt.run(['サンプルシナリオ1', 1, 1]);
stmt.finalize();
*/