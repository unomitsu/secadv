/* ===== シーン 共通部分 ===== */

class Scene {
    constructor() {
        // 画面の初期化
        clearSceneAll();

        // シーン全体の区画
        this.divScene = document.createElement('div');                  // 枠
        this.divSceneBackground = "../.././asset/images/backdrop.jpg";  // 背景画像のパス

        // チーム情報を表示する区画
        this.divPlayerData = document.createElement('div');     // 枠
        this.divPlayerDataName = document.createElement('p');   // チーム名表示
        this.divPlayerDataScore = document.createElement('p');  // スコア表示
        this.divPlayerDataMoeny = document.createElement('p');  // 所持金表示

        // テキストを表示する区画
        this.divMainText = document.createElement('div');
    }

    /* ----- シーン画面 ----- */
    setDivScene() {
        this.divScene.className = "SceneBody";
        advFrame.appendChild(this.divScene);
    }
    // -- 背景画像を変更
    changeBackground(path) {
        this.divSceneBackground = path;
    }

    /* ----- プレイヤー情報区画 ----- */
    setDivPlayerData() {
        // CSSクラスで配置
        this.divPlayerData.className = "playerData";
        this.divPlayerDataName = "";
        this.divPlayerDataScore = "";
        this.divPlayerDataMoeny = "";

        // テキストの追加
        this.divPlayerDataName = "名前 : " + player["name"];
        this.divPlayerDataScore = "得点 : " + player["score"];
        this.divPlayerDataMoeny = "所持金 : " + player["money"];

        // 親要素への追加
        this.divPlayerData.append(this.divPlayerDataName);
        this.divPlayerData.append(this.divPlayerDataScore);
        this.divPlayerData.append(this.divPlayerDataMoeny);

        // ゲーム画面への追加
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