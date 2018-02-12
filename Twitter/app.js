
/*global fetch */
"use strict";
//--------------------------
/*
renderElementsList(searchTweets("невский")
    .then(function (value) {
        return value;
    })
     .catch(function (error) {
         console.log('error', error);
     }));
*/

var form = document.querySelector("#search-tweets-form");
var searchButton = document.querySelector("#searchButton");
searchButton.disabled = false;


form.onsubmit = function(event) {
    searchButton.disabled = true;
    var loadingImg = document.createElement("div");
    loadingImg.innerHTML = `<img id="loading" src="https://www.walletninja.com/wp-content/themes/walletninjas/images/loader.gif">`;
    var node = document.querySelector("#tweets-list");
    node.appendChild(loadingImg);
    var querySearch =  this.elements["search"].value;

    searchTweets(querySearch).then(function (response) {

        if (response) searchButton.disabled = false;

        var renderedTweets = renderElementsList(response.statuses);
        console.log("rendered", renderedTweets);
            node.innerHTML = "";
            createHtml(node, renderedTweets);
            form.elements["search"].value = "";
    })
        .catch(function (error) {
            console.log('error', error);
        });
    event.preventDefault();

};



searchTweets("star wars")
/*.then(function(response) {
        return new Promise( function(resolve) {
            setTimeout( resolve, 5000);
        })
    })*/
    .then(function (response) {
       var renderedTweets = renderElementsList(response.statuses);
       console.log("rendered", renderedTweets);
        var node = document.querySelector("#tweets-list");
        createHtml(node, renderedTweets);
    })
    .catch(function (error) {
        console.log('error', error);
    });


//console.dir(searchResults);

 function searchTweets(q) {

    var signatureOptions = {
        oauth_consumer_key: "577BDV7hNgVzlwmAWJvYT4CxM",
        oauth_nonce: "kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: Math.round(Date.now() / 1000),
        oauth_token: "546738866-dp0chGjgrMaPUmW2KzCMFxEtsGI309jgTHGGHIk5",
        oauth_version: "1.0",
        q: q,
        result_type: "mixed",
        count: "20"
    };

    var encodeObject = encode(signatureOptions);

    function toParametersString(object) {

        return  Object
            .keys(object)
            .sort()
            .map( function (key) {
                var value = object[key];
                return  key + "=" + value;
            })
            .join("&");
    }

    var parameterString =  toParametersString(encodeObject);
    var parameterStringEncode = percentEncode(parameterString);
    var stringHttps = signatureHTTPSString();

    function signatureBaseString() {
        return stringHttps + parameterStringEncode;
    }

    var SignatureBaseString = signatureBaseString();

    var secretObj = {
        ConsumerSecret: "yA1OfYOi8aDV4u4s0lA5WcGsbid0pmiUoG3a8Gl8gkuXL1KqSO",
        TokenSecret: "GN7BHgC1FlYS2KsxuGjf6wkYrTnYLIJHtNuDn8K2aGiD8"
    };

    function getSigningKey(object) {
        return Object
            .keys(object)
            .map( function(item) {
                return percentEncode(object[item]);
            })
            .join("&");
    }

    var key = getSigningKey(secretObj);
    var sha1 = percentEncode(CryptoJS.HmacSHA1(SignatureBaseString, key).toString());
    var words = CryptoJS.enc.Hex.parse(sha1);
    var signature = CryptoJS.enc.Base64.stringify(words);
    var consumerKey = percentEncode(signatureOptions.oauth_consumer_key);
    var nonce = percentEncode(signatureOptions.oauth_nonce);
    var timestamp = percentEncode(signatureOptions.oauth_timestamp);
    var accessToken = percentEncode(signatureOptions.oauth_token);
    var signatureEncode = percentEncode(signature);

    function getAuthorizationHeader() {

        return  'OAuth '                                                +
            'oauth_consumer_key="'          + consumerKey       + '", ' +
            'oauth_nonce="'                 + nonce             + '", ' +
            'oauth_signature="'             + signatureEncode   + '", ' +
            'oauth_signature_method= "HMAC-SHA1", '                     +
            'oauth_timestamp="'             + timestamp         + '", ' +
            'oauth_token="'                 + accessToken       + '", ' +
            'oauth_version="1.0"'                                       ;
    }

    var authorization = getAuthorizationHeader();

    var checkStatus = function (response) {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response);
    };

    var toJson = function (response) {
        return response.json();
    };
    /*
    fetch("/api/search/tweets.json?q="+ q +"&result_type=mixed&count=4", {
        method: "GET",
        headers: {"Authorization" :  authorization,
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            console.log('data', data);
        })
        .catch(function (error) {
            console.log('error', error);
        });
    */

     var url = "/api/search/tweets.json?q="+ q +"&result_type=mixed&count=20";
     var options = {
         method: "GET",
         headers: {"Authorization" :  authorization,
         }
     };

     function fetchFromApi(url, options) {

         return fetch(url, options)
             .then(checkStatus)
             .then(toJson);
             /*.then(function (data) {
                 //console.log('data', data);
                 return data;
             });
             */
     }

     return fetchFromApi(url, options);
}


function percentEncode(str) {
    return encodeURIComponent(str).replace(/[!*()']/g, function (character) {
        return '%' + character.charCodeAt(0).toString(16);
    });
}

