'use strict';
require('module/common.js');

var currentTimeActive = 1;
var unixTimer = 0;
function unix2human() {
    var a = new Date(document.getElementById("unix2beijing").value * 1000);
    beijingTimeValue = a.getFullYear() + "/" + (a.getMonth() + 1) + "/" + a.getDate() + " " + a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
    document.getElementById("unix2beijing_ok").innerHTML = beijingTimeValue
}
function human2unix() {
    var a = new Date(Date.UTC(document.getElementById("beijing2unix_nian").value, (stripLeadingZeroes(document.getElementById("beijing2unix_yue").value) - 1), stripLeadingZeroes(document.getElementById("beijing2unix_ri").value), stripLeadingZeroes(document.getElementById("beijing2unix_shi").value), stripLeadingZeroes(document.getElementById("beijing2unix_fen").value), stripLeadingZeroes(document.getElementById("beijing2unix_miao").value)));
    document.getElementById("beijing2unix_ok").innerHTML = (a.getTime() / 1000 - 8 * 60 * 60)
}
function stripLeadingZeroes(a) {
    if ((a.length > 1) && (a.substr(0, 1) == "0")) {
        return a.substr(1)
    } else {
        return a
    }
}
function currentTime() {
    var a = new Date();
    document.getElementById("currentunixtime").innerHTML = Math.round(a.getTime() / 1000);
    if (currentTimeActive) {
        unixTimer = setTimeout("currentTime()", 1000)
    }
}
function startTimer() {
    currentTimeActive = 1;
    currentTime()
}
function stopTimer() {
    currentTimeActive = 0;
    clearTimeout(unixTimer)
}
startTimer();