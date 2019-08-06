
class SceneSelect extends Scene {
    constructor() {
	super();

	// ボタン要素の宣言
	this.buttonLeft = document.createElement('button');
	this.buttonRight = document.createElement('button');

	this.setDivScene();
	this.setDivTeamData();
	this.setDivMainText();

	//this.setBackImage("");
	this.setButtonSelect();
    }
    /* セレクトボタンの設定 */
    setButtonSelect() {
	this.buttonLeft.className = "Select Left";
	this.buttonLeft.textContent = "左へ進む";
	this.buttonLeft.addEventListener(
	    "click", this.buttonLeft_clickEvent, false
	);
	
	this.buttonRight.className = "Select Right";
	this.buttonRight.textContent = "右へ進む";
	this.buttonRight.addEventListener(
	    "click", this.buttonRight_clickEvent, false
	);
	
	this.divScene.appendChild(this.buttonLeft);
	this.divScene.appendChild(this.buttonRight);
    }
    // 左ボタン クリックイベント
    buttonLeft_clickEvent() {
	currentScene = new SceneQuiz();
    }
    // 右ボタン クリックイベント
    buttonRight_clickEvent() {
	currentScene = new SceneQuiz();
    }
}
