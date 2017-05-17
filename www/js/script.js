function init() {
	document.addEventListener("deviceready",onDeviceReady, false);
	prepareSearchBTN();
	walidacjaAdresu();
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
	return adres;
}

function walidacjaAdresu(){
	document.querySelector("#settings").addEventListener("blur", function(){
		var reg = new RegExp("[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\:[0-9]+");
		if (!reg.test(this.value)) {
			alert("Niepoprawny adres");
		}
	})

}

function pobierzListeFilmow() {
	var nazwaFilmu=document.querySelector("#myFilter").value;
	var zakodawanaNazwaFilmu= encodeURI(nazwaFilmu);
	wyswietlListeFimow(nazwaFilmu, tmp);

}



function tmp(msg){
	var wiersze = document.querySelectorAll(".filmStyle");
	for (var i = 0; i < wiersze.length; i++) {
		var kontener = document.createDocumentFragment();
		var zdjecie = document.createElement("img");
		zdjecie.setAttribute("src", msg[i].linkDoZdjecia);
		kontener.appendChild(zdjecie);
		var tytul = document.createElement("h3");
		tytul.appendChild(document.createTextNode(msg[i].movieTitle));
		kontener.appendChild(tytul);
		var dane = document.createElement("h5");
		dane.appendChild(document.createTextNode(msg[i].country + ", " + msg[i].releaseDate + ", " + msg[i].movieType));
		kontener.appendChild(dane);
		var opis = document.createElement("p");
		opis.appendChild(document.createTextNode(msg[i].shortDescription));
		kontener.appendChild(opis);
		wiersze[i].appendChild(kontener);

	}
	console.log(wiersze);
}











function wyswietlListeFimow(nazwaFilmu, callback){
	var xml = new XMLHttpRequest();
	var adres = pobierzAdress();
	// Jak bedzie dziaąc to do poprawy
	xml.open("GET", "http://"+adres+"/list-test", true)//nazwaFilmu, true);
	xml.onload = "json";
	xml.onreadystatechange = function(){
		if(this.readyState=== 4 && this.status=== 200)
			callback(JSON.parse(xml.response));
	};
	xml.send();
};
// Poprawic
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
