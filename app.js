$(document).ready(function() {
    // Specify a url, in this case our web server
    const url = "http://ec2-54-219-224-129.us-west-1.compute.amazonaws.com:2000/feed/random?q=weather"
    setInterval(async function() {
        fetch(url)
        .then(res => res.json()) .then(data => {  
            // do something with data
            //document.getElementById("tweetText").innerHTML = JSON.stringify(data, null, 4);
            // tweets = JSON.stringify(data, null, 4);
            //console.log(data);
            //console.log(data.statuses[0].user.screen_name);
            //console.log(document.getElementsByClassName("tweetText"));
            //var tN = document.getElementsByClassName("tweetHandle");

            // $(function(){
            //     var $tweets = $('.tweets').clone();
            //     $('.package').html($tweets);
            // });

            for(let i = 0; i < 5; i++) {
                document.getElementsByClassName("tweetText")[i].innerHTML = data.statuses[i].text;
                //console.log(data.statuses[i].text);
                document.getElementsByClassName("user-name tweetName")[i].innerHTML = data.statuses[i].user.name;
                //console.log(data.statuses[i].user.created_at);
                var date = data.statuses[i].user.created_at.slice(4,10);
                //date = date.slice(4, 10);
                //console.log(date);
                document.getElementsByClassName("tweetHandle")[i].innerHTML = ' @' + data.statuses[i].user.screen_name + ' ' + date;
                //console.log(document.getElementsByClassName("tweetHandle")[1].innerHTML);
                document.getElementsByClassName("tweetPic")[i].src = data.statuses[i].user.profile_image_url;
            }
            // for(let i = 0; i < 5; i++) {
            //     //document.getElementsByClassName("tweetHandle")[0].innerHTML = data.statuses[0].user.screen_name;
            //     console.log(document.getElementsByClassName("tweetHandle"));
            // }
        })
        .catch(err => {
            // error catching
            console.log(err) 
        })
    }, 5000);
});

const tweetContainer = document.getElementsByClassName("centerFeed");
function refreshTweets(tweets) {
    const tweetList = document.createElement("div");

    tweetContainer.appendChild(tweetList);

    for(let i = 0; i < 5; i++) {
        const tweet = document.createElement("div");
        
        const tweetPicContainer = document.createElement("div");
        const tweetPic = document.createElement("img")
        tweetPicContainer.appendChild(tweetPic);
        tweet.appendChild(tweetPicContainer);

        const tweetContentContainer = document.createElement("div");
        const tweetName = document.createElement("span");
        const tweetHandle = document.createElement("span");
        const tweetTxt = document.createElement("p");
        tweetContentContainer.appendChild(tweetTxt);
        tweetContentContainer.appendChild(tweetName);
        tweetContentContainer.appendChild(tweetHandle);
        tweet.appendChild(tweetContentContainer);

        // const tweetTxt = document.createTextNode('Hello');
        // tweetTxt.className = 'tweetText';
        // tweet.append(tweetTxt);
        
    }
}