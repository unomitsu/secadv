async function dbStartup() {
	/* ===== 問題とシナリオの初期処理 ===== */

    console.log("[BEGIN] TABLE CHECK ...");

    /* ----- 外部制約テーブルの確認 ----- */

    // クイズ分類テーブル
    const resultQuizType = await checkQuizType();
    console.log("table.quiz_type check ->", resultQuizType);

    // 状況分類テーブル
    const resultSituationType = await checkSituationType();
    console.log("table.situation_type check ->", resultSituationType);

    // 画像分類テーブル
    const resultImageType = await checkImageType();
    console.log("table.image_type check ->", resultImageType);


    /* ----- 実体テーブルの確認 ----- */
    // クイズテーブル
    const resultQuiz = await checkQuiz();
    console.log("table.quiz check ->", resultQuiz);

    // シナリオセットテーブル
    const resultScenarioSet = await checkScenarioSet();
    console.log("table.scenario_set check ->", resultScenarioSet);

    // シナリオテーブル
    const resultScenario = await checkScenario();
    console.log("table.scenario check ->", resultScenario);

    // シナリオ要素テーブル
    const resultScenarioElement = await checkScenarioElement();
    console.log("table.scenario_element check ->", resultScenarioElement);

    // 選択肢テーブル
    const resultQuizAnswer = await checkQuizAnswer();
    console.log("table.quiz_answer ->", resultQuizAnswer);


    /* ----- 関連テーブルの確認 ----- */

    // シナリオセット シナリオ
    const resultRelationScenariosetScenario = await checkRelationScenariosetScenario();
    console.log("table.relation_scenarioset_scenario check ->", resultRelationScenariosetScenario);

    // シナリオとクイズ
    const resultRelationScenarioQuiz = await checkRelationScenarioQuiz();
    console.log("table.relation_scenario_quiz check ->", resultRelationScenarioQuiz);
    
    // クイズと解答選択肢の関連テーブル
    const resultRelationQuiztAnswer = await checkRelationQuizAnswer();
    console.log("table.relation_quiz_answer check ->", resultRelationQuiztAnswer);

    console.log("[FINISH] TABLE CHECK !");
}
