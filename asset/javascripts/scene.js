/* ===== シーン 共通部分 ===== */

class Scene {
    constructor() {
        // 画面の初期化
        this.clearSceneAll();

        // シーン全体の区画
        this.divScene = document.createElement('div');
        // チーム情報を表示する区画
        this.divPlayerData = document.createElement('div');
        // テキストを表示する区画
        this.divMainText = document.createElement('div');
        // ホームボタン
        this.buttonHome = document.createElement('button');
    }
    /* ----- ADVBody を初期化 ----- */
    clearSceneAll() {
        advFrame.innerHTML = "";
    }

    /* ----- シーン画面 ----- */
    setDivScene() {
        this.divScene.className = "SceneBody";
        advFrame.appendChild(this.divScene);
    }
    // -- 背景画像のパスを変更__未完成
    changeBackImage(path) {
        var obt = getComputedStyle(document.documentElement).getPropertyValue('--adv-backimage');
        //console.log(obt);
        //console.log(this.divScene);

        //backImagePath = path;
        //this.divScene.style.backgroundImage = "url("+path+")";
    }

    /* ----- プレイヤー情報区画 ----- */
    setDivPlayerData() {
        // CSSクラスで配置
        this.divPlayerData.className = "playerData";
        // テキストの追加
        this.divPlayerData.textContent
            = "Name->" + player.name
            + "__SCORE->" + player.score
            + "__MONEY->" + player.money
            + "__HINT->" + 100
            + "__ITEM->" + 100;
        // 親要素への追加
        this.divScene.appendChild(this.divPlayerData);
    }

    /* ----- テキスト区画の設定 ----- */
    setDivMainText() {
        // CSSクラスで配置
        this.divMainText.className = "MainText";
        // シーン画面へ追加
        this.divScene.appendChild(this.divMainText);
    }
    // -- テキスト区画への文字列の描画
    setMainText(str) {
        // 仮DOMの作成
        let pstr = document.createElement('p');
        pstr.className = "MainText";
        pstr.textContent = str;
        this.divMainText.appendChild(pstr);
    }
    // -- テキスト区画の文字列の削除
    clearMainText() {
        this.divMainText.innerHTML = "";
    }

    /* ----- ホームボタンの設定 ----- */
    setButtonHome() {
        // CSSでは位置
        this.buttonHome.className = "ButtonHome";
        // テキスト、イベントの設定
        this.buttonHome.textContent = "家";
        this.buttonHome.addEventListener(
            "click", this.buttonHome_clickEvent, false
        );
        // シーン画面へ追加
        this.divScene.appendChild(this.buttonHome);
    }
    // -- ホーム画面へ遷移
    buttonHome_clickEvent() {
        currentScene = new SceneHome();
    }
}


    // ポップアップウィンドウの作成
function makePopUp(text) {
    let divPopWindow = document.createElement('div');      // ポップアップのウィンドウ
    let buttonPopWindow = document.createElement('button');      // ポップアップの閉じるボタン

    // CSSクラスで配置設定
    divPopWindow.className = "popUp";
    buttonPopWindow.className = "popUp";

    // テキストとイベントの設定
    divPopWindow.textContent = text;
    buttonPopWindow = "閉じる";
    buttonPopWindow.addEventListener('click', () => {
        console.log("ボタンがクリックされました");
    }, false);

    // 画面の要素へ追加
    divPopWindow.appendChild(buttonPopWindow);
    currentScene.divScene.appendChild(divPopWindow);
}