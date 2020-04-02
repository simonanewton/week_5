$(document).ready(function () {

    // intialize the list of calendar time slots
    var calendarList = $(".calendarList");

    // initialize array of stored inputs
    var storedInputs = [];

    // initialize time slot columns
    var timeCols;
    var textCols;

    //----------------------------------------------------------------

    // add current date to heading
    function addDate() {
        var currentDate = moment().format('MMMM Do YYYY, h:mm a');
        $("#currentDay").text(currentDate);
    }

    // saves the input of the time slot at the given index to localStorage
    function saveInput(input, index) {
        var savedInput = {
            input: input,
            index: index
        };

        storedInputs.push(savedInput);

        localStorage.setItem("storedInputs", JSON.stringify(storedInputs));
    }

    // fill the calendar with time slots from 9am - 6pm
    function fillCalendar() {
        var startTime = 9;
        var endTime = 19;
        for (var i = startTime; i < endTime; i++) {

            // create the calendar time slot
            var timeSlot = $("<div>");
            timeSlot.addClass("col-12 p-0 m-2 bg-light border border-dark rounded d-flex");

            // create the section displaying the time for the time slot
            var timeCol = $("<div>");
            timeCol.addClass("col-2 p-4 border-right border-dark timeCol");
            timeCol.text(moment(i, 'h hh').format('LT'));

            // create the section for the input text for the time slot
            var textCol = $("<div>");
            textCol.addClass("col-8 p-4 textCol");
            textCol.attr("index", i - startTime);
            textCol.attr("clicked", "false");

            // create the input for the user to write to
            var inputText = $("<input>");
            inputText.attr("type", "text");

            // intialize the area for displaying text
            var textArea;

            // when the textCol is clicked, allow user input
            textCol.click(function () {
                textArea = $(this);

                // if textCol has not been clicked, add a new input field
                if (textArea.attr("clicked") === "false") {
                    textArea.attr("clicked", "true");
                    textArea.append(inputText);
                    inputText.focus();
                }

                // if textCol has already been clicked, allow user to edit the input
                else {
                    inputText.val(textArea.text());
                    textArea.empty();
                    textArea.append(inputText);
                    inputText.focus();
                }

                // upon return/enter key press, save the input
                inputText.keyup(function (event) {
                    if (event.keyCode === 13) {
                        enterText = inputText.val().trim();
                        textArea.text(enterText);
                        inputText.val("");
                        inputText.remove();
                    }
                });

                // upon input field focus loss, save the input
                inputText.blur(function () {
                    enterText = inputText.val().trim();
                    textArea.text(enterText);
                    inputText.val("");
                    inputText.remove();
                });
            });

            // create the section for saving user input
            var saveCol = $("<div>");
            saveCol.addClass("col-2 p-4 bg-info border-left border-dark saveCol");
            saveCol.attr("index", i - startTime);

            // create the icon to indicate the functionality of the section
            var saveIcon = $("<i>");
            saveIcon.addClass("fas fa-save text-white");
            saveCol.append(saveIcon);

            // when saveCol is clicked, get the index of the input and text to be saved
            saveCol.click(function () {
                var index = parseInt($(this).attr("index"));
                var input = $(textCols[index]).text();

                saveInput(input, index);
            });

            // add all the created sections to the time slot
            timeSlot.append(timeCol, textCol, saveCol);

            // add the time slot to the calendar
            calendarList.append(timeSlot);
        }

        // create arrays for the timeCols and textCols
        timeCols = $(".timeCol");
        textCols = $(".textCol");
    }

    // sets the color of each time slot to indicate whether it's in the past, present, or future
    function fillColors() {

        // format the current hour into 24 hr time 
        var currentHour = parseInt(moment().format('H'));

        // set the color of each textCol based on comparison to the current hour
        for (var i = 0; i < textCols.length; i++) {
            var timeText = $(timeCols[i]).text();
            var timeVal = parseInt(moment(timeText, 'LT').format('H'));
            var textVal = $(textCols[i]);

            // compare the value of the timeCol to the current hour and set the color of the textCol accordingly
            if (timeVal < currentHour) textVal.addClass("bg-secondary text-white");
            if (timeVal === currentHour) textVal.addClass("bg-danger text-white");
            if (timeVal > currentHour) textVal.addClass("bg-success text-white");
        }
    }

    // loads all inputs that have previously been saved
    function loadInputs() {

        // set the stored inputs array equal to the array of inputs saved in localStorage
        storedInputs = JSON.parse(localStorage.getItem("storedInputs"));

        // if localStorage is not empty, fill textCols with the stored inputs at the stored index
        if (storedInputs != null) {
            storedInputs.forEach(element => {
                var input = element.input;
                var index = parseInt(element.index);

                $(textCols[index]).text(input);
                $(textCols[index]).attr("clicked", "true");
            });
        }

        // else if localStorage is empty, reset the stored inputs to an empty array
        else storedInputs = [];
    }

    // when the Clear Calendar button is clicked, clear the value of each textCol and clear localStorage
    $(".clearBtn").click(function () {
        textCols.each(function () {
            $(this).empty();
        });
        localStorage.clear();
    });

    //----------------------------------------------------------------

    function main() {
        // add the current date to the header
        addDate();

        // fill the calendar with empty time slots
        fillCalendar();

        // fill the calendar with colors based on the current time
        fillColors();

        // load the calendar with stored inputs from localStorage
        loadInputs();
    }

    main();
});