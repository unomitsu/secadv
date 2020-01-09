
// TABLEの確認とTABLE内のデータの確認を行う
// それぞれ、無い場合は新規に作成する

/* ===== 実体テーブル ===== */




/* ----- 選択肢テーブル ----- */


/* ===== 関連テーブル ===== */

// シナリオセットとシナリオ
function checkRelationScenariosetScenario() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);
            
            // テーブルの確認と、無い場合の新規作成
            db.run(
                'CREATE TABLE IF NOT EXISTS relation_scenarioset_scenario ('
                + 'id INTEGER PRIMARY KEY, '
                + 'id_scenarioset INTEGER NOT NULL, '
                + 'id_scenario INTEGER NOT NULL, '
                + 'FOREIGN KEY (id_scenarioset) REFERENCES scenarioset(id), '
                + 'FOREIGN KEY (id_scenario) REFERENCES scenario(id)'
                + ')'
            );

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
                    stmt.run([1, 4]);
                    stmt.run([1, 5]);
                    stmt.finalize();
                    console.log("relation_scenarioset_scenario => new");
                }
                else {
                    console.log("relation_scenarioset_scenario => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}

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
                + 'id_scenario INTEGER NOT NULL, '
                + 'id_quiz INTEGER NOT NULL, '
                + 'FOREIGN KEY (id_quiz) REFERENCES quiz(id), '
                + 'FOREIGN KEY (id_scenario) REFERENCES scenario(id), '
                + 'UNIQUE(id_scenario, id_quiz)'
                + ')'
            );

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM relation_scenario_quiz', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO relation_scenario_quiz (id_scenario, id_quiz) VALUES (?, ?)');

                    stmt.run([1, 6]);
                    stmt.run([2, 2]);
                    stmt.run([3, 3]);
                    stmt.run([4, 4]);
                    stmt.run([5, 5]);
                    stmt.finalize();

                    console.log("relation_scenario_quiz => new");
                }
                else {
                    console.log("relation_scenario_quiz => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}

// クイズと解答選択肢
function checkRelationQuizAnswer() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);
            
            // テーブルの確認と、無い場合の新規作成
            db.run(
                'CREATE TABLE IF NOT EXISTS relation_quiz_answer ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'id_quiz INTEGER NOT NULL, '
                + 'id_answer INTEGER NOT NULL, '
                + 'flag INTEGER NOT NULL, '
                + 'FOREIGN KEY(id_quiz) REFERENCES quiz(id), '
                + 'FOREIGN KEY(id_answer) REFERENCES quiz_answer(id), '
                + 'UNIQUE(id_quiz, id_answer)'
                + ')'
            );

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
                    stmt.run([2, 5, 1]);
                    stmt.run([2, 6, 0]);
                    stmt.run([2, 7, 0]);
                    stmt.run([2, 8, 0]);
                    stmt.run([3, 9, 0]);
                    stmt.run([3, 10, 0]);
                    stmt.run([3, 11, 1]);
                    stmt.run([3, 12, 0]);
                    stmt.run([4, 13, 1]);
                    stmt.run([4, 14, 0]);
                    stmt.run([4, 15, 0]);
                    stmt.run([4, 16, 0]);
                    stmt.run([5, 17, 0]);
                    stmt.run([5, 18, 0]);
                    stmt.run([5, 19, 1]);
                    stmt.run([5, 20, 0]);
                    stmt.run([6, 21, 0]);
                    stmt.run([6, 22, 0]);
                    stmt.run([6, 23, 1]);
                    stmt.run([6, 24, 0]);
                    stmt.finalize();

                    console.log("relation_quiz_answer => new");
                }
                else {
                    console.log("relation_quiz_answer => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}

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
                + 'id_current INTEGER NOT NULL, '
                + 'id_next1 INTEGER, '
                + 'id_next2 INTEGER, '
                + 'FOREIGN KEY(id_current) REFERENCES scenario(id), '
                + 'FOREIGN KEY(id_next1) REFERENCES scenario(id), '
                + 'FOREIGN KEY(id_next2) REFERENCES scenario(id), '
                + 'UNIQUE (id_current, id_next1, id_next2)'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM relation_next_scenario', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO relation_next_scenario (id_current, id_next1, id_next2) VALUES (?, ?, ?)');

                    stmt.run([1, 2, 3]);
                    stmt.run([2, 3, 4]);
                    stmt.run([3, 4, 5]);
                    stmt.run([4, 5, null]);
                    stmt.run([5, null, null]);
                    stmt.finalize();

                    console.log("relation_next_scenario => new");
                }
                else {
                    console.log("relation_next_scenario => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
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
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quiz_type (type, available) VALUES (?, ?)');

                    stmt.run(['CRYPTO', 1]);
                    stmt.run(['CALCULATION', 1]);
                    stmt.run(['KNOWLEDGE', 1]);
                    stmt.run(['WORK', 1]);
                    stmt.finalize();

                    console.log("quiz_type => new");
                }
                else {
                    console.log("quiz_type => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
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
            db.run(
                'CREATE TABLE IF NOT EXISTS situation_type ('
                + 'id INTEGER PRIMARY KEY, '
                + 'type TEXT NOT NULL, '
                + 'available INTEGER NOT NULL'
                + ')'
            );

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM situation_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO situation_type (type, available) VALUES (?, ?)');

                    stmt.run(['放課後', 1]);
                    stmt.run(['昼休憩', 1]);
                    stmt.run(['大事件', 1]);
                    stmt.finalize();

                    console.log("situation_type => new");
                }
                else {
                    console.log("situation_type => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
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
            db.run(
                'CREATE TABLE IF NOT EXISTS image_type ('
                + 'id INTEGER PRIMARY KEY, '
                + 'type TEXT NOT NULL, '
                + 'available INTEGER NOT NULL'
                + ')'
            );

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM image_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO image_type (type, available) VALUES (?, ?)');

                    stmt.run(['教室', 1]);
                    stmt.run(['廊下', 1]);
                    stmt.run(['職員室', 1]);
                    stmt.finalize();

                    console.log("image_type => new");
                }
                else {
                    console.log("image_type => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}


/* ===== その他 ===== */

/* ----- foreign key の有効化 ----- */
function setForeignKey(db) {
    db.get('PRAGMA foreign_keys', function (err, row) {
        // エラーが発生した場合、エラーを返す
        if (err) { throw err; }

        // foreign_keysが無効の場合、有効にする
        if (row["foreign_keys"] == 0) { db.run('PRAGMA foreign_keys = 1'); }
    });
}