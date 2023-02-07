
export default class Article {
    display_id;
    tweet_id;
    tweet_text;
    poster_user;
    poster_user_tag;
    date_time_post;
    nbr_like;
    nbr_comment;
    nbr_retweet;

    constructor(display_id, tweet_id,tweet_text, poster_user,poster_user_tag,date_time_post, nbr_like, nbr_comment, nbr_retweet) {
        this.display_id = display_id;
        this.tweet_id = tweet_id ;
        this.tweet_text = tweet_text;
        this.poster_user = poster_user;
        this.poster_user_tag = poster_user_tag;
        this.date_time_post = date_time_post;
        this.nbr_like = nbr_like;
        this.nbr_comment = nbr_comment;
        this.nbr_retweet = nbr_retweet;
    }
}