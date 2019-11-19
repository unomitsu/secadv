
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
        this.changeBackImage("../../assets/images/backdrop.jpg");

        // 初期設定
        await this.getScenarioSet();
        this.setTextScenarioSelect();
        this.setButtonScenarioSet();

        console.log("[FINISH] SceneScenarioSelect !");
    }

    // シナリオセットを取得
    async getScenarioSet() {
        console.log("[BEGIN] ScenarioSet load...");

        // DBからシナリオデータの読み込み
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
    buttonScenarioSet_clickEvent() {
        // シナリオデータの格納
        scenariosetID = currentScene.scenarioSet[this.id];
        
        currentScene = new SceneScenario();
    }
}