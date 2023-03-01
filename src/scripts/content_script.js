import { testTweetTimeLine, testInputTweet } from "../api/api"
import Article from "../model/article";
import '../popup/scss/style.scss'

window.addEventListener('load', function () {
    console.log("hello")
    tweet_text(this.window);
    test_edition(this.window);

})
// ******************************************part I*****************************************************************
function tweet_text(page) {
    let list_ids = []
    let list_articles = []
    let last_index = -1;
    console.log("Extension is loading...")
    page.setTimeout(async function () {
        console.log("load is done")
        // part 1 before scroll
        const articles = document.getElementsByTagName("article");
        for (let i = 0; i < articles.length; i++) {
            if (articles[i].querySelector('[data-testid="tweetText"]') != undefined) {
                try {
                    let tweet_id = articles[i].querySelector('[data-testid="tweetText"]').getAttribute("id")
                    let a;
                    if (!list_ids.includes(tweet_id)) {
                        list_ids.push(tweet_id);
                        a = new Article(tweet_id,
                            articles[i].querySelector('[data-testid="User-Names"]').getElementsByTagName('time')[0].parentElement.getAttribute('href'),
                            document.getElementById(tweet_id).innerText,
                            articles[i].querySelector('[data-testid="User-Names"]').innerText.split("\n")[0],
                            articles[i].querySelector('[data-testid="User-Names"]').innerText.split("\n")[1],
                            articles[i].querySelector('[data-testid="User-Names"]').getElementsByTagName('time')[0].getAttribute('datetime'),
                            articles[i].querySelector('[data-testid="like"]').innerText,
                            articles[i].querySelector('[data-testid="reply"]').innerText,
                            articles[i].querySelector('[data-testid="retweet"]').innerText)
                        list_articles.push(a);
                        let button = document.createElement("Button");
                        button.innerHTML = "?";
                        button.classList.add("btn");
                        button.classList.add("btn-outline-primary");
                        button.setAttribute("id", "btn_fk_" + tweet_id)
                        button.setAttribute("type", "button")
                        let div_result = document.createElement('div')
                        div_result.setAttribute("id", "div_fk_" + tweet_id)
                        div_result.style = "top:6%;right:-3%;position:fixed;--bs-btn-font-weight:950";
                        div_result.appendChild(button);
                        document.getElementById(tweet_id).appendChild(div_result)
                    }
                } catch (error) { }
            }
        }
        await testTweetTimeLine(list_articles);
        last_index = list_articles.length - 1;
        // part 2 scroll event
        try {
            page.onscroll = async function () {
                if (page.oldScroll > page.scrollY) {
                    // true up
                    // console.log("scroll up")
                } else {
                    //false down
                    const articles = document.getElementsByTagName("article");
                    for (let i = 0; i < articles.length; i++) {
                        if (articles[i].querySelector('[data-testid="tweetText"]') != undefined) {
                            let tweet_id = articles[i].querySelector('[data-testid="tweetText"]').getAttribute("id")
                            let a;
                            if (!list_ids.includes(tweet_id)) {
                                list_ids.push(tweet_id);
                                a = new Article(tweet_id,
                                    articles[i].querySelector('[data-testid="User-Names"]').getElementsByTagName('time')[0].parentElement.getAttribute('href'),
                                    document.getElementById(tweet_id).innerText,
                                    articles[i].querySelector('[data-testid="User-Names"]').innerText.split("\n")[0],
                                    articles[i].querySelector('[data-testid="User-Names"]').innerText.split("\n")[1],
                                    articles[i].querySelector('[data-testid="User-Names"]').getElementsByTagName('time')[0].getAttribute('datetime'),
                                    articles[i].querySelector('[data-testid="like"]').innerText,
                                    articles[i].querySelector('[data-testid="reply"]').innerText,
                                    articles[i].querySelector('[data-testid="retweet"]').innerText)
                                list_articles.push(a);

                                let button = document.createElement("Button");
                                button.innerHTML = "?";
                                button.classList.add("btn");
                                button.classList.add("btn-outline-primary");
                                button.setAttribute("id", "btn_fk_" + tweet_id)
                                button.setAttribute("type", "button")
                                let div_result = document.createElement('div')
                                div_result.setAttribute("id", "div_fk_" + tweet_id)
                                div_result.style = "top:6%;right:-3%;position:fixed;--bs-btn-font-weight:950";
                                div_result.appendChild(button);
                                document.getElementById(tweet_id).appendChild(div_result)
                            }
                        }
                    }
                    await testTweetTimeLine(list_articles.slice(last_index + 1));
                    last_index = list_articles.length - 1;
                }
                page.oldScroll = page.scrollY;
            }
        } catch (error) { }
    }, 7000);

}
// ******************************part II*******************************************************************
function test_edition(page) {
    if (location.href == "https://twitter.com/home") {
        page.setTimeout(() => {
            try {
                createBtnTest()
                inputObserver();
            } catch (error) {}
        }, 5000);
    }
}
async function btn_test_edition() {
    let text = document.querySelector('[data-text="true"]').innerHTML;
    console.log(text)
    if (text != "") {
        let article = new Article("test_input", text, "me", 0, 0, 0)
        await testInputTweet(article)
    }
}
function inactiveBtnTest() {
    let btn = document.getElementById("test_tweet");
    btn.disabled = true;
}
function activeBtnTest() {
    let btn = document.getElementById("test_tweet");
    btn.disabled = false;
}
function createBtnTest() {
    let button = document.createElement("Button");
    button.innerHTML = "Test";
    button.setAttribute("id", "test_tweet")
    button.setAttribute("type", "button")
    button.classList.add('btn')
    button.classList.add('btn-primary')
    button.classList.add('btn_detect')
    button.addEventListener("click", btn_test_edition, false);
    document.querySelector('[role="progressbar"]').parentElement.appendChild(button);
    let inputTxt = document.querySelector('[data-text="true"]');
    inputTxt.innerHTML != "" ? activeBtnTest() : inactiveBtnTest();
}
function inputObserver() {
    let oldtxt = ''
    let inputTxt = document.querySelector('[data-text="true"]').parentElement;
    let el = document.querySelector('[data-testid="tweetButtonInline"]');
    setInterval(() => {
        if (el.getAttribute("aria-disabled") == "true") {
            inactiveBtnTest()
        } else {
            if(inputTxt.firstChild.innerHTML != oldtxt){
                document.getElementById("test_tweet").remove()
                createBtnTest()
                oldtxt = inputTxt.firstChild.innerHTML ;
            }else{
                activeBtnTest()
            }
        }
    }, 500)
}



