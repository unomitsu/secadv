function dbInsert() {
    var db = new sqlite3.Database(dbName);  // DBを開く

    // データベースへ追加
    db.serialize( () => {
	db.run('INSERT INTO user (name, age) VALUES ($i, $j)',
	       {
		   $i: "Poo",
		   $j: 987
	       });
    });		  

    db.close();  // DBを閉じる
}

/*
var sqlite = require('sqlite3').verbose();
var db = new sqlite.Database('./asset/databases/example.sqlite');

db.serialize( () => {
    db.run('CREATE TABLE IF NOT EXISTS user (name TEXT, age INTEGER)')

    const stmt = db.prepare('INSERT INTO user VALUES (?, ?)');
    stmt.run(['Foo', 25]);
    stmt.run(['Bar', 39]);
    stmt.run(['Baz', 31]);

    stmt.finalize();
});

db.close();

*/
