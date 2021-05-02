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
    //refreshTweets(searchString);
}

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

            if(!URLError(tweet.user.profile_image_url)){
                tweetPic.src = 'images/ratatouille.jpg';
            }
            
            function URLError(url){
                var http = new XMLHttpRequest();
                http.open('HEAD', url, false);
                http.send();
                return (http.status != 404);
            }
            
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
        //console.log(tweetArr[i]);
    }
}