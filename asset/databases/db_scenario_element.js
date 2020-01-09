
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
                if (err) { throw err; }

                // データが無ければ作成する
                else if (row == null) {
                    const stmt = db.prepare('INSERT INTO scenario_element (id_scenario, text, sorder) VALUES (?, ?, ?)');

                    stmt.run([1, 'これはシナリオです。', 0]);
                    stmt.run([1, 'これもシナリオです。', 1]);
                    stmt.run([1, 'まだまだシナリオです。', 2]);
                    stmt.run([2, 'お腹すいたー。', 0]);
                    stmt.run([2, '今日のお昼ご飯はハンバーガー。', 1]);
                    stmt.run([2, '僕はカップ焼きそば！', 2]);
                    stmt.run([3, 'お皿割れた。', 0]);
                    stmt.run([3, 'LEGOが暴走して合体変形したよ', 1]);
                    stmt.run([3, '我、我、我、、、', 2]);
                    stmt.run([4, 'エレベーターに乗って1号館9階に移動した。\n@teacher@「我、我、我、、、」', 0]);
                    stmt.run([4, '@teacher@「じゃあ情報環境実験２のLegoの説明を始めます。」', 1]);
                    stmt.run([4, '@teacher@「じゃあ情報環境実験２のLegoの説明を始めます。始めます。」', 2]);
                    stmt.run([4, '@teacher@「じゃあ情報環境実験２のLegoの説明を始めます。始めます。始めます。」', 3]);
                    stmt.run([5, 'バトルしようぜ！', 0]);
                    stmt.run([5, 'ほえるーはねるーそらをとぶー、トライアタック、メガトンパンチ！', 1]);
                    stmt.run([5, 'うたうーねむるーサイコキネシスー、ロケットずつき、10まんボルト！', 2]);
                    stmt.run([5, '勝っても負けてもおまつりさわぎ、バトルしようぜ、ポケモンバトル！', 3]);
                    stmt.run([6, 'これでシナリオは終わりです。', 0]);
                    stmt.run([6, 'この後は、無限にクイズを解き続けることになります。', 1]);
                    stmt.run([6, 'やめる場合は、ウィンドウを閉じてください', 2]);
                    stmt.finalize();

                    console.log("scenario_element => new");
                }
                else {
                    console.log("scenario_element => ", row);
                }

                db.close();             // DBを閉じる
                resolve("resolve");     // Promiseで返すresolveを設定
            });
        });
    });
}