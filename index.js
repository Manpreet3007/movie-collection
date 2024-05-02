function uiSearchMovie() {
    console.log('Button Clicked')
    const apiUrl = 'https://search.imdbot.workers.dev/?';
    const movieName = document.getElementById("movie-name");
    console.log(movieName)
    const fullUrl = apiUrl+'q='+movieName.value;
    console.log(fullUrl)

// Make a GET request
fetch(fullUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    if(data.description.length == 0) {
        let container = document.querySelector(".movie-details")
        container.innerHTML = "No movies with the name found"
    } else 
        populateMovieCards(data)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function populateMovieCards(movieData){
    //console.log(movieData);
    let movieContainer = document.querySelector(".movie-details")
    movieContainer.innerHTML='';
    //console.log(movieContainer)
                    for (let i = 0; i <= movieData.description.length; i++) {
                        let div = document.createElement("div");
                        //div.classList.add("card");
                        console.log(movieData);
                        div.innerHTML = `<div class="card" style="width: 18rem;">
                        <img style="width: 16rem; height: 20rem" src="${movieData.description[i]['#IMG_POSTER']}" class="card-img-top" alt="No Image Available">
                        <div class="card-body">
                          <h5 class="card-title">${movieData.description[i]['#TITLE']}</h5>
                          <p class="card-text">
                          <h6>Year - ${movieData.description[i]['#YEAR']}<h6>
                        <h6>Cast - ${movieData.description[i]['#ACTORS']}</h6>
                          </p>
                          <a href="${movieData.description[i]['#IMDB_URL']}" target="_blank" class="btn btn-primary">Go to IMDB</a>
                        </div>
                      </div>`;
                        movieContainer.appendChild(div);
                        //let startInput = document.querySelector(`#startaddress${[i]}`);
                        //startInput.value = addresses[i];
                    }
}