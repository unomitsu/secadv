
// TABLEの確認とTABLE内のデータの確認を行う
// それぞれ、無い場合は新規に作成する

/* ===== 実体テーブル ===== */

/* ----- クイズテーブル quiz ----- */
function checkQuiz() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く
        
        db.serialize(() => {
            // foreign key の有効化
            db.get('PRAGMA foreign_keys', function (err, row) {
                if (err) { throw err; }     // エラーが発生した場合、エラーを返す
                if (row["foreign_keys"] == 0) { db.run('PRAGMA foreign_keys = 1'); }    // foreign_keysが無効の場合、有効にする
            });

            // テーブルの確認と、無い場合の新規作成
            let tq = 'CREATE TABLE IF NOT EXISTS quiz ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'title TEXT NOT NULL, '
                + 'problem TEXT NOT NULL, '
                + 'explanation TEXT, '
                + 'type INTEGER NOT NULL, '
                + 'level INTEGER, '
                + 'FOREIGN KEY (type) REFERENCES quiz_type(id)'
                + ')';
            db.run(tq);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM quiz', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quiz (title, problem, explanation, type, level) VALUES (?, ?, ?, ?, ?)');
                    stmt.run(['サンプルシナリオ', 'これは問題文です。', 'これは解説文です。', 3, 1]);
                    stmt.finalize();
                    console.log("quiz => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("quiz => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}

/* ----- シナリオセットテーブル scenarioset ----- */
function checkScenarioSet() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            let query = 'CREATE TABLE IF NOT EXISTS scenarioset ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'title TEXT NOT NULL, '
                + 'level INTEGER'
                + ')';

            // テーブルの確認と、無い場合の新規作成
            db.run(query);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM scenarioset', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO scenarioset (title, level) VALUES (?, ?)');
                    stmt.run(['サンプルシナリオ1', 1]);
                    stmt.finalize();
                    console.log("scenarioset => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("scenarioset => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}

/* ----- シナリオテーブル scenarios ----- */
function checkScenario() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く
        
        db.serialize(() => {
            // foreign key の有効化
            db.get('PRAGMA foreign_keys', function (err, row) {
                if (err) { throw err; }     // エラーが発生した場合、エラーを返す
                if (row["foreign_keys"] == 0) { db.run('PRAGMA foreign_keys = 1'); }    // foreign_keysが無効の場合、有効にする
            });

            let query = 'CREATE TABLE IF NOT EXISTS scenario ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'title TEXT NOT NULL, '
                + 'level INTEGER, '
                + 'situation INTEGER, '
                + 'image INTEGER'
                + ')';

            // TABLEの確認と、無い場合の新規作成 FOREIGN KEY (situation) REFERENCES list(title)
            db.run(query);

            // TABLE内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM scenario', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期のシナリオを挿入
                else if (row == null) {
                    const stmt2 = db.prepare('INSERT INTO scenario (title, level, situation, image) VALUES (?, ?, ?, ?)');
                    stmt2.run(['サンプルシナリオ1', 1, 1, 1]);
                    stmt2.run(['サンプルシナリオ2', 1, 2, 1]);
                    stmt2.run(['サンプルシナリオ3', 1, 3, 1]);
                    stmt2.finalize();
                    console.log("scenario => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("scenario => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");
            });
        });
    });
}

