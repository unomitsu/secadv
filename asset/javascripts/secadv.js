var advFrame = document.getElementById('adv');

function appendScript(url) {
    var jsf = document.createElement('script');
    jsf.src = url;
    advFrame.appendChild(jsf);
}

// import javascript
// tmp -- appendScript("./asset/javascripts/.js");
appendScript("./asset/javascripts/data.js");
appendScript("./asset/javascripts/scene.js");
appendScript("./asset/javascripts/title.js");
appendScript("./asset/javascripts/scenario.js");
appendScript("./asset/javascripts/quiz.js");
appendScript("./asset/javascripts/result.js");
appendScript("./asset/javascripts/select.js");
appendScript("./asset/javascripts/main.js");
