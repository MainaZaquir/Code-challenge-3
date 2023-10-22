document.addEventListener("DOMContentLoaded", function() {
    const filmDetails = document.getElementById('film-details');
    const filmMenu = document.getElementById('films');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');

    // Fetch films from the JSON API
    fetch('https://my-json-server.typicode.com/MainaZaquir/Code-challenge-3/films')
        .then(response => response.json())
        .then(data => {
            // Initialize the application
            updateMovieDetails(data.data[0]);
            updateFilmMenu(data.data);
        });

// Function to update the movie details

function updateMovieDetails(movie) {
        filmDetails.innerHTML = `
            <div>
                <img src="${movie.poster}" alt="${movie.title}" style="width: 200px; height: 300px;">
                <h2>${movie.title}</h2>
                <p>Runtime: ${movie.runtime} minutes</p>
                <p>Showtime: ${movie.showtime}</p>
                <p>Available Tickets: ${movie.capacity - movie.tickets_sold}</p>
                <p>Description: ${movie.description}</p>
                <button id="buyTicketBtn">Buy Ticket</button>
            </div>
        `;

            buyTicket.addEventListener('click', () => {
            buyTicket(movie);
        }
      );
    }
    
// Function to update the film menu

    function updateFilmMenu(films) {
        filmMenu.innerHTML = '';
        films.forEach(film => {
          
            const li = document.createElement('li');
            li.classList.add('film', 'item');
          
            if (film.capacity === film.tickets_sold) {
                li.classList.add('sold-out');
            }
          
            li.textContent = film.title;
            li.addEventListener('click', () => {
                updateMovieDetails(film);
            });
            filmMenu.appendChild(li);
        });
    }
    
// Function to handle ticket purchase

 function buyTicket(movie) {
        if (movie.capacity > movie.tickets_sold) {
            movie.tickets_sold++;
            updateMovieDetails(movie);

            // Updating the server with a new ticket count using JSON API
            fetch(`https://my-json-server.typicode.com/MainaZaquir/Code-challenge-3/films/${movie.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                },
                body: JSON.stringify({ data: { type: 'films', id: movie.id, attributes: { tickets_sold: movie.tickets_sold } } }),
            })
            .then(response => response.json())
            .then(data => {
                console.log(`Ticket bought for ${movie.title}`);
                if (movie.capacity === movie.tickets_sold) {
                    const filmItems = filmMenu.getElementsByTagName('li');
                    for (let item of filmItems) {
                        if (item.textContent === movie.title) {
                            item.classList.add('sold-out');
                        }
                    }
                }
                displayModal();
            });
        } else {
            alert('Sorry, the show is sold out!');
        }
    }

// Function to display modal after purchasing a ticket

function displayModal() {
        modal.style.display = 'block';
    }
    
// Close modal on click

closeButton.onclick = function() {
        modal.style.display = "none";
    };
});    
    
    
    
