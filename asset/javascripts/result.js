
// ===== シーン リザルト =====
// 正答、誤答のアニメーションを表示する

class SceneResult extends Scene {
    constructor() {
        console.log(">>> SCENE RESULT");

        super();            // 親クラスの読み込み
        this.initialize();  // 初期処理
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
        this.setDivPlayerData();
        
        // 各初期設定
        this.checkAnswer();     // 解答の確認とプレイヤー情報の更新
        this.setAnimation();
        this.setMoveEvent();
    }

    /* ----- 解答の確認とプレイヤー情報の更新 ----- */
    checkAnswer() {
        // 答え合わせ、フラグの設定、スコアと所持金の更新
        if (g_quiz["answer"][g_playerAnswer] == 1) {
            this.correctFlag = true
            player["score"] += 1000;
            player["money"] += 1000;
        }
        else {
            this.correctFlag = false;
            player["score"] -= 10;
        }
    }

    /* ----- ○と×の表示 ----- */
    setAnimation() {
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
        // 一定時間待機する
        // 待機後、プレイヤー情報と解説を表示、イベントを設定する
        setTimeout(function () {
            currentScene.setDivPlayerData();
            currentScene.setDivMainText();
            currentScene.setMainText("[" + g_quiz["choice"][g_playerAnswer] + "]\n" + g_quiz["description"][g_playerAnswer]);
        }, 500);
        setTimeout(function () {
            currentScene.divScene.addEventListener("click", currentScene.divScene_clickEvent, false);
        }, 1000);
    }

    // 正答はステージセレクト画面、誤答はコンテニュー画面へ遷移する
    divScene_clickEvent() {
        // クリア後はクイズを繰り返す
        if (g_gameState == 1) { currentScene = new SceneQuiz(true); }

        else {
            currentScene = currentScene.correctFlag ? new SceneSelect() : new SceneContinue();
        }
    }
}
