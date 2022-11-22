const main = document.getElementById("contemain");
const Name = document.getElementById("name");
const Rnames = document.getElementById("registros");
const RnamesC = document.getElementById("registrosC");
const RnamesF = document.getElementById("registrosF");
const RnamesFC = document.getElementById("registrosFC");
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
  fairy: "#FFC0CB",
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
    .catch((err) => renderNotFound(value));
};

const renderNotFound = (value) => {
  Name.textContent = "No encontrado";
  RnamesF.textContent = RnamesF.textContent + " / " + value.toUpperCase();
  textoAreaDividido = RnamesF.textContent.split("/");
  z = textoAreaDividido.length - 1;
  RnamesFC.textContent = z;
  pokeImg.setAttribute("src", "nop.gif");
  pokeImg.style.background = "#fff";
  type1.innerHTML = "";
  type2.innerHTML = "";

  pokeId.textContent = "";
  let i = 0;
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
      a1 =
        "LOCATIONS: " +
        location_area_encounters[0].location_area.name.toUpperCase();
      locals.textContent = a1;
      console.log(locals);
      break;
    case 2:
      a1 =
        "LOCATIONS: " +
        location_area_encounters[0].location_area.name.toUpperCase();
      a2 =
        " /// " + location_area_encounters[1].location_area.name.toUpperCase();

      locals.textContent = a1 + a2;
      console.log(locals);

      break;

    default:
      a1 =
        "LOCATIONS: " +
        location_area_encounters[0].location_area.name.toUpperCase();
      a2 =
        " /// " + location_area_encounters[1].location_area.name.toUpperCase();
      a3 =
        " /// " + location_area_encounters[2].location_area.name.toUpperCase();

      locals.textContent = a1 + a2 + a3;

      console.log(locals);
  }
};

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types, abilities } = data;

  Name.textContent = data.name.toUpperCase();
  Rnames.textContent = Rnames.textContent + " / " + data.name.toUpperCase();
  textoAreaDividido = Rnames.textContent.split("/");
  z = textoAreaDividido.length - 1;
  RnamesC.textContent = z;
  pokeImg.setAttribute("src", sprite);
  pokeId.textContent = `Nº ${data.id}`;

  switch (true) {
    case data.id > 0 && data.id <= 151:
      document.getElementById("reg1").innerHTML=parseInt(document.getElementById("reg1").innerHTML)+1;
      break;
    case data.id >= 152 && data.id <= 251:
      document.getElementById("reg2").innerHTML=parseInt(document.getElementById("reg2").innerHTML)+1;
      break;

    case data.id >= 252 && data.id <= 386:
      document.getElementById("reg3").innerHTML=parseInt(document.getElementById("reg3").innerHTML)+1;
      break;


    case data.id >= 387 && data.id <= 493:
      document.getElementById("reg4").innerHTML=parseInt(document.getElementById("reg4").innerHTML)+1;
      break;
    case data.id >= 494 && data.id <= 649:
      document.getElementById("reg5").innerHTML=parseInt(document.getElementById("reg5").innerHTML)+1;
      break;
    case data.id >= 650 && data.id <= 721:
      document.getElementById("reg6").innerHTML=parseInt(document.getElementById("reg6").innerHTML)+1;
      break;
    case data.id >= 722 && data.id <= 809:
      document.getElementById("reg7").innerHTML=parseInt(document.getElementById("reg7").innerHTML)+1;
      break;
    case data.id >= 810 && data.id <= 898:
      document.getElementById("reg8").innerHTML=parseInt(document.getElementById("reg8").innerHTML)+1;
      break;

    default:
      document.getElementById("reg9").innerHTML=parseInt(document.getElementById("reg9").innerHTML)+1;
      break;
  }

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
    document.getElementById(types[0].type.name).innerHTML=parseInt(document.getElementById(types[0].type.name).innerHTML)+1;

    
    document.getElementById("type2").style.display = "none";
  } else {
    document.getElementById("type2").style.display = "initial";
    type1.textContent = "TYPE 1: " + types[0].type.name.toUpperCase();
    type2.textContent = "TYPE 2: " + types[1].type.name.toUpperCase();
    type1.style.color = typeColors[types[0].type.name];
    type2.style.color = typeColors[types[1].type.name];
    document.getElementById(types[0].type.name).innerHTML=parseInt(document.getElementById(types[0].type.name).innerHTML)+1;
    document.getElementById(types[1].type.name).innerHTML=parseInt(document.getElementById(types[1].type.name).innerHTML)+1;

  }
};

const renderPokemonStats = (stats) => {
  let i = 0;
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
