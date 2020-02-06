/* ===== シーン 共通部分 ===== */

class Scene {
    constructor() {
        // 画面の初期化
        clearSceneAll();

        // シーン全体の区画
        this.divScene = document.createElement('div');                  // 枠

        // チーム情報を表示する区画
        this.divPlayerData = document.createElement('div');     // 枠
        this.divPlayerDataName = document.createElement('div');   // チーム名表示
        this.divPlayerDataScore = document.createElement('div');  // スコア表示
        this.divPlayerDataMoeny = document.createElement('div');  // 所持金表示

        // テキストを表示する区画
        this.divMainText = document.createElement('div');
    }

    /* ----- シーン画面 ----- */
    setDivScene() {
        let divSceneBack = document.createElement('div');
        divSceneBack.className = "scene back";
        advFrame.appendChild(divSceneBack);

        this.divScene.className = "scene main";
        divSceneBack.appendChild(this.divScene);

        this.drawBackground(g_backImagePath);
    }
    // -- 背景画像を変更
    drawBackground(path) {
        console.log(path);
        if (path == null) {
            this.divScene.style.backgroundImage = "url(./asset/images/title.jpg)";
        }
        else {
            this.divScene.style.backgroundImage = "url(" + path + ")";
        }
    }

    /* ----- プレイヤー情報区画 ----- */
    setDivPlayerData() {
        // CSSクラスで配置
        this.divPlayerData.className = "playerData";
        this.divPlayerDataName.className = "playerDataElement name";
        this.divPlayerDataScore.className = "playerDataElement score";
        this.divPlayerDataMoeny.className = "playerDataElement money";

        // テキストの追加
        this.divPlayerDataName.textContent = "名前 : " + player["name"];
        this.divPlayerDataScore.textContent = "得点 : " + String(player["score"]);
        this.divPlayerDataMoeny.textContent = "所持金 : " + String(player["money"]);

        // 親要素への追加
        this.divPlayerData.appendChild(this.divPlayerDataName);
        this.divPlayerData.appendChild(this.divPlayerDataScore);
        this.divPlayerData.appendChild(this.divPlayerDataMoeny);

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
        if (str == null || str == "") { return; }

        // 改行(\n)で配列に分割する
        let val = str.split('\n');

        // シナリオ表示欄への追加
        for (let v of val) {
            // DOMの作成
            let pstr = document.createElement('p');
            pstr.className = "MainText";

            // ローカライズ処理
            pstr.textContent = replaceSecadv(v);

            // ゲーム画面へ追加
            this.divMainText.appendChild(pstr);
        }
    }
    // -- テキスト区画の文字列の削除
    clearMainText() {
        this.divMainText.innerHTML = "";
    }

    /* フェードイン
     * fc : 処理終了後に実行する関数
    */
    fadein(fc) {
        let opacity = 0;

        // 処理終了後に実行する関数が正しくなければ、何もしない関数に置き換える
        if (!fc || typeof fc !== 'function') { fc = function () { } }

        // 一定時間ごとに透過度を加算していく
        let id = setInterval(() => {
            this.divScene.style.opacity = opacity;
            opacity += 0.05;

            if (opacity >= 1) {
                this.divScene.style.opacity = 1;
                fc();
                clearInterval(id);
            }
        }, 100);
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

// ローカライズ置き換え
/*
 * whileとかみたい 全部見るようにする
 * 環境変数は大文字なので、大文字の方が分かりやすい
*/

var teacher = "wakatakeru";
var school_name = "香川高校";

function replaceSecadv(str) {
    let result = str;
    let teacher = "wakatakeru";

    // 文字列中に、置換する文字列がないか検索
    let matchstr = str.match(/@.*@/);

    // なければそのまま返す
    if (matchstr == null) {
        return result;
    }

    // あれば対応する検索結果ごとに置換
    switch (matchstr["0"]) {
        case '@teacher@':
            result = str.replace(/@.*@/, teacher);
            break;
        case '@school_name@':
            result = str.replace(/@.*@/, school_name);
            break;
        case '@team_name@':
            result = str.replace(/@.*@/, player["name"]);
            break;
    }

    return result;
}