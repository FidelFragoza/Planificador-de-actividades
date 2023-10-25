
const citas = [
    "Un objetivo sin un plan es solo un deseo. - Antoine de Saint-Exupéry",
    "Los objetivos son sueños con fecha de vencimiento. - Diana Scharf",
    "Los objetivos solo pueden ser alcanzados a través de un vehículo de plan que nosotros mismos controlamos y estamos seguros de seguir. - Pablo Picasso",
    "Los objetivos son sueños con fecha de vencimiento. - Diana Scharf",
    "El camino hacia el éxito es el camino hacia la libertad. No puedes tener éxito si no sabes hacia dónde te diriges. Establecer y lograr objetivos es la receta para la libertad. - Brian Tracy",
    "Nuestros objetivos solo pueden ser alcanzados a través de un vehículo de plan que nosotros mismos controlamos y estamos seguros de seguir. - Pablo Picasso",
    "Si no tienes un objetivo, cualquier camino te llevará a él. - Lewis Carroll",
    "Los objetivos son los eventos y circunstancias que deseamos alcanzar. Los valores son el combustible que nos lleva allí. - Zig Ziglar",
    "La vida puede ser entendida mirando hacia atrás, pero debe ser vivida mirando hacia adelante. - Søren Kierkegaard",
    "Un objetivo no siempre debe llevar a un resultado; puede ser simplemente algo en lo que estás interesado, lo que te gustaría hacer. Y aún en ese caso, no significa que estés definitivamente comprometido. - Abraham Maslow",
    "Un objetivo claro, firme y apasionado es la mayor fuerza en el mundo. - Ralph Marston",
    "Lo más importante en la vida es tener un objetivo. - Geoffrey F. Abert",
    "Si no tienes un objetivo, cualquier cosa que hagas será inútil. - Jules Renard",
    "Un objetivo es un sueño con una fecha de entrega. - Napoleon Hill",
    "Cualquier cosa que la mente del hombre pueda concebir y creer, se puede lograr. - Napoleon Hill",
    "Si no cambias la dirección, es probable que termines llegando donde te diriges. - Lao-Tsé"
];

document.getElementById("objetives").addEventListener("click", () => {
    // Selecciona una cita aleatoria
    const citaAleatoria = citas[Math.floor(Math.random() * citas.length)];

    // Crea el overlay
    const citaOverlay = document.createElement("div");
    citaOverlay.classList.add("cita-overlay");

    // Crea el contenedor de la cita
    const citaContainer = document.createElement("div");
    citaContainer.classList.add("cita-container");

    // Crea el párrafo de la cita
    const citaTexto = document.createElement("p");
    citaTexto.textContent = citaAleatoria;

    // Crea el botón de cierre
    const botonCerrar = document.createElement("button");
    botonCerrar.textContent = "Cerrar";
    botonCerrar.classList.add("boton-cerrar");

    // Agrega los elementos al overlay
    citaContainer.appendChild(citaTexto);
    citaContainer.appendChild(botonCerrar);
    citaOverlay.appendChild(citaContainer);

    // Agrega el overlay al cuerpo del documento
    document.body.appendChild(citaOverlay);

    // Agrega un evento de clic en el overlay para cerrar la cita
    citaOverlay.addEventListener("click", () => {
        document.body.removeChild(citaOverlay);
    });
});
