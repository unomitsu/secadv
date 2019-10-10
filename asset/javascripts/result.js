
// ===== シーン リザルト =====
class SceneResult extends Scene {
    constructor(ans) {
	super();

	console.log(quizData);
	// 必要な変数
	this.playerAnswer = ans;

	// アニメーション
	// this.pAnimation = document.createElement('p');
	
	// 再挑戦orギブアップ
	this.buttonLeft = document.createElement('button');
	this.buttonRight = document.createElement('button');

	// 各設定
	this.setDivScene();
	this.setDivPlayerData();
	this.setDivMainText();
	this.setButtonHome();

	this.setButtonNext();
	this.update();
    }
    /* -- 処理内容 -- */
    update() {
	this.setMainText("あなたの回答は" + this.playerAnswer + "でした.");
	
	if (quizData["answer"] == this.playerAnswer) {
	    // << anime
	    this.setMainText("正答です.");

	    this.buttonLeft.textContent = "左に進む";
	    this.buttonRight.textContent = "右に進む";
	    this.setMainText("次に進むステージを選択してください.");
	    // << 遷移処理
	    // SceneStageがいるような気がする
	    // SceneStageから、SceneQuizに遷移しよう
	} else {
	    // << anime
	    this.setMainText("誤答です.");
	    this.buttonLeft.textContent = "再挑戦";
	    this.buttonRight.textContent = "ギブアップ";
	    // << 遷移処理
	    // ギブアップは、Sceneクラスで書く予定
	    // 再挑戦は、インスタンスの引数の数で分ける
	}
    }
    /* -- miss 再挑戦orギブアップを選択するためのボタン -- */

    /* --  左右のボタンの設定 -- */
    setButtonNext() {
	let span = gameWidth/25;
	let bWidth = gameWidth/2 - span*2;
	let bTop = gameHeight*3/4 - span - 100;

	this.buttonLeft.className = "Select Left";
	this.buttonLeft.addEventListener(
	    "click", this.setButtonRevenge_clickEvent, false
	);	
	this.divScene.appendChild(this.buttonLeft);

	this.buttonRight.className = "Select Right";
	this.buttonRight.addEventListener(
	    "click", this.setButtonGiveUp_clickEvent, false
	);
	this.divScene.appendChild(this.buttonRight);
    }
    // -- 再挑戦ボタンのイベント
    setButtonRevenge_clickEvent() {
	quizData["text"] = "quizquiz"
	currentScene = new SceneQuiz(quizData);
    }
    // -- ギブアップボタンのイベント
    setButtonGiveUp_clickEvent() {
	currentScene = new SceneTitle();
    }
}
