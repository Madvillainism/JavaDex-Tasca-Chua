const pokeContainer = document.querySelector('.pokemon-container')
//seleccionando el div para manipular

//jalar del api la informacion
function fetchPoke(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => createPoke(data));
}

//loop para jalar los pokemones
function fetchPokes(numbers){
    for(let i = 1; i <= numbers; i++){
        fetchPoke(i);
    }
}

//proceso de creacion de la carta del pokemon
function createPoke(pokemon){
    const card = document.createElement('div');

    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');

    spriteContainer.classList.add('image-container');

    const sprite = document.createElement('img');

    sprite.src= pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');

    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`

    const name = document.createElement('p');

    name.classList.add('name');

    name.textContent = pokemon.name;

    card.appendChild(spriteContainer); //añadir todo a la carta
    card.appendChild(number);
    card.appendChild(name);

    pokeContainer.appendChild(card); //añadir carta al div
}

fetchPokes(9);