
// TABLEの確認とTABLE内のデータの確認を行う
// それぞれ、無い場合は新規に作成する

/* ----- quizzes table ----- */
function checkQuizzes() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く
        
        db.serialize(() => {
            // テーブルの確認と、無い場合の新規作成
            db.run('CREATE TABLE IF NOT EXISTS quizzes (id INTEGER, problem TEXT, answer1 TEXT, answer2 TEXT, answer3 TEXT, answer4 TEXT, explanation TEXT)');

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM quizzes', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quizzes VALUES (?, ?, ?, ?, ?, ?, ?)');
                    stmt.run([0, 'これは問題文です。', '解答１', '解答２', '解答３', '解答４', 'これは解説文です。']);
                    stmt.finalize();
                    console.log("quizzes => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("quizzes => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}

/* ----- scenarios table ----- */
function checkScenarios() {
    return new Promise(resolve => {
        let db3 = new sqlite3.Database(dbName);  // DBを開く
        
        db3.serialize(() => {
            // TABLEの確認と、無い場合の新規作成
            db3.run('CREATE TABLE IF NOT EXISTS scenarios (id INTEGER, snum INTEGER, scenario TEXT)');

            // TABLE内のデータの確認と、無い場合の新規作成
            db3.get('SELECT * FROM scenarios', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期のシナリオを挿入
                else if (row == null) {
                    const stmt2 = db3.prepare('INSERT INTO scenarios VALUES (?, ?, ?)');
                    stmt2.run([0, 0, 'これはシナリオです。']);
                    stmt2.run([0, 1, 'これもシナリオです。']);
                    stmt2.run([0, 2, 'まだまだシナリオです。']);
                    stmt2.finalize();
                    console.log("scenarios => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("scenarios => ", row);
                }

                db3.close();  // DBを閉じる
                resolve("resolve");
            });
        });
    });
}
