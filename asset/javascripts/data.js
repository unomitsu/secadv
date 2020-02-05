/* ----- ウィンドウサイズ ----- */
var gameWidth = 800;
var gameHeight = 600;
var g_gameState = 0;

/* ----- プレイヤーデータ ----- */
var player = {
    name:  "TEAM_A",        // 名前
    score: 100,             // 得点
    money: 200              // 所持金
};

/* ----- シナリオデータ ----- */
var g_scenarioset;      // シナリオセットのID
var g_scenario;         // 現在のシナリオのID

/* ----- 問題データ ----- */
var g_quiz = {
    id: 0,
    problem: "problem",
    choice: ["1", "2", "3", "4"],
    description: ["d1", "d2", "d3", "d4"],
    answer: [1, 0, 0, 0],
    explanation: "explanation"
};
var g_playerAnswer;

/* ----- シーンデータ ----- */
var currentScene;   // 現在のシーン

/* back image */
var g_backImagePath;  // 背景画像のパス

/* ----- database ----- */
var sqlite3 = require('sqlite3');
var dbName = ('./asset/databases/example.sqlite');

/* ===== game start ====== 
function gameStart() {
    currentScene = new SceneTitle();
}
*/