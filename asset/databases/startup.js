function dbStartup() {
    var db = new sqlite3.Database(dbName);  // DBを開く
  
    // DBが存在しない場合, 新規にDBを作成する
    db.serialize( () => {
	db.run('CREATE TABLE IF NOT EXISTS quizzes (id INTEGER, problem TEXT, answer1 TEXT, answer2 TEXT, answer3 TEXT, answer4 TEXT, explanation TEXT)');
	
	// データがなければ初期状態にする
	db.get('SELECT * FROM quizzes', function(err, row) {
	    if (err) {
		throw err;
	    }
	    else if (row == null) {
		db = new sqlite3.Database(dbName);
		
		const stmt =  db.prepare('INSERT INTO quizzes VALUES (?, ?, ?, ?, ?, ?, ?)');
		stmt.run([0, 'これは問題文です。', '解答１', '解答２', '解答３', '解答４', 'これは解説文です。']);
	    }

	    console.log(row);
	});
    });
    
    db.close();
}
