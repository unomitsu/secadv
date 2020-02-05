async function secadvMain() {
    // データベースの準備をする
    await dbStartup();

    // タイトルから始める
    currentScene = new SceneTitle();
}

secadvMain();