function encode(object) {
    return Object
        .keys(object)
        .reduce(function (result, key) {
            result[percentEncode(key)] = percentEncode(object[key]);
            return result;
        }, {});
}

function signatureHTTPSString() {
    var HTTPStr = "https://api.twitter.com/1.1/search/tweets.json";
    return "GET&" + percentEncode(HTTPStr) + "&";
}

// Создать две функции, одна рендерит список элементов, а другая рендерит элемент (твит)
// Для шаблонизации использовать строковые литералы из es6

/*
function renderElementsList(tweets) {
    data
        .then(function (value)  {
            var tweets = value.statuses;
            for(var count = 0; count < tweets.length; count++) {
                //renderElement(tweets[count]);
                var tweet = document.createElement("div");
                tweet.innerHTML = renderTweet(tweets[count]);
                document.body.appendChild(tweet);
            }
        });
}
*/



function createHtml(node, html) {
    var tweet = document.createElement("div");
    tweet.id = "search-tweets";
    tweet.innerHTML = html;
    node.appendChild(tweet);
}

function renderElementsList(tweets) {
    return `
    <ul class="tweets_list">
        ${tweets.map(tweet => {
            return `
            <li>${renderTweet(tweet)}</li>
            `
        }).join("")}
    </ul> 
    `
}

/*
function renderElement(data) {

            var userScreenName = data.user.screen_name;
            var userName = data.user.name;
            var profileImage = data.user.profile_image_url;
            var tweetText = data.text;
            var reTweet = data.retweet_count;
            var favoriteCount = data.favorite_count;
            console.log(`\n${userScreenName} \n${userName} \n${profileImage} \n${tweetText} \nРетвитов: ${reTweet} \nПонравилось: ${favoriteCount} \n${mediaTweet}`);
            var tweetList = document.createElement("ul");
            tweetList.innerHTML = "Список твитов: ";
            var tweetListElement = document.createElement("li");
            document.body.appendChild(tweetList);
            tweetList.appendChild(tweetListElement);
            var tweet = document.createElement("div");
            tweet.innerHTML = `

            <a href=https://twitter.com/${userScreenName}>${userName}</a> @${userScreenName}
                <br><img src="${profileImage}">
                <br>${tweetText}`;
            var tweetInfo = document.createElement("div");
            tweetInfo.innerHTML = `Ретвитов: ${reTweet} Понравилось: ${favoriteCount}<hr>`;

            tweetListElement.appendChild(tweet);

            if (!(data.extended_entities == undefined)) {
                var newTweetImage = document.createElement("div");
                var mediaTweet = data.extended_entities.media[0].media_url;
                newTweetImage.innerHTML =`<br><img src="${mediaTweet}">`;
                tweetListElement.appendChild(newTweetImage);
            }

            tweetListElement.appendChild(tweetInfo);

}
*/

function renderTweet(tweet) {

    var userScreenName = tweet.user.screen_name;
    var userName = tweet.user.name;
    var profileImage = tweet.user.profile_image_url;
    var tweetText = tweet.text;
    var reTweet = tweet.retweet_count;
    var favoriteCount = tweet.favorite_count;

    if (!(tweet.extended_entities == undefined)) {
        var mediaDiv = `<div class="tweet-media"><img src="${tweet.extended_entities.media[0].media_url}"></div>`;
    } else mediaDiv = ``;

    return `
    <div class="tweet">
        <div class="tweet_part_img">
        <div class="tweet_userPhoto">
            <img src="${profileImage}">
        </div>
    </div>
        <div class="tweet_part_content">
        <div class="tweet_user-name">
            <a href=https://twitter.com/${userScreenName}>
                ${userName}
            </a> @${userScreenName}
        </div>
        <div class="tweet_text">
            ${tweetText}
        </div>   
        <div class="tweet_media">
            ${mediaDiv}
        </div>
        <div class="tweet_info">
            <span class="uni_retweet">⇧⇩</span> ${reTweet} <span class="uni_like">♡</span> ${favoriteCount}
        </div>
        </div>
    </div>
    `
}


/*
 function rendering(data) {
 data
 .then(function (value) {

 var stat = value.statuses;
 for (var i = 0; i < stat.length; i++) {
 var newDiv = document.createElement("div");
 var newTweet = document.createElement("div");
 newTweet.innerHTML = "<div>"
 + "<hr>"
 + "<a href='https://twitter.com/" + value.statuses[i].user.screen_name + "'>"
 + value.statuses[i].user.name + " " + "</a>" + "@" + value.statuses[i].user.screen_name + "<br>" + " " +
 "<img src='" + value.statuses[i].user.profile_image_url + "'>" + "<br>" +
 value.statuses[i].text + "<br>" +
 "Ритвитов: " + value.statuses[i].retweet_count + "<br>" +
 "Понравилось: " + value.statuses[i].favorite_count + "<br>" +
 "<br>" +
 "</div>";
 document.body.appendChild(newDiv);
 newDiv.appendChild(newTweet);

 if (!(value.statuses[i].extended_entities == undefined)) {
 var newTweetImage = document.createElement("div");
 newTweetImage.innerHTML = "<img src='" + value.statuses[i].extended_entities.media[0].media_url + "' width='200' height='200'>";
 newDiv.appendChild(newTweetImage);
 }
 });

 }*/

//GET statuses/show/:id - открыть подробный твит
//POST statuses/update - запостить твит
//GET statuses/lookup - список твитов по имени пользователя/ид









