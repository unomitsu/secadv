﻿
// シナリオとクイズ
function checkRelationScenarioQuiz() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);

            // テーブルの確認と、無い場合の新規作成
            db.run(
                'CREATE TABLE IF NOT EXISTS relation_scenario_quiz ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'id_scenario INTEGER, '
                + 'id_quiz INTEGER, '
                + 'FOREIGN KEY (id_quiz) REFERENCES quiz(id), '
                + 'FOREIGN KEY (id_scenario) REFERENCES scenario(id), '
                + 'UNIQUE(id_scenario, id_quiz)'
                + ')'
            );

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM relation_scenario_quiz', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO relation_scenario_quiz (id_scenario, id_quiz) VALUES (?, ?)');

                    stmt.run([1, 7]);
                    stmt.run([2, 8]);
                    stmt.run([3, 9]);
                    stmt.run([4, 10]);
                    stmt.run([5, 11]);
                    stmt.run([6, 13]);
                    stmt.run([7, 14]);
                    stmt.run([8, 15]);
                    stmt.run([9, 16]);
                    stmt.run([10, 12]);
                    stmt.run([11, 17]);

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
