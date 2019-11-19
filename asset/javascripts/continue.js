﻿
// ===== シーン コンテニュー =====
// 誤答の際の画面、コンテニューとギブアップを選択する
// 正答と選択した解答、解説を表示する

class SceneContinue extends Scene {
    constructor(answer) {
        console.log("[BEGIN] SceneContinue load...");
        currentSceneName = "Continue";

        super();    // 親クラスの読み込み
        this.initialize(answer);  // 初期処理

        console.log("[FINISH] SceneContinue !");
    }
    initialize(answer) {
        // プレイヤーが選択した解答
        this.playerAnswer = answer;

        // 再挑戦ボタン、ギブアップボタン
        this.buttonContinue = document.createElement('button');
        this.buttonGiveup = document.createElement('button');

        // 親クラス系の各初期設定
        this.setDivScene();
        this.changeBackImage("./asset/images/backdrop.jpg");
        this.setDivPlayerData();
        //this.setButtonHome();
        this.setDivMainText();

        // 各初期設定
        this.setResultText();
        this.setButtonContinue();
        this.setButtonGiveup();
    }

    /* ----- テキストを設定する ----- */
    setResultText() {
        this.setMainText(`正答は ${quizData["choice"][0]} です。あなたの回答は ${quizPlayerAnswer} でした.`);
        this.setMainText(quizData["explanation"]);
    }

    /* ----- コンテニューボタン ----- */
    setButtonContinue() {
        // CSSクラスで配置設定
        this.buttonContinue.className = "Select Left";

        // テキスト、イベントの設定
        this.buttonContinue.textContent = "コンテニュー";
        this.buttonContinue.addEventListener("click", this.buttonContinue_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonContinue);
    }
    // -- クイズシーンへの遷移イベント
    buttonContinue_clickEvent() {
        currentScene = new SceneQuiz();
    }

    /* ----- ギブアップボタン ----- */
    setButtonGiveup() {
        // CSSクラスで配置設定
        this.buttonGiveup.className = "Select Right";

        // テキスト、イベントの設定
        this.buttonGiveup.textContent = "ギブアップ";
        this.buttonGiveup.addEventListener("click", this.buttonGiveup_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonGiveup);
    }
    // -- タイトルシーンへの遷移イベント
    buttonGiveup_clickEvent() {
        currentScene = new SceneTitle();
    }
}