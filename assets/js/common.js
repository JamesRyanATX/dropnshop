var errMessage = $("#error-message");
var loader = $(".loader-parent-div");
var errDesc = {}, storeToDC = {}, dcToFC = {};
var loggerInfo={
    "requestURL":null,
    "correlationID":null,
    "requestHeader":null,
    "requestBody":null,
    "responseBody":null,
    "requestType":null,
    "isError":null
};

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return decodeURI(results[1]) || 0;
    }
}

// Get AppPlatform from th URL  
if(window.location.href.indexOf('appPlatform') > 0){
    window.localStorage.setItem('appPlatform', $.urlParam('appPlatform'));
}

if(window.location.href.indexOf('associateType') > 0){
    window.localStorage.setItem('associateType', $.urlParam('associateType'));
}

if(window.location.href.indexOf('offline') > 0){
    window.localStorage.setItem('offline', $.urlParam('offline'));
}

function getHeaders(){
    var requestHeaderObj = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Location": "store",
        "Location-Number": localStorage.getItem("Location-Number"),
        "associate-id": localStorage.getItem("associateId"),
        "x-correlation-id": getCorrelationID(),
        'X-KOHLS-CorrelationID': getCorrelationID()
    };

    if(window.localStorage.getItem('associateType') == 'VENDOR'){
        requestHeaderObj['associate-type'] = 'VENDOR';
    }

    return requestHeaderObj;
}

// // Set App Platform
// function AppPlatform(platform) {
//     window.localStorage.setItem('appPlatform', platform);
// }


function CheckPrinterStatus(status) {
    window.localStorage.setItem('printerStatus', status);
}

function printerStatusCheck(){
    window.localStorage.setItem('printerStatus', '');
    if (((typeof (window.external) !== "undefined") && (typeof (window.external.notify) !== "undefined")) || window.localStorage.getItem('appPlatform') == 'UWP') {
        window.external.notify('CheckPrinterStatus');
    }

    if ((typeof Android !== "undefined") && window.localStorage.getItem('appPlatform') == 'Android') {
        Android.checkPrinterStatus();
    }
}

function connectPrinter(){
    if(window.localStorage.getItem('printerStatus') == 'Unpaired'){
        if (((typeof (window.external) !== "undefined") && (typeof (window.external.notify) !== "undefined")) || window.localStorage.getItem('appPlatform') == 'UWP') {
            window.external.notify('ConnectToPrinter');
        }

        if ((typeof Android !== "undefined") && window.localStorage.getItem('appPlatform') == 'Android') {
            Android.connectToPrinter();
        }
    }
}

function initializeAppData() {
    errDesc = JSON.parse(localStorage.getItem("errors"));
    storeToDC = JSON.parse(localStorage.getItem("storeToDC"));
    dcToFC = JSON.parse(localStorage.getItem("dcToFC"));
    version = localStorage.getItem("version") != null && localStorage.getItem("version") != ''? localStorage.getItem("version") : 'v1.0';
}

function errorTone(){
    if(((typeof (window.external) !== "undefined") && (typeof (window.external.notify) !== "undefined")) || window.localStorage.getItem('appPlatform') == 'UWP'){
        window.external.notify(' ~Error');
    }

    if ((typeof Android !== "undefined") && window.localStorage.getItem('appPlatform') == 'Android') {
        Android.error(' ~Error');
    }
}

function printLabel(printObj) {
    if (((typeof (window.external) !== "undefined") && (typeof (window.external.notify) !== "undefined")) || window.localStorage.getItem('appPlatform') == 'UWP') {
        window.external.notify(printObj);
    }

    if ((typeof Android !== "undefined") && window.localStorage.getItem('appPlatform') == 'Android') {
        Android.printLabels(printObj);
    }
}

function checkDigits(trackingID){
    var digits = new RegExp("[^0-9]"),
        str = trackingID;
    if(str.length > 3 && digits.test(str.substring(3))){
        errorTone();
        errMessage.html("Invalid Tracking ID");
        log("~Message | Error Invalid Tracking ID", "Error")
        return false;
    }
    return true;
}

function checkLength(len){
    errMessage.html("");
    if(len > 0 && len < 13){
        errorTone();
        errMessage.html('Invalid Tracking ID must be 13 digits');
        log("~Message | Error Invalid Tracking ID must be 13 digits", "Error")
        return false;
    }

    return true;
}

