
// secadv‚ÌƒQ[ƒ€‰æ–Ê‚Ì˜g
var advFrame = document.getElementById('adv');

// sdvFrame ‚ğ‰Šú‰»A‰æ–Ê‚ğ‚Ü‚Á‚³‚ç‚É‚·‚é
function clearSceneAll() {
    advFrame.innerHTML = "";
}

// javascript ‚ğHTML‚É’Ç‰Á
function appendScript(url) {
    var jsf = document.createElement('script');
    jsf.src = url;
    advFrame.appendChild(jsf);
}

// import javascript
appendScript("./asset/databases/newtable.js");
appendScript("./asset/databases/startup.js");
appendScript("./asset/databases/insert.js");
appendScript("./asset/databases/select.js");

appendScript("./asset/javascripts/scene.js");
appendScript("./asset/javascripts/data.js");
appendScript("./asset/javascripts/scenarioselect.js");
appendScript("./asset/javascripts/title.js");
appendScript("./asset/javascripts/scenario.js");
appendScript("./asset/javascripts/quiz.js");
appendScript("./asset/javascripts/result.js");
appendScript("./asset/javascripts/select.js");
appendScript("./asset/javascripts/continue.js");
appendScript("./asset/javascripts/home.js");
appendScript("./asset/javascripts/main.js");

appendScript("./asset/javascripts/admin.js");
appendScript("./asset/javascripts/makequiz.js");
appendScript("./asset/javascripts/makescenario.js");

