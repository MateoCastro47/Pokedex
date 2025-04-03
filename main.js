const listPokemon = document.querySelector("#listPokemon");
const botonesHeader = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";

const pokemons = [];

async function fetchPokemons() {
    for (let i = 1; i <= 151; i++) {
        await fetch(URL + i)  // Se podría hacer sin await, pero así evitamos demasiadas peticiones simultáneas
            .then(response => response.json())
            .then(data => pokemons.push(data));
    }

    // Ordenamos los Pokémon por su ID antes de mostrarlos
    pokemons.sort((a, b) => a.id - b.id);

    // Mostramos los Pokémon en el orden correcto
    pokemons.forEach(poke => mostrarPokemon(poke));
}
function mostrarPokemon(poke){

    let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    const height = (poke.height / 10).toFixed(1) + "m";
    const weight = (poke.weight / 10).toFixed(1) + "kg";
    div.innerHTML = `
        <p class="pokemon-id-back">#${poke.id}</p>
        <div class="pokemonImage">
            <img src=${poke.sprites.other["official-artwork"].front_default} alt=${poke.name}>
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemonId">${poke.id}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos} 
            </div>
            <div class="pokemon-stats">
                <p class="stat">${height}</p>
                <p class="stat">${weight}</p>
            </div>
        </div>
    `;
    listPokemon.append(div);
}
fetchPokemons();

botonesHeader.forEach(boton => boton.addEventListener("click", (event) =>{
    const botonId = event.currentTarget.id;
    listPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
         fetch(URL + i)  // Se podría hacer sin await, pero así evitamos demasiadas peticiones simultáneas
            .then(response => response.json())
            .then(data => {
                if(botonId == "ver-todos"){
                    mostrarPokemon(data);
                }else{
                    const tipos = data.types.map(type => type.type.name)
                    if (tipos.some(tipo => tipo.includes(botonId))){
                        mostrarPokemon(data);
                    }
                }
            });
    }
}))