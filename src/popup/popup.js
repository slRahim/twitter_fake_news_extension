// Import our custom CSS
import './scss/style.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

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
    chrome.storage.local.get(["total"]).then( (result) => {
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
     chrome.storage.session.get(["detected"]).then( (result) => {
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


