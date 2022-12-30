import { sendTweet } from "../api/api"
import Article from "../model/article";

window.addEventListener('load', function () {
    console.log("hello")
    // tweet_text(this.window)
    test_edition(this.window);
    // console.log("send data to python ...")
    // sendTweet();


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
                a = new Article(tweet_id, document.getElementById(tweet_id).firstChild.innerText, '', 0, 0, 0)
                list_articles.push(a);
                let button = document.createElement("Button");
                button.innerHTML = "TEST";
                button.style = "top:8%;right:8%;position:fixed;";
                button.setAttribute("id", "btn_fk_" + tweet_id)
                button.setAttribute("type", "button")
                button.addEventListener("click", function () {
                    console.log(list_articles[list_ids.indexOf(tweet_id)].tweet_text);
                }, false)
                document.getElementById(tweet_id).appendChild(button)
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
                        a = new Article(tweet_id, document.getElementById(tweet_id).firstChild.innerText, '', 0, 0, 0)
                        list_articles.push(a);
                        let button = document.createElement("Button");
                        button.innerHTML = "TEST";
                        button.style = "top:8%;right:8%;position:fixed;";
                        button.setAttribute("id", "btn_fk_" + tweet_id)
                        button.setAttribute("type", "button")
                        button.addEventListener("click", function () {
                            console.log(list_articles[list_ids.indexOf(tweet_id)].tweet_text)
                        }, false)
                        document.getElementById(tweet_id).appendChild(button)
                    }
                }
                // sendTweet(list_articles.slice(last_index+1)); 
                // last_index = list_articles.length-1 ;

            }
            page.oldScroll = page.scrollY;
        }

    }, 7000);


}

function tweet_metadata() {
    //habib
    // nbr like,retweet, comment
    setTimeout(() => {
        const articles = document.getElementsByTagName("article");

        for (var i = 0; i < articles.length; i++) {
            console.log(articles[i].querySelector('[data-testid="User-Names"]').innerText);
            console.log(articles[i].querySelector('[data-testid="reply"]>div').innerText);
            console.log(articles[i].querySelector('[data-testid="retweet"]>div').innerText);
            console.log(articles[i].querySelector('[data-testid="app-text-transition-container"]>span').innerText);
        }

    }, 7000)
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
    console.log("fghjkl");
    var text = document.querySelector('[data-text="true"]').innerHTML;
    if (text != "") alert(text);
}


function inactiveBtnTest() {
    let btn = document.getElementById("Test_News");
    btn.style.backgroundColor = "#1D9BF085";
    btn.style.color = "#ffffff85";
    btn.style.cursor = "context-menu";
}

function activeBtnTest() {
    let btn = document.getElementById("Test_News");
    btn.style.backgroundColor = "#1D9BF0";
    btn.style.color = "#ffffff";
    btn.style.cursor = "pointer";
}

function createBtnTest() {
    let button = document.createElement("Button");
    button.innerHTML = "Detecter";

    button.setAttribute("id", "Test_News")
    button.setAttribute("type", "button")
    button.style.top = "0px";
    button.style.right = "30px";
    button.style.position = "absolute";
    button.style.width = "70px";
    button.style.height = "28px";
    button.style.fontWeight = "700";
    button.style.border = "0px";
    button.style.borderRadius = "30px";
    button.style.backgroundColor = "#1D9CF085";
    button.style.color = "#ffffff85";
    button.style.cursor = "context-menu";
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



