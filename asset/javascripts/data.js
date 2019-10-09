// var は大域変数です.
var gameWidth = 800;
var gameHeight = 600;

var player = {
    name:  "TEAM_A",        // プレイヤー名
    score: 100,             // 得点
    money: 200              // 所持金
};
var quizData = {
    id: 0,                             // 問題ID
    text: "quiz.",                     // 問題文
    choice: ["c1", "c2", "c3", "c4"],  // 選択肢
    answer: "c1"                       // 回答
};

var currentScene;   // 現在のシーン

/* back image */
var backImagePath;  // 背景画像のパス

function setBackImagePath(path) {
    BackImagePath = path;
}

/* database */
var sqlite3 = require('sqlite3');
var dbName = ('./asset/databases/example.sqlite');

/* game start */
function gameStart() {
    currentScene = new SceneTitle();
}
