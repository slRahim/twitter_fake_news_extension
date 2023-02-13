// Import our custom CSS
import './scss/style.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// import chart js library
import Chart from 'chart.js/auto'
import jslinq from 'jslinq'

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("sync_btn").addEventListener('click', async () => {
        await syncData();
    })
    getTotalCo(function (result) {
        if (result.total == undefined) {
            document.getElementById('id_total_detection').innerHTML = 0
        } else {
            document.getElementById('id_total_detection').innerHTML = result.total
        }

    });

    // current
    getDetectedCo(function (result) {
        if (result.detected == undefined) {
            document.getElementById('id_co_detection').innerHTML = 0
        } else {
            document.getElementById('id_co_detection').innerHTML = result.detected
        }
    });

    getCurrentTabUrl(function (url) {
        document.getElementById("current_url_id").innerHTML = url;
        if (url !== "twitter.com") {
            document.getElementById('emoji_status_id').innerHTML = "&#128564;"
            document.getElementById('current_url_desc_id').innerHTML = "This extension work only on twitter"

        } else {
            document.getElementById('emoji_status_id').innerHTML = "&#129488;"
            document.getElementById('current_url_desc_id').innerHTML = "Your extension is enabled"
        }
    });

    createChart();
});

function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url.split('/')[2];
        callback(url);
    });
}

function getTotalCo(callback) {
    chrome.storage.local.get(["total"]).then((result) => {
        callback(result);
    });
}

export async function updateTotal(value) {
    chrome.storage.local.get(["total"]).then((result) => {
        if (result.total == undefined) {
            result.total = 0;
        }
        let res = result.total + value;
        chrome.storage.local.set({ total: res }).then(() => {
            console.log("total Value is set to " + res);
        });
    });
}

function getDetectedCo(callback) {
    chrome.storage.session.get(["detected"]).then((result) => {
        callback(result);
    });

}

export async function updateCurrentCo(value) {
    chrome.storage.session.get(["detected"]).then((result) => {
        let res
        if (result.detected == undefined) {
            res = value;
        } else {
            res = result.detected + value;
        }
        chrome.storage.session.set({ detected: res }).then(() => {
            console.log("detected Value is set to " + res);
        });
    });

}

async function getSavedTweetResult() {
    let res = await chrome.storage.local.get(["articles"]);
    if (res.articles == undefined) {
        return [];
    }
    return res.articles.data;
}

export async function saveTweetResult(articles) {
    chrome.storage.local.get(["articles"]).then((result) => {
        if (result.articles == undefined) {
            result.articles = { data: [] };
        }
        articles.forEach(element => {
            result.articles.data.push(element)
        });
        chrome.storage.local.set({ articles: result.articles }).then(() => {
            // console.log("saved data " + result.articles.data.length);
        });

    })
}

// *******************************************sync data******************************************************************
export async function syncData() {
    // get local
    let total = await chrome.storage.local.get(['total']);
    let articles = await chrome.storage.local.get(['articles']);

    if (total.total == undefined) {
        total.total = 0;
    }
    if (articles.articles == undefined) {
        articles.articles = { data: [] }
    }

    // get remote
    let total_sync = await chrome.storage.sync.get(['total_sync']);
    let articles_sync = await chrome.storage.sync.get(['articles_sync']);

    if (total_sync.total_sync == undefined) {
        total_sync.total_sync = 0;
    }
    if (articles_sync.articles_sync == undefined) {
        articles_sync.articles_sync = { data: [] }
    }

    console.log("total " + total.total)
    console.log('total sync ' + total_sync.total_sync)

    // set total sync & local
    if (total.total > total_sync.total_sync) {
        await chrome.storage.sync.set({ total_sync: total.total});
    } else {
        await chrome.storage.local.set({ total: total_sync.total_sync });
    }



    // set data local & sync
    // if(articles_sync.articles_sync.data.length > articles.articles.data.length){
    //     await chrome.storage.local.set({articles : articles_sync.articles_sync});
    // }else{
    //     await chrome.storage.sync.set({articles_sync : articles.articles});
    // }

}


// ******************************************dashboard part****************************************************************
async function createChart() {
    let data = await getSavedTweetResult();

    let queryObj = jslinq(data);

    let rank_users = queryObj
        .where(el => el.is_fake == 1)
        .groupBy((el) => el.poster_user)
        .toList();

    let dist_data = queryObj
        .groupBy((el) => el.is_fake)
        .toList();

    let labels;
    if (dist_data[0].elements[0].is_fake == 1) {
        labels = ["Fake", "True"]
    } else {
        labels = ["True", "Fake"]
    }

    new Chart(
        document.getElementById('rank_user_id'),
        {
            type: 'bar',
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Top 5 users post fake news',
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    }
                }
            },
            data: {
                labels: rank_users.map(obj => obj.key),
                datasets: [
                    {
                        label: "Count",
                        data: rank_users.map(obj => obj.count),
                    }
                ]
            }
        }
    );

    new Chart(
        document.getElementById('dist_data_id'),
        {
            type: 'pie',
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Distribution of fake news',
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    }
                }
            },
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Count",
                        data: dist_data.map(obj => obj.count),
                    }
                ]
            }
        }
    );



}