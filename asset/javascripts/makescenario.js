/* ===== シナリオ作成ページ ===== */

class SceneMakeScenario extends Scene {
    constructor() {
        super();  // 親クラスの読み込み
        this.initialize();  // 初期処理
    }
    initialize() {
        // タイトル入力欄
        this.inputTitle = document.createElement('input');

        // レベル選択欄
        this.selectLevel = document.createElement('select');

        // 分類選択欄
        this.selectType = document.createElement('select');

        // 画像選択欄
        this.selectImage = document.createElement('select');

        // シナリオ入力欄
        // 引数にIDがある場合は複数追加する
        this.divInputScenario = document.createElement('div');
        this.textareaInputScenario = [document.createElement('textarea')];

        // シナリオ入力欄の追加ボタン
        this.buttonAddScenarioElement = document.createElement('button');

        // DBへのシナリオ追加ボタン
        this.buttonAddScenarioToDB = document.createElement('button');

        // 管理者用ページに戻るボタン
        this.buttonBackAdmin = document.createElement('button');

        // シナリオの仮保持
        this.temporaryScenarioData = [];

        // 親クラス系の各初期設定
        this.setDivScene();
        this.changeBackImage("./asset/images/backdrop.jpg");

        // 各初期設定
        this.setInputTitle();                   // タイトル入力欄
        this.setSelectLevel();                  // レベル選択欄
        this.setSelectType();                   // 分類選択欄
        this.setSelectImage();                  // 画像選択欄
        this.setTextareaInputScenario();        // シナリオ入力欄
        this.setButtonAddScenarioElement();     // シナリオ追加ボタン
        this.setButtonAddScenarioToDB();        // データベースへの登録ボタン
        this.setButtonBackAdmin();              // 管理者画面へ戻るボタン
    }
    /* ----- タイトル入力欄 ----- */
    setInputTitle() {
        // CSSクラスで設定
        this.inputTitle.className = "makescenario";

        // 入力のヒント設定
        this.inputTitle.placeholder = "タイトルを入力してください.";

        // シーン画面へ追加
        this.divScene.appendChild(this.inputTitle);
    }

    /* ----- レベル選択欄 ----- */
    setSelectLevel() {
        // CSSクラスで設定
        this.selectLevel.className = "makescenario left";

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

    /* ----- 分類選択欄 ----- */
    setSelectType() {
        // CSSクラスで配置設定
        this.selectType.className = "makescenario center";

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

    /* ----- 画像選択欄 ----- */
    setSelectImage() {
        // CSSクラスで配置設定
        this.selectImage.className = "makescenario right";

        // 選択肢を設定
        // 要素を宣言する
        let option = document.createElement("option");

        // テキストと値を設定する
        option.text = "教室";
        option.value = 1;

        // selectLevelタグの子要素に追加する
        this.selectImage.appendChild(option);

        // シーン画面へ追加
        this.divScene.appendChild(this.selectImage);
    }

    /* ----- シナリオ入力欄 ----- */
    setTextareaInputScenario() {
        // divの設定
        // CSSクラスで配置
        this.divInputScenario.className = "makescenario";

        // シーン画面へ追加
        this.divScene.appendChild(this.divInputScenario);

        // CSSクラスで位置
        this.textareaInputScenario[0].className = "makescenario";
        // 入力のヒント
        this.textareaInputScenario[0].placeholder = "シナリオを入力してください.";
        // 入力内容取得用のid設定
        this.textareaInputScenario[0].id = "inputScenario";
        // シーン画面へ追加
        this.divInputScenario.appendChild(this.textareaInputScenario[0]);
    }
    
    /* ----- シナリオ入力欄の追加ボタン ----- */
    setButtonAddScenarioElement() {
        // CSSクラスで配置
        this.buttonAddScenarioElement.className = "buttonL makescenario addTemporaryScenario";

        // テキスト、イベント設定
        this.buttonAddScenarioElement.textContent = "要素を増やす";
        this.buttonAddScenarioElement.addEventListener('click', this.buttonAddScenarioElement_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonAddScenarioElement);
    }

    // -- シナリオ入力欄の追加イベント
    buttonAddScenarioElement_clickEvent() {
        // 挿入するテキストエリアの作成
        var textarea = document.createElement('textarea');

        // CSSクラスで設定
        textarea.className = "makescenario";
        
        // 入力のヒント
        textarea.placeholder = "シナリオを入力してください.";

        // 入力内容取得用のid設定
        textarea.id = "inputScenario";

        // ゲーム画面へ追加
        currentScene.divInputScenario.appendChild(textarea);

        // シナリオ入力欄配列への追加
        currentScene.textareaInputScenario.push(textarea);
    }

    /* ----- DBへのシナリオ追加ボタン ----- */
    setButtonAddScenarioToDB() {
        // CSSクラスで配置
        this.buttonAddScenarioToDB.className = "buttonL makescenario addScenarioToDB";

        // テキスト、イベント設定
        this.buttonAddScenarioToDB.textContent = "シナリオ登録を完了";
        this.buttonAddScenarioToDB.addEventListener('click', this.buttonAddScenarioToDB_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonAddScenarioToDB)
    }
    // -- DBへのシナリオ追加
    async buttonAddScenarioToDB_clickEvent() {
        /* 入力データの確認 */
        // タイトルが空欄でないか
        // テキストが空欄でないか？

        let scenarioId; // シナリオID保持用

        // シナリオタイトルの挿入、シナリオのIDが返される
        await insertScenario(
            currentScene.inputTitle.value,
            currentScene.selectLevel.value,
            currentScene.selectType.value,
            currentScene.selectImage.value
        ).then((res) => {
            scenarioId = res["max(id)"];
            console.log("scenarioId -> ", res);
        });

        // 挿入の確認
        getTableDataWhereAll("scenario", `id = ${scenarioId}`).then(res => {
            console.log(res);
        });

        // シナリオ要素の挿入
        console.log(currentScene.textareaInputScenario.length);

        // シナリオ追加、INSERTを仮保持配列分ループ
        for (let i = 0; i < currentScene.textareaInputScenario.length; i++) {
            await insertScenarioElement(scenarioId, currentScene.textareaInputScenario[i].value, i+1);
        }
        
    }

    /* ----- 管理者用ページに戻るボタン ------ */
    setButtonBackAdmin() {
        // CSSクラスで配置
        this.buttonBackAdmin.className = "buttonL makescenario backAdmin";

        // テキスト、イベント設定
        this.buttonBackAdmin.textContent = "管理者用ページに戻る";
        this.buttonBackAdmin.addEventListener('click', this.buttonBackAdmin_clickEvent, false);

        // シーン画面へ追加
        this.divScene.appendChild(this.buttonBackAdmin);
    }
    // -- 管理者用ページに戻るイベント
    buttonBackAdmin_clickEvent() {
        currentScene = new SceneAdmin();
    }

}
