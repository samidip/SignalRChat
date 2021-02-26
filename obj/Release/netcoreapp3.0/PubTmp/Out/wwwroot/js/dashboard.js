"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/dashboardHub").build();

document.getElementById("sendDashButton").disabled = true;

connection.on("ReceiveDashUpdate", function (dashupdate) {
    var encodedMsg = "Dash Update: " + dashupdate;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("dashUpdateList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendDashButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendDashButton").addEventListener("click", function (event) {
    var gaugeupdate = document.getElementById("gaugeValue").value;    
    connection.invoke("SendDashboardUpdate", gaugeupdate).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("sendObjButton").addEventListener("click", function (event) {
    var chartdata = [{ "category": "A", "value": 5 }, { "category": "B", "value": 10 }];
    connection.invoke("SendObjectUpdate", chartdata).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
