
class SceneSelect extends Scene {
    constructor() {
        console.log("[BEGIN] SceneSelect load...");
        currentSceneName = "Select";

        super();    // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    async initialize() {
        // ボタン要素の宣言
        this.button1 = document.createElement('button');
        this.button2 = document.createElement('button');

        // 次のシナリオの情報
        this.nextScenarioID1;
        this.nextScenarioID2;
        this.nextScenarioNum;

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

        console.log("[FINISH] SceneSelect !");
    }
    /* セレクトボタンの設定 */
    async setButtonSelect() {
        if (this.nextScenarioNum == 2) {
            await this.makeButtonSelect("Left", this.nextScenarioID1);
            await this.makeButtonSelect("Right", this.nextScenarioID2);
        }
        else if (this.nextScenarioNum == 1) {
            await this.makeButtonSelect("Center", this.nextScenarioID1);
        }
        else {
            g_gameState = 1;
            scenarioID = 6;
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
        await dbSelectWhereAll('scenario, image_type', `scenario.id = ${sid}`).then(res => {
            button.textContent = String(sid) + res[0]['type'];
        });

        // クリックイベントの設定
        button.addEventListener("click", () => {
            scenarioID = Number(button.id);         // 次のシナリオIDの格納
            currentScene = new SceneScenario();     // シナリオシーンへ遷移
        }, false);
        
        // ゲーム画面への追加
        this.divScene.appendChild(button);
    }

    /* ----- 次のシナリオの情報を取得 ----- */
    async getNextScenarios() {
        // 次のシナリオのIDを取得する
        await dbSelectWhereAll('relation_next_scenario', `id_current = ${scenarioID}`).then(res => {
            currentScene.nextScenarioID1 = res['id_next1'];
            currentScene.nextScenarioID2 = res['id_next2'];
        });
        
        // 読み終わっていないかの確認
        let flag1 = false;
        let flag2 = false;
        for (let s of scenariosID) {
            if (s["id"] == this.nextScenarioID1) { flag1 = true; }
            if (s["id"] == this.nextScenarioID2) { flag2 = true; }
        }
        // 読み終わっている場合は、まだ読んでないシナリオがないか探す。ない場合は選択肢は一つになる。
        for (let s of scenariosID) {
            if (!flag1) {
                this.nextScenarioID1 = s["id"];
                flag1 = true;
            }
            else if (!flag2) {
                this.nextScenarioID2 = s["id"];
                flag2 = true;
            }
            else { break; }
        }

        // 次のシナリオの数を格納する
        if (flag1 && flag2) {
            this.nextScenarioNum = 2;
        }
        else if (flag1 || flag2) {
            // 1の方に入れる
            if (flag2) { this.nextScenarioID1 = this.nextScenarioID2; }

            this.nextScenarioNum = 1;
        }
        else {
            this.nextScenarioNum = 0;
        }
    }
}
