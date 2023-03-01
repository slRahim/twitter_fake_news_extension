import axios from "axios";
import { saveTweetResult, updateCurrentCo, updateTotal } from "../popup/popup";
import '../popup/scss/style.scss'
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle"

axios.defaults.baseURL = 'https://sid-fake-news.online:5000';
axios.defaults.timeout = 30000;

export async function testTweetTimeLine(list_articles) {
  try {
    let response = await axios.post('/api/faketest', list_articles);
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
      document.getElementById(id).setAttribute("data-bs-toggle", "popover")
      document.getElementById(id).setAttribute("data-bs-placement", "right")
      document.getElementById(id).setAttribute("data-bs-trigger", "hover focus")
      document.getElementById(id).setAttribute("data-bs-title", "Confidences")
      document.getElementById(id).setAttribute("data-bs-content", response.data.articles[i].msg_res)
      new bootstrap.Popover(document.getElementById(id));

    }
    await saveTweetResult(response.data.articles)
    await updateCurrentCo(response.data.number_fake)
    await updateTotal(response.data.number_fake)
  } catch (error) {
    // console.error(error);
  }
}
export async function testInputTweet(article) {
  try {
    let response = await axios.post('/api/inputTest', article);
    document.getElementById("test_tweet").classList.remove('btn-primary')
    if (response.data.articles.is_fake == 1) {
      document.getElementById("test_tweet").classList.add('btn-danger')
    } else {
      document.getElementById("test_tweet").classList.add('btn-success')
    }
    document.getElementById("test_tweet").setAttribute("data-bs-toggle", "popover")
    document.getElementById("test_tweet").setAttribute("data-bs-placement", "right")
    document.getElementById("test_tweet").setAttribute("data-bs-trigger", "hover focus")
    document.getElementById("test_tweet").setAttribute("data-bs-title", "Confidences")
    document.getElementById("test_tweet").setAttribute("data-bs-content", response.data.articles.msg_res)
    new bootstrap.Popover(document.getElementById("test_tweet"));
  } catch (error) {
    // console.log(error)
  }
}