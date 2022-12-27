import axios from "axios";

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.timeout = 5000;

export async function sendTweet(list_articles) {
    try {
      const response = await axios.post('/api/faketest',list_articles);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}

