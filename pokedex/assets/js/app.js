        const contenedor = document.getElementById("pokedex");
        const agregarBtn = document.getElementById("agregarBtn");
        const quitarBtn = document.getElementById("quitarBtn");
        const buscarBtn = document.getElementById("buscarBtn");
        const buscador = document.getElementById("buscador");
        const limpiarBtn = document.getElementById("limpiarBtn"); // 🎁 Botón para limpiar 

        // 💡Evita caracteres no alfanuméricos del input
        buscador.addEventListener("input", function () {
           this.value = this.value.replace(/[^a-zA-Z0-9\- ]/g, ''); // 💡 Permite numeros, letras, guiones y espacios
        });

        let contadorPokemon = 1;

        async function obtenerPokemon(id) {
            try {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const data = await res.json();

                return {
                    nombre: data.name,
                    idPokemon: data.id,
                    imagen: data.sprites.other["official-artwork"].front_default,
                    tipo: data.types.map(t => t.type.name).join(", "),
                    tipos: data.types.map(t => t.type.name),
                    experiencia: data.base_experience,
                    peso: data.weight,
                    altura: data.height,
                    habilidades: data.abilities.map(ability => ability.ability.name).join(", ")
 
                     
                };
            } catch (error) {
                alert("Pokémon no encontrado");
                return null;
            }
        }

       function crearCarta(pokemon) {
            const div = document.createElement("div");
            div.classList.add("col");

            const tipoPrincipal = pokemon.tipos[0];
            const tipoClase = tipoPrincipal ? `bg-${tipoPrincipal}` : "";

            // 💡Informacion en las cartas como: Nombre, ID, Peso, Altura, Habilidades, etc...
            div.innerHTML = `
            <div class="card h-100 shadow-sm ${tipoClase} animacion-inicial">
                <img src="${pokemon.imagen}" class="card-img-top bg-white" style="object-fit: contain; height: 200px;" alt="${pokemon.nombre}">
                <div class="card-body">
                    <h5 class="card-title text-capitalize">${pokemon.nombre}</h5>
                    <h6 class="card-title text-capitalize"><strong>n° ID:</strong> ${pokemon.idPokemon}</h6>
                    <p class="card-text"><strong>Tipo:</strong> ${pokemon.tipo}</p>
                    <p class="card-text"><strong>Exp:</strong> ${pokemon.experiencia}</p>
                    <p class="card-text"><strong>Peso:</strong> ${pokemon.peso} | <strong>Altura:</strong> ${pokemon.altura}</p>
                    <p class="card-text"><strong>Habilidades:</strong> ${pokemon.habilidades}</p> 
                </div>
            </div>
            `;

            // 🎁 Animacion al añadir nuevas cartas
            const carta = div.querySelector('.card');
            setTimeout(() => carta.classList.add('mostrar'), 10);

            return div;
        }


        agregarBtn.addEventListener("click", async () => {
            const pokemon = await obtenerPokemon(contadorPokemon);
            if (pokemon) {
                const carta = crearCarta(pokemon);
                contenedor.appendChild(carta);
                contadorPokemon++;
            }
        });

        quitarBtn.addEventListener("click", () => {
            const cartas = contenedor.querySelectorAll(".col");
            if (cartas.length > 0) {
                cartas[cartas.length - 1].remove();
                contadorPokemon--;
            }
        });

        buscarBtn.addEventListener("click", async () => {
            const valor = buscador.value.toLowerCase().trim();
            if (!valor) {
                alert("Ingrese nombre o ID válido") // 💡Mensaje de alerta si se ingresa un nombre o id no valido
                return;
            }

            const pokemon = await obtenerPokemon(valor);
            if (pokemon) {
                const carta = crearCarta(pokemon);
                contenedor.appendChild(carta);
                buscador.value = ""; // 💡Para limpiar el buscador luego realizar una busqueda
            }
        });

         // Funcionalidad del boton para limpiar
        limpiarBtn.addEventListener("click", () => {
            contenedor.innerHTML = "";
             contadorPokemon = 1;
        });

        // Funcionalidad para filtrar Pokemones por: fuego, agua y planta
        function filtrarPorTipo(tipo) {
         const cartas = contenedor.querySelectorAll(".col");
        cartas.forEach(carta => {
         const tipoTexto = carta.querySelector(".card-text").textContent.toLowerCase();
         if (tipoTexto.includes(tipo)) {
        carta.style.display = "block";
         } else {
         carta.style.display = "none";
         }
         });
        }

        // Funcionalidad para volver al estado antes de aplicar el filtro
        function mostrarTodos() {
        const cartas = contenedor.querySelectorAll(".col");
        cartas.forEach(carta => carta.style.display = "block");
        }

        const sel = document.getElementById('filtroTipo');
        sel.addEventListener('change', function() {

        if (!this.value) return;

        switch (this.value) {
        case ' ':
            mostrarTodos()
            break;
        case 'grass':
           filtrarPorTipo('grass');
           break;
        case 'fire':
           filtrarPorTipo('fire');
           break;
        case 'water':
           filtrarPorTipo('water');
           break;
        case 'fire':
           filtrarPorTipo('fire');
           break;
        case 'normal':
           filtrarPorTipo('normal');
           break;
        case 'electric':
           filtrarPorTipo('electric');
           break;
        case 'ice':
           filtrarPorTipo('ice');
           break;
        case 'fighting':
           filtrarPorTipo('fighting');
           break;
        case 'poison':
           filtrarPorTipo('poison');
           break;
        case 'ground':
           filtrarPorTipo('ground');
           break;
        case 'flying':
           filtrarPorTipo('flying');
           break;
        case 'psychic':
           filtrarPorTipo('psychic');
           break;
        case 'bug':
           filtrarPorTipo('bug');
           break;
        case 'rock':
           filtrarPorTipo('rock');
           break;
        case 'ghost':
           filtrarPorTipo('ghost');
           break;
        case 'dragon':
           filtrarPorTipo('dragon');
           break;
        case 'steel':
           filtrarPorTipo('steel');
           break;
        case 'dark':
           filtrarPorTipo('dark');
           break;
        case 'fairy':
           filtrarPorTipo('fairy');
           break;
        }})