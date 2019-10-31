
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

        this.divScene.addEventListener("click", this.divScene_clickEvent, false);

        // 各初期設定
        this.setAnimation();
    }

    /* ----- 正答と誤答の表示 ----- */
    setAnimation() {
        // 解答の確認
        this.correctFlag = quizData["choice"][0] == quizPlayerAnswer ? this.correctFlag = true : this.correctFlag = false;

        // テキストの設定とフラグの設定
        if (this.correctFlag) {
            this.setMainText(`正答です！あなたの回答は ${quizPlayerAnswer} でした。`);
        }
        else {
            this.setMainText(`誤答です。正答は ${quizData["choice"][0]} 。あんたの回答は ${quizPlayerAnswer} でした。`);
        }
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
