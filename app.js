$(document).ready(function() {
    // Specify a url, in this case our web server
    const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"
    pause = true;

    setInterval(async function() {
        fetch(url)
        .then(res => res.json()) .then(data => {  
            if(pause){
                document.getElementById("searchBar").addEventListener("input", handleSearch);
                refreshTweets(data);
            }
        })
        .catch(err => {
            // error catching
            console.log(err) 
        })
    }, 5000);
});

const handleSearch = event => {
    searchString = event.target.value.trim().toLowerCase();
    console.log(searchString);
    refreshTweets(searchString);
}

var id = [];
const tweetContainer = document.getElementsByClassName("centerFeed");
var flip = [];
var tweetArr = [];

function refreshTweets(tweets) {
    tweetStatus = tweets.statuses;
    //console.log(tweetContainer[0].firstChild);

    while (tweetContainer.firstChild){
        tweetContainer[0].removeChild(tweetContainer[0].firstChild);
    }

    const tweetList = document.createElement("div");
    tweetContainer[0].appendChild(tweetList);

    tweetStatus.forEach((tweet) => {
        if(!id.includes(tweet.id_str)){
            id.push(tweet.id_str);

            var tweetElement = document.createElement("div");
            tweetElement.className = 'tweets';
            var tweetPicdiv = document.createElement("div");
            const tweetPic = document.createElement("img");

            //tweetPic.src = 'images/ratatouille.jpg';
            //console.log(tweet.user.profile_image_url);
            tweetPic.src = tweet.user.profile_image_url;
            
            tweetPic.src.onerror = function () {
                console.log('Yo');
                this.onerror = null;
                this.src = 'images/ratatouille.jpg'
            };
            
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
            tweetArr.push(tweetElement);
            //tweetList.appendChild(tweetElement);
            //tweetContainer[0].appendChild(tweetElement);
        }
        //console.log(tweetArr.length);
    });
    for(var i = tweetArr.length-1; i >= 0; i--){
        tweetList.appendChild(tweetArr[i]);
        console.log(tweetArr[i]);
    }
}