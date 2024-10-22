const [container1, container2, container3, launch1, launch2, launch3] = ['container1', 'container2', 'container3', 'launch1', 'launch2', 'launch3'].map(id => document.getElementById(id));

const totalCharacters = 17;
let charactersData = [];
let firstGenerator, secondGenerator, thirdGenerator;

async function fetchData() {
    for (let id = 1; id <= totalCharacters; id++) {
        try {
            const idFinal = id === 17 ? 18 : id; // Ajuste para el personaje 17
            const url = `https://swapi.dev/api/people/${idFinal}/`; 
            const response = await fetch(url);
            const data = await response.json();
            charactersData.push(data); // Guardar todos los datos en un array
        } catch (error) {
            console.error(error.message);
        }
    }
    // Inicializa los generadores después de haber cargado todos los datos
    firstGenerator = charactersGenerator(0, 4); // 0 a 4 para personajes 1 a 5
    secondGenerator = charactersGenerator(5, 10); // 5 a 10 para personajes 6 a 11
    thirdGenerator = charactersGenerator(11, 16); // 11 a 16 para personajes 12 a 17
}

fetchData();

class Character {
    constructor(name, height, mass, color) {
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.color = color;
    }

    createCard() {
        const container = document.createElement('div');
        container.className = 'col-12 col-md-6 col-lg-4 mb-3'; // Añadido margen inferior
        container.innerHTML = `
            <div class="single-timeline-content d-flex wow fadeInLeft" style="visibility: visible; animation-name: fadeInLeft;">
                <div class="timeline-icon" style="background-color: ${this.color};"></div>
                <div class="timeline-text">
                    <h6><b>${this.name}</b></h6>
                    <p><b>Estatura:</b> ${this.height}cm. <b>Peso:</b> ${this.mass}kg.</p>
                </div>
            </div>
        `;
        return container;
    }
}

function* charactersGenerator(min, max) {
    for (let i = min; i <= max; i++) {
        yield charactersData[i]; // Devuelve el personaje desde el array
    }
}

function showCharacter(generator, container, color) {
    const resultado = generator.next();

    // Si el generador no ha terminado (aún hay personajes disponibles)
    if (!resultado.done) {
        const personajeData = resultado.value;
        console.log(personajeData);

        // Crea una nueva instancia de la clase Character con los datos obtenidos
        const personaje = new Character(personajeData.name, personajeData.height, personajeData.mass, color);
        // Añade la tarjeta del personaje al contenedor correspondiente
        container.appendChild(personaje.createCard());
    } else {
        console.log('No hay más personajes para mostrar.');
    }
}

launch1.addEventListener('click', () => {
    showCharacter(firstGenerator, container1, '#dc3545'); // Color de lanzamiento 1 (bg-danger)
});

launch2.addEventListener('click', () => {
    showCharacter(secondGenerator, container2, '#28a745'); // Color de lanzamiento 2 (bg-success)
});

launch3.addEventListener('click', () => {
    showCharacter(thirdGenerator, container3, '#17a2b8'); // Color de lanzamiento 3 (bg-info)
});