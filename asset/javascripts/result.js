
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

        // ○と×
        this.imgAnimation = document.createElement('img');  // 画像
        this.imgAnimationSize = 0;                          // 表示サイズ
        this.imgAnimationCounter = 0;                       // カウンター
        this.imgAnimationIntervalId;                        // interval関数のID

        // 親クラス系の各初期設定
        this.setDivScene();
        
        // 各初期設定
        this.setAnimation();
        this.setMoveEvent();
    }

    /* ----- ○と×の表示 ----- */
    setAnimation() {
        // 解答を確認し、フラグの設定
        this.correctFlag = quizData["answer"][0] == playerAnswer ? this.correctFlag = true : this.correctFlag = false;

        // 画像の設定
        this.imgAnimation.src = this.correctFlag ? "./asset/images/correct.png" : "./asset/images/miss.png";

        // CSSクラスによる、正誤アニメーションの配置設定
        this.imgAnimation.className = "animation";

        // ゲーム画面への追加
        this.divScene.appendChild(this.imgAnimation);

        // アニメーションの開始
        this.imgAnimation_intervalEvent();
    }

    // 一定時間ごとに画像の大きさを変更する
    imgAnimation_intervalEvent() {
        var id = setInterval(() => {
            // 画像サイズとカウンターの加算
            currentScene.imgAnimationSize += 5;
            currentScene.imgAnimationCounter += 5;

            // 画像の高さと位置の変更
            try {
                currentScene.imgAnimation.style.top = gameHeight / 2 - currentScene.imgAnimationSize + "px";
                currentScene.imgAnimation.style.height = 2 * currentScene.imgAnimationSize + "px";
            }
            // 次の画面へ遷移していた場合、処理終了
            catch{
                clearInterval(id);
            }

            // 一定時間後、処理終了
            if (currentScene.imgAnimationCounter >= 150) {
                clearInterval(id);
            }
        }, 10);
    }

    /* ----- コンテニュー、ステージセレクト画面への移行イベントの設定 ----- */
    setMoveEvent() {
        // 一定時間待機し、その後イベントを設定する
        setTimeout(function () {
            currentScene.divScene.addEventListener("click", currentScene.divScene_clickEvent, false);
        }, 500);
    }

    // 正答はコンテニュー画面、誤答はステージセレクト画面へ遷移する
    divScene_clickEvent() {
        currentScene = currentScene.correctFlag ? new SceneSelect() : new SceneContinue();
    }
}
