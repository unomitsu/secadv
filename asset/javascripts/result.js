
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

        // ○と×を表示する画像
        this.imgAnimation = document.createElement('img');

        // ○と×の大きさ
        this.imgAnimationSize = 0;

        // カウンター
        this.imgAnimationCounter = 0;

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
        // 解答の確認とフラグの設定
        this.correctFlag = quizData["answer"][0] == playerAnswer ? this.correctFlag = true : this.correctFlag = false;

        // テキストの設定と画像の設定
        if (this.correctFlag) {
            this.imgAnimation.src = "./asset/images/correct.png";
            this.setMainText(`正答です！あなたの回答は ${playerAnswer} でした。`);
        }
        else {
            this.imgAnimation.src = "./asset/images/miss.png";
            this.setMainText(`誤答です。正答は ${quizData["answer"][0]} 。あんたの回答は ${playerAnswer} でした。`);
        }

        // 正誤アニメーションの設定
        this.imgAnimation.className = "animation";

        // アニメーションの開始
        this.imgAnimation_intervalEvent();

        // ゲーム画面への追加
        this.divScene.appendChild(this.imgAnimation);

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
    /* ----- 一定時間ごとに画像の大きさを変更する ----- */
    imgAnimation_intervalEvent() {
        var id = setInterval(() => {
            // 画像サイズとカウンターの加算
            currentScene.imgAnimationSize += 1;
            currentScene.imgAnimationCounter += 1;

            // 画像の高さと位置の変更
            currentScene.imgAnimation.style.top = gameHeight / 2 - currentScene.imgAnimationSize + "px";
            currentScene.imgAnimation.style.height = 2 * currentScene.imgAnimationSize + "px";

            console.log(currentScene.imgAnimation);

            // 一定時間後処理終了
            if (currentScene.imgAnimationCounter >= 150) {
                clearInterval(id);
            }
        }, 100);
    }
}
