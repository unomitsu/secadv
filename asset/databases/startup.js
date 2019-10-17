function dbStartup() {
    var db = new sqlite3.Database(dbName);  // DBを開く

    db.serialize( () => {
	/* ----- 問題データの初期処理 ----- */
	
	// DBが存在しない場合, 新規にDBを作成する
	db.run('CREATE TABLE IF NOT EXISTS quizzes (id INTEGER, problem TEXT, answer1 TEXT, answer2 TEXT, answer3 TEXT, answer4 TEXT, explanation TEXT)');

	// データがなければ初期状態にする
	db.get('SELECT * FROM quizzes', function(err, row) {
	    // エラーが発生した場合、エラーを返す
	    if (err) { throw err; }
	    
	    // データが存在しない場合、初期の問題を挿入
	    else if (row == null) {
		const stmt =  db.prepare('INSERT INTO quizzes VALUES (?, ?, ?, ?, ?, ?, ?)');
		stmt.run([0, 'これは問題文です。', '解答１', '解答２', '解答３', '解答４', 'これは解説文です。']);
		stmt.finalize();
	    }
	    
	    console.log(row);
	});

	db.close();
	db = new sqlite3.Database(dbName);
	
	// /* ----- シナリオデータの初期処理 ----- */
	
	// DBが存在しない場合, 新規にDBを作成する
	db.run('CREATE TABLE IF NOT EXISTS scenarios (id INTEGER, snum INTEGER, scenaio TEXT)');
	
	// データがなければ初期状態にする
	db.get('SELECT * FROM scenarios', function(err, aho) {
	    // エラーが発生した場合、エラーを返す
	    if (err) { throw err; }
	    
	    // データが存在しない場合、初期のシナリオを挿入
	    else if (aho == null) {
		const stmt2 =  db.prepare('INSERT INTO scenarios VALUES (?, ?, ?)');
		stmt2.run([0, 0, 'これはシナリオです。']);
		stmt2.run([0, 1, 'これもシナリオです。']);
		stmt2.run([0, 2, 'まだまだシナリオです。']);
		stmt2.finalize();
	    }

	    console.log(aho);
	});

    });

    // データベースを閉じる
    db.close();
}