/* ----- シナリオ要素テーブル scenarioelements ----- */
function checkScenarioElement() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // foreign key の有効化
            db.get('PRAGMA foreign_keys', function (err, row) {
                if (err) { throw err; }     // エラーが発生した場合、エラーを返す
                if (row["foreign_keys"] == 0) { db.run('PRAGMA foreign_keys = 1'); }    // foreign_keysが無効の場合、有効にする
            });

            let query = 'CREATE TABLE IF NOT EXISTS scenario_element ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'id_scenario INTEGER, '
                + 'text TEXT, '
                + 'sorder INTEGER, '
                + 'unique(id_scenario, sorder), '
                + 'FOREIGN KEY (id_scenario) REFERENCES scenario(id)'
                + ')';

            // TABLEの確認と、無い場合の新規作成 FOREIGN KEY (situation) REFERENCES list(title)
            db.run(query);

            // TABLE内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM scenario_element', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期のシナリオを挿入
                else if (row == null) {
                    const stmt2 = db.prepare('INSERT INTO scenario_element (id_scenario, text, sorder) VALUES (?, ?, ?)');
                    stmt2.run([1, 'これはシナリオです。', 0]);
                    stmt2.run([1, 'これもシナリオです。', 1]);
                    stmt2.run([1, 'まだまだシナリオです。', 2]);
                    stmt2.run([2, 'お腹すいたー。', 0]);
                    stmt2.run([2, '今日のお昼ご飯はハンバーガー。', 1]);
                    stmt2.run([2, '僕はカップ焼きそば！', 2]);
                    stmt2.run([3, 'お皿割れた。', 0]);
                    stmt2.run([3, 'LEGOが暴走して合体変形したよ', 1]);
                    stmt2.run([3, '我、我、我、、、', 2]);
                    stmt2.finalize();
                    console.log("scenario_element => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("scenario_element => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");
            });
        });
    });
}

/* ----- 選択肢テーブル ----- */
function checkQuizAnswer() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            let query = 'CREATE TABLE IF NOT EXISTS quiz_answer ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'answer TEXT NOT NULL'
                + ')';

            // TABLEの確認と、無い場合の新規作成
            db.run(query);

            // TABLE内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM quiz_answer', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期のシナリオを挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quiz_answer (answer) VALUES (?)');
                    stmt.run(["解答1"]);
                    stmt.run(["解答2"]);
                    stmt.run(["解答3"]);
                    stmt.run(["解答4"]);
                    stmt.finalize();
                    console.log("quiz_answer => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("quiz_answer => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");
            });
        });
    });
}


/* ===== 関連テーブル ===== */

// シナリオセットとシナリオ
function checkRelationScenariosetScenario() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // foreign key の有効化
            db.get('PRAGMA foreign_keys', function (err, row) {
                if (err) { throw err; }     // エラーが発生した場合、エラーを返す
                if (row["foreign_keys"] == 0) { db.run('PRAGMA foreign_keys = 1'); }    // foreign_keysが無効の場合、有効にする
            });

            let query = 'CREATE TABLE IF NOT EXISTS relation_scenarioset_scenario ('
                + 'id INTEGER PRIMARY KEY, '
                + 'id_scenarioset INTEGER NOT NULL, '
                + 'id_scenario INTEGER NOT NULL, '
                + 'FOREIGN KEY (id_scenarioset) REFERENCES scenarioset(id), '
                + 'FOREIGN KEY (id_scenario) REFERENCES scenario(id)'
                + ')';
            // テーブルの確認と、無い場合の新規作成
            db.run(query);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM relation_scenarioset_scenario', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO relation_scenarioset_scenario (id_scenarioset, id_scenario) VALUES (?, ?)');
                    stmt.run([1, 1]);
                    stmt.run([1, 2]);
                    stmt.run([1, 3]);
                    stmt.finalize();
                    console.log("relation_scenarioset_scenario => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("relation_scenarioset_scenario => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}

// シナリオとクイズ
function checkRelationScenarioQuiz() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // foreign key の有効化
            db.get('PRAGMA foreign_keys', function (err, row) {
                if (err) { throw err; }     // エラーが発生した場合、エラーを返す
                if (row["foreign_keys"] == 0) { db.run('PRAGMA foreign_keys = 1'); }    // foreign_keysが無効の場合、有効にする
            });

            let query = 'CREATE TABLE IF NOT EXISTS relation_scenario_quiz ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'id_scenario INTEGER NOT NULL, '
                + 'id_quiz INTEGER NOT NULL, '
                + 'FOREIGN KEY (id_quiz) REFERENCES quiz(id), '
                + 'FOREIGN KEY (id_scenario) REFERENCES scenario(id), '
                + 'UNIQUE(id_scenario, id_quiz)'
                + ')';

            // テーブルの確認と、無い場合の新規作成
            db.run(query);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM relation_scenario_quiz', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO relation_scenario_quiz (id_scenario, id_quiz) VALUES (?, ?)');
                    stmt.run([1, 1]);
                    stmt.run([2, 1]);
                    stmt.run([3, 1]);
                    stmt.finalize();
                    console.log("relation_scenario_quiz => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("relation_scenario_quiz => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}

