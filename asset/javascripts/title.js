/* ===== シーン タイトル ===== */

class SceneTitle extends Scene {
    constructor() {
        console.log(">>> SCENE TITLE");

        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理

        //makeScenario("UP", 1, 1, 1, ["aaa", "bbbb", "cccc"]);
        //makeQuiz("quizだ", 1, 1, "問題だ", [["解答1だ", "解説1だ"], ["解答2だ", "解説2だ"], ["解答3だ", "解説3だ"], ["解答4だ", "解説4だ"]], "ヒントだ");
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
        // 各種データを初期化
        g_gameState = 0;

        // シナリオシーンへ遷移
        currentScene = new SceneScenarioSelect();
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