//Initialize on every page load
$(document).ready(function () {
    initializeAppData();
    $('#version-id').html(version);

    $('.validate-tracking-id').on('change paste', function(){
        var strLength = this.value.length;
        if(!checkLength(strLength)){
            this.value = this.value.slice(0,13); //return false won't prevent android from going past 13 digits.
            return false;
        }
    });

    // Validating tracking ID 
    $('.validate-tracking-id').on('keyup', function(e){
        var str = this.value, 
            strLength = str.length;

        var digits = new RegExp("[^0-9]");

        errMessage.html("");

        if(strLength > 2 && str.toUpperCase().indexOf('KOH') != 0){
            this.value = this.value.slice(0,2); //return false won't prevent android from breaking rule.
            errMessage.html("Invalid. Tracking ID should start with 'KOH'");
            log("~TrackingID | " + str + "~Message | Invalid. Tracking ID should start with 'KOH'", "Error");
            errorTone();
            return false;
        }

        if(strLength > 3 && str.toUpperCase().indexOf('KOH0') != 0 && str.toUpperCase().indexOf('KOH1') != 0){
            this.value = this.value.slice(0,3); //return false won't prevent android from breaking rule.
            errMessage.html("Invalid. After 'KOH' must be a digit '0' or '1'");
            log("~TrackingID | " + str + "~Message | Invalid. After 'KOH' must be a digit '0' or '1'", "Error");
            errorTone();
            return false;
        }

        if (strLength > 3 && digits.test(str.substring(3))){
            this.value = this.value.slice(0,str.substring(3).search(/[\D]/g) + 3); //return false won't prevent android from breaking rule.
            errMessage.html("Invalid. Digits only allowed after 'KOH'");
            log("~TrackingID|" + str + "~Message | Invalid. Digits only allowed after 'KOH'", "Error");
            errorTone();
            return false;
        }
    });
});

//convert input values to UPPERCASE
$('input').on("change paste keyup", function () {
    this.value = this.value.toUpperCase();
});

// Max Length 13
function isValidTrackingID(trackingID) {
    if(!checkLength(trackingID.length)){
        return false;
    }
    if(!checkDigits(trackingID)){
        return false;
    }
    var regEx = new RegExp('^KOH[0-1][a-zA-Z0-9]{1,9}$');
    var tID = trackingID.trim().toUpperCase();

    if (!regEx.test(tID)) {
        errorTone();
        errMessage.html('Invalid Tracking ID');
        log("~TrackingID | " + trackingID + "~Message | Invalid Tracking ID", "Error");
        return false;
    } else {
        return tID;
    }
}

// Max Length 24
function isValidSortBinID(binID) {
    var regEx = new RegExp('^SB[0-9]{4}[a-zA-Z0-9]{1,18}$');
    var bID = binID.trim().toUpperCase();

    if (!regEx.test(bID)) {
        errorTone();
        errMessage.html('Invalid License Plate');
        log("~BindID | " + binID + "~Message | Common.JS : Invalid License Plate", "Error");
        return false;
    } else {
        return bID;
    }
}

// Max Length 12
function isValidTrailerID(trailerID) {
    var regEx = new RegExp('^KT[A-Z0-9]{1,10}$');
    var tID = trailerID.trim().toUpperCase();

    if (!regEx.test(tID)) {
        errorTone();
        errMessage.html('Invalid Trailer ID');
        log("~TrailerID|" + trailerID + "~Message | Invalid Trailer ID", "Error");
        return false;
    } else {
        return tID;
    }
}

// Max Length 26
function isValidTruckID(truckID) {
    var reg = /((^01[0-9]+[A-Z]+)|(^01[A-Z]+[0-9]+))+[0-9A-Z]+$/
    var tID = truckID.trim();
    if (truckID.length > 26 || !(reg.test(tID))) {
        errorTone();
        errMessage.html('Invalid Trailer ID.');
        log("~TrailerID |" + truckID + "~Message | Invalid Trailer ID", "Error");
        return false;
    } else {
        return true;
    }
}

function getCorrelationID() {
    var random4Digit = Math.floor(1000 + Math.random() * 9000);
    return Date.now() + '_' + random4Digit + '_AMZ-RET_' + 'Store' + '_' + localStorage.getItem("Location-Number") + '_' + window.localStorage.getItem('appPlatform');
}

function replaceNull(resp){
    var val;
    
    for (var key in resp) {
        if (resp.hasOwnProperty(key)) {
            val = resp[key];
            resp[key] = (val == null) ? "" : val;
        }
    }
    
    return resp;
}

function htmlEncode(value){
    return $('<div/>').text(value).html();
}
  
function htmlDecode(value){
    return $('<div/>').html(value).text();
}

function setClientIdAndSecretKeyForPromotionsAPI(creds) {
    if (!creds) {
        log("~Message | creds string for promotions API is empty", "Error");
        return;
    }
    let credsJsonObj = JSON.parse(creds);    
    let clientId = credsJsonObj.ClientId;
    let secretKey = credsJsonObj.SecretKey;
    if (!clientId || !secretKey) {
        log("~Message | ClientID and SecretKey for promotions API is empty", "Error");
        return;
    }
    window.localStorage.setItem('promotionsAPIClientIDAndSecretKey', btoa(clientId+":"+secretKey));
}