// クイズと解答選択肢
function checkRelationQuizAnswer() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // foreign key の有効化
            db.get('PRAGMA foreign_keys', function (err, row) {
                if (err) { throw err; }     // エラーが発生した場合、エラーを返す
                if (row["foreign_keys"] == 0) { db.run('PRAGMA foreign_keys = 1'); }    // foreign_keysが無効の場合、有効にする
            });

            let query = 'CREATE TABLE IF NOT EXISTS relation_quiz_answer ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'id_quiz INTEGER NOT NULL, '
                + 'id_answer INTEGER NOT NULL, '
                + 'flag INTEGER NOT NULL, '
                + 'FOREIGN KEY(id_quiz) REFERENCES quiz(id), '
                + 'FOREIGN KEY(id_answer) REFERENCES quiz_answer(id), '
                + 'UNIQUE(id_quiz, id_answer)'
                + ')';

            // テーブルの確認と、無い場合の新規作成
                db.run(query);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM relation_quiz_answer', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO relation_quiz_answer (id_quiz, id_answer, flag) VALUES (?, ?, ?)');
                    stmt.run([1, 1, 1]);
                    stmt.run([1, 2, 0]);
                    stmt.run([1, 3, 0]);
                    stmt.run([1, 4, 0]);
                    stmt.finalize();
                    console.log("relation_quiz_answer => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("relation_quiz_answer => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}


/* ===== 外部制約テーブル ===== */

/* ----- 分類テーブル quiz_type ----- */
function checkQuizType() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // テーブルの確認と、無い場合の新規作成
            let tq = 'CREATE TABLE IF NOT EXISTS quiz_type ('
                + 'id INTEGER PRIMARY KEY, '
                + 'type TEXT NOT NULL'
                + ')';
            db.run(tq);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM quiz_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quiz_type (type) VALUES (?)');
                    stmt.run(['CRYPTO']);
                    stmt.run(['CALCULATION']);
                    stmt.run(['KNOWLEDGE']);
                    stmt.run(['WORK']);
                    stmt.finalize();
                    console.log("quiz_type => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("quiz_type => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}

/* ----- 状況テーブル situation_type ----- */
function checkSituationType() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // テーブルの確認と、無い場合の新規作成
            let tq = 'CREATE TABLE IF NOT EXISTS situation_type ('
                + 'id INTEGER PRIMARY KEY, '
                + 'type TEXT NOT NULL'
                + ')';
            db.run(tq);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM situation_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO situation_type (type) VALUES (?)');
                    stmt.run(['放課後']);
                    stmt.run(['昼休憩']);
                    stmt.run(['大事件']);
                    stmt.finalize();
                    console.log("situation_type => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("situation_type => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}

/* ----- 画像テーブル image_type ----- */
function checkImageType() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // テーブルの確認と、無い場合の新規作成
            let tq = 'CREATE TABLE IF NOT EXISTS image_type ('
                + 'id INTEGER PRIMARY KEY, '
                + 'type TEXT NOT NULL'
                + ')';
            db.run(tq);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM image_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO image_type (type) VALUES (?)');
                    stmt.run(['教室']);
                    stmt.finalize();
                    console.log("image_type => new");
                }
                // データが存在する場合、コンソールに出力
                else {
                    console.log("image_type => ", row);
                }

                db.close();  // DBを閉じる
                resolve("resolve");  // Promiseで返すresolveを設定
            });
        });
    });
}
