
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
                + 'type INTEGER, '
                + 'level INTEGER, '
                + 'FOREIGN KEY (type) REFERENCES quiz_type(id)'
                + ')'
            );

            // テーブルにデータがなければ新規に作成する
            db.get('SELECT * FROM quiz', (err, row) => {
                // エラーが起きたらエラーを返す
                if (err) { resolve(err); }

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
                    stmt.run(['電子メールの危険',
                        '電子メールには大変便利です。その反面、しっかりとセキュリティ対策を施さなければ、思わぬトラブルに巻き込まれてしまいます。その中で、特定のターゲットを狙って重要なデータや個人情報を盗もうとする攻撃のこをなんというか。',
                        '特定のターゲットを1点に絞って狙う攻撃という意味で、スピア型攻撃やスピア型メールとも呼ばれます。', 3, 1]);
                    stmt.run(['ディジタル署名',
                        '電子商取引をする場合などによく利用され、文書の作成者本人であることと、途中で文書が改ざんされていないことを証明するために付けられる、暗号化された署名情報のことをなんというか。',
                        '署名情報です。ディジタルです。', 3, 1]);
                    stmt.run(['ゼロデイ攻撃',
                        'OSやソフトウェアの提供者がまだ対策を公表していない、新種のウイルスなどの不正プログラムによって行われる攻撃、またはセキュリティパッチがまだ存在していないソフトウェアの脆弱性を突く攻撃のことをなんというか。',
                        '対策を公表してからの日数を表したような名前です。まだ対策を公表していないということは、対策を公表してから……', 3, 1]);
                    stmt.run(['DoS攻撃',
                        '対策として、ネットワークの常時監視、パケットフィルタリングによる不審者からの要求の拒否などがあるものはどれか。',
                        '(英 : Denial of Service attack) ', 3, 1]);

                    stmt.run(['VR',
                            '人間の感覚器官に働きかけ、現実ではないが実質的に現実のように感じられる環境を人工的に作り出す技術の総称をなんというか。',
                            '具体的な方式には様々なものが提唱されており、頭部に装着してすっぽりと視界を覆う「ヘッドマウントディスプレイ」（HMD：Head-Mount Display）を用いた手法が特に有名となっているほか、手を包み込んで動きを入力したり力学的なフィードバックを与える手袋型の「データグローブ」（data glove）などの方式が有望と考えられている。', 3, 1]);
                    stmt.run(['自然言語処理',
                        '人間が日常的に使っている自然言語をコンピュータに処理させる一連の技術であり、人工知能と言語学の一分野であるものはどれか。',
                        '自然(natural) 言語(language) 処理(processing)', 3, 1]);
                    stmt.run(['個人情報保護法',
                        '個人の権利と利益を保護するために、個人情報を取り扱っている事業者に対して様々な業務と対応を定めた法律はどれか。',
                        '個人情報を収集する際には利用目的を明確にすること、目的以外で利用する場合には本人の同意を得ること、情報漏洩対策を講じる義務、情報の第三者への提供の禁止、本人の情報開示要求に応ずること、などが定められている。', 3, 1]);
                    stmt.run(['情報セキュリティの3要素',
                        '情報セキュリティの3要素に含まるのはどれか。',
                        'CIAともいう。Confidentiality、Integrity、Availability', 3, 1]);
                    stmt.run(['リスクマネジメントにおけるリスク回避',
                        'リスクとは、損害発生の可能性の事で、リスクマネジメントとは、損害発生を食い止めるために、起こりうるリスクを想定して対応を検討すること。リスクマネジメントの内、リスクそのものを発生しないようにすることはなんというか。',
                        'データが破壊されたり、システムの可用性が損なわれたりした場合にシステムが使用不可の時間を最小限にするために実施する。', 3, 1]);

                    stmt.run(['ワーム',
                        'マルウェアとは、コンピュータの正常な利用を妨げたり、利用者やコンピュータに害を成す不正な動作を行うソフトウェアの総称です。このうち、インターネットなどを通じてコンピュータに侵入し、さらに他のコンピュータへの自身の複製を試み、処理速度の低下やハードディスクの破壊を起こすものはどれか。',
                        '原義はミミズや芋虫のような線形の虫や動物のこと。', 3, 1]);
                    stmt.run(['ハードディスク',
                        '補助記憶装置は、主記憶装置が利用するプログラムやデータを蓄積し、必要に応じてこれを提供するための記憶装置です。このうち、アクセス速度が高速、記憶容量が非常に大きい、容量当たりの単価が安い、といった特徴を持つものはどれか。',
                        '', 3, 1]);

                    stmt.finalize();

                    resolve("new");   // Promiseで返すresolveを設定
                }
                else {
                    resolve(row);   // Promiseで返すresolveを設定
                }

                db.close();         // DBを閉じる
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

