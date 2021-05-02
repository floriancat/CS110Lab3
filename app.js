$(document).ready(function() {
    // Specify a url, in this case our web server
    const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"
    pause = false;

    // Setting an interval for fetching
    setInterval(async function() {
        fetch(url)
        .then(res => res.json()) .then(data => {  
            // If not paused then refresh the tweets
            if(!pause){
                refreshTweets(data);
            }
        })
        .catch(err => {
            // Error catching
            console.log(err) 
        })
    }, 5000);
});

/*  
    Searching tweet content based on input
    
    @param (implicit): Takes in text input
    @return (implicit): Displays tweets that match the filter
*/
function searchTweets() {
    var input = document.getElementById('searchBar')
    var filter = input.value.toLowerCase();
    var tweets = document.getElementsByClassName('tweets flexTweet')

    for(var i = 0; i < tweets.length; i++){
        var a = tweets[i].getElementsByClassName('tweetText')[0];
        var txtValue = a.textContent || a.innerText;
        if(txtValue.toLowerCase().indexOf(filter) > -1) {
            tweets[i].style.display = "";
        } else {
            tweets[i].style.display = "none";
        }
    }
}

/*  
    Returns if a photo gives us a 404
    
    @param Image URL
    @return Boolean if there is a 404
*/
function URLError(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return (http.status != 404);
}

var id = [];
const tweetContainer = document.getElementsByClassName("centerFeed");
var flip = [];
var tweetArr = [];

/*  
    Searching tweet content based on input
    
    @param Tweets data from server
    @return Displays tweets fetched from server, sorted in order received
*/
function refreshTweets(tweets) {
    tweetStatus = tweets.statuses;

    // Remove previous tweets
    while (tweetContainer.firstChild){
        tweetContainer[0].removeChild(tweetContainer[0].firstChild);
    }

    // Create div to hold new data
    const tweetList = document.createElement("div");
    tweetContainer[0].appendChild(tweetList);

    // For each tweet we get, put it in a larger div tag
    tweetStatus.forEach((tweet) => {
        // Do not display duplicates
        if(!id.includes(tweet.id_str)){
            id.push(tweet.id_str);

            // Create overall div for tweet
            var tweetElement = document.createElement("div");
            tweetElement.className = 'tweets';
            var tweetPicdiv = document.createElement("div");

            /* 
                Create image tag and assign it a URL, if it's a bad URL
                Default to Remy's profile picture if we have a bad image
            */
            const tweetPic = document.createElement("img");
            tweetPic.src = tweet.user.profile_image_url;
            if(!URLError(tweet.user.profile_image_url)){
                tweetPic.src = 'images/ratatouille.jpg';
            }
            
            // Add tweet to div and assign the class properties
            tweetPic.className = "tweetPic";
            tweetPicdiv.append(tweetPic);
            tweetPicdiv.className = "tweetPicContainer";
            tweetElement.append(tweetPicdiv);

            // Add username in a span
            var tweetContent = document.createElement('div');
            var name = document.createElement('span');
            name.appendChild(document.createTextNode(tweet.user.name));
            name.className = 'user-name tweetName';
            tweetContent.className = 'tweetContentContainer';
            tweetContent.append(name);

            // Concatenate date and username together in a span
            var tweetHandle = document.createElement('span');
            tweetHandle.appendChild(document.createTextNode(' @' + tweet.user.screen_name + ' ' + tweet.user.created_at.slice(4,10)));
            tweetHandle.className = 'tweetHandle';
            tweetContent.className = 'tweetContentContainer';
            tweetContent.append(tweetHandle);

            // Throw text into a p tag and then add all elements to tweetContent
            var textp = document.createElement('p');
            textp.appendChild(document.createTextNode(tweet.text));
            textp.className = 'tweetText';
            tweetElement.append(textp);
            tweetContent.append(textp);
            tweetElement.append(tweetContent);

            // Add data to global array
            tweetElement.className = 'tweets flexTweet';
            tweetArr.push(tweetElement);
        }
        //console.log(tweetArr.length);
    });

    // Sort given tweets based on order received, oldest tweet at the bottom
    for(var i = tweetArr.length-1; i >= 0; i--){
        tweetList.appendChild(tweetArr[i]);
        //console.log(tweetArr[i]);
    }
}