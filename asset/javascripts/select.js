
class SceneSelect extends Scene {
    constructor() {
        console.log("[BEGIN] SceneSelect load...");
        currentSceneName = "Select";

        super();    // 親クラスの読み込み
        this.initialize();  // 初期処理

        console.log("[FINISH] SceneSelect !");
    }
    initialize() {
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
            this.getNextScenarios();
            this.setButtonSelect();
        }
        else {
            currentScene = new SceneQuiz();
        }
    }
    /* セレクトボタンの設定 */
    setButtonSelect() {
        if (this.nextScenarioNum == 2) {
            // CSSクラスで配置設定
            this.button1.className = "Select Left";
            this.button2.className = "Select Right";

            // シナリオIDをidとして設定
            this.button1.id = this.nextScenarioID1;
            this.button2.id = this.nextScenarioID2;

            // テキストの設定
            this.button1.textContent = "左へ進む";
            this.button2.textContent = "右へ進む";

            // クリックイベントの設定
            this.button1.addEventListener("click", this.button_clickEvent, false);
            this.button2.addEventListener("click", this.button_clickEvent, false);

            // ゲーム画面への追加
            this.divScene.appendChild(this.button1);
            this.divScene.appendChild(this.button2);
        }
        else if (this.nextScenarioNum == 1) {
            // CSSクラスで配置設定
            this.button1.className = "Select Left";

            // シナリオIDをidとして設定
            this.button1.id = this.nextScenarioID1;

            // テキストの設定
            this.button1.textContent = "左へ進む";

            // クリックイベントの設定
            this.button1.addEventListener("click", this.button_clickEvent, false);

            // ゲーム画面への追加
            this.divScene.appendChild(this.button1);
        }
        else {
            g_gameState = 1;
            scenarioID = 6;
            setTimeout(() => {
                currentScene = new SceneScenario();
            }, 200);
        }
    }
    button_clickEvent() {
        scenarioID = Number(this.id);   // 次のシナリオIDの格納
        currentScene = new SceneScenario();
    }

    /* ----- 次のシナリオの情報を取得 ----- */
    getNextScenarios() {
        // 次のシナリオのIDを取得する
        /* たぶんこんな感じになる、配列で[scenarioID, next1, next2]にすると思う
        await dbSelectWhereAll("scenario, relation_next_scenario", `scenario.id = relation_next_scenario.id_scenario`).then(res => {
            scenariosID = res;
        });
        */
        this.nextScenarioID1 = 1;  // とりあえず設定
        this.nextScenarioID2 = 2;  // とりあえず設定

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
