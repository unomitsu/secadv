
/* ===== シーン クイズ ===== */
class SceneQuiz extends Scene {
    constructor(qDoc) {
        super();  // 親クラスの読み込み
        this.initialize();

        // qDocのように、コンストラクタの変数にするものは、クイズのジャンル等に関するもの
        // これによって、取得する問題を変更する、予定
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

        // 親クラスの初期設定
        this.setDivScene();
        this.setDivPlayerData();
        this.setDivMainText();
        this.changeBackImage("./asset/images/backdrop.jpg");

        // 初期設定
        this.setButtonQuiz();
        this.setButtonGiveUp();
        this.setQuiz();
    }

    /* -- 出題内容の取得と設定 -- */
    async setQuiz() {
        // DBからデータを取得
        const result = await dbSelectQuizzesAll();

        // もしものデータがない場合の処理
        if (result == null) {
            quizData = {
                id: 0,
                text: "問題分です。正解はどれだろう。",
                choice: ["ans1", "ans2", "ans3", "ans4"],
                answer: "ans1"
            };
        }
        // DBから取得したデータを、グローバル変数に格納
        else {
            quizData['id'] = result[0]['id'];
            quizData['text'] = result[0]['problem'];
            quizData['choice'][0] = result[0]['answer1'];
            quizData['choice'][1] = result[0]['answer2'];
            quizData['choice'][2] = result[0]['answer3'];
            quizData['choice'][3] = result[0]['answer4'];
            quizData['explanation'] = result[0]['explanation'];
        }

        // DBから取得したデータを設定
        this.setMainText(quizData["text"]);
        this.setButtonQuizText(quizData["choice"]);
    }

    /* -- 問題回答ボタン関連の設定 -- */
    setButtonQuiz() {
        for (let i = 0; i < this.buttonQuiz.length; i++) {
            this.buttonQuiz[i].id = i;

            // -- CSSクラスで配置
            // 大きさと配置方法
            this.buttonQuiz[i].className = "quizAnswer";

            // 縦方向の配置
            if (i < 2) { this.buttonQuiz[i].className += " topSide"; }
            else { this.buttonQuiz[i].className += " bottomSide"; }

            //横方向の配置
            if (i % 2 == 0) { this.buttonQuiz[i].className += " leftSide"; }
            else { this.buttonQuiz[i].className += " rightSide"; }

            // -- マウスクリックイベントの設定
            this.buttonQuiz[i].addEventListener("click", this.buttonQuiz_clickEvent, false);

            // 親要素に追加
            this.divScene.appendChild(this.buttonQuiz[i]);
        }
    }
    // -- リザルトシーンへの遷移イベント
    buttonQuiz_clickEvent(qDoc) {
        // コンストラクタの引数に、クリックしたボタンの id を渡す
        currentScene = new SceneResult(this.id);
    }
    // -- 回答ボタンのテキストを設定,  引数は、要素数4の配列
    setButtonQuizText(ansList) {
        for (let i = 0; i < ansList.length; i++) {
            this.buttonQuiz[i].textContent = ansList[i];
        }
    }

    /* ----- ギブアップボタン ----- */
    setButtonGiveUp() {
        // CSSクラスで配置
        this.buttonGiveUp.className = "quizGiveup";

        // テキスト、イベント設定
        this.buttonGiveUp.textContent = "ギブアップ";
        this.buttonGiveUp.addEventListener("click", this.buttonGiveUp_clickEvent, false);

        // 親要素に追加
        this.divScene.appendChild(this.buttonGiveUp);
    }
    // -- タイトルシーンへの遷移イベント
    buttonGiveUp_clickEvent() {
        currentScene = new SceneTitle();
    }
}

