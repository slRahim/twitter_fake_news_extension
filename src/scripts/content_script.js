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
        try {
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
                        // button.addEventListener("click", function () {
                        //     document.getElementById('btn_fk_' + tweet_id).disabled = true;
                        //     testTweetTimeLine([a]);

                        // }, false)

                        let div_result = document.createElement('div')
                        div_result.setAttribute("id", "div_fk_" + tweet_id)
                        div_result.style = "top:6%;right:-3%;position:fixed;--bs-btn-font-weight:950";
                        div_result.appendChild(button);
                        document.getElementById(tweet_id).appendChild(div_result)
                    }
                }


            }
            await testTweetTimeLine(list_articles);
            last_index = list_articles.length - 1;
        } catch (error) {

        }


        // part 2 scroll event
        try {
            page.onscroll = async function () {
                if (page.oldScroll > page.scrollY) {
                    // true up
                    console.log("scroll up")
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
                                // button.addEventListener("click", function () {
                                //     document.getElementById('btn_fk_' + tweet_id).disabled = true;
                                //     testTweetTimeLine([a]);

                                // }, false)

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
        } catch (error) {

        }


    }, 7000);


}

// ******************************part II*******************************************************************
function test_edition(page) {
    if (location.href == "https://twitter.com/home") {
        page.setTimeout(() => {
            inputObserver();
            createBtnTest()
        }, 5000);
    }
}

// function createLabelResult() {
//     let label = document.createElement("span");
//     label.innerHTML = "Result";
//     label.setAttribute("id", "Result_Tweet")
//     label.classList.add('label_result')
//     let btn = document.getElementById('Test_News');
//     document.querySelector('[role="progressbar"]').parentElement.insertBefore(label, btn);


//     //var inputTxt = document.querySelector('[data-text="true"]');
//     //inputTxt.innerHTML != "" ? activeBtnTest() : inactiveBtnTest();
// }

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
    let inputTxt = document.querySelector('[data-text="true"]').parentElement;
    let observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            inputTxt.children[0].innerHTML != "" ? activeBtnTest() : inactiveBtnTest();
        });
    });

    let config = { attributes: true, childList: true, characterData: true };
    observer.observe(inputTxt, config);
}



