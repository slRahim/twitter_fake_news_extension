import axios from "axios";
import { updateCurrentCo, updateTotal } from "../popup/popup";
import '../popup/scss/style.scss'


axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.timeout = 30000;

export async function testTweetTimeLine(list_articles) {
  try {
    const response = await axios.post('/api/faketest', list_articles);

    for (let i = 0; i < response.data.articles.length; i++) {
      let id = "btn_fk_" + response.data.articles[i].display_id;
      document.getElementById(id).classList.remove("btn-outline-primary")
      if (response.data.articles[i].is_fake == 1) {
        document.getElementById(id).innerHTML = "X"
        document.getElementById(id).classList.add("btn-danger");
      } else {
        document.getElementById(id).innerHTML = "✓"
        document.getElementById(id).classList.add("btn-success");
      }
      // document.getElementById(id).disabled = false ;
      document.getElementById(id).addEventListener('click', function () {
        alert(response.data.articles[i].msg_res)
      });
    }
    // save/update history of navigation in local storage 

    // number of fake detected (this part of list) get from server
    // update current co session storage
    await updateCurrentCo(response.data.number_fake)
    await updateTotal(response.data.number_fake)

  } catch (error) {
    // console.error(error);
  }

}

export async function testInputTweet(article) {
  try {
    const response = await axios.post('/api/inputTest', article);

    document.getElementById("test_tweet").classList.remove('btn-primary')
    if (response.data.articles.is_fake == 1) {
      document.getElementById("test_tweet").classList.add('btn-danger')
    } else {
      document.getElementById("test_tweet").classList.add('btn-success')
    }

    document.getElementById("test_tweet").addEventListener('click', function () {
      alert(response.data.articles.msg_res)
    });

  } catch (error) {
    // console.log(error)
  }
}