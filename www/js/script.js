var listaFilmow;
var adres;
var details;


function init() {
  document.addEventListener("deviceready", onDeviceReady, false);
  prepareSearchBTN();
  przyotujLinki();
  przygotujUstawienia();
}

function onDeviceReady() {
  navigator.notification.beep(1);

}

// ustawienie adresu servera
function przygotujUstawienia(){
  $('#ustawienia').on('click', function(){
    adres =   window.prompt('Please enter server address');
  })
};
// koniec ustawiania adresu servera


function prepareSearchBTN() {
  document.querySelector("#searchButton").addEventListener("click", function() {
    pobierzListeFilmow();
  })
}


function pobierzListeFilmow() {
  var nazwaFilmu = document.querySelector("#myFilter").value;
  var zakodawanaNazwaFilmu = encodeURI(nazwaFilmu);
  wyswietlListeFimow(nazwaFilmu, pokazListeFilmow);

}

//####################################################

// tutaj dodajemy elementy wyswietlajace sie po nacisnieciu guzika wyszukiwania
function pokazListeFilmow(msg) {
  listaFilmow = msg;
  var wiersze = document.querySelectorAll(".filmStyle");
  $('#result').addClass("active");
  for (var i = 0; i < wiersze.length; i++) {
    var kontener = document.createDocumentFragment();
    var zdjecie = document.createElement("img");
    var wiecej = document.createElement("div");
    wiecej.className = "filmWiecej";
    zdjecie.setAttribute("src", msg[i].linkDoZdjecia);
    kontener.appendChild(zdjecie);
    var tytul = document.createElement("h3");
    tytul.appendChild(document.createTextNode(msg[i].movieTitle));
    wiecej.appendChild(tytul);
    var dane = document.createElement("h5");
    dane.appendChild(document.createTextNode(msg[i].country + ", " + msg[i].releaseDate + ", " + msg[i].movieType));
    wiecej.appendChild(dane);
    var opis = document.createElement("p");
    opis.appendChild(document.createTextNode(msg[i].shortDescription));
    wiecej.appendChild(opis);

    kontener.appendChild(wiecej)
    wiersze[i].textContent = "";
    wiersze[i].appendChild(kontener);
  }
}
//############################################################################

function przyotujLinki() {
  var linki = document.querySelectorAll(".filmStyle");
  for (var i = 0; i < linki.length; i++) {
    linki[i].addEventListener("click", function() {
      pobierzDetale(wstawDetale.bind(this));
    });
  }

}

function wstawDetale() {
  var button = this.id;
  var selectedButton;
  switch (button) {
    case "movie1":
      selectedButton = 0;
      break;
    case "movie2":
      selectedButton = 1;
      break;
    case "movie3":
      selectedButton = 2;
      break;
    default:
  }
	var tytul = document.querySelector("#spTitle").appendChild(document.createTextNode(listaFilmow[selectedButton].movieTitle));
	document.querySelector("#spInfo").appendChild(document.createTextNode(listaFilmow[selectedButton].country + ", "  +listaFilmow[selectedButton].releaseDate))
  document.querySelector("#spInfo").appendChild(document.createElement('br'));
  document.querySelector("#spInfo").appendChild(document.createTextNode("Gatunek: " + listaFilmow[selectedButton].movieType + ", Czas trwania: " + details.duration))
  document.querySelector("#spInfo").appendChild(document.createElement('br'));
  document.querySelector("#spInfo").appendChild(document.createTextNode("Reżyseria: " + details.director))
	document.querySelector("#picture").setAttribute("src", listaFilmow[selectedButton].linkDoZdjecia);
	document.querySelector("#spDescription").appendChild(document.createTextNode(details.longDescription));
	var kontener = document.createDocumentFragment();
	for (var i = 0; i < details.actors.length; i++) {
		var element = document.createElement("li");
		element.appendChild(document.createTextNode(details.actors[i]));
		kontener.appendChild(element);
	}
	document.querySelector("#actores").appendChild(kontener);
	document.querySelector("#logo").setAttribute("src", details.stationLogo);
	document.querySelector("#emissionDate").appendChild(document.createTextNode(details.station + "  " + details.emissionDay + "." + details.emissionMonth + "." + details.emissionYear + "  " +
	 details.hour + ":" + details.minute  ))


}

function pobierzDetale(callback) {
  var xml = new XMLHttpRequest();
  // Jak bedzie dziaąc to do poprawy
  xml.open("GET", "http://" + adres + "/api/detale-test", true) //nazwaFilmu, true);
  xml.onload = "json";
  xml.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
			details=JSON.parse(xml.response);
      callback(JSON.parse(xml.response));

    }
  };
  xml.send();

};


function wyswietlListeFimow(nazwaFilmu, callback) {
  var xml = new XMLHttpRequest();
  // Jak bedzie dziaąc to do poprawy
  xml.open("GET", "http://" + adres + "/list-test", true) //nazwaFilmu, true);
  xml.onload = "json";
  xml.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      callback(JSON.parse(xml.response));
    }
  };
  xml.send();

};
// Poprawic
function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN] = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI] = 'WiFi connection';
  states[Connection.CELL_2G] = 'Cell 2G connection';
  states[Connection.CELL_3G] = 'Cell 3G connection';
  states[Connection.CELL_4G] = 'Cell 4G connection';
  states[Connection.CELL] = 'Cell generic connection';
  states[Connection.NONE] = 'No network connection';

  if (networkState == states[Connection.NONE]) {
    alert("Brak sieci");
    return false;
  }
  return true;
}
