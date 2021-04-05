let data_inicio = '2021-04-05'
let data_fim = '2021-04-05'

document.addEventListener('DOMContentLoaded', function () {
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'pt-br',
        themeSystem: 'bootstrap',
        initialDate: data_inicio,
        headerToolbar: {
            left: '',
            center: 'title',
            right: ''
        },
        events: [
            {
                title: 'Previsão de Entrega',
                start: data_inicio,
                end: data_fim,
            },
            {
                start: data_inicio,
                end: data_fim,
                display: 'background',
                color: 'lightblue'
            }
        ]
    });

    calendar.render();
});