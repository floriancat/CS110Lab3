$(document).ready(function() {
    // Specify a url, in this case our web server
    const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"
    pause = true;

    setInterval(async function() {
        fetch(url)
        .then(res => res.json()) .then(data => {  
            if(pause){
                refreshTweets(data);
            }
        })
        .catch(err => {
            // error catching
            console.log(err) 
        })
    }, 5000);
});

var id = [];

const tweetContainer = document.getElementsByClassName("centerFeed");
function refreshTweets(tweets) {

    tweetStatus = tweets.statuses;

    tweetStatus.forEach((tweet) => {
        if(!id.includes(tweet.id_str)){
            id.push(tweet.id_str);

            var tweetElement = document.createElement("div");
            tweetElement.className = 'tweets';
            var tweetPicdiv = document.createElement("div");
            const tweetPic = document.createElement("img");

            tweetPic.src = tweet.user.profile_image_url;
            tweetPic.className = "tweetPic";
            tweetPicdiv.append(tweetPic);
            tweetPicdiv.className = "tweetPicContainer";
            tweetElement.append(tweetPicdiv);

            var tweetContent = document.createElement('div');
            var name = document.createElement('span');
            name.appendChild(document.createTextNode(tweet.user.name));
            name.className = 'user-name tweetName';
            tweetContent.className = 'tweetContentContainer';
            tweetContent.append(name);

            var tweetHandle = document.createElement('span');
            tweetHandle.appendChild(document.createTextNode(' @' + tweet.user.screen_name + ' ' + tweet.user.created_at.slice(4,10)));
            tweetHandle.className = 'tweetHandle';
            tweetContent.className = 'tweetContentContainer';
            tweetContent.append(tweetHandle);

            var textp = document.createElement('p');
            textp.appendChild(document.createTextNode(tweet.text));
            textp.className = 'tweetText';
            tweetElement.append(textp);
            tweetContent.append(textp);
            tweetElement.append(tweetContent);


            tweetElement.className = 'tweets flexTweet';
            tweetContainer[0].appendChild(tweetElement);
        }
    });
}