
class SceneSelect extends Scene {
    constructor() {
        console.log(">>> SCENE SELECT");

        super();    // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    async initialize() {
        // 次のシナリオの情報
        this.nextScenarioID;

        // 親クラスの初期設定
        this.setDivScene();
        this.setDivPlayerData();
        this.setDivMainText();
        
        // 初期設定
        if (g_gameState == 0) {
            await this.getNextScenarios();
            this.setButtonSelect();
        }
        else {
            currentScene = new SceneQuiz(true);
        }
    }
    /* セレクトボタンの設定 */
    async setButtonSelect() {
        let len = this.nextScenarioID.length;

        if (len == 2) {
            await this.makeButtonSelect("Left", this.nextScenarioID['0']['id_next']);
            await this.makeButtonSelect("Right", this.nextScenarioID['1']['id_next']);
            this.setMainText("どちらか選んで進んでください.");
        }
        else if (len == 1) {
            await this.makeButtonSelect("Center", this.nextScenarioID['0']['id_next']);
            this.setMainText("次に進んでください.");
        }
        else {
            g_gameState = 1;
            g_scenario = 0;
            setTimeout(() => {
                currentScene = new SceneScenario();
            }, 200);
        }
    }

    /* 次のシナリオを選択するボタンを作成する
     * position : ボタンの位置。"left", "right", "center"
     * sid      : シナリオのID
    */
    async makeButtonSelect(position, sid) {
        let button = document.createElement('button');
        button.className = "Select " + position;

        // id に引数の sid(=scenarioID) を設定
        button.id = sid;

        // 対応するシナリオの情報を取得し、ボタンのテキストを設定する
        await selectScenario(sid).then(res => {
            button.textContent = res['title'];
        });

        // クリックイベントの設定
        button.addEventListener("click", () => {
            g_scenario = Number(button.id);         // 次のシナリオIDの格納
            currentScene = new SceneScenario();     // シナリオシーンへ遷移
        }, false);
        
        // ゲーム画面への追加
        this.divScene.appendChild(button);
    }

    /* ----- 次のシナリオの情報を取得 ----- */
    async getNextScenarios() {
        // 次のシナリオのIDを取得する
        await selectNextScenario(g_scenario).then(res => {
            currentScene.nextScenarioID = res;
        });
    }
}
