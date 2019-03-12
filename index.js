'use strict';

const searchURL = 'https://api.github.com';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
    console.log(responseJson[i].html_url)
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <a href=${responseJson[i].html_url}><p>${responseJson[i].html_url}</p></a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getNews(query) {
  const endpoint = `/users/${query}/repos`;
  const url = searchURL + endpoint;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getNews(searchTerm);
  });
}

$(watchForm);
