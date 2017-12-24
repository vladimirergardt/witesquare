
/*global fetch */
"use strict";
//--------------------------

var data = searchTweets("star wars")
    .then(function (value) {
        return value;
    })
     .catch(function (error) {
         console.log('error', error);
     });

console.log(data);



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
        count: "4"
    };



    function encode(object) {
        return Object
            .keys(object)
            .reduce(function (result, key) {
                result[percentEncode(key)] = percentEncode(object[key]);
                return result;
            }, {});
    }

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

    function getAuthorizationHeader() {

        return  'OAuth '                                                +
            'oauth_consumer_key="'          + consumerKey       + '", ' +
            'oauth_nonce="'                 + nonce             + '", ' +
            'oauth_signature="'      + percentEncode(signature) + '", ' +
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

     var url = "/api/search/tweets.json?q="+ q +"&result_type=mixed&count=4";
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

function signatureHTTPSString() {
    var HTTPStr = "https://api.twitter.com/1.1/search/tweets.json";
    return "GET&" + percentEncode(HTTPStr) + "&";
}












