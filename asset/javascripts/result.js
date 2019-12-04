
// ===== シーン リザルト =====
// 正答、誤答のアニメーションを表示する

class SceneResult extends Scene {
    constructor() {
        console.log("[BEGIN] SceneResult load...");
        currentSceneName = "RESULT";

        super();    // 親クラスの読み込み
        this.initialize();  // 初期処理

        console.log("[FINISH] SceneResult !");
    }
    initialize() {
        // 正答誤答フラグ
        this.correctFlag = false;

        // 親クラス系の各初期設定
        this.setDivScene();
        this.setDivPlayerData();
        this.setDivMainText();
        //this.setButtonHome();
        
        // 各初期設定
        this.setAnimation();
        this.setMoveEvent();
    }

    /* ----- 正答と誤答の表示 ----- */
    setAnimation() {
        // 解答の確認
        this.correctFlag = quizData["answer"][0] == playerAnswer ? this.correctFlag = true : this.correctFlag = false;

        // テキストの設定とフラグの設定
        if (this.correctFlag) {
            this.setMainText(`正答です！あなたの回答は ${playerAnswer} でした。`);
        }
        else {
            this.setMainText(`誤答です。正答は ${quizData["answer"][0]} 。あんたの回答は ${playerAnswer} でした。`);
        }
    }
    /* ----- コンテニュー、ステージセレクト画面への移行イベントの設定 ----- */
    setMoveEvent() {
        // 一定時間待機し、その後イベントを設定する
        setTimeout(function () {
            currentScene.divScene.addEventListener("click", currentScene.divScene_clickEvent, false);
        }, 1000);
    }

    /* ----- 指定時間以降にクリックした際に、コンテニュー画面もしくはステージセレクト画面へ遷移する ----- */
    divScene_clickEvent() {
        // 正答の際は、ステージセレクト画面へ遷移する
        if (currentScene.correctFlag) {
            currentScene = new SceneSelect();
        }
        // 誤答の際は、コンテニュー画面へ遷移する
        else {
            currentScene = new SceneContinue();
        }
    }
}
