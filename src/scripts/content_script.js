import { sendTweet } from "../api/api"
import Article from "../model/article";

window.addEventListener('load', function () {
    console.log("hello")
    tweet_text(this.window)
    // console.log("send data to python ...")
    // sendTweet();


})

// ******************************************part I*****************************************************************
function tweet_text(page) {
    let list_ids = []
    let list_articles = []
    let last_index = -1 ;

    console.log("Extension is loading...")

    page.setTimeout(function(){
        console.log("load is done")
        // part 1 before scroll
        const articles = document.getElementsByTagName("article");
        for (let i = 0; i < articles.length; i++) {
            let tweet_id = articles[i].querySelector('[data-testid="tweetText"]').getAttribute("id")
            let a ;
            if (!list_ids.includes(tweet_id)) {
                list_ids.push(tweet_id);
                a = new Article(tweet_id , document.getElementById(tweet_id).firstChild.innerText,'',0,0,0)
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
        sendTweet(list_articles);
        last_index = list_articles.length - 1;

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
                    let a ;
                    if (!list_ids.includes(tweet_id)) {
                        list_ids.push(tweet_id);
                        a = new Article(tweet_id , document.getElementById(tweet_id).firstChild.innerText,'',0,0,0)
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
                sendTweet(list_articles.slice(last_index+1)); 
                last_index = list_articles.length-1 ;

            }
            page.oldScroll = page.scrollY;
        }

    }, 7000);


}



function tweet_metadata() {
    // nbr like,retweet, comment

}

function user_data() {
    // user
}



// ******************************part II*******************************************************************
function test_edition() {

}

function btn_test_edition() {

}




