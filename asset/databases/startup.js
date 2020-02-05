async function dbStartup() {
	/* ===== 問題とシナリオの初期処理 ===== */

    console.log("[BEGIN] TABLE CHECK ...");

    /* ----- 外部制約テーブルの確認 ----- */

    // クイズ分類テーブル
    console.log(" [F]quiz_type check ->", await checkQuizType());
    
    // 画像分類テーブル
    console.log(" [F]image_type check ->", await checkImageType());


    /* ----- 実体テーブルの確認 ----- */
    // クイズテーブル
    console.log(" [ ]quiz check", await checkQuiz());
    
    // シナリオテーブル
    console.log(" [ ]scenario check ->", await checkScenario());
    
    // シナリオセットテーブル
    console.log(" [ ]scenario_set check ->", await checkScenarioSet());
    
    // シナリオ要素テーブル
    console.log(" [ ]scenario_element check ->", await checkScenarioElement());
    
    // 選択肢テーブル
    console.log(" [ ]quiz_answer ->", await checkQuizAnswer());


    /* ----- 関連テーブルの確認 ----- */
    // シナリオセット シナリオ
    console.log(" [R]_scenarioset_scenario check ->", await checkRelationScenariosetScenario());
    
    // シナリオとクイズ
    console.log(" [R]_scenario_quiz check ->", await checkRelationScenarioQuiz());
    
    // 次のシナリオ
    console.log(" [R]_next_scenario1 check ->", await checkRelationNextScenario());

    // クイズと解答選択肢の関連テーブル
    console.log(" [R]_quiz_answer check ->", await checkRelationQuizAnswer());


    /* ----- シナリオと問題の作成 ----- */
    


    console.log("[FINISH] TABLE CHECK !");
}
