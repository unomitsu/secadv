
/* ========== insert ========== */

/* ----- relation_quiz_answer にデータを挿入 ----- */

function dbInsertRelationQuizAnswer(quizId, answerId, flag) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run('INSERT INTO relation_quiz_answer (id_quiz, id_answer, flag) VALUES ($a, $b, $c)',
                {
                    $a: quizId,
                    $b: answerId,
                    $c: flag
                },
                (err) => {
                    // Promiseで返すresolveを設定
                    err ? resolve(err) : resolve("resolve");
                });
        });

        db.close();  // DBを閉じる
    });
}

// 問題と選択肢の関連テーブルの登録をする
async function insertRelationQuizAnswer(quizId, answerId, flag) {
    return await dbInsertRelationQuizAnswer(quizId, answerId, flag).then(res => {
        console.log(`INSERT INTO relation_quiz_answer (${quizId}, ${answerId}, ${flag} __`);
        (res == "resolve") ? console.log("挿入完了") : console.log("挿入失敗 - ERR -", res);
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
                + 'id_quiz INTEGER, '
                + 'id_answer INTEGER, '
                + 'flag INTEGER NOT NULL, '
                + 'FOREIGN KEY(id_quiz) REFERENCES quiz(id), '
                + 'FOREIGN KEY(id_answer) REFERENCES quiz_answer(id), '
                + 'UNIQUE(id_quiz, id_answer)'
                + ')'
            );

            // テーブル内のデータの確認と、無い場合の新規作成
            db.get('SELECT * FROM relation_quiz_answer', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが存在しない場合、初期の問題を挿入
                else if (row == null) {
                    db.run('INSERT INTO relation_quiz_answer (id_quiz, id_answer, flag) VALUES '
                        + '(1, 1, 1), (1, 2, 0), (1, 3, 0), (1, 4, 0), '
                        + '(2, 5, 1), (2, 6, 0), (2, 7, 0), (2, 8, 0), '
                        + '(3, 9, 0), (3, 10, 0), (3, 11, 1), (3, 12, 0), '
                        + '(4, 13, 1), (4, 14, 0), (4, 15, 0), (4, 16, 0), '
                        + '(5, 17, 0), (5, 18, 0), (5, 19, 1), (5, 20, 0), '
                        + '(6, 21, 0), (6, 22, 0), (6, 23, 1), (6, 24, 0), '
                        + '(7, 25, 0), (7, 26, 1), (7, 27, 0), (7, 23, 0), '
                        + '(8, 28, 1), (8, 29, 0), (8, 30, 0), (8, 31, 0), '
                        + '(9, 32, 1), (9, 33, 0), (9, 25, 0), (9, 26, 0), '
                        + '(10, 27, 1), (10, 26, 0), (10, 32, 0), (10, 34, 0), '
                        + '(11, 35, 1), (11, 36, 0), (11, 37, 0), (11, 38, 0), '
                        + '(12, 39, 1), (12, 40, 0), (12, 41, 0), (12, 42, 0), '
                        + '(13, 43, 1), (13, 44, 0), (13, 34, 0), (13, 22, 0), '
                        + '(14, 45, 1), (14, 46, 1), (14, 47, 1), (14, 48, 0), '
                        + '(15, 49, 1), (15, 50, 0), (15, 51, 0), (15, 52, 0), '
                        + '(16, 53, 1), (16, 54, 0), (16, 55, 0), (16, 56, 0), '
                        + '(17, 57, 1), (17, 58, 0), (17, 59, 0), (17, 60, 0) '
                    );

                    resolve("new");     // Promiseで返すresolveを設定
                }
                else {
                    resolve("row");     // Promiseで返すresolveを設定
                }

                db.close();             // DBを閉じる
            });
        });
    });
}

/*
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

                    stmt.run([7, 25, 0]);
                    stmt.run([7, 26, 1]);
                    stmt.run([7, 27, 0]);
                    stmt.run([7, 23, 0]);

                    stmt.run([8, 28, 1]);
                    stmt.run([8, 29, 0]);
                    stmt.run([8, 30, 0]);
                    stmt.run([8, 31, 0]);

                    stmt.run([9, 32, 1]);
                    stmt.run([9, 33, 0]);
                    stmt.run([9, 25, 0]);
                    stmt.run([9, 26, 0]);

                    stmt.run([10, 27, 1]);
                    stmt.run([10, 26, 0]);
                    stmt.run([10, 32, 0]);
                    stmt.run([10, 34, 0]);

                    stmt.run([11, 35, 1]);
                    stmt.run([11, 36, 0]);
                    stmt.run([11, 37, 0]);
                    stmt.run([11, 38, 0]);

                    stmt.run([12, 39, 1]);
                    stmt.run([12, 40, 0]);
                    stmt.run([12, 41, 0]);
                    stmt.run([12, 42, 0]);

                    stmt.run([13, 43, 1]);
                    stmt.run([13, 44, 0]);
                    stmt.run([13, 34, 0]);
                    stmt.run([13, 22, 0]);

                    stmt.run([14, 45, 1]);
                    stmt.run([14, 46, 1]);
                    stmt.run([14, 47, 1]);
                    stmt.run([14, 48, 0]);

                    stmt.run([15, 49, 1]);
                    stmt.run([15, 50, 0]);
                    stmt.run([15, 51, 0]);
                    stmt.run([15, 52, 0]);

                    stmt.run([16, 53, 1]);
                    stmt.run([16, 54, 0]);
                    stmt.run([16, 55, 0]);
                    stmt.run([16, 56, 0]);

                    stmt.run([17, 57, 1]);
                    stmt.run([17, 58, 0]);
                    stmt.run([17, 59, 0]);
                    stmt.run([17, 60, 0]);

                    stmt.finalize();
 */