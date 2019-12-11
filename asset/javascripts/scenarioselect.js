
class SceneScenarioSelect extends Scene {
    constructor() {
        console.log("[BEGIN] SceneScenarioSelect load...");
        currentSceneName = "SCENARIOSELECT";

        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    async initialize() {
        this.scenarioSet;

        // 親クラスの初期設定
        this.setDivScene();

        // 初期設定
        await this.getScenarioSet();
        this.setTextScenarioSelect();
        this.setButtonScenarioSet();

        console.log("[FINISH] SceneScenarioSelect !");
    }

    // シナリオセットを取得
    async getScenarioSet() {
        console.log("[BEGIN] ScenarioSet load...");

        // DBからシナリオセットデータの読み込み
        const result = await dbSelectAll("scenarioset").then(res => {
            currentScene.scenarioSet = res;
        });

        console.log("[FINISH] ScenarioSet !");
    }
    // シナリオ選択のテキスト
    setTextScenarioSelect() {
        const h1 = document.createElement('h1');

        // テキストを設定
        h1.textContent = "シナリオを選択してください.";

        // CSSクラスで配置設定
        h1.className = "scenarioSelect";

        // シーン画面へ追加
        this.divScene.appendChild(h1);
    }

    // シナリオを選択するボタンを設置
    setButtonScenarioSet() {
        let baseTop = 100;
        let baseHeight = 40;

        for (let i in this.scenarioSet) {
            // ボタンを宣言
            const button = document.createElement('button');

            // IDとテキストを設定
            button.id = i;
            button.textContent = this.scenarioSet[i]["title"];

            // CSSクラスで横幅とx座標を設定
            button.className = "scenarioSelect";

            // 高さとy座標を設定
            button.style.height = `${baseHeight}px`;
            button.style.top = `${baseTop}px`;

            // イベントの設定
            button.addEventListener("click", this.buttonScenarioSet_clickEvent, false);

            // シーン画面へ追加
            this.divScene.appendChild(button);
        }
    }

    // シナリオシーンへの遷移イベント
    async buttonScenarioSet_clickEvent() {
        // シナリオセットIDの格納
        scenariosetID = currentScene.scenarioSet[this.id];
        console.log("scenario_set -> ", scenariosetID);

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
        scenarioID = sid;

        // シナリオデータの並び替え

        currentScene = new SceneScenario();
    }
}