window.addEventListener('load', function () {

    setTimeout(() => {
        console.log("Tweets")
        const articles = document.getElementsByTagName("article");
        
        var button = document.createElement("Button");
        button.innerHTML = "FAKE/TRUE";
        button.style = "top:8%;right:8%;position:fixed;";
        button.onclick = ()=>{
            this.alert("this tweet is ??????")
        }
        articles[0].appendChild(button);
        
        for (var i = 0; i < articles.length; i++) {
            console.log(articles[i].querySelector('[data-testid="tweetText"]>span').innerText);
        }


    }, 7000)



})

