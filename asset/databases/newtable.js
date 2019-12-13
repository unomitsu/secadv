
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
                    stmt.run(['サンプルクイズ', 'これは問題文です。', 'これは解説文です。', 3, 1]);
                    stmt.run(['今日のご飯', '今日のご飯はどれでしょう。', 'もう一人はカップ焼きそばでした', 3, 1]);
                    stmt.run(['我、天才', '我、すごい', '我、我、我、、、', 3, 1]);
                    stmt.run(['情報環境実験２の内容', '情報環境実験２において、初めに着手するものは何？', '全体を通してLegoをします。\n並行して、まずWinT、次にWinGをします。', 3, 1]);
                    stmt.run(['ポケットモンスターのOP', 'この歌はなんでしょう。', '「ライバル！」は２番目のOPです。', 3, 1]);stmt.finalize();
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
                    stmt2.run([4, 'エレベーターに乗って1号館9階に移動した。\n${l_nono}「我、我、我、、、」', 0]);
                    stmt2.run([4, '${l_nono}「じゃあ情報環境実験２のLegoの説明を始めます。」', 1]);
                    stmt2.run([4, '${l_nono}「じゃあ情報環境実験２のLegoの説明を始めます。始めます。」', 2]);
                    stmt2.run([4, '${l_nono}「じゃあ情報環境実験２のLegoの説明を始めます。始めます。始めます。」', 3]);
                    stmt2.run([5, 'バトルしようぜ！', 0]);
                    stmt2.run([5, 'ほえるーはねるーそらをとぶー、トライアタック、メガトンパンチ！', 1]);
                    stmt2.run([5, 'うたうーねむるーサイコキネシスー、ロケットずつき、10まんボルト！', 2]);
                    stmt2.run([5, '勝っても負けてもおまつりさわぎ、バトルしようぜ、ポケモンバトル！', 3]);
                    stmt2.run([6, 'これでシナリオは終わりです。', 0]);
                    stmt2.run([6, 'この後は、無限にクイズを解き続けることになります。', 1]);
                    stmt2.run([6, 'やめる場合は、ウィンドウを閉じてください', 2]);
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
                + 'answer TEXT NOT NULL UNIQUE, '
                + 'available INTEGER NOT NULL'
                + ')';

            // TABLEの確認と、無い場合の新規作成
            db.run(query);

            // TABLE内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM quiz_answer', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期のシナリオを挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quiz_answer (answer, available) VALUES (?, ?)');
                    stmt.run(["解答1", 1]);
                    stmt.run(["解答2", 1]);
                    stmt.run(["解答3", 1]);
                    stmt.run(["解答4", 1]);
                    stmt.run(["ハンバーガー", 1]);
                    stmt.run(["ポテト", 1]);
                    stmt.run(["ナゲット", 1]);
                    stmt.run(["コーラ", 1]);
                    stmt.run(["我", 1]);
                    stmt.run(["我々", 1]);
                    stmt.run(["我、天才", 1]);
                    stmt.run(["天才ですからー？", 1]);
                    stmt.run(["Lego", 1]);
                    stmt.run(["WinT", 1]);
                    stmt.run(["WinG", 1]);
                    stmt.run(["BeeCon", 1]);
                    stmt.run(["めざせポケモンマスター", 1]);
                    stmt.run(["1・2・3", 1]);
                    stmt.run(["ライバル!", 1]);
                    stmt.run(["チャレンジャー!!", 1]);
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
                    stmt.run([1, 4]);
                    stmt.run([1, 5]);
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
                    stmt.run([2, 2]);
                    stmt.run([3, 3]);
                    stmt.run([4, 4]);
                    stmt.run([5, 5]);
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
                + 'type TEXT NOT NULL, '
                + 'available INTEGER NOT NULL'
                + ')';
            db.run(tq);

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
                + 'type TEXT NOT NULL, '
                + 'available INTEGER NOT NULL'
                + ')';
            db.run(tq);

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
                + 'type TEXT NOT NULL, '
                + 'available INTEGER NOT NULL'
                + ')';
            db.run(tq);

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM image_type', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { throw err; }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO image_type (type, available) VALUES (?, ?)');
                    stmt.run(['教室', 1]);
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
