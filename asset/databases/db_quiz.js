
/* ========== create ========== */

async function checkQuiz() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);

            // テーブルがなければ新規に作成する
            db.run(
                'CREATE TABLE IF NOT EXISTS quiz ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'title TEXT NOT NULL, '
                + 'problem TEXT NOT NULL, '
                + 'explanation TEXT, '
                + 'type INTEGER NOT NULL, '
                + 'level INTEGER, '
                + 'FOREIGN KEY (type) REFERENCES quiz_type(id)'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM quiz', (err, row) => {
                // エラーが起きたらエラーを返す ?
                if (err) {
                    resolve(err);
                    return;
                }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO quiz (title, problem, explanation, type, level) VALUES (?, ?, ?, ?, ?)');

                    stmt.run(['サンプルクイズ', 'これは問題文です。', 'これは解説文です。', 3, 1]);
                    stmt.run(['今日のご飯', '今日のご飯はどれでしょう。', 'もう一人はカップ焼きそばでした', 3, 1]);
                    stmt.run(['我、天才', '我、すごい', '我、我、我、、、', 3, 1]);
                    stmt.run(['情報環境実験２の内容', '情報環境実験２において、初めに着手するものは何？', '全体を通してLegoをします。\n並行して、まずWinT、次にWinGをします。', 3, 1]);
                    stmt.run(['ポケットモンスターのOP', 'この歌はなんでしょう。', '「ライバル！」は２番目のOPです。', 3, 1]);
                    stmt.run(['フィッシング',
                        '銀行やクレジット会社などを装った偽のWebページを開設し、金融機関や公的機関などを装った偽の電子メールなどで、利用者を巧みに誘導して暗証番号やクレジットカード番号などの個人情報を盗み取る行為を何というか。',
                        'クラッキングとは、ネットワークに繋がれたシステムへ不正に侵入したり、システムを破壊・改竄するなど、コンピュータを不正に利用すること', 3, 1]);
                    stmt.finalize();

                    console.log('quiz CREATE');
                }
                else {
                    console.log('quiz ', row);
                }

                db.close();         // DBを閉じる
                resolve("resolve");   // Promiseで返すresolveを設定
            });
        });
    });
}



/* ========== insert ========== */

/* ===== quiz にデータを挿入 ===== */
function dbInsertQuiz(title, problem, explanation, type, level) {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // データベースにデータを挿入
        db.serialize(() => {
            db.run('INSERT INTO quiz (title, problem, explanation, type, level) VALUES ($a, $b, $c, $d, $e)',
                {
                    $a: title,
                    $b: problem,
                    $c: explanation,
                    $d: type,
                    $e: level
                },
                (err) => {
                    err ? resolve(err) : resolve("resolve");    // Promiseで返すresolveを設定
                }
            );
        });

        db.close();  // DBを閉じる
    });
}

// 最大の quiz.id を返却する
function dbSelectQuizMaxId() {
    return new Promise(resolve => {
        const db = new sqlite3.Database(dbName);  // DBを開く

        // IDが最大のものを返却する
        db.serialize(() => {
            db.get('SELECT max(id) FROM quiz',
                (err, row) => {
                    err ? resolve(err) : resolve(row);  // Promiseで返すresolveを設定
                }
            );
        });

        db.close();  // DBを閉じる
    });
}

// quiz にデータを挿入し、quiz の id を返す
async function insertQuiz(title, problem, explanation, type, level) {
    let result = "reject";     // 処理の結果

    // 引数データの挿入
    await dbInsertQuiz(title, problem, explanation, type, level).then(res => {
        console.log(`INSERT INTO quiz (${title}, ${problem}, ${explanation}, ${type}, ${level}) __`);
        (res == "resolve") ? console.log("挿入完了") : console.log("挿入失敗 - ERR -", res);
    });

    // IDが最大であるものを検索することで、挿入した引数データのIDを取得する
    await dbSelectQuizMaxId().then(res => {
        result = res["max(id)"];
    });

    return result;
}

