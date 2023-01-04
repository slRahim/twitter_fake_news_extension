import axios from "axios";
import { updateCurrentCo, updateTotal } from "../popup/popup";
import '../popup/scss/style.scss'


axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.timeout = 5000;

export async function sendTweet(list_articles) {
    try {
      const response = await axios.post('/api/faketest',list_articles);

      for(let i=0 ; i<response.data.articles.length ; i++){
        let id = "btn_fk_"+response.data.articles[i].display_id ;
        document.getElementById(id).classList.remove("btn-outline-primary")
        if(response.data.articles[i].is_fake == 1){
          document.getElementById(id).innerHTML = "*"
          document.getElementById(id).classList.add("btn-danger");
        }else{
          document.getElementById(id).innerHTML = "✓"
          document.getElementById(id).classList.add("btn-success");
        }
        document.getElementById(id).disabled = false ;
        document.getElementById(id).addEventListener('click',function(){
          alert(response.data.articles[i].msg_res)
        });
      }

      // save/update history of navigation in sync storage 
      // number of fake detected (this part of list) get from server
      // update current co session storage
      updateCurrentCo(response.data.number_fake)
      // // update total co sync storage
      updateTotal(response.data.number_fake)
      
    } catch (error) {
      console.error(error);
    }
}

