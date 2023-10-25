document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  
  var userEvents = JSON.parse(localStorage.getItem('userEvents')) || [];

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true, // Habilita la edición de eventos
    events: userEvents,
    locale: 'es', // Establece el idioma en español
    eventClick: function(info) {
      // Este evento se dispara cuando un usuario hace clic en un evento existente
      // Puedes implementar la lógica para editar o eliminar el evento aquí
      var eventToEdit = info.event;
      var confirmDelete = confirm('¿Eliminar este evento?');
      if (confirmDelete) {
        // Elimina el evento de la lista de eventos
        calendar.getEventById(eventToEdit.id).remove();
        // Guarda la lista actualizada en el almacenamiento local
        userEvents = userEvents.filter(function(event) {
          return event.id !== eventToEdit.id;
        });
        localStorage.setItem('userEvents', JSON.stringify(userEvents));
      }
    },
    dateClick: function(info) {
      // Este evento se dispara cuando un usuario hace clic en una fecha vacía
      // Puedes implementar la lógica para agregar un nuevo evento aquí
      var title = prompt('Ingrese el título del evento:');
      if (title) {
        var newEvent = { title: title, start: info.dateStr, id: new Date().toISOString() };
        calendar.addEvent(newEvent);
        userEvents.push(newEvent);
        localStorage.setItem('userEvents', JSON.stringify(userEvents));
      }
    }
  });
  calendar.render();
});
