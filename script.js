document.addEventListener('DOMContentLoaded', function () {
    const baseCharacterUrl = 'https://dragonball-api.com/api/characters';
    const basePlanetUrl = 'https://dragonball-api.com/api/planets';
    const characterList = document.getElementById('character-list');
    const planetList = document.getElementById('planet-list');
    const searchInput = document.getElementById('searchInput');

    // Variables para manejar paginación y búsqueda
    let searchQuery = '';
    let allCharacters = [];
    let allPlanets = [];

    // Función para obtener todos los personajes
    function fetchAllCharacters() {
        fetch(`${baseCharacterUrl}?page=1`)
            .then(response => response.json())
            .then(data => {
                allCharacters = data.items;
                const totalPages = data.meta.totalPages;
                // Obtener todas las páginas de personajes
                const pageRequests = [];
                for (let i = 2; i <= totalPages; i++) {
                    pageRequests.push(fetch(`${baseCharacterUrl}?page=${i}`).then(response => response.json()));
                }
                return Promise.all(pageRequests);
            })
            .then(pages => {
                pages.forEach(page => {
                    allCharacters = allCharacters.concat(page.items);
                });
                displayCharacters(allCharacters);
            })
            .catch(error => console.error('Error fetching characters:', error));
    }

    // Función para obtener todos los planetas
    function fetchAllPlanets() {
        fetch(`${basePlanetUrl}?page=1`)
            .then(response => response.json())
            .then(data => {
                allPlanets = data.items;
                const totalPages = data.meta.totalPages;
                // Obtener todas las páginas de planetas
                const pageRequests = [];
                for (let i = 2; i <= totalPages; i++) {
                    pageRequests.push(fetch(`${basePlanetUrl}?page=${i}`).then(response => response.json()));
                }
                return Promise.all(pageRequests);
            })
            .then(pages => {
                pages.forEach(page => {
                    allPlanets = allPlanets.concat(page.items);
                });
                displayPlanets(allPlanets);
            })
            .catch(error => console.error('Error fetching planets:', error));
    }

    // Función para mostrar los personajes en el DOM
    function displayCharacters(characters) {
        characterList.innerHTML = '';
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p><strong>Raza:</strong> ${character.race}</p>
                <p><strong>Género:</strong> ${character.gender}</p>
                <p><strong>Ki:</strong> ${character.ki}</p>
            `;
            characterList.appendChild(characterCard);
        });
    }

    // Función para mostrar los planetas en el DOM
    function displayPlanets(planets) {
        planetList.innerHTML = '';
        planets.forEach(planet => {
            const planetCard = document.createElement('div');
            planetCard.classList.add('planet-card');
            planetCard.innerHTML = `
                <img src="${planet.image}" alt="${planet.name}">
                <h2>${planet.name}</h2>
                <p><strong>Descripción:</strong> ${planet.description}</p>
                <p><strong>Destruido:</strong> ${planet.isDestroyed ? 'Sí' : 'No'}</p>
            `;
            planetList.appendChild(planetCard);
        });
    }

    // Función para filtrar los personajes según la búsqueda
    function filterCharacters(query) {
        const filtered = allCharacters.filter(character => character.name.toLowerCase().includes(query.toLowerCase()));
        displayCharacters(filtered);
    }

    // Función para filtrar los planetas según la búsqueda
    function filterPlanets(query) {
        const filtered = allPlanets.filter(planet => planet.name.toLowerCase().includes(query.toLowerCase()));
        displayPlanets(filtered);
    }

    // Manejar la entrada del usuario para buscar personajes y planetas
    searchInput.addEventListener('input', function () {
        searchQuery = searchInput.value.trim();
        if (searchQuery) {
            filterCharacters(searchQuery);
            filterPlanets(searchQuery);
        } else {
            displayCharacters(allCharacters);
            displayPlanets(allPlanets);
        }
    });

    // Cargar todos los personajes y planetas al inicio
    fetchAllCharacters();
    fetchAllPlanets();
});
