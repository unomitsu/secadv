/* ===== シーン 共通部分 ===== */

class Scene {
    constructor() {
	// 画面の初期化
	this.clearSceneAll();

	// シーン全体の区画
	this.divScene = document.createElement('div');	
	// チーム情報を表示する区画
	this.divTeamData = document.createElement('div');
	// テキストを表示する区画
	this.divMainText = document.createElement('div');
	// ホームボタン
	this.buttonHome = document.createElement('button');
    }
    /* ----- ADVBody を初期化 ----- */
    clearSceneAll() {
	advFrame.innerHTML = "";
    }

    /* ----- シーン区画の追加 ----- */
    setDivScene() {
	this.divScene.className = "SceneBody";
	advFrame.appendChild(this.divScene);
    }
    // -- 背景画像のパスを変更
    changeBackImage(path) {
	var obt = getComputedStyle(document.documentElement).getPropertyValue('--adv-backimage');
	console.log(obt);
	console.log(this.divScene);
	
	//backImagePath = path;
	//this.divScene.style.backgroundImage = "url("+path+")";
    }
    
    /* ----- チーム情報区画の設定 ----- */
    setDivTeamData() {
	this.divTeamData.className = "TeamData";
	
	// データの描画
	this.drawStringTeamData("NAME  : " + player.name);
	this.drawStringTeamData("SCORE : " + player.score);
	this.drawStringTeamData("MONEY : " + player.money);	

	// 親要素への追加
	this.divScene.appendChild(this.divTeamData);
    }
    // -- チームデータ区画への, 文字列の p タグでの描画
    drawStringTeamData(string) {
	let pstr = document.createElement('p');
	pstr.className = "TeamData"
	pstr.textContent = string;
	this.divTeamData.appendChild(pstr);
    }
    
    /* ----- テキスト区画の設定 ----- */
    setDivMainText() {
	this.divMainText.className = "MainText";
	this.divScene.appendChild(this.divMainText);
    }
    // テキスト区画への文字列の描画
    setMainText(str) {
	let pstr = document.createElement('p');
	pstr.className = "MainText";
	pstr.textContent = str;
	this.divMainText.appendChild(pstr);
    }
    // テキスト区画の文字列の削除
    clearMainText() {
	this.divMainText.innerHTML = "";
    }
    
    /* ----- ホームボタンの設定 ----- */
    setButtonHome() {
	this.buttonHome.className = "ButtonHome";
	this.buttonHome.addEventListener(
	    "click", this.buttonHome_clickEvent, false
	);
	this.divScene.appendChild(this.buttonHome);
    }
    buttonHome_clickEvent() {
	currentScene = new SceneHome();
    }
}

