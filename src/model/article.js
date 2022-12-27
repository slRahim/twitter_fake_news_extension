
export default class Article {
    display_id ;
    tweet_text;
    poster_user;
    nbr_like;
    nbr_comment;
    nbr_retweet;

    constructor(display_id , tweet_text , poster_user , nbr_like , nbr_comment, nbr_retweet){
       this.display_id = display_id ;
       this.tweet_text=tweet_text;
       this.poster_user = poster_user;
       this.nbr_like=nbr_like;
       this.nbr_comment=nbr_comment;
       this.nbr_retweet=nbr_retweet;
    }
}