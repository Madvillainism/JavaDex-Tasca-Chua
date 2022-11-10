const Buscar_pokemon = document.querySelector(".Busar");
const Boton = document.querySelector(".Boton");
const pokemonContenedor = document.querySelector(".pokemon-container");

let lista_Busqueda = [];

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
        fetch(`https://pokeapi.co/api/v2/pokemon/${ value.toLowerCase() }`)
        .then((res) => res.json())
        .then((data) => {
            tarjetaPokemon(data);
            /* lista_Busqueda.push(data.pokemon.name); */
            /* lista_Busqueda.push(tarjetaPokemon(data)); */
        })       
    
}


function Buscar(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => {
        tarjetaPokemon(data);
        spinner.style.display = "none";
    })
} 

function fetchListaPokemon(offset, limit){
    spinner.style.display = "block";
    for(let i = offset; i <= offset + limit; i++){
        Buscar(lista_Busqueda(i));
    }
}


function tarjetaPokemon(pokemon){
    const card = document.createElement('div');
    card.classList.add('Contenedor-Pokemon');

    const imgContenedor = document.createElement('div');
    imgContenedor.classList.add('img-Contenedor');

    const sprite = document.createElement('img');
    sprite.src= pokemon.sprites.front_default;

    imgContenedor.appendChild(sprite);

    const cont_P = document.createElement('div');
    cont_P.classList.add('cont_P');

    const numero = document.createElement('p');
    numero.textContent = "ID: " + `#${pokemon.id.toString().padStart(3,0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent ="Nombre: " +  pokemon.name;

    const base_experiencia = document.createElement('p');
    base_experiencia.classList.add('base_experience');
    base_experiencia.textContent = "Base Experiencia: " + pokemon.base_experience;

    const altura = document.createElement('p');
    altura.classList.add('heigth');
    altura.textContent = "Altura: " + pokemon.height + " decímetros";

    const peso = document.createElement('p');
    peso.classList.add('weight');
    peso.textContent = "Peso: " + pokemon.weight + " hectogramos";

    const tipo = document.createElement('p');
    tipo.classList.add('type');
    tipo.textContent = "Tipo: " + pokemon.types[0].type.name;

    card.appendChild(imgContenedor);
    cont_P.appendChild(numero);
    cont_P.appendChild(name);
    cont_P.appendChild(base_experiencia);
    cont_P.appendChild(altura);
    cont_P.appendChild(peso);
    cont_P.appendChild(tipo);
    card.appendChild(cont_P);
    pokemonContenedor.appendChild(card);
}
