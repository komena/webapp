angular.module('yapp')
.factory('webService', ['$http', '$localStorage', function(http, localStorage){
    var webServiceUrl = "http://localhost:3000"; // "http://api.payment.akintoye.me/"; // appConfig.apiUrl;
    var config = {
        dataType: 'jsonp',
        headers: {}
    };
    if(localStorage.token != undefined){
        config.headers = localStorage.token;
    }

    var api = {};
    api.resourceType = {};

    api.resolveEndPoint = function (url) {
        var endPoint = webServiceUrl;
        // if(url.constructor === Array){ //check if url is an array
        //     //flatten array and inject '/'
        //     for(i in url){
        //         endPoint += (i > 0 ? '/' : '') + url[i];
        //     }
        // }
        // else{ //not an array, return as is
        //     endPoint += '/' + url;
        // }
        return  endPoint += '/' + url + '.json';
    }

    api.get = function (url) {
        var endPoint = api.resolveEndPoint(url);
        delete http.defaults.headers.common.Authorization;
        var responsePromise = http.get(endPoint, config);
        return responsePromise;
    };

    api.post = function (url, data) {
        var endPoint = api.resolveEndPoint(url);
        // var formData = data;
        var responsePromise = http.post(endPoint, data, config);
        return responsePromise;
    }

    api.put = function (url, data) {
        var endPoint = api.resolveEndPoint(url);
        var responsePromise = http.put(endPoint, data, config);
        return responsePromise;
    }

    api.delete = function (url) {
        var endPoint = api.resolveEndPoint(url);
        var responsePromise = http.delete(endPoint, config);
        return responsePromise;
    }

    // api.upload = function (url, data, file) {
    //     var endPoint = api.resolveEndPoint(url);
    //     var payload = {};
    //     payload.url = endPoint;
    //     payload.method = 'POST';
    //     payload.file = file;
    //     payload.sendFieldsAs = 'form';
    //     payload.fields = data;
    //     payload.headers = config.headers;
    //     return Upload.upload(payload, config);
    // }

    api.console = function (data) {
        console.log(data);
    }

    api.resetData = function() {
      config.headers = localStorage.token;
    }

    return api;
}]);