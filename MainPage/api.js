window.onload = function() {
    fetch('https://rickandmortyapi.com/api/character')
    .then(async (data) => {
        const response = await data.json();
        console.log({ response });

        const list = document.getElementById("characters-list");

        const characters = response.results;

        if (Array.isArray(characters)) {
            const limitedCharacters = characters.slice(0, 5);
            limitedCharacters.forEach(character => {
                const characterCard = document.createElement("div");
                characterCard.className = "characterCard";
                characterCard.style.backgroundImage = `url(${character.image})`;
                characterCard.style.backgroundSize = 'cover';
                characterCard.style.backgroundPosition = 'center';

                const characterInfo = document.createElement("div");
                characterInfo.className = "characterInfo";
                characterInfo.innerHTML = `
                    <h2>${(character.name)}</h2>
                    <p>Status: ${translateStatus(character.status)}</p>
                    <p>Espécie: ${translateSpecies(character.species)}</p>
                    <p>Tipo: ${character.type || 'Desconhecido'}</p>
                    <p>Gênero: ${translateGender(character.gender)}</p>
                `;
                

                characterCard.appendChild(characterInfo);
                list.appendChild(characterCard);
            });
        } else {
            console.error("Characters is not an array", characters);
        }
    })
    .catch((error) => {
        console.log(error);
        alert('Erro ao carregar os personagens!');
    });
};

 function translateStatus(status) {
    const statusMap = {
        'Alive': 'Vivo',
        'Dead': 'Morto',
        'unknown': 'Desconhecido'
    };
    return statusMap[status] || status;
}

function translateSpecies(species) {
    const speciesMap = {
        'Human': 'Humano',
        'Alien': 'Alienígena',
        'unknown': 'Desconhecido'
    };
    return speciesMap[species] || species;
}

function translateGender(gender) {
    const genderMap = {
        'Male': 'Masculino',
        'Female': 'Feminino',
        'Genderless': 'Sem Gênero',
        'unknown': 'Desconhecido'
    };
    return genderMap[gender] || gender;
}
