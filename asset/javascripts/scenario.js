
/* ===== シーン シナリオ ===== */
class SceneScenario extends Scene {
    constructor() {
	super();

	this.scenarioText = [
	    "11111",
	    "22222",
	    "3, hello",
	    "4, GGGGGGGGGood Bye!"
	];
	console.log(this.scenarioText);
	this.scenarioId = 0;
	
	this.setDivScene();
	this.changeBackImage("../../assets/images/backdrop.jpg");
	this.setDivMainText();
	this.setDivPlayerData();
	this.setButtonHome();

	this.setScenarioMove();
    }
    /* 画面クリックで進む */
    setScenarioMove() {
	this.divScene.addEventListener(
	    "click", this.scenario_clickEvent, false
	);
	this.setMainText(this.scenarioText[0]);
    }
    scenario_clickEvent(cs) {
	// テキストがあれば、テキストの表示を更新
	currentScene.scenarioId += 1;
	let id = currentScene.scenarioId;
	let len = currentScene.scenarioText.length;
	if (id < len) {
	    currentScene.clearMainText();
	    currentScene.setMainText(
		currentScene.scenarioText[currentScene.scenarioId]
	    );
	}
	// テキストがなければ, クイズシーンへ遷移
	else {
	    currentScene = new SceneQuiz();
	}
    }
}
