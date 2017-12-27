
/*global fetch */
"use strict";
//--------------------------

var searchResults = searchTweets("Звездные войны")
    .then(function (value) {
        return value;
    })
     .catch(function (error) {
         console.log('error', error);
     });

console.dir(searchResults);



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


function rendering(data) {

      data
        .then(function (value) {
            var stat = value.statuses;
            //console.log(stat.length);
            for (var i = 0; i < stat.length; i++){
                var newDiv = document.createElement("div");
                var newTweet = document.createElement("div");
                newTweet.innerHTML = "<a>"
                                    + "<a href='https://twitter.com/"+ value.statuses[i].user.screen_name + "'>"
                                    + value.statuses[i].user.name + " " + "</a>" + "@" + value.statuses[i].user.screen_name + "<br>" + " "  +
                                    "<img src='" + value.statuses[i].user.profile_image_url + "'>" + "<br>" +
                                     value.statuses[i].text + "<br>" +
                                    "Ритвитов: " + value.statuses[i].retweet_count + "<br>" +
                                    "Понравилось: " + value.statuses[i].favorite_count+ "<br>" +
                                    "<br>" +
                                    "</li>";
                document.body.appendChild(newDiv);
                newDiv.appendChild(newTweet);
            }
        });

}

rendering(searchResults);










