const container = document.querySelector('.container')
const result = document.querySelector('#result')
const form = document.querySelector('#form')
const messageError  = document.querySelector('.message-error')
const inputPokemon = document.querySelector('#inputPokemon')
const paginatorDiv = document.querySelector('#paginator')
const optiones = document.querySelector('#optiones')
let pokemonsPage = 3 // cuantos pokemones por pagina se van a mostrar
let pokemonInitial = 0 // apartir de que pokemon listamos
let totalPages  // total de paginas 
const totalpokemon = 150

window.onload = () => {
    form.addEventListener('submit', validate)
    inputPokemon.addEventListener('input',filter)
    showPokemons()
};

async function  fetchPokemon  (nameOrId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    return resultado
}
async function fetchPokemons (pokemonInitial,pokemonsPage) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${pokemonInitial}&limit=${pokemonsPage}`
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    return resultado.results
}

async function validate (event)  {
    event.preventDefault()
    const pokemon = inputPokemon.value.toLowerCase()
    if(pokemon === ''){
        showError("Campo vacío")
    }else{
        try{
            const pokemonsearch = await fetchPokemon(pokemon)
            clearHtml(result)
            clearHtml(messageError)
            clearHtml(paginatorDiv)
            inputPokemon.value = ''
            const boton = document.createElement('a')
            boton.href = '#'
            boton.classList.add('text-center')
            boton.textContent = 'Volver al listado general'
            boton.onclick = () =>{
                showPokemons()
            }
            paginatorDiv.appendChild(boton)
            showPokemon(pokemonsearch)}
        catch{
            showError("Este pokemon no existe")
        }
    }
}
async function filter(event) {
    clearHtml(optiones)
    const pokemons =  await fetchPokemons(0,totalpokemon)
    const  text = event.target.value.toLowerCase()
        for (let pokemon of pokemons){
            let name = pokemon.name
            if(name.indexOf(text) === 0  && text.length > 0 && text.length < 6){
                const optionPokemon = document.createElement('option')
                optionPokemon.value = `${name}`
                optiones.appendChild(optionPokemon)
            }
        }
}

async function showPokemons() {
    loader();
    const pokemons =  await fetchPokemons(pokemonInitial,pokemonsPage)
    clearHtml(result)
    for ( let i = 0 ; i<pokemons.length;i++){
            const {url,name} = pokemons[i]
            const pokemon = await fetchPokemon(name)
            showPokemon(pokemon)
    }
    clearHtml(paginatorDiv)
    clearHtml(messageError)
    printPaginator()
}

function  showPokemon (datos) {
    const {name, sprites :{other:{dream_world:{ front_default}}} , types , height,weight,stats,id} = datos
    result.innerHTML  += `             
                         <div class="col-10 offset-1 col-md-4 offset-md-0 ">
                             <div class="poke-card" >                              
                              <img src="${front_default}" class="card-img-top mx-auto img-fluid " alt="...">
                              <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                            <p  class="card-text m-0" >Height : ${height/10}m</p>
                                            <p  class="card-text m-0">Weight :  ${weight/10}kg</p>
                                    <div class="card__body__text__type type${id}">  Type :</div>
                                    <div class="card__stats_stat stats${id} "></div>  
                              </div>
                             </div>
                       
                        </div>
                        `
    types.forEach((item) => {
        const { type : {name} } = item
        const text = document.querySelector(`.type${id}`)
        text.innerHTML += `${name} `
    })
    stats.forEach((stat) => {
        const  {base_stat, stat : {name}}  =  stat
        const text2 = document.querySelector(`.stats${id}`)
        text2.innerHTML += `<div class="card-text card__stats_stat__name" > ${name}        
                            </div>                 
                        <div class="progress">
                                <div class="progress-bar  ${name}${id}" role="progressbar" style="width: 0%" >
                                 ${base_stat}
                                </div>
                        </div>
          
                        `
        const progressBar = document.querySelector(`.${name}${id}`)
        switch(name) {
            case 'hp':
                progressBar.classList.add('bg-success')
                break
            case 'attack':
                progressBar.classList.add('bg-danger')
                break
            case 'defense':
                progressBar.classList.add('bg-warning')
                break
            case 'special-attack':
                progressBar.classList.add('special-attack')
                break
            case 'speed':
                progressBar.classList.add('bg-info')
                break
        }
        progressBar.style.width = `${(base_stat/120)*100}%`
    })
}

function printPaginator ()  {   
    totalPages = pages(totalpokemon)
      const pageactual = pokemonInitial/pokemonsPage + 1;
    console.log(pageactual)
    const itemBack = document.createElement('li')
    itemBack.classList.add('page-item')
    const arrowBack = document.createElement('a')
    arrowBack.classList.add('page-link')
    arrowBack.innerHTML = '<'
    itemBack.appendChild(arrowBack)
    if(pokemonInitial=== 0){
        itemBack.classList.add('disabled')
    }
    if(pokemonInitial > 0){
        arrowBack.href = '#'
        arrowBack.onclick = () =>{
            pokemonInitial = pokemonInitial - pokemonsPage
            showPokemons()

            }
    }
    paginatorDiv.appendChild(itemBack)

    const actualboton = document.createElement('li')
    actualboton.classList.add('page-item')
    const actualItem = document.createElement('a')

     for (let i = 1 ; i< totalPages+1; i++){
        if(i<=2 || i >= totalPages-1){
             const pageitem = document.createElement('li')
            const item = document.createElement('a')
             item.innerHTML = `${i}`
            item.href = '#'
            item.classList.add('page-link',`page${i}`)
            pageitem.classList.add('page-item')
            pageitem.appendChild(item)
            item.onclick = () => {
                pokemonInitial = (i-1)*pokemonsPage
                showPokemons()
            }
            paginatorDiv.appendChild(pageitem)
        }else{
            if(pageactual>2 && pageactual < totalPages-1){
                 actualItem.classList.add('page-link',`page${pageactual}`)
                actualItem.innerHTML = `${pageactual}`
            }else{
                 actualItem.classList.add('page-link')
                actualItem.innerHTML = `...`
            }
            actualboton.appendChild(actualItem)

            paginatorDiv.appendChild(actualboton)
        }
    }

    const itemNext = document.createElement('li')
    itemNext.classList.add('page-item')
    const arrowNext = document.createElement('a')
    arrowNext.classList.add('page-link')
    arrowNext.innerHTML = '>'
    itemNext.appendChild(arrowNext)
     if(pokemonInitial===  totalpokemon - pokemonsPage){
        itemNext.classList.add('disabled')
    }
    if(pokemonInitial < totalpokemon - pokemonsPage){
        arrowNext.href='#'
        arrowNext.onclick = () =>{
            pokemonInitial = pokemonInitial + pokemonsPage
            showPokemons()
        }
    }
    paginatorDiv.appendChild(itemNext)
    const actual = document.querySelector(`.page${pageactual}`)
    actual.parentElement.classList.add('active')

}
function  pages (total)  {
    return parseInt(Math.ceil(total / pokemonsPage))
}

function showError (message)  {
    const confirm = document.querySelector('.message')
    if(!confirm){
        const text = document.createElement('p')
        text.innerHTML = `<strong> ${message}</strong>`
        text.classList.add('message','is-danger')
        messageError.appendChild(text)
        setTimeout(()=> {
            text.remove()
        },3000)
    }
}
function  clearHtml (block) {
    while(block.firstChild){
        block.removeChild(block.firstChild)
    }
}
function  loader() {
    clearHtml(result)
    const divLoader = document.createElement('div')
    divLoader.classList.add('sk-fading-circle')
    divLoader.innerHTML = `
         <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
    `
    result.appendChild(divLoader)
}
