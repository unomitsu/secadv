
/* ===== シーン タイトル ===== */
class SceneTitle extends Scene {
    constructor() {
	super();  // 親クラスの読み込み

	// タイトル文字列
	this.h1Title = document.createElement('h1');

	// 遷移ボタン
	this.buttonStart = document.createElement('button');

	// 実行内容
	this.setDivScene();

	this.divScene.style.background = "green";
	this.setH1Title();
	this.setButtonStart();
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
	previousScene = currentScene;
	currentScene = new SceneScenario();
    }
}
