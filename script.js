$(document).ready(function () {

    // intialize the list of calendar time slots
    var calendarList = $(".calendarList");

    //----------------------------------------------------------------

    // add current date to heading
    function addDate() {
        var currentDate = moment().format('MMMM Do YYYY, h:mm a');
        $("#currentDay").text(currentDate);
    }

    // fill the calendar with time slots from 9am - 6pm
    function fillCalendar() {
        for (var i = 9; i < 19; i++) {
            var timeSlot = $("<div>");
            timeSlot.addClass("col-12 p-0 m-2 border border-dark rounded d-flex")

            var timeVal = moment(i, 'h hh').format('LT');

            var timeCol = $("<div>");
            timeCol.addClass("col-2 p-4 border-right border-dark timeCol");
            timeCol.text(timeVal);

            var textCol = $("<div>");
            textCol.addClass("col-8 p-4 textCol");
            textCol.text(timeVal);

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

    function fillColors() {
        var timeCols = $(".timeCol");
        var textCols = $(".textCol");

        var currentHour = parseInt(moment().format('H'));

        for (var i = 0; i < timeCols.length; i++) {
            var timeText = $(timeCols[i]).text();
            var timeVal = parseInt(moment(timeText, 'LT').format('H'));
            var textVal = $(textCols[i]);
            
            if (timeVal < currentHour) textVal.addClass("bg-secondary");
            if (timeVal === currentHour) textVal.addClass("bg-danger");
            if (timeVal > currentHour) textVal.addClass("bg-success");
        }
    }

    //----------------------------------------------------------------

    function main() {
        console.clear();

        // add the current date to the header
        addDate();

        // fill the calendar
        fillCalendar();

        // fill the calendar with colors
        fillColors();
    }

    var startBtn = $(".startBtn");
    startBtn.click(main);
    // main();
});