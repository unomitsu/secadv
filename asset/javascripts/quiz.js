
var QUIZ_BUTTON_NUM = 4;

/* ===== シーン クイズ ===== */
class SceneQuiz extends Scene {
    constructor(qDoc) {
        console.log("[BEGIN] SceneQuiz load...");
        currentSceneName = "QUIZ";

        super();  // 親クラスの読み込み
        this.initialize();

        // qDocのように、コンストラクタの変数にするものは、クイズのジャンル等に関するもの
        // これによって、取得する問題を変更する、予定
    }
    // -- 初期化
    async initialize() {
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
        await this.setQuiz();

        console.log("[FINISH] SceneQuiz !");
    }

    /* -- 出題内容の取得と設定 -- */
    async setQuiz() {
        // シナリオの対応するクイズのIDが必要
        let idid = scenariosID[0]["id"];

        // クイズのデータ取得
        const ccc = await dbSelectWhereAll('quiz', `id = ${idid}`);
        console.log(ccc);
        console.log(ccc[0]["id"]);

        // クイズの選択肢のIDを取得
        const aaa = await dbSelectWhereAll('relation_quiz_answer', `id_quiz = ${idid}`);

        // 正答IDを1つ, 誤答IDを3つ取得
        let quizID = aaa;
        console.log(aaa);
        // 選択肢のテキストを取得
        const bbb = await dbSelectWhereAll('quiz_answer', `id = ${aaa[0]["id_answer"]} OR id = ${aaa[1]["id_answer"]} OR id = ${aaa[2]["id_answer"]} OR id = ${aaa[3]["id_answer"]}`);
        console.log(bbb);

        // もしものデータがない場合の処理
        if (aaa == null) {
            quizData = {
                id: 0,
                text: "問題分です。正解はどれだろう。",
                choice: ["ans1", "ans2", "ans3", "ans4"],
                answer: "ans1",
                explanation: "解説だよ"
            };
        }
        // DBから取得したデータを、グローバル変数に格納
        else {
            console.log(quizData);
            quizData['id'] = ccc[0]['id'];
            quizData['problem'] = ccc[0]['problem'];
            quizData['answer'][0] = bbb[0]['answer'];
            quizData['answer'][1] = bbb[1]['answer'];
            quizData['answer'][2] = bbb[2]['answer'];
            quizData['answer'][3] = bbb[3]['answer'];
            quizData['explanation'] = ccc[0]['explanation'];
            console.log(quizData);
        }

        console.log("WWW");

        // DBから取得したデータを設定
        this.setMainText(quizData["problem"]);
        this.setButtonQuizText(quizData["choice"]);
    }

    /* -- 問題回答ボタン関連の設定 -- */
    setButtonQuiz() {
        for (let i = 0; i < QUIZ_BUTTON_NUM; i++) {
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
        quizPlayerAnswer = this.textContent;
        currentScene = new SceneResult();
    }
    // -- 回答ボタンのテキストを設定,  引数は、要素数4の配列
    setButtonQuizText(ansList) {
        for (let i = 0; i < QUIZ_BUTTON_NUM; i++) {
            this.buttonQuiz[i].textContent = quizData['answer'][i];
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

