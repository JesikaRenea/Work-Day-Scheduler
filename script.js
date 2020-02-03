//Displaying Time in Header
(function () {
    var NowMoment = moment().format('MMMM Do YYYY, h:mm a');
    var displayMoment = document.getElementById('currentDay');
    displayMoment.innerHTML = NowMoment;
})();

$(document).ready(function () {

    const now = moment().format('MMMM Do YYYY');
    let nowHour24 = moment().format('H');
    let nowHour12 = moment().format('h');
    let storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

    if (storedPlans !== null) {
        planTextArr = storedPlans;
    } else {
        planTextArr = new Array(9);
    }


    let $plannerDiv = $('#plannerContainer');
    $plannerDiv.empty();

    for (let hour = 9; hour <= 17; hour++) {
        let index = hour - 9;

        let $rowDiv = $('<div>');
        $rowDiv.addClass('row', 'plannerRow').attr('hour-index', hour);

        let $timeDiv = $('<div>');
        $timeDiv.addClass('col-md-2');

        var $timeBoxSpn = $('<span>');

        let displayHour = 0;
        let ampm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        } else {
            displayHour = hour;
            ampm = "am";
        }

        $timeBoxSpn.text(`${displayHour} ${ampm}`);

        $rowDiv.append($timeDiv);
        $timeDiv.append($timeBoxSpn);

        let $dailyPlanSpn = $('<input>');

        $dailyPlanSpn.attr('id', `input-${index}`);
        $dailyPlanSpn.attr('hour-index', index);

        $dailyPlanSpn.val(planTextArr[index]);

        let $inputCol = $('<div>');
        $inputCol.addClass('col-md-9');

        $rowDiv.append($inputCol);
        $inputCol.append($dailyPlanSpn);

        let $saveCol = $('<div>');
        $saveCol.addClass('col-md-1');

        let $saveBtn = $('<i>');
        $saveBtn.attr('id', `saveid-${index}`);
        $saveBtn.attr('save-id', index);
        $saveBtn.attr('class', "far fa-save saveIcon");
        $saveBtn.addClass('saveBtn')

        $rowDiv.append($saveCol);
        $saveCol.append($saveBtn);

        updateRowColor($rowDiv, hour);

        $plannerDiv.append($rowDiv);
    };


    function updateRowColor($hourRow, hour) {
        if (hour < nowHour24) {
            $hourRow.addClass('past')
        } else if (hour > nowHour24) {
            $hourRow.addClass('present')
        } else {
            $hourRow.addClass('future')
        }
    };

    $(document).on('click', 'i', function (event) {
        event.preventDefault();
        let $index = $(this).attr('save-id');
        let inputId = '#input-' + $index;
        let $value = $(inputId).val();
        planTextArr[$index] = $value;
        localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
    });

    $(document).on('change', 'input', function (event) {
        event.preventDefault();
        let i = $(this).attr('hour-index');
    });

    var clearSched = document.querySelector(".clear")

    clearSched.addEventListener("click", function() {
        localStorage.clear();
        console.log("click")
        location.reload();
    });



});