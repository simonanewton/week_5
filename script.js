$(document).ready(function () {

    // intialize the list of calendar time slots
    var calendarList = $(".calendarList");

    // initialize array of stored inputs
    var storedInputs = [];

    // initialize time slot columns
    var timeCols;
    var textCols;
    var saveCols;

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
            var timeSlot = $("<div>");
            timeSlot.addClass("col-12 p-0 m-2 bg-light border border-dark rounded d-flex");

            var timeVal = moment(i, 'h hh').format('LT');

            var timeCol = $("<div>");
            timeCol.addClass("col-2 p-4 border-right border-dark timeCol");
            timeCol.text(timeVal);

            var textCol = $("<div>");
            textCol.addClass("col-8 p-4 textCol");
            textCol.attr("index", i - startTime);
            textCol.attr("clicked", "false");

            var inputText = $("<input>");
            inputText.attr("type", "text");
            inputText.attr("id", "input");
            inputText.attr("placeholder", "Enter your task here.");

            textCol.click(function () {
                var textArea = $(this);

                if (textArea.attr("clicked") === "false") {
                    textArea.attr("clicked", "true");
                    textArea.append(inputText);
                    inputText.focus();
                }

                else {
                    inputText.val(textArea.text());
                    textArea.text("");
                    textArea.append(inputText);
                    inputText.focus();
                }

                inputText.on("keyup blur", function (event) {
                    if (event.keyCode === 13) {
                        enterText = inputText.val();
                        textArea.text(enterText);
                        inputText.val("");
                        inputText.detach();
                    }
                });

                inputText.blur(function () {
                    enterText = inputText.val();
                    textArea.text(enterText);
                    inputText.val("");
                    inputText.detach();
                });
            });

            var saveCol = $("<div>");
            saveCol.addClass("col-2 p-4 bg-info border-left border-dark saveCol");
            saveCol.attr("index", i - startTime);

            var saveIcon = $("<i>");
            saveIcon.addClass("fas fa-save text-white");
            saveCol.append(saveIcon);

            saveCol.click(function () {
                console.log("The save button has been clicked.");

                var index = $(this).attr("index");
                console.log("The index of this save button is: " + index);

                // var index = i - startTime;
                // var input = textCol.text();
                // saveInput(input, index);
            });

            timeSlot.append(timeCol, textCol, saveCol);

            calendarList.append(timeSlot);
        }

        timeCols = $(".timeCol");
        textCols = $(".textCol");
        saveCols = $(".saveCol");
    }

    // sets the color of each time slot to indicate whether it's in the past, present, or future
    function fillColors() {

        var currentHour = parseInt(moment().format('H'));

        for (var i = 0; i < timeCols.length; i++) {
            var timeText = $(timeCols[i]).text();
            var timeVal = parseInt(moment(timeText, 'LT').format('H'));
            var textVal = $(textCols[i]);

            if (timeVal < currentHour) textVal.addClass("bg-secondary text-white");
            if (timeVal === currentHour) textVal.addClass("bg-danger text-white");
            if (timeVal > currentHour) textVal.addClass("bg-success text-white");
        }
    }

    // loads all inputs that have previously been saved
    function loadInputs() {
        storedInputs = JSON.parse(localStorage.getItem("storedInputs"));

        if (storedInputs === !null) {
            storedInputs.forEach(element => {
                $(textCols[element.index]).text(element.input);
            });
        }
        else storedInputs = [];
    }

    //----------------------------------------------------------------

    function main() {
        // add the current date to the header
        addDate();

        // fill the calendar with empty time slots
        fillCalendar();

        // fill the calendar with colors based on the current time
        fillColors();

        // load the calendar with stored inputs from localStorage
        // loadInputs();
    }

    main();
});