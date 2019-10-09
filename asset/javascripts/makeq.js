/* ===== 問題を作るページ ===== */

class SceneMakeQuiz extends Scene {
    constructor() {
	super();  // 親クラスの読み込み

	this.initialize();
    }
    initialize() {
	// 戻るボタン
	this.buttonBack = document.createElement('button');

	// 登録ボタン
	this.buttonAdd = document.createElement('button');

	// 問題文
	this.textAreaQuiz = document.createElement('textarea');

	// 解答選択肢
	this.textAnswer1 = document.createElement('input');
	this.textAnswer2 = document.createElement('input');
	this.textAnswer3 = document.createElement('input');
	this.textAnswer4 = document.createElement('input');

	// 解説文
	this.textAreaExplanation = document.createElement('textarea');
	
	// 親クラスのメソッド
	this.setDivScene();

	// 各設定
	this.setButtonBack();
	this.setTextAreaQuiz();
	this.setTextAnswer();
	this.setTextAreaExplanation();
	this.setButtonAdd();

	// データベースを開いておきたい
	//db = new sqlite.Database('./asset/databases/example.sqlite');
    }

    /* ----- 戻るボタン ----- */
    setButtonBack() {
	this.buttonBack.className = "ButtonHome";
	this.buttonBack.textContent = "タイトルへ戻る";
	this.buttonBack.addEventListener(
	    "click", this.buttonBack_clickEvent, false
	);

	this.divScene.appendChild(this.buttonBack);
    }
    // -- タイトルへ戻るイベント
    buttonBack_clickEvent() {
	//db.close();
	currentScene = new SceneTitle();
    }

    /* ----- データベースへ追加するボタン ----- */
    setButtonAdd() {
	this.buttonAdd.className = "MakeElement";
	this.buttonAdd.textContent = "問題を登録する";
	this.buttonAdd.addEventListener(
	    "click", this.buttonAdd_clickEvent, false
	);

	this.divScene.insertAdjacentHTML('beforeend', '<br>');
	this.divScene.appendChild(this.buttonAdd);
    }
    // -- データベースへ追加するイベント
    buttonAdd_clickEvent() {
	dbInsert();
	/*
	db.serialize(function() {
	    db.run('INSERT INTO user (name, age) VALUES ($i, $j)',
		   {
		       $i: "Wah",
		       $j: 100
		   }
		  );
	});
	*/
    }
		    
		     
    /* ----- 問題文 ----- */
    setTextAreaQuiz() {
	this.textAreaQuiz.className = "MakeElement";
	this.textAreaQuiz.placeholder = "問題文を入力してください.";

	this.divScene.insertAdjacentHTML('beforeend' ,"<br>");
	this.divScene.appendChild(this.textAreaQuiz);
    }

    /* ----- 解答選択肢 ----- */
    setTextAnswer() {
	this.textAnswer1.className = "MakeElement";
	this.textAnswer2.className = "MakeElement";
	this.textAnswer3.className = "MakeElement";
	this.textAnswer4.className = "MakeElement";

	this.textAnswer1.placeholder = "解答1 正答";
	this.textAnswer2.placeholder = "解答2 誤答";
	this.textAnswer3.placeholder = "解答3 誤答";
	this.textAnswer4.placeholder = "解答4 誤答";
	
	this.divScene.insertAdjacentHTML('beforeend' ,"<br>");
	this.divScene.appendChild(this.textAnswer1);
	this.divScene.appendChild(this.textAnswer2);
	this.divScene.insertAdjacentHTML('beforeend' ,"<br>");
	this.divScene.appendChild(this.textAnswer3);
	this.divScene.appendChild(this.textAnswer4);
    }

    /* ----- 解説文 ----- */
    setTextAreaExplanation() {
	this.textAreaExplanation.className = "MakeElement";
	this.textAreaExplanation.placeholder = "解説文を入力してください.";

	this.divScene.insertAdjacentHTML('beforeend', "<br>");
	this.divScene.appendChild(this.textAreaExplanation);
    }
}
