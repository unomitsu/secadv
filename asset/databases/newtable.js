
// TABLEの確認とTABLE内のデータの確認を行う
// それぞれ、無い場合は新規に作成する

/* ===== 実体テーブル ===== */




/* ----- 選択肢テーブル ----- */


/* ===== 関連テーブル ===== */


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