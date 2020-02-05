
var QUIZ_BUTTON_NUM = 4;

/* ===== シーン クイズ ===== */
class SceneQuiz extends Scene {
    /*
     * flag : 問題を読込かどうか
    */ 
    constructor(flag) {
        console.log(">>> SCENE QUIZ");

        super();  // 親クラスの読み込み
        this.initialize(flag);
    }
    async initialize(flag) {
        // 親クラスの初期設定
        this.setDivScene();
        this.setDivPlayerData();

       // 問題のデータを取得
        if (flag) {
            await this.setQuiz();
        }

        // クイズ！のセット
        this.setQuizAnimation();

        // 一定時間後に、問題を設定
        setTimeout(function () {
            currentScene.setDivMainText();                      // テキスト入力欄セット
            currentScene.setMainText(g_quiz["problem"]);        // 取得した問題文を問題テキストに設定

            currentScene.setButtonQuiz();                       // 解答ボタンセット
        }, 500);
    }

    /* -- 出題内容の取得と設定 -- */
    async setQuiz() {
        let qid, quiz, choices;

        // シナリオの対応するクイズのIDが必要、クリア後の場合はランダムにIDを設定する
        if (g_gameState == 0) {
            await selectRelationScenarioQuiz(g_scenario).then(res => {
                // 対応するデータがある場合
                if (res.length > 0) {
                    qid = res["0"]["id_quiz"];
                }
                // ない場合はランダム
                else {
                    qid = Math.floor(1 + Math.random() * 5);
                }
            });
        }
        else {
            qid = Math.floor(1 + Math.random() * 5);
        }

        // クイズのデータ取得
        await selectQuiz(qid).then(res => {
            quiz = res;
        });

        // クイズの選択肢を取得
        await selectQuizAnswer(qid).then(res => {
            choices = res;
        });
        
        // DBから取得したデータを、グローバル変数に格納
        try {
            // 問題データの格納
            g_quiz['id'] = quiz[0]['id'];
            g_quiz['problem'] = quiz[0]['problem'];
            g_quiz['explanation'] = quiz[0]['explanation'];

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
            // 選択肢の格納
            for (let i = 0; i < QUIZ_BUTTON_NUM; i++) {
                g_quiz['choice'][i] = choices[i]['answer'];
                g_quiz['description'][i] = choices[i]['description'];
                g_quiz['answer'][i] = choices[i]['flag'];
            }
        }
        catch {
            g_quiz = {
                id: 0,
                text: "問題文の取得に失敗しました。",
                choice: ["誤答", "正答", "誤答", "誤答"],
                description: ["誤答です", "正答です", "誤答です", "誤答です"],
                answer: [0, 1, 0, 0],
                explanation: "エラーが発生しました。"
            };
        }
        console.log("id_quiz : ", g_quiz["id"]);
    }

    /* -- 問題回答ボタン関連の設定 -- */
    setButtonQuiz() {
        for (let i = 0; i < QUIZ_BUTTON_NUM; i++) {
            let button = document.createElement('button');

            // -- 正誤判定関連
            button.id = i;                              // id設定
            button.textContent = g_quiz['choice'][i];   // テキスト設定

            // -- CSSクラスで配置
            // 大きさと配置方法
            button.className = "quizAnswer";

            // 縦方向の配置
            if (i < 2) { button.className += " topSide"; }
            else { button.className += " bottomSide"; }

            //横方向の配置
            if (i % 2 == 0) { button.className += " leftSide"; }
            else { button.className += " rightSide"; }

            // -- マウスクリックイベントの設定
            button.addEventListener("click", this.buttonQuiz_clickEvent, false);

            // 親要素に追加
            this.divScene.appendChild(button);
        }
    }
    // -- リザルトシーンへの遷移イベント
    buttonQuiz_clickEvent() {
        g_playerAnswer = this.id;
        currentScene = new SceneResult();
    }

    /* ----- クイズに入ったことを知らせる ----- */
    setQuizAnimation() {
        let pQuiz = document.createElement('p');

        // テキストの設定
        pQuiz.textContent = "クイズ！";

        // CSSクラスによる配置設定
        pQuiz.className = "quizAnimation";

        // ゲーム画面への追加
        this.divScene.appendChild(pQuiz);
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

