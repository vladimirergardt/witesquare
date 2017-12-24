
/*global fetch */
"use strict";
//--------------------------

getSearchTweets("Hello");

function getSearchTweets(q) {

    var primOotionsSignature = {
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

    var encodeObject = encode(primOotionsSignature);

    function stringParameter(object) {

        return  Object
            .keys(object)
            .sort()
            .map( function (key) {
                var value = object[key];
                return  key + "=" + value;
            })
            .join("&");
    }

    var parameterString =  stringParameter(encodeObject);

    function signatureHTTPSString() {
        var HTTPStr = "https://api.twitter.com/1.1/search/tweets.json";
        return "GET&" + percentEncode(HTTPStr) + "&";
    }

    function signatureBaseString() {
        return signatureHTTPSString() + percentEncode(parameterString);
    }

    var SignatureBseString = signatureBaseString();

    var secretObj = {
        ConsumerSecret: "yA1OfYOi8aDV4u4s0lA5WcGsbid0pmiUoG3a8Gl8gkuXL1KqSO",
        TokenSecret: "GN7BHgC1FlYS2KsxuGjf6wkYrTnYLIJHtNuDn8K2aGiD8"
    };

    function getSigningKey(object) {
        return Object
            .keys(object)
            .map( function(item) {
                var value = object[item];
                return percentEncode(value);
            })
            .join("&");
    }
    var key = getSigningKey(secretObj);
    var sha1 = percentEncode(CryptoJS.HmacSHA1(SignatureBseString, key).toString());
    var words = CryptoJS.enc.Hex.parse(sha1);
    var signature = CryptoJS.enc.Base64.stringify(words);

    function getAuthorization() {
        var consumerKey = percentEncode(primOotionsSignature.oauth_consumer_key);
        var nonce = percentEncode(primOotionsSignature.oauth_nonce);
        var timestamp = percentEncode(primOotionsSignature.oauth_timestamp);
        var accessToken = percentEncode(primOotionsSignature.oauth_token);
        return  'OAuth '                                             +
            'oauth_consumer_key="'  + consumerKey       + '", ' +
            'oauth_nonce="'         + nonce             + '", ' +
            'oauth_signature="'     + percentEncode(signature) + '", ' +
            'oauth_signature_method="HMAC-SHA1", '              +
            'oauth_timestamp="'     + timestamp         + '", ' +
            'oauth_token="'         + accessToken       + '", ' +
            'oauth_version="1.0"'                               ;
    }

    var authorization = getAuthorization();

    var status = function (response) {
        if (response.status !== 200) {
            return Promise.reject(new Error(response.statusText));
        }
        return Promise.resolve(response);
    };
    var json = function (response) {
        return response.json();
    };

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

}


