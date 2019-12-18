
var QUIZ_BUTTON_NUM = 4;

/* ===== シーン クイズ ===== */
class SceneQuiz extends Scene {
    /*
     * flag : 問題を読込かどうか
     * 
    */ 
    constructor(flag) {
        console.log("[BEGIN] SceneQuiz load...");
        currentSceneName = "QUIZ";

        super();  // 親クラスの読み込み
        this.initialize(flag);

        // qDocのように、コンストラクタの変数にするものは、クイズのジャンル等に関するもの
        // これによって、取得する問題を変更する、予定
    }

    // -- 初期化
    async initialize(flag) {
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

        // 初期設定
        this.setButtonQuiz();
        this.setButtonGiveUp();

        if (flag) {
            await this.setQuiz();       // 問題のデータを取得
        }

        this.setMainText(quizData["problem"]);          // 取得した問題文を問題テキストに設定
        this.setButtonQuizText(quizData["choice"]);     // 取得した選択肢をボタンに設定

        console.log("[FINISH] SceneQuiz !");
    }

    /* -- 出題内容の取得と設定 -- */
    async setQuiz() {
        // シナリオの対応するクイズのIDが必要
        let qid = g_gameState == 0 ? scenarioID : Math.floor(1 + Math.random() * 5);
        console.log("QUIZ_ID => ", qid);

        // クイズのデータ取得
        const quiz = await dbSelectWhereAll('quiz', `id = ${qid}`);

        // クイズの選択肢を取得
        const choices = await dbSelectWhereAll('quiz_answer, relation_quiz_answer', `relation_quiz_answer.id_quiz = ${qid} AND quiz_answer.id = relation_quiz_answer.id_answer`);
        
        // もしものデータがない場合の処理
        if (quiz == null) {
            quizData = {
                id: 0,
                text: "問題文の取得に失敗しました。",
                choice: ["誤答", "正答", "誤答", "誤答"],
                answer: 1,
                explanation: "エラーが発生しました。"
            };
        }
        // DBから取得したデータを、グローバル変数に格納
        else {
            // 問題データの格納
            quizData['id'] = quiz[0]['id'];
            quizData['problem'] = quiz[0]['problem'];
            quizData['explanation'] = quiz[0]['explanation'];

            // 選択肢配列の並び替え
            for (let i = 0; i < choices.length; i++) {
                //入れ替え先を決定する
                let num = Math.floor(Math.random() * choices.length);
                
                // 現在の添字と入れ替え先が同じでなければ入れ替える
                if (i != num) {
                    let tmp = choices[num];
                    choices[num] = choices[i];
                    choices[i] = tmp;
                }
            }

            /*
             *  頭から4つとるとしたら、正答が頭の方にないとだめ
             *  な処理がいるかもしれない
            */
            
            // 選択肢配列の並び替え
            for (let i = 0; i < QUIZ_BUTTON_NUM; i++) {
                // 正答の選択肢の場合、正答 id を格納
                if (choices[i]['flag'] == 1) { quizData['answer'] = i;}

                // 選択肢の格納
                quizData['choice'][i] = choices[i]['answer'];
            }
        }
        console.log("quizData -> ", quizData);
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

            // -- 正誤判定に使うための id の設定
            this.buttonQuiz[i].id = i;

            // -- マウスクリックイベントの設定
            this.buttonQuiz[i].addEventListener("click", this.buttonQuiz_clickEvent, false);

            // 親要素に追加
            this.divScene.appendChild(this.buttonQuiz[i]);
        }
    }
    // -- リザルトシーンへの遷移イベント
    buttonQuiz_clickEvent(qDoc) {
        playerAnswer = this.id;
        currentScene = new SceneResult();
    }
    // -- 回答ボタンのテキストを設定,  引数は、要素数4の配列
    setButtonQuizText(ansList) {
        for (let i = 0; i < QUIZ_BUTTON_NUM; i++) {
            this.buttonQuiz[i].textContent = quizData['choice'][i];
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

