async function dbStartup() {
	/* ----- 問題とシナリオの初期処理 ----- */

    console.log("[BEGIN] TABLE CHECK ...");

    // クイズテーブルの確認
    const resultQuizzes = await checkQuizzes();
    console.log("table.quizzes check ->", resultQuizzes);

    // シナリオテーブルの確認
    const resultScenarios = await checkScenarios();
    console.log("table.scenarios check ->", resultScenarios);

    console.log("[FINISH] TABLE CHECK !");
}
