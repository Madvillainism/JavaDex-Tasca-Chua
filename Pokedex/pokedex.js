
const P = new Pokedex.Pokedex();

const colours = {
	normal: '#A8A77A',
	fire: '#EE8130',
	water: '#6390F0',
	electric: '#F7D02C',
	grass: '#7AC74C',
	ice: '#96D9D6',
	fighting: '#C22E28',
	poison: '#A33EA1',
	ground: '#E2BF65',
	flying: '#A98FF3',
	psychic: '#F95587',
	bug: '#A6B91A',
	rock: '#B6A136',
	ghost: '#735797',
	dragon: '#6F35FC',
	dark: '#705746',
	steel: '#B7B7CE',
	fairy: '#D685AD',
};

const input = document.querySelector(".Form__Input");
const button = document.querySelector(".Form__Button");

const showContainer = document.querySelector(".Show");

const pokeContainer = document.querySelector(".Show__Pokemon");
const pokeSprite = document.querySelector(".Pokemon__Sprite")

const infoContainer = document.querySelector(".Show__Info");
const infoName = document.querySelector(".Info__Name");
const infoType = document.querySelector(".Info__Type");
const infoAbilities = document.getElementById("abilities");

const filterInput = ()=>{
  let value = input.value.toString().toLowerCase();
  return value;
}

const showPokemon = async (inputName)=>{
    const pokemon = await P.getPokemonByName(inputName);
    const color = colours[pokemon.types[0].type.name];
    const id = pokemon.id;

    infoName.textContent = `#${id} - ${pokemon.name.toUpperCase()}`,
    infoName.style.color = color;
    infoType.style.backgroundColor = color;
    pokeSprite.src = pokemon.sprites.front_default;
    pokeContainer.style.backgroundColor = color;
    pokeContainer.style.boxShadow = `0 0 .8rem ${color}`;
    addAbilities(pokemon.abilities);

    infoType.textContent = pokemon.types[0].type.name.toUpperCase();
    // console.log(pokemon.types[0].type.name);
    console.log(pokemon);
}

const addAbilities = abilities=>{
  abilities.forEach(ability=>{
    let item = document.createElement("h4");
    item.classList.add("Info__Item");
    item.textContent = ability.ability.name;
    infoAbilities.appendChild(item);
  })
}


button.addEventListener("click",(e)=>{
  e.preventDefault();
  let name = filterInput();
  showPokemon(name);
})

showPokemon("rapidash");

