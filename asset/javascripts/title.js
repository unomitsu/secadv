/* ===== シーン タイトル ===== */

class SceneTitle extends Scene {
    constructor() {
        console.log("[BEGIN] SceneTitle load...");
        currentSceneName = "TITLE";

        super();  // 親クラスの読み込み

        this.initialize();  // 初期処理

        console.log("[FINISH] SceneTitle !");
    }
    initialize() {
        // タイトル文字列
        this.h1Title = document.createElement('h1');
        // ゲーム開始ボタン
        this.buttonStart = document.createElement('button');
        // 管理者用ページボタン
        this.buttonAdmin = document.createElement('button');

        // 親クラス系の初期処理
        this.setDivScene();
        this.changeBackImage("./asset/images/backdrop.jpg");

        // 初期処理
        this.setH1Title();
        this.setButtonStart();
        this.setButtonAdmin();
    }

    /* ----- タイトル 文字列 ----- */
    setH1Title() {
        // CSSクラスで配置
        this.h1Title.className = "Title";
        // タイトルの文字列設定
        this.h1Title.textContent = "SECADV";
        // シーン画面へ追加
        this.divScene.appendChild(this.h1Title);
    }

    /* ----- ゲームスタートボタン ----- */
    setButtonStart() {
        // CSSクラスで配置
        this.buttonStart.className = "buttonL startButton";
        // テキスト、イベントの設定
        this.buttonStart.textContent = "はじめる";
        this.buttonStart.addEventListener(
            "click", this.buttonStart_clickEvent, false
        );
        // シーン画面へ追加
        this.divScene.appendChild(this.buttonStart);
    }
    // -- シナリオシーンへ遷移
    buttonStart_clickEvent() {
        currentScene = new SceneScenario();
    }

    /* ----- 管理者用ページボタン ----- */
    setButtonAdmin() {
        // CSSクラスで配置
        this.buttonAdmin.className = "buttonM buttonAdmin";
        // テキスト、イベントの設定
        this.buttonAdmin.textContent = "管理者用";
        this.buttonAdmin.addEventListener(
            "click", this.buttonAdmin_clickEvent, false
        );
        // シーン画面へ追加
        this.divScene.appendChild(this.buttonAdmin);
    }
    // 管理者用ページへ遷移
    buttonAdmin_clickEvent() {
        currentScene = new SceneAdmin();
    }
}
