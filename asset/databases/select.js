function dbSelectQuizAll() {
    // DBを開く
    var db = new sqlite3.Database(dbName);
    
    // データベースから全問題データを取得
    db.all('SELECT * FROM quizzes', function(err, rows) {
	// エラーが発生した場合、エラーを返す
	if (err) { throw err; }
	// 
	rows.forEach(function(row) {
	    console.log(row);
	});
    });

    // DBを閉じる
    db.close();
}

function getScenario() {
    // DBを開く
    var db = new sqlite3.Database(dbName);

    const result = new Promise(resolve => {
	db.serialize( () => {
	    // データベースから全シナリオデータを取得
	    db.all('SELECT * FROM scenarios', function(err, rows) {
		// 取得したデータを返す
		ary = rows;
		console.log("< getget >");
		console.log(rows);
		console.log(ary);
		resolve(rows);
	    });
	});
    });
    
    // DBを閉じる
    db.close();

    return result;
}

async function dbSelectScenarioAll() {
    const result = await getScenario();
    console.log(result);
    return result;
}


/*
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./asset/databases/example.sqlite');

db.all('SELECT * FROM user', function(err, rows) {
    if (err) { throw err; }
    rows.forEach(function(row) {
	console.log(row.name + ' ' + row.age);
    });
});

db.close();
*/
