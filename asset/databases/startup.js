async function dbStartup() {
	/* ===== 問題とシナリオの初期処理 ===== */

    console.log("[BEGIN] TABLE CHECK ...");

    /* ----- 外部制約テーブルの確認 ----- */

    // クイズ分類テーブル
    console.log("table.quiz_type check ->", await checkQuizType());

    console.log("-> ");

    // 状況分類テーブル
    console.log("table.situation_type check ->", await checkSituationType());

    console.log("-> ");

    // 画像分類テーブル
    console.log("table.image_type check ->", await checkImageType());

    console.log("-> ");


    /* ----- 実体テーブルの確認 ----- */
    // クイズテーブル
    console.log("quiz check", await checkQuiz());

    console.log("-> ");

    // シナリオセットテーブル
    console.log("table.scenario_set check ->", await checkScenarioSet());

    console.log("-> ");

    // シナリオテーブル
    console.log("table.scenario check ->", await checkScenario());

    console.log("-> ");

    // シナリオ要素テーブル
    console.log("table.scenario_element check ->", await checkScenarioElement());

    console.log("-> ");

    // 選択肢テーブル
    console.log("table.quiz_answer ->", await checkQuizAnswer());

    console.log("-> ");


    /* ----- 関連テーブルの確認 ----- */

    // シナリオセット シナリオ
    console.log("table.relation_scenarioset_scenario check ->", await checkRelationScenariosetScenario());

    console.log("-> ");

    // シナリオとクイズ
    console.log("table.relation_scenario_quiz check ->", await checkRelationScenarioQuiz());

    console.log("-> ");

    // 次のシナリオ
    console.log("table.relation_quiz_answer check ->", await checkRelationNextScenario());

    console.log("-> ");

    // クイズと解答選択肢の関連テーブル
    console.log("table.relation_quiz_answer check ->", await checkRelationQuizAnswer());

    console.log("-> ");

    /* ----- シナリオと問題の作成 ----- */



    console.log("[FINISH] TABLE CHECK !");
}
