const iconArrow = document.getElementById("window-arrow");

iconArrow.addEventListener("click", function () {
    // URL de la página que quieres cargar en la ventana emergente
    const urlArrow = "ventana-calculadora.html";

    // Abre la ventana emergente
    window.open(urlArrow, "arrow", "width=533,height=650");
});

const iconAwards = document.getElementById("window-awards");

iconAwards.addEventListener("click", function () {
    // URL de la página que quieres cargar en la ventana emergente
    const urlAwards = "premios.html";

    // Abre la ventana emergente
    window.open(urlAwards, "awards", "width=533,height=650");
});

const iconInfo = document.getElementById("window-info");

iconInfo.addEventListener("click", function () {
    // URL de la página que quieres cargar en la ventana emergente
    const urlInfo = "info.html";

    // Abre la ventana emergente
    window.open(urlInfo, "info", "width=845,height=756");
});

const iconCalendar = document.getElementById("window-calendar");

iconCalendar.addEventListener("click", function () {
    // URL de la página que quieres cargar en la ventana emergente
    const urlCalendar = "calendar.html";

    // Abre la ventana emergente
    window.open(urlCalendar, "calendar", "width=845,height=769");
});