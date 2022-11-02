const main = document.getElementById("contemain");
const Name = document.getElementById("name");
const pokeId = document.getElementById("pokeId");
const pokeImg = document.getElementById("pokeimg");
const pokeImgContainer = document.getElementById("imgcon");
const type1 = document.getElementById("type1");
const type2 = document.getElementById("type2");
const ability = document.getElementById("abilities");
const locals = document.getElementById("locations");

const typeColors = {
  electric: "#FFEA70",
  normal: "#B09398",
  fire: "#FF675C",
  water: "#0596C7",
  ice: "#AFEAFD",
  rock: "#999799",
  flying: "#7AE7C7",
  grass: "#4A9681",
  psychic: "#FFC6D9",
  ghost: "#561D25",
  bug: "#A2FAA3",
  poison: "#795663",
  ground: "#D2B074",
  dragon: "#DA627D",
  steel: "#1D8A99",
  fighting: "#2F2F2F",
  default: "#2A1A1F",
};



const searchPokemon = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((data) => data.json())
    .then((response) => renderPokemonData(response))
    .catch((err) => renderNotFound());
};

const searchLocation = (event) => {
  event.preventDefault();
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}/encounters`)
    .then((location_area_encounters) => location_area_encounters.json())
    .then((response) => localizaciones(response))
    .catch((err) => renderNotFound());

};



const renderNotFound = () => {
  Name.textContent = "No encontrado";
  pokeImg.setAttribute("src", "nop.gif");
  pokeImg.style.background = "#fff";
  type1.innerHTML = "";
  type2.innerHTML = "";

  pokeId.textContent = "";
  let i =0;
  let nel;
  locals.textContent = "";
  ability.textContent = "";

  do {

    nel = document.getElementById("stat" + i).innerHTML;

    document.getElementById("stat" + i).textContent =
      nel.substring(0, 8) + ":" + "";
    i++;

  } while (i < 6);



};


const localizaciones = (location_area_encounters) => {
  let long = location_area_encounters.length;
  let a1 = "";
  let a2 = "";
  let a3 = "";
  console.log(location_area_encounters);

  switch (long) {
    case 0:
      locals.textContent = "LOCATIONS:---";
    
     break;

    case 1:
      a1 = "LOCATIONS: " + location_area_encounters[0].location_area.name.toUpperCase();
      locals.textContent = a1;
console.log(locals)
      break;
    case 2:
      a1 = "LOCATIONS: " + location_area_encounters[0].location_area.name.toUpperCase();
      a2 = " /// " + location_area_encounters[1].location_area.name.toUpperCase();

      locals.textContent = a1 + a2;
      console.log(locals)

      break;

    default:
      a1 = "LOCATIONS: " + location_area_encounters[0].location_area.name.toUpperCase();
      a2 = " /// " + location_area_encounters[1].location_area.name.toUpperCase();
      a3 = " /// " + location_area_encounters[2].location_area.name.toUpperCase();

      locals.textContent = a1 + a2+a3;

      console.log(locals)


  }



};

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types, abilities } = data;

  Name.textContent = data.name.toUpperCase();
  pokeImg.setAttribute("src", sprite);
  pokeId.textContent = `Nº ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  abil(abilities);
  renderPokemonStats(stats);
};

const CardColo = (types, img) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  img.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  img.style.backgroundSize = " 5px 5px";
};

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  pokeImg.style.backgroundSize = " 5px 5px";
};

const abil = (abilities) => {
  let long = abilities.length;
  let a1 = "";
  let a2 = "";
  let a3 = "";

  switch (long) {
    case 1:
      a1 = "ABILITIES: " + abilities[0].ability.name.toUpperCase();
      ability.textContent = a1;

      break;
    case 2:
      a1 = "ABILITIES: " + abilities[0].ability.name.toUpperCase();
      a2 = "/" + abilities[1].ability.name.toUpperCase();

      ability.textContent = a1 + a2;

      break;
    case 3:
      a1 = "ABILITIES: " + abilities[0].ability.name.toUpperCase();
      a2 = "/" + abilities[1].ability.name.toUpperCase();
      a3 = "/" + abilities[2].ability.name.toUpperCase();
      ability.textContent = a1 + a2 + a3;

      break;

    default:
  }
};

