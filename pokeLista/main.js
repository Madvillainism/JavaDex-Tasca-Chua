const pokeContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const prev = document.querySelector('#previous');
const next  = document.querySelector('#next');


let offset = 1;
let limit = 8;

prev.addEventListener('click', () => {
    if(offset != 1){
        offset -= 9;    
        removeChildNodes(pokeContainer);
    fetchPokes(offset, limit);
    }
    
});

next.addEventListener('click', () => {
   if(offset >=142){
        alert("You can't go to that region!!!");
        offset = 1;
        limit = 8;
        removeChildNodes(pokeContainer);
        fetchPokes(offset, limit);
    } 
    removeChildNodes(pokeContainer);
        offset += 9 ;
    fetchPokes(offset, limit);
    
    
});
//seleccionando el div para manipular

//jalar del api la informacion
function fetchPoke(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json())
    .then(data => {
        createPoke(data);
        spinner.style.display = 'none';
    });
}

//loop para jalar los pokemones
function fetchPokes(offset, limit){
    spinner.style.display = "block";
    for(let i = offset; i <= offset + limit; i++){
        fetchPoke(i);
    }
}

//proceso de creacion de la carta del pokemon
function createPoke(pokemon){
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    flipCard.appendChild(cardContainer);

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

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');

    cardBack.appendChild(progressBars(pokemon.stats));


    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokeContainer.appendChild(flipCard); //añadir carta al div
}

function progressBars(stats){
    const statsCont = document.createElement('div');
    statsCont.classList.add('stats-container');

    for(let i = 0; i < 3; i++){
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + "%";
        const statCont = document.createElement('div');
    statCont.classList.add('stat-container');

    const statName = document.createElement('p');
    statName.textContent = stat.stat.name;

    const progress = document.createElement('div');
    progress.classList.add('progress');

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress-bar');
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statCont.appendChild(statName);
    statCont.appendChild(progress);

    statsCont.appendChild(statCont);
  }

  return statsCont;
    
}

function removeChildNodes(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchPokes(offset, limit);