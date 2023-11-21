$(function () {
    // Displays the current date at the top of the calendar
    $('#currentDay').text(dayjs().format('dddd, MMMM D'));

    // Generates time blocks for standard business hours (9am–5pm)
    for (let hour = 9; hour <= 17; hour++) {
        var timeBlock = $('<div>').addClass('row time-block');
        var hourCol = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(hour < 12 ? `${hour}AM` : (hour === 12 ? '12PM' : `${hour - 12}PM`));
        var textArea = $('<textarea>').addClass('col-8 col-md-10 description');
        var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').append($('<i>').addClass('fas fa-save'));

        timeBlock.attr('id', `hour-${hour}`).append(hourCol, textArea, saveBtn);
        $('.container-lg').append(timeBlock);
    }

    // Color code time blocks based on current time
    function updateTimeBlocks() {
        var currentHour = dayjs().hour();
        $('.time-block').each(function() {
            var blockHour = parseInt($(this).attr('id').split('-')[1]);
            if (blockHour < currentHour) {
                $(this).removeClass('present future').addClass('past');
            } else if (blockHour === currentHour) {
                $(this).removeClass('past future').addClass('present');
            } else {
                $(this).removeClass('past present').addClass('future');
            }
        });
    }

    updateTimeBlocks();
    setInterval(updateTimeBlocks, 60000); // Update time blocks every minute

    // Save event to local storage on click
    $('.container-lg').on('click', '.saveBtn', function() {
        var hourId = $(this).parent().attr('id'); // Gets the id of the parent time-block
        var eventText = $(this).siblings('.description').val(); // Gets the text entered in the textarea
        localStorage.setItem(hourId, eventText); // Saves the text in local storage with the hour id as the key
    });

    // Load saved events from local storage
    $('.time-block').each(function() {
        var hourId = $(this).attr('id'); // Gets the id of the time-block
        var savedEvent = localStorage.getItem(hourId); // Retrieves the saved event text from local storage
        if (savedEvent) {
            $(this).find('.description').val(savedEvent); // Sets the textarea value to the saved event text
        }
    });
});
