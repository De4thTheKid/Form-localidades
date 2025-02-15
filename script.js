document.addEventListener("DOMContentLoaded", async () => {
    const localidadSelect = document.getElementById("localidad");
    const municipioSelect = document.getElementById("municipio");

    try {
        // URL directa del JSON de municipios de Yucatán en el repo
        const response = await fetch("https://raw.githubusercontent.com/carlosascari/Mexico.json/master/Yucat%C3%A1n/Municipios.json");
        const datos = await response.json();

        // Poblar el select de localidades
        datos.forEach(entry => {
            const option = document.createElement("option");
            option.value = entry.nombre;
            option.textContent = entry.nombre;
            localidadSelect.appendChild(option);
        });

        // Evento para cargar municipios cuando cambia la localidad
        localidadSelect.addEventListener("change", async () => {
            municipioSelect.innerHTML = "<option value=''>Seleccione un municipio</option>";
            const selectedLocalidad = localidadSelect.value;

            if (selectedLocalidad) {
                try {
                    const municipioResponse = await fetch(`https://raw.githubusercontent.com/carlosascari/Mexico.json/master/Yucat%C3%A1n/${selectedLocalidad}.json`);
                    const municipios = await municipioResponse.json();

                    municipios.forEach(municipio => {
                        const option = document.createElement("option");
                        option.value = municipio.nombre;
                        option.textContent = municipio.nombre;
                        municipioSelect.appendChild(option);
                    });
                } catch (error) {
                    console.error("Error al cargar los municipios:", error);
                }
            }
        });

    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
});

const form = document.getElementById('formulario');
const userList = document.getElementById('listaUsuarios');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const userData = {
        name: formData.get('nombre'),
        surname: formData.get('apellidos'),
        address: formData.get('direccion'),
        locality: formData.get('localidad'),
        municipality: formData.get('municipio'),
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        displayUserData(userData); // Use userData instead of data
        form.reset();
    })
    .catch(error => console.error('Error:', error));
});

function displayUserData(user) {
    const listItem = document.createElement('li');
    const nohay = document.getElementById('noRegistros');
    nohay.style.display = 'none';
    listItem.textContent = `${user.name} ${user.surname}, ${user.address}, ${user.locality}, ${user.municipality}`;
    userList.appendChild(listItem);
}
