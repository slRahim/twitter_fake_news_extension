window.addEventListener('load', function () {
    console.log("hello")
    tweet_text()
    // btn_tweet_test()


})

// ******************************************part I*****************************************************************
function tweet_text() {
    let list_ids = []
    let list_text = []
    console.log("Extension is loading...")
    this.setTimeout(() => {
        console.log("load is done")

        const articles = document.getElementsByTagName("article");


        for (let i = 0; i < articles.length; i++) {
            let tweet_id = articles[i].querySelector('[data-testid="tweetText"]').getAttribute("id")

            if (!list_ids.includes(tweet_id)) {
                list_ids.push(tweet_id);
                list_text.push(document.getElementById(tweet_id).firstChild.innerText);

                let button = document.createElement("Button");
                button.innerHTML = "TEST";
                button.style = "top:8%;right:8%;position:fixed;";
                button.setAttribute("id", "btn_fk_" + tweet_id)
                button.setAttribute("type", "button")
                button.addEventListener("click", function () {
                    console.log(list_text[list_ids.indexOf(tweet_id)])
                }, false)
                document.getElementById(tweet_id).appendChild(button)
            }

        }

        this.window.onscroll = function () {

            if (this.oldScroll > this.scrollY) {
                // true up
                console.log("scroll up")
            } else {
                //false down
                const articles = document.getElementsByTagName("article");


                for (let i = 0; i < articles.length; i++) {
                    let tweet_id = articles[i].querySelector('[data-testid="tweetText"]').getAttribute("id")

                    if (!list_ids.includes(tweet_id)) {
                        list_ids.push(tweet_id);
                        list_text.push(document.getElementById(tweet_id).firstChild.innerText);

                        let button = document.createElement("Button");
                        button.innerHTML = "TEST";
                        button.style = "top:8%;right:8%;position:fixed;";
                        button.setAttribute("id", "btn_fk_" + tweet_id)
                        button.setAttribute("type", "button")
                        button.addEventListener("click", function () {
                            console.log(list_text[list_ids.indexOf(tweet_id)])
                        }, false)
                        document.getElementById(tweet_id).appendChild(button)
                    }

                }


            }
            this.oldScroll = this.scrollY;
        }

    }, 7000)


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



