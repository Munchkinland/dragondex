document.addEventListener('DOMContentLoaded', function () {
    const baseCharacterUrl = 'https://dragonball-api.com/api/characters';
    const basePlanetUrl = 'https://dragonball-api.com/api/planets';
    const characterList = document.getElementById('character-list');
    const planetList = document.getElementById('planet-list');
    const searchInput = document.getElementById('searchInput');

    let searchQuery = '';
    let allCharacters = [];
    let allPlanets = [];

    let zoomedElement = null;

    function fetchAllCharacters() {
        fetch(`${baseCharacterUrl}?page=1`)
            .then(response => response.json())
            .then(data => {
                allCharacters = data.items;
                const totalPages = data.meta.totalPages;
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

    function fetchAllPlanets() {
        fetch(`${basePlanetUrl}?page=1`)
            .then(response => response.json())
            .then(data => {
                allPlanets = data.items;
                const totalPages = data.meta.totalPages;
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

    function displayCharacters(characters) {
        characterList.innerHTML = '';
        characters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            characterCard.dataset.characterId = character.id; // Añadir ID para referencia
            characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h2>${character.name}</h2>
                <p><strong>Raza:</strong> ${character.race}</p>
                <p><strong>Género:</strong> ${character.gender}</p>
                <p><strong>Ki:</strong> ${character.ki}</p>
            `;
            characterCard.addEventListener('click', () => toggleZoom(characterCard));
            characterList.appendChild(characterCard);
        });
    }

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
            planetCard.addEventListener('click', () => toggleZoom(planetCard));
            planetList.appendChild(planetCard);
        });
    }

    function filterCharacters(query) {
        const filtered = allCharacters.filter(character => character.name.toLowerCase().includes(query.toLowerCase()));
        displayCharacters(filtered);
    }

    function filterPlanets(query) {
        const filtered = allPlanets.filter(planet => planet.name.toLowerCase().includes(query.toLowerCase()));
        displayPlanets(filtered);
    }

    function toggleZoom(element) {
        if (zoomedElement && zoomedElement !== element) {
            zoomedElement.classList.remove('zoomed');
        }
        if (zoomedElement === element) {
            zoomedElement.classList.remove('zoomed');
            zoomedElement = null;
        } else {
            element.classList.add('zoomed');
            zoomedElement = element;
        }
    }

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

    fetchAllCharacters();
    fetchAllPlanets();
});