const renderPokemonTypes = (types) => {
  if (types.length < 2) {
    type1.style.color = typeColors[types[0].type.name];
    type1.textContent = "TYPE: " + types[0].type.name.toUpperCase();
    document.getElementById("type2").style.display = "none";
  } else {
    document.getElementById("type2").style.display = "initial";
    type1.textContent = "TYPE 1: " + types[0].type.name.toUpperCase();
    type2.textContent = "TYPE 2: " + types[1].type.name.toUpperCase();
    type1.style.color = typeColors[types[0].type.name];
    type2.style.color = typeColors[types[1].type.name];
  }
};

const renderPokemonStats = (stats) => {
  let i =0;
  let nel;
  do {

    nel = document.getElementById("stat" + i).innerHTML;

    document.getElementById("stat" + i).textContent =
      nel.substring(0, 8) + ":" + stats[i].base_stat;
    i++;

  } while (i < 6);
};

const CargaInicial = (event) => {
  let i = 0;
  do {
    i++;

    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((data) => data.json())
      .then((response) => Carga(response));
  } while (i < 12);
  pag.textContent = 1;
  document.getElementById("atra").disabled = true;
  document.getElementById("siga").disabled = false;
};

const sig = (event) => {
  let i = 0;
  let f = document.getElementById("pag").innerHTML;
  let k = 12 * f;
  let ivr = "";
  do {
    i++;
    k++;
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${k}`)
      .then((data) => data.json())
      .then((response) => CargaA(response));
  } while (i < 12);
  pag.textContent = parseInt(document.getElementById("pag").innerHTML) + 1;
  document.getElementById("atra").disabled = false;
  document.getElementById("siga").disabled = false;
  ivr = document.getElementById("textA7").innerHTML;

  if (ivr == "#139") {
    document.getElementById("atra").disabled = false;
    document.getElementById("siga").disabled = true;
    document.getElementById("C8").style.display = "none";
    document.getElementById("C9").style.display = "none";
    document.getElementById("C10").style.display = "none";
    document.getElementById("C11").style.display = "none";
    document.getElementById("C12").style.display = "none";
  } else;
};

const ata = (event) => {
  let i = 0;
  let f = parseInt(document.getElementById("pag").innerHTML);
  let k = 12 * (f - 2);
  let ver = "";
  do {
    i++;
    k++;
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${k}`)
      .then((data) => data.json())
      .then((response) => CargaA(response));
  } while (i < 12);
  pag.textContent = parseInt(document.getElementById("pag").innerHTML) - 1;
  ver = document.getElementById("textA1").innerHTML;
  if (ver == "#13") {
    document.getElementById("atra").disabled = true;
    document.getElementById("siga").disabled = false;
  } else {
    document.getElementById("siga").disabled = false;
  }

  if (ver == "#145") {
    document.getElementById("C8").style.display = "initial";
    document.getElementById("C9").style.display = "initial";
    document.getElementById("C10").style.display = "initial";
    document.getElementById("C11").style.display = "initial";
    document.getElementById("C12").style.display = "initial";
  } else {
    document.getElementById("siga").disabled = false;
  }
};

const Carga = (data) => {
  const img = document.getElementById("image" + data.id);
  const textA = document.getElementById("textA" + data.id);
  const textB = document.getElementById("textB" + data.id);
  const textC = document.getElementById("textC" + data.id);

  const sprite = data.sprites.front_default;
  img.setAttribute("src", sprite);
  CardColo(data.types, img);
  textA.textContent = "#" + data.id;
  textB.textContent = data.name.toUpperCase();

  if (data.types.length < 2) {
    textC.textContent = data.types[0].type.name.toUpperCase();
  } else {
    textC.textContent =
      data.types[0].type.name.toUpperCase() +
      "/" +
      data.types[1].type.name.toUpperCase();
  }
};

const CargaA = (data) => {
  let f = 12 * (document.getElementById("pag").innerHTML - 1);
  const cosa = parseInt(data.id) - f;

  const img = document.getElementById("image" + cosa);
  const textA = document.getElementById("textA" + cosa);
  const textB = document.getElementById("textB" + cosa);
  const textC = document.getElementById("textC" + cosa);

  const sprite = data.sprites.front_default;
  img.setAttribute("src", sprite);
  CardColo(data.types, img);
  textA.textContent = "#" + data.id;
  textB.textContent = data.name.toUpperCase();
  if (data.types.length < 2) {
    textC.textContent = data.types[0].type.name.toUpperCase();
  } else {
    textC.textContent =
      data.types[0].type.name.toUpperCase() +
      "/" +
      data.types[1].type.name.toUpperCase();
  }
};
