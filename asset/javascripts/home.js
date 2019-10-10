/* ===== ホーム画面 ===== */

class SceneHome extends Scene {
    constructor() {
	super();  // 親クラスの読み込み

	this.initialize();
    }
    initialize() {
	// 戻るボタン
	document.createElement('button');
	
	this.setDivScene();
	this.setDivPlayerData();
	this.setDivMainText();

	this.changeBackImage("./asset/images/backdrop.jpg");
    }
    setButtonBack() {
    }
}
