
/* ===== シーン シナリオ ===== */
class SceneScenario extends Scene {
    constructor() {
	super();  // 親クラスの読み込み
	this.initialize();  // 初期処理
    }
    initialize() {
	// シナリオ配列
	this.scenarios = [];
	// シナリオ添字
	this.scenarioId = 0;

	// 親クラスの初期設定
	this.setDivScene();
	this.changeBackImage("../../assets/images/backdrop.jpg");
	this.setDivMainText();
	this.setDivPlayerData();
	this.setButtonHome();

	// 初期設定
	this.loadScenarios();
	this.setScenarioMove();
    }
    
    /* ----- シーン画面の設定 ----- */
    // -- 最初のシナリオとクリックで進むイベントの追加
    setScenarioMove() {
	// イベントの設定
	this.divScene.addEventListener(
	    "click", this.scenario_clickEvent, false
	);
	// テキストの設定
	this.setMainText(this.scenarios[0]);
    }
    // -- シーン画面のイベント
    scenario_clickEvent(cs) {
	currentScene.scenarioId += 1;
	let id = currentScene.scenarioId;
	let len = currentScene.scenarios.length;

	// テキストがあれば、テキストの表示を更新
	if (id < len) {
	    currentScene.clearMainText();
	    currentScene.setMainText(
		currentScene.scenarios[currentScene.scenarioId]
	    );
	}
	// テキストがなければ, クイズシーンへ遷移
	else {
	    currentScene = new SceneQuiz();
	}
    }
    
    /* ----- シナリオの読み込み ----- */
    async loadScenarios() {
	// DBからシナリオデータの読み込み
	var array;

	await dbSelectScenarioAll().then(res => {
	    console.log(res);
	    array = res;
	});
	
	console.log("< after >", array);
	console.log(this.scenarios);
	console.log(this.scenarios.length);

	// もしデータがなければ
	if (this.scenarios.length <= 0) {
	    this.scenarios = ["シナリオがありません。"];
	}
    }
}
