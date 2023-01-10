import axios from "axios";
import { updateCurrentCo, updateTotal } from "../popup/popup";


axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.timeout = 5000;

export async function sendTweet(list_articles) {
  try {
    const response = await axios.post('/api/faketest', list_articles);
    console.log(response.data);

    // save/update history of navigation in sync storage 

    // number of fake detected (this part of list) get from server
    // update current co session storage
    updateCurrentCo(response.data.number_fake)
    // update total co sync storage
    updateTotal(response.data.number_fake)

  } catch (error) {
    console.error(error);
  }
}

