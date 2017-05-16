function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
	prepareSearchBTN();
}

function onDeviceReady() {
	navigator.notification.beep(1);
}

function prepareSearchBTN() {
	document.querySelector("#searchButton").addEventListener("click",function(){
		pobierzAdress();
		// var zmiena=checkConnection();
		pobierzListeFilmow();
	})
}
function pobierzAdress(){
	var adres=document.querySelector("#settings").value;
	if (adres=="" || adres==="undefined"){
		alert("Brak adresu");
	}
}

function pobierzListeFilmow() {
	var nazwaFilmu=document.querySelector("#myFilter").value;
	var zakodawanaNazwaFilmu= encodeURI(nazwaFilmu);
	wyswietlListeFimow(nazwaFilmu);

}
function wyswietlListeFimow(nazwaFilmu){
	var xml = new XMLHttpRequest();
	var adres = pobierzAdress();
	xml.open("GET", "http://"+adres+"/list/"+nazwaFilmu, true);
	xml.onload = "json";
	xml.onreadystatechange = function(){
		if (this.readyState === 4)//&& this.readyState === 200)
		 {
			console.log(xml.response);
		}
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
