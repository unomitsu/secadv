
/* ===== シーン クイズ ===== */
class SceneQuiz extends Scene {
    constructor(qDoc) {
	super();  // 親クラスの読み込み

	// 問題が指定されていない場合，DBから取得
	if (qDoc == null) {
	    // ここで問題を取得する
	    quizData = {
		id: 0,
		text: "問題分です。正解はどれだろう。",
		choice: ["ans1", "ans2", "ans3", "ans4"],
		answer: "ans1"
	    };
	}
	this.initialize();
    }
    // -- 初期化
    initialize() {
	// 問題の回答ボタン
	this.buttonQuiz = [
	    document.createElement('button'),
	    document.createElement('button'),
	    document.createElement('button'),
	    document.createElement('button')
	];
	// ギブアップボタン
	this.buttonGiveUp = document.createElement('button');

	// 実行内容
	this.setDivScene();
	this.setDivPlayerData();
	this.setDivMainText();

	this.changeBackImage("./asset/images/backdrop.jpg");
	
	this.setButtonQuiz();
	this.setButtonGiveUp();
	this.setQuiz();
    }
    
    /* -- 出題内容の取得と設定 -- */
    setQuiz() {
	this.setMainText(quizData["text"]);
	this.setButtonQuizText(quizData["choice"]);
    }    

    /* -- 問題回答ボタン関連の設定 -- */
    setButtonQuiz() {
	for (let i = 0; i < this.buttonQuiz.length; i++) {
	    this.buttonQuiz[i].id = i;
	    
	    // -- 配置設定
	    // 大きさと配置方法
	    this.buttonQuiz[i].className = "quizAnswer";

	    // 縦方向の配置
	    if (i < 2) {
		this.buttonQuiz[i].className += " topSide";
	    }
	    else {
		this.buttonQuiz[i].className += " bottomSide";
	    }
	    
	    //横方向の配置
	    if (i%2 == 0) {
		this.buttonQuiz[i].className += " leftSide";
	    }
	    else {
		this.buttonQuiz[i].className += " rightSide";
	    }
	    
	    // -- マウスクリックイベントの設定
	    this.buttonQuiz[i].addEventListener(
		"click", this.buttonQuiz_clickEvent, false
	    );

	    // 親要素に追加
	    this.divScene.appendChild(this.buttonQuiz[i]);
	}
    }
    // -- 回答ボタンのテキストを設定,  引数は、要素数4の配列
    setButtonQuizText(ansList) {
	for (let i = 0; i < ansList.length; i++) {
	    this.buttonQuiz[i].textContent = ansList[i];
	}
    }
    // -- button クリック時の動作, htmlを初期化し, リザルトへの遷移
    buttonQuiz_clickEvent(qDoc) {
	currentScene = new SceneResult(this.id);
    }

    /* ----- ギブアップボタン ----- */
    setButtonGiveUp() {
	this.buttonGiveUp.className = "quizGiveup";
	this.buttonGiveUp.textContent = "ギブアップ";

	// イベント設定
	this.buttonGiveUp.addEventListener(
	    "click", this.buttonGiveUp_clickEvent, false
	);
	
	this.divScene.appendChild(this.buttonGiveUp);
    }
    // -- ギブアップボタンのイベント
    buttonGiveUp_clickEvent() {
	currentScene = new SceneTitle();
    }
}

