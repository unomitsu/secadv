/* ===== シナリオ作成ページ ===== */

class SceneMakeScenario extends Scene {
    constructor() {
        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    initialize() {
        // シナリオ入力欄
        this.textareaInputScenario = document.createElement('textarea');
        // シナリオ出力欄
        this.textareaOutputScenario = document.createElement('textarea');
        // シナリオの仮追加ボタン
        this.buttonAddTemporaryScenario = document.createElement('button');
        // DBへのシナリオ追加ボタン
        this.buttonAddScenarioToDB = document.createElement('button');
        // 管理者用ページに戻るボタン
        this.buttonBackAdmin = document.createElement('button');

        // シナリオの仮保持用にシナリオデータを初期化
        scenarioData = [];

        // 親クラス系の各初期設定
        this.setDivScene();
        this.changeBackImage("./asset/images/backdrop.jpg");

        // 各初期設定
        this.setTextareaInputScenario();
        this.setTextareaOutputScenario()
        this.setButtonAddTemporaryScenario();
        this.setButtonAddScenarioToDB();
        this.setButtonBackAdmin();
    }

    /* ----- シナリオ入力欄 ----- */
    setTextareaInputScenario() {
        // CSSクラスで位置
        this.textareaInputScenario.className = "makescenario input";
        // 入力のヒント
        this.textareaInputScenario.placeholder = "シナリオを入力してください.";
        // 入力内容取得用のid設定
        this.textareaInputScenario.id = "inputScenario";
        // シーン画面へ追加
        this.divScene.appendChild(this.textareaInputScenario);
    }

    /* ----- シナリオ出力欄 ----- */
    setTextareaOutputScenario() {
        // CSSクラスで配置
        this.textareaOutputScenario.className = "makescenario output";
        // 読み込み専用に設定
        this.textareaOutputScenario.readOnly = true;
        // 出力内容設定用のid設定
        this.textareaOutputScenario.id = "outputScenario";
        // シーン画面へ追加
        this.divScene.appendChild(this.textareaOutputScenario);
    }

    /* ----- シナリオの仮追加ボタン ----- */
    setButtonAddTemporaryScenario() {
        // CSSクラスで配置
        this.buttonAddTemporaryScenario.className
            = "buttonL makescenario addTemporaryScenario";
        // テキスト、イベント設定
        this.buttonAddTemporaryScenario.textContent = "仮追加する";
        this.buttonAddTemporaryScenario.addEventListener(
            'click', this.buttonAddTemporaryScenario_clickEvent, false
        );
        // シーン画面へ追加
        this.divScene.appendChild(this.buttonAddTemporaryScenario);
    }
    // -- シナリオの仮配列への挿入イベント
    buttonAddTemporaryScenario_clickEvent() {
        // idからシナリオ入力欄のDOMを取得
        const input = document.getElementById('inputScenario');
        // 配列へ仮挿入
        scenarioData["main"].push(input.value);
        // 出力欄へ追加
        document.getElementById("outputScenario").value += input.value + "\n";
        // 入力欄を初期化
        input.value = ""
        input.placeholder = "シナリオを入力してください。";
    }

    /* ----- DBへのシナリオ追加ボタン ----- */
    setButtonAddScenarioToDB() {
        // CSSクラスで配置
        this.buttonAddScenarioToDB.className =
            "buttonL makescenario addScenarioToDB";
        // テキスト、イベント設定
        this.buttonAddScenarioToDB.textContent = "シナリオ登録を完了";
        this.buttonAddScenarioToDB.addEventListener(
            'click', this.buttonAddScenarioToDB_clickEvent, false
        );
        // シーン画面へ追加
        this.divScene.appendChild(this.buttonAddScenarioToDB)
    }
    // -- DBへのシナリオ追加
    buttonAddScenarioToDB_clickEvent() {
        // シナリオ追加、INSERTを仮保持配列分ループ
    }

    /* ----- 管理者用ページに戻るボタン ------ */
    setButtonBackAdmin() {
        // CSSクラスで配置
        this.buttonBackAdmin.className =
            "buttonL makescenario backAdmin";
        // テキスト、イベント設定
        this.buttonBackAdmin.textContent = "管理者用ページに戻る";
        this.buttonBackAdmin.addEventListener(
            'click', this.buttonBackAdmin_clickEvent, false
        );
        // シーン画面へ追加
        this.divScene.appendChild(this.buttonBackAdmin);
    }
    // -- 管理者用ページに戻るイベント
    buttonBackAdmin_clickEvent() {
        currentScene = new SceneAdmin();
    }

}
