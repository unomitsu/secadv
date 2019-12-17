
// ローカライズのためのグローバル変数。l_ を付ける
var l_nono = "wakatakeru";

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
        console.log("SCENARIO_", this.scenarioId);

        // 親クラスの初期設定
        this.setDivScene();
        this.setDivMainText();
        this.setDivPlayerData();

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

    // -- マウスクリックでテキストを進めるイベント
    scenario_clickEvent() {
        console.log(typeof currentScene.scenarioId);
        currentScene.scenarioId += 1;  // 現在のシナリオ位置を進める

        console.log(typeof currentScene.scenarioId, " ?= ", typeof currentScene.scenarios.length);
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

        console.log("NOW_SCENARIOS => ", scenariosID);

        // 現在のシナリオを読み込む
        await dbSelectWhereAll("scenario_element", `id_scenario=${scenarioID}`).then(res => {
            currentScene.scenarios = res;
        });

        // データがない場合
        if (this.scenarios.length <= 0) {
            this.scenarios = ["シナリオがありません。"];
        }

        // 読み込んだデータを削除する
        for (let i = 0; i < scenariosID.length; i++) {
            if (scenariosID[i]["id"] == scenarioID) {
                scenariosID.splice(i, 1);
                break;
            }
        }

        console.log(currentScene.scenarios);
        console.log(this.scenarioId, " ?= ", this.scenarios.length);
        this.scenarioId = 0;
        console.log(currentScene.scenarioId, " ?= ", currentScene.scenarios.length);
        
        // 初めのテキストの設定
        this.setMainText(currentScene.scenarios[0]['text']);

        console.log("[FINISH] Scenario -> ", currentScene.scenarios);

        return "resolve";
    }
}
