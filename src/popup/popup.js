// Import our custom CSS
import './scss/style.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// import chart js library
import Chart from 'chart.js/auto'
import jslinq from 'jslinq'

document.addEventListener('DOMContentLoaded', function () {

    getTotalCo(function (result) {
        if (result.total == undefined) {
            document.getElementById('id_total_detection').innerHTML = "0"
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


// ******************************************dashboard part****************************************************************
async function createChart() {
    let data2 = [
        { display_id: 2011, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Rahim", poster_user_tag: "@rahim55", date_time_post: "2023-01-16T14:00:00.000Z", is_fake: 1 },
        { display_id: 2010, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Habbib", poster_user_tag: "@habib55", date_time_post: "2023-01-10T20:00:00.000Z", is_fake: 0 },
        { display_id: 2012, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "hamza", poster_user_tag: "@hz55", date_time_post: "2023-01-14T18:00:00.000Z", is_fake: 0 },
        { display_id: 2013, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Netflix", poster_user_tag: "@netflix55", date_time_post: "2023-01-16T15:30:00.000Z", is_fake: 0 },
        { display_id: 2014, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Elon Musk", poster_user_tag: "@muskelon55", date_time_post: "2023-01-16T14:00:00.000Z", is_fake: 1 },
        { display_id: 2015, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Rahim", poster_user_tag: "@rahim55", date_time_post: "2023-01-15T22:50:00.000Z", is_fake: 0 },
        { display_id: 2016, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Rahim", poster_user_tag: "@rahim55", date_time_post: "2023-01-14T09:30:00.000Z", is_fake: 1 },
        { display_id: 2017, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "LC news", poster_user_tag: "@lcnews", date_time_post: "2023-01-16T10:00:00.000Z", is_fake: 1 },
        { display_id: 2018, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "New york times", poster_user_tag: "@NyTimes", date_time_post: "2023-01-12T16:00:00.000Z", is_fake: 0 },
        { display_id: 2019, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Habbib", poster_user_tag: "@habib55", date_time_post: "2023-01-15T23:30:00.000Z", is_fake: 0 },
        { display_id: 2020, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "hamza", poster_user_tag: "@hz55", date_time_post: "2023-01-13T19:00:00.000Z", is_fake: 0 },
        { display_id: 2021, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Netflix", poster_user_tag: "@netflix55", date_time_post: "2023-01-15T14:00:00.000Z", is_fake: 0 },
        { display_id: 2009, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Netflix", poster_user_tag: "@netflix55", date_time_post: "2023-01-16T14:00:00.000Z", is_fake: 1 },
        { display_id: 2008, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Rahim", poster_user_tag: "@rahim55", date_time_post: "2023-01-11T13:20:00.000Z", is_fake: 1 },
        { display_id: 2007, tweet_text: "fgqs ffhukqfn, hjzqbf ,qgdBC HJHFAQ", poster_user: "Rahim", poster_user_tag: "@rahim55", date_time_post: "2023-01-12T15:00:00.000Z", is_fake: 1 },
    ];

    let queryObj = jslinq(data2);

    let rank_users = queryObj
    .where(el=>el.is_fake == 1)
    .groupBy((el) => el.poster_user)
    .toList();

    let dist_data = queryObj
        .groupBy((el) => el.is_fake)
        .toList();

    let labels ;
    if(dist_data[0].elements[0].is_fake == 1){
        labels = ["Fake" , "True"]
    }else{
        labels = ["True" , "Fake"]
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
                labels: rank_users.map(obj=>obj.key),
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