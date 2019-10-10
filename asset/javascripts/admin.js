/* ===== 管理者用ページ ===== */

class SceneAdmin extends Scene {
    constructor() {
	super();  // 親クラスの読み込み
	this.initialize();  // 初期処理
    }
    initialize() {
	// 問題作成ボタン
	this.buttonMakeQuiz = document.createElement('button');
	// シナリオ作成ボタン
	this.buttonMakeScenario = document.createElement('button');
	// タイトルへ戻るボタン
	this.buttonBackTitle = document.createElement('button');


	// 親クラス系の処理
	this.setDivScene();
	this.changeBackImage("../../assets/image/backdrop.jpg");
	
	// 各ボタン設定
	this.setButtonMakeQuiz();
	this.setButtonMakeScenario();
	this.setButtonBackTitle();
    }

    /* ----- 問題作成ボタン -----*/
    setButtonMakeQuiz() {
	// CSSクラスで配置
	this.buttonMakeQuiz.className = "buttonL adminMenu makeQuiz";
	// テキスト、イベント設定
	this.buttonMakeQuiz.textContent = "問題作成";
	this.buttonMakeQuiz.addEventListener(
	    'click', this.buttonMakeQuiz_clickEvent, false
	);
	// シーン画面へ追加
	this.divScene.appendChild(this.buttonMakeQuiz);
    }
    buttonMakeQuiz_clickEvent() {
	currentScene = new SceneMakeQuiz();
    }

    /* ----- シナリオ作成ボタン ----- */
    setButtonMakeScenario() {
	//　CSSクラスで配置
	this.buttonMakeScenario.className = "buttonL adminMenu makeScenario";
	// テキスト、イベントの設定
	this.buttonMakeScenario.textContent = "シナリオ作成";
	this.buttonMakeScenario.addEventListener(
	    'click', this.buttonMakeScenario_clickEvent, false
	);
	// シーン画面へ追加
	this.divScene.appendChild(this.buttonMakeScenario);
    }
    buttonMakeScenario_clickEvent() {
	// シナリオ作成ページへ遷移
	currentScene = new SceneMakeScenario();
    }

    /* ----- タイトルへ戻るボタン ----- */
    setButtonBackTitle() {
	// CSSクラスで配置
	this.buttonBackTitle.className = "buttonL adminMenu backTitle";
	// テキスト、イベントの設定
	this.buttonBackTitle.textContent = "タイトルへ戻る";
	this.buttonBackTitle.addEventListener(
	    'click', this.buttonBackTitle_clickEvent, false
	);
	// シーン画面へ追加
	this.divScene.appendChild(this.buttonBackTitle);	
    }
    buttonBackTitle_clickEvent() {
	// タイトル画面へ遷移
	currentScene = new SceneTitle();
    }
}
