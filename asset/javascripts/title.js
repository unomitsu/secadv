/* ===== シーン タイトル ===== */

class SceneTitle extends Scene {
    constructor() {
	super();  // 親クラスの読み込み

	// タイトル文字列
	this.h1Title = document.createElement('h1');

	// 遷移ボタン
	this.buttonStart = document.createElement('button');

	// 問題作成ボタン
	this.buttonMake = document.createElement('button');
	
	// 実行内容
	this.setDivScene();

	this.divScene.style.background = "green";
	this.setH1Title();
	this.setButtonStart();
	this.setButtonMake();
    }
    /* ----- タイトル 文字列 ----- */
    setH1Title() {
	this.h1Title.className = "Title";
	this.h1Title.textContent = "ADV_ADV_ADV";
	this.divScene.appendChild(this.h1Title);
    }
    /* ----- ゲームスタートボタン ----- */
    setButtonStart() {
	this.buttonStart.className = "StartButton";
	this.buttonStart.textContent = "はじめる";
	
	this.buttonStart.addEventListener(
	    "click", this.buttonStart_clickEvent, false
	);
	
	this.divScene.appendChild(this.buttonStart);
    }
    // -- スタートボタンイベント
    buttonStart_clickEvent() {
	currentScene = new SceneScenario();
    }

    /* ----- 問題作成ボタン ----- */
    setButtonMake() {
	this.buttonMake.className = "ButtonMake";
	this.buttonMake.textContent = "問題作成";
	this.buttonMake.addEventListener(
	    "click", this.buttonMake_clickEvent, false
	);

	this.divScene.appendChild(this.buttonMake);
    }
    // 問題作成ページへの遷移イベント
    buttonMake_clickEvent() {
	currentScene = new SceneMakeQuiz();
    }
}
