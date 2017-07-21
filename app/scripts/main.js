var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
var cities = [];
var searchText = document.querySelector('.search');
var list = document.querySelector('.suggestion');

fetch(endpoint)
  .then(function(blob){
    return blob.json();
  })
  .then(function(data){
    data.forEach(function(element){
      cities.push(element);
    });
});

function findWord(wordToFind, cities){
  return cities.filter(function(place){
    var regex = new RegExp(wordToFind, 'gi');
    return place.city.match(regex) || place.state.match(regex)
  });
}

console.log(cities);

function displayResult() {
  var match = findWord(searchText.value, cities);
  var text = match.map(function(place){
    var output = '<li>';
    output += '<span>' + place.city + '</span>';
    output += '<span>population: ' + place.population + '</span>';
    output += '</li>';
    return output;
  });

  list.innerHTML = text;
}

searchText.addEventListener('keyup', displayResult);
