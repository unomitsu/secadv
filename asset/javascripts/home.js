/* ===== ホーム画面 ===== */

class SceneHome extends Scene {
    constructor() {
        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    initialize() {
        // 戻るボタン
        document.createElement('button');

        // 親クラス系の各初期設定
        this.setDivScene();
        this.setDivPlayerData();
        this.setDivMainText();
        this.changeBackImage("./asset/images/backdrop.jpg");

    }
    setButtonBack() {
    }
}
