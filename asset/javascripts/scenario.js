
/* ===== シーン シナリオ ===== */
class SceneScenario extends Scene {
    constructor() {
        console.log("[BEGIN] SceneScenario load...");
        currentSceneName = "SCENARIO";

        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    async initialize() {
        // シナリオ配列
        this.scenarios = "";
        // シナリオ添字
        this.scenarioId = 0;

        // 親クラスの初期設定
        this.setDivScene();
        this.changeBackImage("../../assets/images/backdrop.jpg");
        this.setDivMainText();
        this.setDivPlayerData();
        //this.setButtonHome();

        // 初期設定
        await this.loadScenarios();
        this.setScenarioMove();

        console.log("[FINISH] SceneScenario !");
    }

    /* ----- シーン画面の設定 ----- */

    // -- 最初のシナリオとクリックで進むイベントの追加
    setScenarioMove() {
        this.divScene.addEventListener("click", this.scenario_clickEvent, false);
    }

    // -- シーン画面のイベント
    scenario_clickEvent() {
        currentScene.scenarioId += 1;  // 現在のシナリオ位置を進める
        
        // テキストがあれば、テキストの表示を更新
        if (currentScene.scenarioId < currentScene.scenarios.length) {
            // テキスト表示エリアの初期化
            currentScene.clearMainText();
            // テキストの設定
            currentScene.setMainText(currentScene.scenarios[currentScene.scenarioId]['text']);
        }
        // テキストがなければ, クイズシーンへ遷移
        else {
            currentScene = new SceneQuiz();
        }
    }

    /* ----- シナリオの読み込み ----- */
    async loadScenarios() {
        console.log("[BEGIN] Scenario load...");

        // シナリオセットに対応するシナリオのIDを取得
        const result = await dbSelectWhereAll("relation_scenarioset_scenario", `id_scenarioset = ${scenariosetID["id"]}`).then(res => {
            scenariosID = res;
        });
        // 対応するシナリオの情報を取得
        await dbSelectWhereAll("scenario, relation_scenarioset_scenario", `scenario.id = relation_scenarioset_scenario.id_scenario`).then(res => {
            scenariosID = res;
        });

        // 使用するシナリオのIDを決定する
        let sid = 10;
        for (let s of scenariosID) {
            if (s["situation"] == 1) {
                sid = s["id"];
                break;
            }
        }

        // 最初のシナリオを読み込む
        await dbSelectWhereAll("scenario_element", `id_scenario=${sid}`).then(res => {
            currentScene.scenarios = res;
        });

        // もしデータがなければ
        if (currentScene.scenarios.length <= 0) {
            currentScene.scenarios = ["シナリオがありません。"];
        }
        
        // 初めのテキストの設定
        this.setMainText(currentScene.scenarios[0]['text']);

        console.log("[FINISH] Scenario -> ", currentScene.scenarios);
        return result;
    }
}
