var listaFilmow;
var adres = '192.168.1.4:8080';
var details;
var selectedButton;
var st={};
var ostatni;


function init() {
  document.addEventListener("deviceready", onDeviceReady, false);
  prepareSearchBTN();
  przyotujLinki();
  przygotujUstawienia();
  przygotujHome();
  przygotujHistory(dodaj);
  przygotujPrzypomnienie()
}

function onDeviceReady() {
  navigator.notification.beep(1);

}

function przygotujPrzypomnienie(){
  $("#kalendarBtn").on('click', saveToCalendar);
}

function przygotujHistory(callback){
  $('#history').on("click",  function(){
    ostatni = JSON.parse(localStorage.getItem('last'));
    console.log(ostatni);
    callback(ostatni);
    // if(ostatni != null){
    //   var tytul = document.querySelector("#spTitle").appendChild(document.createTextNode(ostatni.movieTitle));
    // 	document.querySelector("#spInfo").appendChild(document.createTextNode(ostatni.country + ", "  +ostatni.releaseDate))
    //   document.querySelector("#spInfo").appendChild(document.createElement('br'));
    //   document.querySelector("#spInfo").appendChild(document.createTextNode("Gatunek: " + ostatni.movieType + ", Czas trwania: " + ostatni.duration))
    //   document.querySelector("#spInfo").appendChild(document.createElement('br'));
    //   document.querySelector("#spInfo").appendChild(document.createTextNode("Reżyseria: " + ostatni.director))
    //   document.querySelector("#opis").appendChild(document.createTextNode("Opis:"))
    // 	document.querySelector("#picture").setAttribute("src", ostatni.linkDoZdjecia);
    // 	document.querySelector("#spDescription").appendChild(document.createTextNode(ostatni.longDescription));
    //   document.querySelector("#obsada").appendChild(document.createTextNode("Obsada:"))
    //   if(details.emissionDay != null){
    //     var logo=document.querySelector("#logo");
    // 	   logo.setAttribute("src", details.stationLogo);
    // 	   document.querySelector("#emissionDate").appendChild(document.createTextNode(details.station + "  " + details.emissionDay + "." + details.emissionMonth + "." + details.emissionYear + "  " +
    // 	   details.hour + ":" + details.minute  ))
    //    }
    // }
  })
}

function dodaj (ostatni){

  $('#wyszukiwarkaKonter').hide();
  $('#result').hide();
  $('#naglowek').hide();
  $('#spTitle').empty();
  $('#spInfo').empty();
  $('#opis').empty();
  $('#picture').attr("src", null);
  $('#spDescription').empty();
  $('#obsada').empty();
  $('#actores').empty();
  $('#emissionDate').empty();
  $('#emisja').empty();
  $('#logo').attr("src", null);
  $('#calendar').hide();
  console.log(ostatni.longDescription)
  if(ostatni !== null){
    var tytul = document.querySelector("#spTitle").appendChild(document.createTextNode(ostatni.movieTitle));
    document.querySelector("#spInfo").appendChild(document.createTextNode(ostatni.country + ", "  +ostatni.releaseDate))
    document.querySelector("#spInfo").appendChild(document.createElement('br'));
    document.querySelector("#spInfo").appendChild(document.createTextNode("Gatunek: " + ostatni.movieType + ", Czas trwania: " + ostatni.duration))
    document.querySelector("#spInfo").appendChild(document.createElement('br'));
    document.querySelector("#spInfo").appendChild(document.createTextNode("Reżyseria: " + ostatni.director))
    document.querySelector("#opis").appendChild(document.createTextNode("Opis:"))
    document.querySelector("#picture").setAttribute("src", ostatni.linkDoZdjecia);
    document.querySelector("#spDescription").appendChild(document.createTextNode(ostatni.longDescription));
    if(details.emissionDay != null){
      var logo=document.querySelector("#logo");
       logo.setAttribute("src", details.stationLogo);
       document.querySelector("#emissionDate").appendChild(document.createTextNode(details.station + "  " + details.emissionDay + "." + details.emissionMonth + "." + details.emissionYear + "  " +
       details.hour + ":" + details.minute  ))
     }
  }
}

// przygotowanie guzika home
 function przygotujHome(){
  $("#glowna").on('click', function(){
    $('#wyszukiwarkaKonter').show();
    $('#result').show();
    $('#naglowek').show();
    $('#spTitle').empty();
    $('#spInfo').empty();
    $('#opis').empty();
    $('#picture').attr("src", null);
    $('#spDescription').empty();
    $('#obsada').empty();
    $('#actores').empty();
    $('#emissionDate').empty();
    $('#emisja').empty();
    $('#logo').attr("src", null);
    $('#calendar').hide();
  })
};

// ustawienie adresu servera
function przygotujUstawienia(){
  $('#ustawienia').on('click', function(){
    adres =window.prompt('Please enter server address');
  })
};
// koniec ustawiania adresu servera

