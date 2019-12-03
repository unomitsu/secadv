/* ===== シナリオ作成ページ ===== */

class SceneMakeScenario extends Scene {
    constructor() {
        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    initialize() {
        // シナリオ入力欄
        // 引数にIDがある場合は複数追加する
        this.divInputScenario = document.createElement('div');
        this.textareaInputScenario = [document.createElement('textarea')];

        // シナリオ入力欄の追加ボタン
        this.buttonAddScenarioElement = document.createElement('button');

        // DBへのシナリオ追加ボタン
        this.buttonAddScenarioToDB = document.createElement('button');

        // 管理者用ページに戻るボタン
        this.buttonBackAdmin = document.createElement('button');

        // シナリオの仮保持
        this.temporaryScenarioData = [];

        // 親クラス系の各初期設定
        this.setDivScene();
        this.changeBackImage("./asset/images/backdrop.jpg");

        // 各初期設定
        this.setTextareaInputScenario();
        this.setButtonAddScenarioElement();
        this.setButtonAddScenarioToDB();
        this.setButtonBackAdmin();
    }

    /* ----- シナリオ入力欄 ----- */
    setTextareaInputScenario() {
        // divの設定
        // CSSクラスで配置
        this.divInputScenario.className = "makescenario";

        // シーン画面へ追加
        this.divScene.appendChild(this.divInputScenario);

        // CSSクラスで位置
        this.textareaInputScenario[0].className = "makescenario";
        // 入力のヒント
        this.textareaInputScenario[0].placeholder = "シナリオを入力してください.";
        // 入力内容取得用のid設定
        this.textareaInputScenario[0].id = "inputScenario";
        // シーン画面へ追加
        this.divInputScenario.appendChild(this.textareaInputScenario[0]);
    }
    
    /* ----- シナリオ入力欄の追加ボタン ----- */
    setButtonAddScenarioElement() {
        // CSSクラスで配置
        this.buttonAddScenarioElement.className = "buttonL makescenario addTemporaryScenario";

        // テキスト、イベント設定
        this.buttonAddScenarioElement.textContent = "要素を増やす";
        this.buttonAddScenarioElement.addEventListener('click', this.buttonAddScenarioElement_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonAddScenarioElement);
    }

    // -- シナリオ入力欄の追加イベント
    buttonAddScenarioElement_clickEvent() {
        console.log(currentScene.textareaInputScenario[0].style.bottom);

        // 挿入するテキストエリアの作成
        var textarea = document.createElement('textarea');

        // CSSクラスで設定
        textarea.className = "makescenario";
        
        // 入力のヒント
        textarea.placeholder = "シナリオを入力してください.";

        // 入力内容取得用のid設定
        textarea.id = "inputScenario";

        // ゲーム画面へ追加
        currentScene.divInputScenario.appendChild(textarea);

        // シナリオ入力欄配列への追加
        currentScene.textareaInputScenario.push(textarea);
        currentScene.textareaInputScenarioNum += 1;
    }

    /* ----- DBへのシナリオ追加ボタン ----- */
    setButtonAddScenarioToDB() {
        // CSSクラスで配置
        this.buttonAddScenarioToDB.className = "buttonL makescenario addScenarioToDB";

        // テキスト、イベント設定
        this.buttonAddScenarioToDB.textContent = "シナリオ登録を完了";
        this.buttonAddScenarioToDB.addEventListener('click', this.buttonAddScenarioToDB_clickEvent, false);

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
        this.buttonBackAdmin.className = "buttonL makescenario backAdmin";

        // テキスト、イベント設定
        this.buttonBackAdmin.textContent = "管理者用ページに戻る";
        this.buttonBackAdmin.addEventListener('click', this.buttonBackAdmin_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonBackAdmin);
    }
    // -- 管理者用ページに戻るイベント
    buttonBackAdmin_clickEvent() {
        currentScene = new SceneAdmin();
    }

}
