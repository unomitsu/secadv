
// ===== シーン コンテニュー =====
// 誤答の際の画面、コンテニューとギブアップを選択する
// 正答と選択した解答、解説を表示する

class SceneContinue extends Scene {
    constructor() {
        console.log(">>> SCENE CONTINUE");

        super();    // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    initialize() {
        // 再挑戦ボタン、ギブアップボタン

        // 親クラス系の各初期設定
        this.setDivScene();
        this.setDivPlayerData();
        this.setDivMainText();

        // 各初期設定
        this.setResultText();
        this.setButtonContinue();
        this.setButtonGiveup();
    }

    /* ----- テキストを設定する ----- */
    setResultText() {
        this.setMainText("[Hint]\n" + g_quiz["explanation"]);
    }

    /* ----- コンテニューボタン ----- */
    setButtonContinue() {
        let button = document.createElement('button');

        // CSSクラスで配置設定
        button.className = "Select Left";

        // テキスト、イベントの設定
        button.textContent = "コンテニュー";
        button.addEventListener("click", this.buttonContinue_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(button);
    }
    // -- クイズシーンへの遷移イベント
    buttonContinue_clickEvent() {
        currentScene = new SceneQuiz(false);
    }

    /* ----- ギブアップボタン ----- */
    setButtonGiveup() {
        let button = document.createElement('button');

        // CSSクラスで配置設定
        button.className = "Select Right";

        // テキスト、イベントの設定
        button.textContent = "ギブアップ";
        button.addEventListener("click", this.buttonGiveup_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(button);
    }
    // -- タイトルシーンへの遷移イベント
    buttonGiveup_clickEvent() {
        currentScene = new SceneTitle();
    }
}
