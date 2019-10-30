
/* ===== シーン シナリオ ===== */
class SceneScenario extends Scene {
    constructor() {
        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    initialize() {
        // シナリオ配列
        this.scenarios = "";
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
    }

    // -- シーン画面のイベント
    scenario_clickEvent() {
        currentScene.scenarioId += 1;
        let id = currentScene.scenarioId;
        let len = currentScene.scenarios.length;

        console.log("EVE", currentScene.scenarios);
        console.log("EVE", currentScene.scenarios[0]['scenaio']);
        console.log("EVE", currentScene.scenarioId, " +++ ", currentScene.scenarios.length);

        // テキストがあれば、テキストの表示を更新
        if (id < len) {
            currentScene.clearMainText();
            currentScene.setMainText(
                currentScene.scenarios[currentScene.scenarioId]['scenario']
            );
            console.log(currentScene.scenarios[currentScene.scenarioId]['scenario']);
        }
        // テキストがなければ, クイズシーンへ遷移
        else {
            currentScene = new SceneQuiz();
        }
    }

    /* ----- シナリオの読み込み ----- */
    async loadScenarios() {
        // DBからシナリオデータの読み込み
        await dbSelectScenarioAll().then(res => {
            console.log(res);
            currentScene.scenarios = res;
        });

        // もしデータがなければ
        if (currentScene.scenarios.length <= 0) {
            currentScene.scenarios = ["シナリオがありません。"];
        }
        
        console.log("<after>", currentScene.scenarios);
        console.log("<after>", currentScene.scenarios.length);

        // テキストの設定
        this.setMainText(currentScene.scenarios[0]['scenario']);
    }
}