function prepareSearchBTN() {
  document.querySelector("#searchButton").addEventListener("click", function() {
    pobierzListeFilmow();
  })
  $('#calendar').hide();
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
    var tytul = document.createElement("h2");
    tytul.appendChild(document.createTextNode(msg[i].movieTitle));
    wiecej.appendChild(tytul);
    zdjecie.setAttribute("src", msg[i].linkDoZdjecia);
    zdjecie.className += 'img-rounded';
    zdjecie.style.width = '400px';
    zdjecie.style.height = '300px';
    kontener.appendChild(zdjecie);
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
  linki[0].addEventListener("click", function() {
    pobierzDetale(0, wstawDetale);
  });
  linki[1].addEventListener("click", function() {
    pobierzDetale(1, wstawDetale);
  });
  linki[2].addEventListener("click", function() {
    pobierzDetale(2, wstawDetale());
  });

}

function wstawDetale(details) {
  injectDetailsTemplate();
  st.movieTitle = listaFilmow[selectedButton].movieTitle;
  st.country = listaFilmow[selectedButton].country;
  st.releaseDate = listaFilmow[selectedButton].releaseDate;
  st.movieType = listaFilmow[selectedButton].movieType;
  st.duration =details.duration;
  st.duration = details.director;
  st.linkDoZdjecia = listaFilmow[selectedButton].linkDoZdjecia;
  st.longDescription = details.longDescription;
  st.actors = details.actors;
  st.stationLogo=details.stationLogo;
  st.station = details.station;
  st.emissionDay =details.emissionDay;
  st.emissionMonth = details.emissionMonth;
  st.emissionYear = details.emissionYear;
  st.hour = details.hour;
  st.minute = details.minute;
  console.log(st.movieTitle);
	var tytul = document.querySelector("#spTitle").appendChild(document.createTextNode(listaFilmow[selectedButton].movieTitle));
	document.querySelector("#spInfo").appendChild(document.createTextNode(listaFilmow[selectedButton].country + ", "  +listaFilmow[selectedButton].releaseDate))
  document.querySelector("#spInfo").appendChild(document.createElement('br'));
  document.querySelector("#spInfo").appendChild(document.createTextNode("Gatunek: " + listaFilmow[selectedButton].movieType + ", Czas trwania: " + details.duration))
  document.querySelector("#spInfo").appendChild(document.createElement('br'));
  document.querySelector("#spInfo").appendChild(document.createTextNode("Reżyseria: " + details.director))
  document.querySelector("#opis").appendChild(document.createTextNode("Opis:"))
	document.querySelector("#picture").setAttribute("src", listaFilmow[selectedButton].linkDoZdjecia);
	document.querySelector("#spDescription").appendChild(document.createTextNode(details.longDescription));
  document.querySelector("#obsada").appendChild(document.createTextNode("Obsada:"))
	var kontener = document.createDocumentFragment();
	for (var i = 0; i < details.actors.length; i++) {
		var element = document.createElement("li");
		element.appendChild(document.createTextNode(details.actors[i]));
		kontener.appendChild(element);
	}
	document.querySelector("#actores").appendChild(kontener);
  if(details.emissionDay != null){
    document.querySelector("#emisja").appendChild(document.createTextNode("Emisja:"))
    var logo=document.querySelector("#logo");
	   logo.setAttribute("src", details.stationLogo);
	   document.querySelector("#emissionDate").appendChild(document.createTextNode(details.station + "  " + details.emissionDay + "." + details.emissionMonth + "." + details.emissionYear + "  " +
	   details.hour + ":" + details.minute  ))
     $('#calendar').show();
   }


}

function pobierzDetale(numer, callback) {
  var xml = new XMLHttpRequest();
  selectedButton = numer;
  xml.open("GET", "http://" + adres + "/details"+listaFilmow[numer].refToMoreInfo, true); //nazwaFilmu, true);
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
  xml.open("GET", "http://" + adres + "/list/" +nazwaFilmu, true) //nazwaFilmu, true);
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

function injectDetailsTemplate(){
  $('#wyszukiwarkaKonter').hide();
  $('#result').hide();
  $('#naglowek').hide();
}

function saveToCalendar(){
  // var startDate = new Date(st.emissionYear,st.emissionMonth-1,st.emissionDay,st.hour,st.minute-15,0,0,0); // beware: month 0 = january, 11 = december
  // var endDate = new Date(st.emissionYear,st.emissionMonth-1,st.emissionDay,st.hour+1,st.minute,0,0,0);
  var startDate = new Date(2017, 8, 10, 20, 10)
  var endDate = new Date(2017, 8, 10, 22, 10)
  var title = "Transmisja "+ st.movieTitle +" na kanale "+ st.station;
  var eventLocation = "Home";
  var notes = "Milego seansu";
  var success = function(message) { alert("Przypomnienie zostalo dodane"); };
  var error = function(message) { alert("Blad" + message); };
  saveToDataStorage();
  window.plugins.calendar.createEvent("tytul","home","Milego seansu",startDate,endDate,success,error);

}

function saveToDataStorage(){
  localStorage.setItem('last', JSON.stringify(st));
}
