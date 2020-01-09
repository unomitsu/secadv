
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
