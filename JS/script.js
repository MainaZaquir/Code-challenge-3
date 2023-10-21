document.addEventListener("DOMContentLoaded", function() {
    const filmDetails = document.getElementById('film-details');
    const filmMenu = document.getElementById('films');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');

    // Simulating data from the JSON file
    const films = [
   {
     "id": "1",
     "title": "The Giant Gila Monster",
     "runtime": "108",
     "capacity": 30,
     "showtime": "04:00PM",
     "tickets_sold": 27,
     "description": "A giant lizard terrorizes a rural Texas community and a heroic teenager attempts to destroy the creature.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/2157/p2157_v_v8_ab.jpg"
   },
   {
     "id": "2",
     "title": "Manos: The Hands Of Fate",
     "runtime": "118",
     "capacity": 50,
     "showtime": "06:45PM",
     "tickets_sold": 44,
     "description": "A family gets lost on the road and stumbles upon a hidden, underground, devil-worshiping cult led by the fearsome Master and his servant Torgo.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/47781/p47781_v_v8_ac.jpg"
   },
   {
     "id": "3",
     "title": "Time Chasers",
     "runtime": "93",
     "capacity": 50,
     "showtime": "09:30PM",
     "tickets_sold": 31,
     "description": "An inventor comes up with a time machine, but must prevent its abuse at the hands of an evil C.E.O.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/23342/p23342_v_v8_ab.jpg"
   },
   {
     "id": "4",
     "title": "The Touch Of Satan",
     "runtime": "101",
     "capacity": 40,
     "showtime": "09:00PM",
     "tickets_sold": 31,
     "description": "A young man meets a farm girl who is actually a witch.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/43468/p43468_v_v8_aa.jpg"
   },
   {
     "id": "5",
     "title": "Santa Claus Conquers The Martians",
     "runtime": "96",
     "capacity": 50,
     "showtime": "03:30PM",
     "tickets_sold": 45,
     "description": "The Martians kidnap Santa Claus because there is nobody on Mars to give their children presents.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/4232/p4232_v_v8_aa.jpg"
   },
   {
     "id": "6",
     "title": "Track Of The Moon Beast",
     "runtime": "112",
     "capacity": 30,
     "showtime": "10:30PM",
     "tickets_sold": 16,
     "description": "A young man is transformed into a hideous 'moon beast' due to a meteor fragment lodged in his body.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/39804/p39804_v_v8_ab.jpg"
   },
   {
     "id": "7",
     "title": "The Skydivers",
     "runtime": "94",
     "capacity": 30,
     "showtime": "07:30PM",
     "tickets_sold": 22,
     "description": "A woman seeks revenge on her former lover, who owns a skydiving business.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/40518/p40518_v_v8_aa.jpg"
   },
   {
     "id": "8",
     "title": "The Killer Shrews",
     "runtime": "115",
     "capacity": 40,
     "showtime": "08:30PM",
     "tickets_sold": 32,
     "description": "On an isolated island, a small group of people are terrorized by giant voracious shrews in the midst of a hurricane.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/1466/p1466_v_v8_ab.jpg"
   },
   {
     "id": "9",
     "title": "Project Moon Base",
     "runtime": "99",
     "capacity": 40,
     "showtime": "07:30PM",
     "tickets_sold": 22,
     "description": "A saboteur posing as a scientist strives to destroy the world's first space station.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/46755/p46755_v_v8_aa.jpg"
   },
   {
     "id": "10",
     "title": "The Giant Spider Invasion",
     "runtime": "122",
     "capacity": 50,
     "showtime": "10:00PM",
     "tickets_sold": 44,
     "description": "Giant spiders from another dimension invade Wisconsin.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/42171/p42171_v_v8_ab.jpg"
   },
   {
     "id": "11",
     "title": "Catalina Caper",
     "runtime": "104",
     "capacity": 30,
     "showtime": "06:00PM",
     "tickets_sold": 12,
     "description": "A group of swingin' teens take time out from having fun in the sun to try to foil a group of crooks searching for a stolen scroll.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/58122/p58122_v_v8_aa.jpg"
   },
   {
     "id": "12",
     "title": "Secret Agent Super Dragon",
     "runtime": "104",
     "capacity": 30,
     "showtime": "07:00PM",
     "tickets_sold": 20,
     "description": "A series of murders in Michigan lead an American secret agent to Amsterdam, where he uncovers a plot to imperil the world with a potent new drug.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/93417/p93417_v_v8_aa.jpg",
     "showing_id": "12"
   },
   {
     "id": "13",
     "title": "Wild Rebels",
     "runtime": "100",
     "capacity": 40,
     "showtime": "09:00PM",
     "tickets_sold": 31,
     "description": "A stock car driver goes undercover as the wheel man for a motorcycle gang.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/45367/p45367_v_v8_aa.jpg"
   },
   {
     "id": "14",
     "title": "Danger: Diabolik",
     "runtime": "111",
     "capacity": 50,
     "showtime": "08:00PM",
     "tickets_sold": 40,
     "description": "International man of mystery Diabolik and his lover pull off heist after heist, all while European cops led by Inspector Ginko and envious mobsters led by Ralph Valmont are closing in on them.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/11850/p11850_v_v8_aa.jpg"
   },
   {
     "id": "15",
     "title": "Village Of The Giants",
     "runtime": "98",
     "capacity": 50,
     "showtime": "04:45PM",
     "tickets_sold": 33,
     "description": "Delinquent teen-agers ingest a substance and grow thirty feet tall, then proceed to take over a small town.",
     "poster": "https://www.gstatic.com/tv/thumb/v22vodart/37991/p37991_v_v8_aa.jpg"
   }
        
 ];

    // Function updating the movie details
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

    // Function updating the film menu
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

    // Function handling ticket purchase
    function buyTicket(movie) {
        if (movie.capacity > movie.tickets_sold) {
            movie.tickets_sold++;
            updateMovieDetails(movie);
            // Simulating server update
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
    updateMovieDetails(films[0]);
    updateFilmMenu(films);
});
