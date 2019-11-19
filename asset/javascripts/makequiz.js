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

        // タイトル入力欄
        this.inputTitle = document.createElement('input');

        // レベル入力欄
        this.selectLevel = document.createElement('select');

        // 分類入力欄
        this.selectType = document.createElement('select');

        // 問題文入力欄
        this.textAreaQuiz = document.createElement('textarea');

        // 解答選択肢入力欄
        this.inputAnswer1 = document.createElement('input');
        this.inputAnswer2 = document.createElement('input');
        this.inputAnswer3 = document.createElement('input');
        this.inputAnswer4 = document.createElement('input');

        // 解説文入力欄
        this.textAreaExplanation = document.createElement('textarea');

        // 親クラス系の初期設定
        this.setDivScene();

        // 各初期設定
        this.setButtonBackAdmin();
        this.setInputTitle();
        this.setSelectLevel();
        this.setSelectType();
        this.setTextAreaQuiz();
        this.setInputAnswer();
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

    /* ----- タイトル入力欄 ----- */
    setInputTitle() {
        // CSSクラスで配置設定
        this.inputTitle.className = "makequiz title";

        // テキストを設定
        this.inputTitle.placeholder = "タイトルを入力してください.";

        // シーン画面へ追加
        this.divScene.appendChild(this.inputTitle);
    }

    /* ----- レベル入力欄 ----- */
    setSelectLevel() {
        // CSSクラスで配置設定
        this.selectLevel.className = "makequiz level";

        // 選択肢を設定
        for (let i = 1; i <= 5; i++) {
            // 要素を宣言する
            let option = document.createElement("option");

            // テキストと値を設定する
            option.text = i;
            option.value = i;

            // selectLevelタグの子要素に追加する
            this.selectLevel.appendChild(option);
        }

        // シーン画面へ追加
        this.divScene.appendChild(this.selectLevel);
    }

    /* ----- 分類入力欄 ----- */
    setSelectType() {
        // CSSクラスで配置設定
        this.selectType.className = "makequiz type";

        // 選択肢を設定
        // 要素を宣言する
        let option = document.createElement("option");

        // テキストと値を設定する
        option.text = "CRYPTO";
        option.value = 1;

        // selectLevelタグの子要素に追加する
        this.selectType.appendChild(option);

        // シーン画面へ追加
        this.divScene.appendChild(this.selectType);
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
    setInputAnswer() {
        // CSSクラスで配置設定
        this.inputAnswer1.className = "makequiz answer1";
        this.inputAnswer2.className = "makequiz answer2";
        this.inputAnswer3.className = "makequiz answer3";
        this.inputAnswer4.className = "makequiz answer4";

        // テキストを設定
        this.inputAnswer1.placeholder = "解答1 正答";
        this.inputAnswer2.placeholder = "解答2 誤答";
        this.inputAnswer3.placeholder = "解答3 誤答";
        this.inputAnswer4.placeholder = "解答4 誤答";

        // シーン画面へ追加
        this.divScene.appendChild(this.inputAnswer1);
        this.divScene.appendChild(this.inputAnswer2);
        this.divScene.appendChild(this.inputAnswer3);
        this.divScene.appendChild(this.inputAnswer4);
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
