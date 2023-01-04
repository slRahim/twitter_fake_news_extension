import { sendTweet } from "../api/api"
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

    page.setTimeout(function () {
        console.log("load is done")
        // part 1 before scroll
        const articles = document.getElementsByTagName("article");
        for (let i = 0; i < articles.length; i++) {
            let tweet_id = articles[i].querySelector('[data-testid="tweetText"]').getAttribute("id")
            let a;
            if (!list_ids.includes(tweet_id)) {
                list_ids.push(tweet_id);
                a = new Article(tweet_id,
                    document.getElementById(tweet_id).firstChild.innerText,
                    articles[i].querySelector('[data-testid="User-Names"]').innerText,
                    articles[i].querySelector('[data-testid="app-text-transition-container"]>span').innerText,
                    articles[i].querySelector('[data-testid="reply"]>div').innerText,
                    articles[i].querySelector('[data-testid="retweet"]>div').innerText)
                list_articles.push(a);

                let button = document.createElement("Button");
                button.innerHTML = "?";
                button.classList.add("btn");
                button.classList.add("btn-outline-primary");
                button.style = "top:6%;right:6%;position:fixed;--bs-btn-font-weight:950";
                button.setAttribute("id", "btn_fk_" + tweet_id)
                button.setAttribute("type", "button")
                button.addEventListener("click", function () {
                    document.getElementById('btn_fk_' + tweet_id).disabled = true;
                    sendTweet([a]);
    
                }, false)

                let div_result = document.createElement('div')
                div_result.setAttribute("id", "div_fk_" + tweet_id)
                div_result.appendChild(button);
                document.getElementById(tweet_id).appendChild(div_result)
            }

        }
        // sendTweet(list_articles);
        // last_index = list_articles.length - 1;

        // part 2 scroll event
        page.onscroll = function () {
            if (page.oldScroll > page.scrollY) {
                // true up
                console.log("scroll up")
            } else {
                //false down
                const articles = document.getElementsByTagName("article");
                for (let i = 0; i < articles.length; i++) {
                    let tweet_id = articles[i].querySelector('[data-testid="tweetText"]').getAttribute("id")
                    let a;
                    if (!list_ids.includes(tweet_id)) {
                        list_ids.push(tweet_id);
                        a = new Article(tweet_id,
                            document.getElementById(tweet_id).firstChild.innerText,
                            articles[i].querySelector('[data-testid="User-Names"]').innerText,
                            articles[i].querySelector('[data-testid="app-text-transition-container"]>span').innerText,
                            articles[i].querySelector('[data-testid="reply"]>div').innerText,
                            articles[i].querySelector('[data-testid="retweet"]>div').innerText)
                        list_articles.push(a);

                        let button = document.createElement("Button");
                        button.innerHTML = "?";
                        button.classList.add("btn");
                        button.classList.add("btn-outline-primary");
                        button.style = "top:6%;right:6%;position:fixed;--bs-btn-font-weight:950";
                        button.setAttribute("id", "btn_fk_" + tweet_id)
                        button.setAttribute("type", "button")
                        button.addEventListener("click", function () {
                            document.getElementById('btn_fk_' + tweet_id).disabled = true;
                            sendTweet([a]);
                        
                        }, false)

                        let div_result = document.createElement('div')
                        div_result.setAttribute("id", "div_fk_" + tweet_id)
                        div_result.appendChild(button);
                        document.getElementById(tweet_id).appendChild(div_result)
                    }
                }
                // sendTweet(list_articles.slice(last_index + 1));
                // last_index = list_articles.length - 1;

            }
            page.oldScroll = page.scrollY;
        }

    }, 7000);


}

// ******************************part II*******************************************************************
function test_edition(page) {
    if (location.href == "https://twitter.com/home") {
        page.setTimeout(() => {
            inputObserver();
            createBtnTest();
            var href = location.href;
            document.body.addEventListener('click', () => {
                requestAnimationFrame(() => {
                    console.log(href + "88888888" + location.href);
                    if (location.href != href && location.href == "https://twitter.com/home") {
                        createBtnTest();
                        inputObserver();
                    }
                    href = location.href;
                });
            }, true);

        }, 5000);
    }


}

function btn_test_edition() {
    var text = document.querySelector('[data-text="true"]').innerHTML;
    if (text != "") alert(text);
}

function inactiveBtnTest() {
    let btn = document.getElementById("Test_News");
    btn.classList.add('btn_inactive')
}

function activeBtnTest() {
    let btn = document.getElementById("Test_News");
    btn.classList.add('btn_active')
}

function createBtnTest() {
    let button = document.createElement("Button");
    button.innerHTML = "Test";
    button.setAttribute("id", "Test_News")
    button.setAttribute("type", "button")
    button.classList.add('btn_detect')
    button.addEventListener("click", btn_test_edition, false);
    document.querySelector('[role="progressbar"]').parentElement.appendChild(button);
    var inputTxt = document.querySelector('[data-text="true"]');
    inputTxt.innerHTML != "" ? activeBtnTest() : inactiveBtnTest();
}

function inputObserver() {
    var inputTxt = document.querySelector('[data-text="true"]').parentElement;
    //var y = document.querySelector('[data-contents="true"]').parentElement;

    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            inputTxt.children[0].innerHTML != "" ? activeBtnTest() : inactiveBtnTest();
            //console.info("EVENT TRIGGERT " + mutation.target.id);
        });
    });

    var config = { attributes: true, childList: true, characterData: true };
    observer.observe(inputTxt, config);
}



