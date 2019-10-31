/* ----- ウィンドウサイズ ----- */
var gameWidth = 800;
var gameHeight = 600;

/* ----- プレイヤーデータ ----- */
var player = {
    name:  "TEAM_A",        // 名前
    score: 100,             // 得点
    money: 200              // 所持金
};


/* ----- 問題データ ----- */
var quizData = {
    id: 0,                             // ID
    text: "quiz.",                     // 問題文
    choice: ["c1", "c2", "c3", "c4"],  // 選択肢
    explanation: "c1"                  // 解説
};
var quizPlayerAnswer;


/* ----- シナリオデータ ----- */
var scenarioData;

/* ----- シーンデータ ----- */
var currentScene;   // 現在のシーン
var currentSceneName = "";   // 現在のシーン名

/* back image */
var backImagePath;  // 背景画像のパス

function setBackImagePath(path) {
    BackImagePath = path;
}

/* ----- database ----- */
var sqlite3 = require('sqlite3');
var dbName = ('./asset/databases/example.sqlite');

/* ===== game start ====== 
function gameStart() {
    currentScene = new SceneTitle();
}
*/