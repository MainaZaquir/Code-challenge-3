document.addEventListener("DOMContentLoaded", function() {
    const filmDetails = document.getElementById('film-details');
    const filmMenu = document.getElementById('films');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    
    // Function to fetch the films from the server
    async function fetchFilms() {
        try {
            const response = await fetch('http://localhost:3000/films');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching films:', error);
            return [];
        }
    }

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

        const buyTicketBtn = document.getElementById('buyTicketBtn');
        buyTicketBtn.addEventListener('click', () => {
            buyTicket(movie);
        });
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
    async function buyTicket(movie) {
        if (movie.capacity > movie.tickets_sold) {
            movie.tickets_sold++;
            updateMovieDetails(movie);

            try {
                const response = await fetch(`http://localhost:3000/films/${movie.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(movie)
                });
                if (!response.ok) {
                    throw new Error('Failed to update the movie details');
                }
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
            } catch (error) {
                console.error('Error buying ticket:', error);
            }
        } else {
            alert('Sorry, the show is sold out!');
        }
    }

    // Function to display the modal after purchasing a ticket
    function displayModal() {
        modal.style.display = 'block';
    }

    // Closing the modal on click
    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    // Initializing the application
    fetchFilms().then(films => {
        updateMovieDetails(films[0]);
        updateFilmMenu(films);
    });
});
