// add current date to heading
$("#currentDay").text(moment().format('MMMM Do YYYY, h:mm a'));

// intialize the list of calendar time slots
var calendarList = $(".calendarList");

// fill the calendar with time slots from 9am - 6pm
function fillCalendar() {
    for (var i = 9; i < 19; i++) {
        var timeSlot = $("<div>");
        timeSlot.addClass("col-12 p-0 m-2 border border-dark rounded d-flex")

        var timeVal = moment(i, 'h hh').format('LT');

        var timeCol = $("<div>");
        timeCol.addClass("col-2 p-4 border-right border-dark");
        timeCol.text(timeVal);

        var textCol = $("<div>");
        textCol.addClass("col-8 p-4");
        textCol.text("Test");

        var saveCol = $("<div>");
        saveCol.addClass("col-2 p-4 bg-info border-left border-dark");

        var saveIcon = $("<i>");
        saveIcon.addClass("fas fa-save text-white");
        saveCol.append(saveIcon);

        timeSlot.append(timeCol);
        timeSlot.append(textCol);
        timeSlot.append(saveCol);

        calendarList.append(timeSlot);
    }
}

// fill the calendar
fillCalendar();