﻿
/* ========== create =========== */

/* ----- シナリオ要素テーブル scenarioelements ----- */
function checkScenarioElement() {
    return new Promise(resolve => {
        let db = new sqlite3.Database(dbName);  // DBを開く

        db.serialize(() => {
            // 外部制約キーの有効化
            setForeignKey(db);

            // テーブルが無ければ新規に作成する  FOREIGN KEY (situation) REFERENCES list(title)
            db.run(
                'CREATE TABLE IF NOT EXISTS scenario_element ('
                + 'id INTEGER PRIMARY KEY AUTOINCREMENT, '
                + 'id_scenario INTEGER, '
                + 'text TEXT, '
                + 'sorder INTEGER, '
                + 'unique(id_scenario, sorder), '
                + 'FOREIGN KEY (id_scenario) REFERENCES scenario(id)'
                + ')'
            );

            // テーブル内にデータがなければ新規に作成する
            db.get('SELECT * FROM scenario_element', function (err, row) {
                // エラーが発生した場合、エラーを返す
                if (err) { resolve(err); }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO scenario_element (id_scenario, text, sorder) VALUES (?, ?, ?)');

                    stmt.run([0, 'これでシナリオは終わりです。', 0]);
                    stmt.run([0, 'この後は、無限にクイズを解き続けることになります。', 1]);
                    stmt.run([0, 'やめる場合は、ウィンドウを閉じてください', 2]);

                    stmt.run([1, "@team_name@は大学のオープンキャンパスに行くことになりました。\nどこの大学に行くかは自由でした。", 0]);
                    stmt.run([1, '各大学のホームページやパンフレットをいくつか見ました。\n考えた結果、香川大学の創造工学部に行くことにしました。\n事前に参加申込をしました。', 1]);
                    stmt.run([1, '香川大学までは距離があるので電車とバスを乗り継いで行きました。\n移動中は、メールの確認をしたり、ゲームをしたりしていました。', 2]);

                    stmt.run([2, '@team_name@は香川大学創造工学部に着きました。\nまずは受付をしてもらおう。\n案内があったのでそれに従います。', 0]);
                    stmt.run([2, '受付で、事前の参加申込をしたことを伝え、名前の確認と事前予約の確認証を示しました。\nパンフレットも貰いました。ぱらぱらとめくってみました。\n情報システム・セキュリティコース見てみよう', 1]);
                    stmt.run([2, '安藤研究室 [ 事前言語処理、情報検索 ]\n香川研究室 [ プログラミング言語、プログラミング学習支援 ]\n喜田研究室 [ サイバーセキュリティ、人工知能、ビッグデータ ]\n米谷研究室 [ 知的支援システム、eポートフォリオ、データ解析 ]', 2]);
                    stmt.run([2, '最所研究室 [ Webサービスシステム、アクセス制御 ]\n高木研究室 [ ソフトウェア工学 ]\n福森研究室 [ 体と認知、バーチャルリアリティ、再現性 ]\n八重樫研究室 [ 情報システム、ソフトウェア ]\n富永研究室ない。', 3]);
                    stmt.run([2, 'とりあえずこれらのどこかを訪ねよう', 5]);

                    stmt.run([3, '@team_name@はエレベータに乗って、1号館9階にある喜田研究室に来ました。\n紹介文を見ました。', 0]);
                    stmt.run([3, '人工知能（データ分析）を活用すれば、交通事故を激減させ、ハッカーによるサイバー攻撃に対抗でき、スポーツだって劇的に強くなる可能性があります。', 1]);
                    stmt.run([3, 'サイバー空間の監視データ（ネットワークログ等）に加え、実世界をセンシングしたデータ（交通情報等）を分析し、サイバー空間、実世界の両面から安全、安心を実現する技術を研究します。現在、ＩｏＴセキュリティ、クルマの運転のヒヤリハット予測などが主な研究テーマです。', 2]);

                    stmt.run([4, '@team_name@はエレベータに乗って、1号館10階にある最所研究室に来ました。\n紹介文を見ました。', 0]);
                    stmt.run([4, 'Webサービスの品質向上のために、負荷量に応じた台数のWebサーバを用いてサービス能力を向上させる分散Webシステムの研究や、重要なサービスや応答性が要求されるサービスに対してアクセス制御を行うことにより、サービスを許可されたユーザに対する応答性を確保するシステムなどの研究を行っています。提案した手法の有効性について、主に実機を用いて実験することにより検証を行っています。', 1]);

                    stmt.run([5, '@team_name@は、1号館9階にある米谷研究室に来ました。\n紹介文を見ました。', 0]);
                    stmt.run([5, '人が変わるための強力な動機づけは、自分の行動に関する客観的データの蓄積であり、分析に基づく現象の理解です。米谷研究室では、人の行動データを解析し、変化に向けた知的支援を提供する情報システムを開発しています。', 1]);
                    stmt.run([5, '現在は高等教育の場において、学生授業評価に対する教授行動因子の可視化、ゼミ改善に資するゼミ生活動の可視化、およびIT利用トラブルに対する原因の可視化など、情報システムを活用した知的支援のあり方を探求しています。', 2]);
                        
                    stmt.run([6, 'やばい、@team_name@は富永研に捕まった！', 0]);
                    stmt.run([6, '@teacher@「我、我、我、、、」', 1]);

                    stmt.run([7, 'やばい、@team_name@は逃げられなかった！', 0]);
                    stmt.run([7, '@teacher@「次はこの問題ぞ。」', 1]);

                    stmt.run([8, 'やばい、また@team_name@は逃げられなかった！', 0]);
                    stmt.run([8, '@teacher@「お次はこれぞ。」', 1]);

                    stmt.run([9, 'おかしい、@team_name@は逃げられなかった！', 0]);
                    stmt.run([9, '@teacher@「これで最後の問題にしようか。ちょっとやらなければならないことが(WinG)。」', 1]);

                    stmt.run([10, '@team_name@はエレベータに乗って、1号館11階にある安藤研究室に来ました。\n紹介文を見ました。', 0]);
                    stmt.run([10, '安藤研究室では、人間が話したり、書いたり、読んだりする「ことば」を、コンピュータで処理・理解する研究（自然言語処理）を進めています。自然言語処理は、人工知能を実現するための核となる技術の一つとして注目されています。', 1]);
                    stmt.run([10, '近年は、Web上に存在する膨大なテキストデータ（文章データ）に注目し、様々な情報を検索・抽出・発掘・換言・要約・理解する技術の研究や、医療分野、観光分野、教育分野など、多様な分野に自然言語処理技術を応用することで、新しいシステムやサービスを実現する研究などに取り組んでいます。', 2]);

                    stmt.run([11, 'オープンキャンパスも終わりの時間になった。結構長い時間大学にいました。\n家に帰るのが大変ですが、頑張って帰りましょう。', 0]);
                    stmt.run([11, '大学生になったら、大学に住んでいるような人もいるみたいね。', 1]);
                    stmt.run([11, 'おわり', 2]);

                    stmt.run([15, 'バトルしようぜ！', 0]);
                    stmt.run([15, 'ほえるーはねるーそらをとぶー、トライアタック、メガトンパンチ！', 1]);
                    stmt.run([15, 'うたうーねむるーサイコキネシスー、ロケットずつき、10まんボルト！', 2]);
                    stmt.run([15, '勝っても負けてもおまつりさわぎ、バトルしようぜ、ポケモンバトル！', 3]);


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