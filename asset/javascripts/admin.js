/* ===== 管理者用ページ ===== */

class SceneAdmin extends Scene {
    constructor() {
        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    initialize() {
        // 問題作成、更新ボタン
        this.buttonMakeQuiz = document.createElement('button');
        this.buttonUpdateQuiz = document.createElement('button');

        // シナリオ作成、更新ボタン
        this.buttonMakeScenario = document.createElement('button');
        this.buttonUpdateScenario = document.createElement('button');

        // シナリオセット作成ボタン
        this.buttonMakeScenarioSet = document.createElement('button');

        // タイトルへ戻るボタン
        this.buttonBackTitle = document.createElement('button');


        // 親クラス系の処理
        this.setDivScene();
        this.changeBackImage("../../assets/image/backdrop.jpg");

        // 各種設定
        this.setButtonMakeQuiz();         // 問題作成ボタン
        this.setButtonUpdateQuiz();       // 問題更新ボタン
        this.setButtonMakeScenario();     // シナリオ作成ボタン
        this.setButtonUpdateScenario();   // シナリオ更新ボタン
        this.setButtonMakeScenarioSet();  // シナリオセット作成ボタン
        this.setButtonBackTitle();        // タイトルへ戻るボタン
    }

    /* ----- 問題作成ボタン -----*/
    setButtonMakeQuiz() {
        // CSSクラスで配置
        this.buttonMakeQuiz.className = "buttonL adminMenuLeft adminMenuUp";

        // テキスト、イベント設定
        this.buttonMakeQuiz.textContent = "問題作成";
        this.buttonMakeQuiz.addEventListener('click', this.buttonMakeQuiz_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonMakeQuiz);
    }
    buttonMakeQuiz_clickEvent() {
        currentScene = new SceneMakeQuiz();
    }

    /* ----- 問題更新ボタン -----*/
    setButtonUpdateQuiz() {
        // CSSクラスで配置
        this.buttonUpdateQuiz.className = "buttonL adminMenuCenter adminMenuUp";

        // テキスト、イベント設定
        this.buttonUpdateQuiz.textContent = "問題更新";
        this.buttonUpdateQuiz.addEventListener('click', this.buttonUpdateQuiz_clickEvent, false);
        // シーン画面へ追加
        this.divScene.appendChild(this.buttonUpdateQuiz);
    }
    buttonUpdateQuiz_clickEvent() {
        //currentScene = new SceneUpdateQuiz();
    }

    /* ----- シナリオ作成ボタン ----- */
    setButtonMakeScenario() {
        //　CSSクラスで配置
        this.buttonMakeScenario.className = "buttonL adminMenuLeft adminMenuMiddle";

        // テキスト、イベントの設定
        this.buttonMakeScenario.textContent = "シナリオ作成";
        this.buttonMakeScenario.addEventListener('click', this.buttonMakeScenario_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonMakeScenario);
    }
    buttonMakeScenario_clickEvent() {
        currentScene = new SceneMakeScenario();
    }

    /* ----- シナリオ更新ボタン ----- */
    setButtonUpdateScenario() {
        // CSSクラスで配置設定
        this.buttonUpdateScenario.className = "buttonL adminMenuCenter adminMenuMiddle";

        // テキスト、イベントの設定
        this.buttonUpdateScenario.textContent = "シナリオ更新";
        this.buttonUpdateScenario.addEventListener('click', this.buttonUpdateScenario_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonUpdateScenario);
    }
    buttonUpdateScenario_clickEvent() {
        currentScene = new SceneUpdateScenario();
    }

    /* ----- シナリオセット作成ボタン ----- */
    setButtonMakeScenarioSet() {
        // CSSクラスで配置設定
        this.buttonMakeScenarioSet.className = "buttonL adminMenuLeft adminMenuDown";

        // テキスト、イベントの設定
        this.buttonMakeScenarioSet.textContent = "シナリオセット作成";
        this.buttonMakeScenarioSet.addEventListener('click', this.buttonMakeScenarioSet_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonMakeScenarioSet);
    }
    buttonMakeScenarioSet_clickEvent() {

    }

    /* ----- タイトルへ戻るボタン ----- */
    setButtonBackTitle() {
        // CSSクラスで配置
        this.buttonBackTitle.className = "buttonL adminMenuRight adminMenuDown";

        // テキスト、イベントの設定
        this.buttonBackTitle.textContent = "タイトルへ戻る";
        this.buttonBackTitle.addEventListener('click', this.buttonBackTitle_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonBackTitle);
    }
    buttonBackTitle_clickEvent() {
        currentScene = new SceneTitle();
    }
}
