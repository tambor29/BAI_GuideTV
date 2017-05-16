function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
	prepareSearchBTN();
}

function onDeviceReady() {
	navigator.notification.beep(1);
}

function prepareSearchBTN() {

	document.querySelector("#searchButton").addEventListener("click",function(){
		console.log("test");
		pobierzAdress();
	})
}
function pobierzAdress(){
	var adres=document.querySelector("#settings").value;
	if (adres=="" || adres==="undefined"){
		alert("Brak adresu");
	}
	else {
		console.log(adres);
	}
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

		if (networkState==states[Connection.NONE] ) {
	 		alert("Brak sieci");
			return false;

 	}
	return true;
}
