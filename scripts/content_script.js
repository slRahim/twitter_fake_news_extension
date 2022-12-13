window.addEventListener('load', function () {
    console.log("hello")






})

// ******************************************part I*****************************************************************
function tweet_text() {
    setTimeout(() => {
        console.log("Tweets")
        const articles = document.getElementsByTagName("article");
        
        for (var i = 0; i < articles.length; i++) {
            console.log(articles[i].querySelector('[data-testid="tweetText"]>span').innerText);

        }


    }, 7000)
}

function tweet_metadata() {
    // nbr like,retweet, comment

}

function user_data() {
    // user
}

function btn_tweet_test() {
    // button

    var button = document.createElement("Button");
    button.innerHTML = "FAKE/TRUE";
    button.style = "top:8%;right:8%;position:fixed;";
    button.onclick = () => {
        this.alert("this tweet is ??????")
    }
}

// ******************************part II*******************************************************************
function test_edition(){

}

function btn_test_edition(){

}



