/* ===== 問題作成ページ ===== */

class SceneMakeQuiz extends Scene {
    constructor() {
        console.log("[BEGIN] SceneMakeQuiz load...");
        currentSceneName = "MAKE_QUIZ";

        super();  // 親クラスの読み込み
        this.initialize(); // 初期処理

        console.log("[FINISH] SceneMakeQuiz !");
    }
    initialize() {
        // 管理者用ページへ戻るボタン
        this.buttonBackAdmin = document.createElement('button');

        // 問題登録ボタン
        this.buttonAdd = document.createElement('button');

        // 問題文入力欄
        this.textAreaQuiz = document.createElement('textarea');

        // 解答選択肢入力欄
        this.textAnswer1 = document.createElement('input');
        this.textAnswer2 = document.createElement('input');
        this.textAnswer3 = document.createElement('input');
        this.textAnswer4 = document.createElement('input');

        // 解説文入力欄
        this.textAreaExplanation = document.createElement('textarea');

        // 親クラス系の初期設定
        this.setDivScene();

        // 各初期設定
        this.setButtonBackAdmin();
        this.setTextAreaQuiz();
        this.setTextAnswer();
        this.setTextAreaExplanation();
        this.setButtonAdd();
    }

    /* ----- 管理者ページへ戻るボタン ----- */
    setButtonBackAdmin() {
        // CSSクラスで配置設定
        this.buttonBackAdmin.className = "buttonL makequiz backAdmin";

        // テキスト、イベントの設定
        this.buttonBackAdmin.textContent = "タイトルへ戻る";
        this.buttonBackAdmin.addEventListener("click", this.buttonBack_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonBackAdmin);
    }
    // -- 管理者ページへの遷移イベント
    buttonBack_clickEvent() {
        currentScene = new SceneAdmin();
    }

    /* ----- データベースへ追加するボタン ----- */
    setButtonAdd() {
        // CSSクラスで配置設定
        this.buttonAdd.className = "buttonL makequiz addQuizToDB";

        // テキスト、イベントの設定
        this.buttonAdd.textContent = "問題を登録する";
        this.buttonAdd.addEventListener("click", this.buttonAdd_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonAdd);
    }
    // -- データベースへ追加するイベント
    buttonAdd_clickEvent() {
        dbInsert();
    }

    /* ----- 問題文入力欄 ----- */
    setTextAreaQuiz() {
        // CSSクラスで配置設定
        this.textAreaQuiz.className = "makequiz problem";

        // テキストを設定
        this.textAreaQuiz.placeholder = "問題文を入力してください.";

        // シーン画面へ追加
        this.divScene.appendChild(this.textAreaQuiz);
    }

    /* ----- 解答選択肢 ----- */
    setTextAnswer() {
        // CSSクラスで配置設定
        this.textAnswer1.className = "makequiz answer1";
        this.textAnswer2.className = "makequiz answer2";
        this.textAnswer3.className = "makequiz answer3";
        this.textAnswer4.className = "makequiz answer4";

        // テキストを設定
        this.textAnswer1.placeholder = "解答1 正答";
        this.textAnswer2.placeholder = "解答2 誤答";
        this.textAnswer3.placeholder = "解答3 誤答";
        this.textAnswer4.placeholder = "解答4 誤答";

        // シーン画面へ追加
        this.divScene.appendChild(this.textAnswer1);
        this.divScene.appendChild(this.textAnswer2);
        this.divScene.appendChild(this.textAnswer3);
        this.divScene.appendChild(this.textAnswer4);
    }

    /* ----- 解説文 ----- */
    setTextAreaExplanation() {
        // CSSクラスで配置設定
        this.textAreaExplanation.className = "makequiz explanation";

        // テキストを設定
        this.textAreaExplanation.placeholder = "解説文を入力してください.";

        // シーン画面へ追加
        this.divScene.appendChild(this.textAreaExplanation);
    }
}
