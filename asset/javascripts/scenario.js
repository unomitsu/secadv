
/* ===== シーン シナリオ ===== */
class SceneScenario extends Scene {
    constructor() {
        console.log(">>> SCENE SCENARIO");

        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    async initialize() {
        // シナリオを表示するための変数
        this.scenarios = "";        // シナリオ要素配列
        this.scenarioId = 0;        // シナリオ要素の添字

        // 親クラスの初期設定
        this.setDivScene();

        // 初期設定
        await this.loadScenarios();     // シナリオの読み込み

        // フェードイン後に設定するもの
        this.fadein(() => {
            // 親クラスの初期設定
            this.setDivMainText();
            this.setDivPlayerData();

            // 初期設定
            this.setScenarioMove();     // 最所のシナリオとクリックイベントの追加
        });
    }

    /* ----- シーン画面の設定 ----- */

    // -- 最初のシナリオとクリックで進むイベントの追加
    setScenarioMove() {
        // 初めのテキストの設定
        this.setMainText(this.scenarios[0]['text']);

        // テキストを進めるイベントを設定
        this.divScene.addEventListener("click", this.scenario_clickEvent, false);
    }

    // -- マウスクリックでテキストを進めるイベント
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
            currentScene = new SceneQuiz(true);
        }
    }

    /* ----- シナリオの読み込み ----- */
    async loadScenarios() {
        // 現在のシナリオを読み込む
        await selectScenarioElement(g_scenario).then(res => {
            currentScene.scenarios = res;
        });

        // データがない場合
        if (this.scenarios.length <= 0) {
            this.scenarios = [{
                id_scenario: 0,
                text: "シナリオがありません。",
                sorder: 0
            }];
        }
    }
}
