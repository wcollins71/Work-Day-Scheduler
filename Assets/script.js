
function addScheduleRow(times) {
    // create a row
    const row = $("<div>");
    row.attr("class", "row");

    // add first column element, hourly blocks, in "9am" format
    const timeCol = $("<a>");
    timeCol.attr("class", "col-sm-2 time-block hour");
    const timeToDisplay = moment(times, "ha");
    const timeToDisplayHa = timeToDisplay.format("ha");
    timeCol.text(timeToDisplayHa);
    row.append(timeCol);

    // create second column where text is stored
    const textCol = $("<textarea>");
    textCol.attr("class", "col-sm-9");
    textCol.attr("id", "text-" + times)
    // retrieve data stored in local storage
    textCol.text(localStorage.getItem(times));
    // check to see whether each hour is past, present or future
    // then assign class that denotes background colour
    const timenow = moment().format("HH");
    const timeMoment = moment(times, "HH");
    const timeMomentHa = timeMoment.format("HH");
    if (timenow > timeMomentHa) {
        textCol.addClass("past");
    } else if (timenow == timeMomentHa) {
        textCol.addClass("present");
    } else if (timenow < timeMomentHa) {
        textCol.addClass("future");
    } else {
        console.log("error");
    }
    row.append(textCol);

    // create third column with attributes of css saveBtn
    // give it an id of the hour it represents
    const buttonCol = $("<div>");
    buttonCol.attr("class", "col-sm-1 saveBtn");
    buttonCol.attr("id", times);
    row.append(buttonCol);

    // add font awesome save icon
    const icon = $("<i>");
    icon.attr("class", "fas fa-save fa-lg");
    icon.css("padding", "20px");
    icon.attr("id", "buttonSave" + times);
    buttonCol.append(icon);

    $(".container").append(row);
}

$(document).ready(function () {
    const times = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
    const timenow = moment();
    for (let index = 0; index < times.length; index++) {
        // add rows in the scheduler
        addScheduleRow(times[index]);
    }

    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        //get id of row clicked
        var buttonClicked = $(this).attr("id");
        // save text of that row and save to local storage
        var textToSave = $("#text-" + buttonClicked).val();
        localStorage.setItem(buttonClicked, textToSave);
    })
});

