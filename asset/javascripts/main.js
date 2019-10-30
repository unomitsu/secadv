async function secadvMain() {
    // データベースの準備をする
    const res = await dbStartup();

    // タイトルから始める
    currentScene = new SceneTitle();
}

secadvMain();