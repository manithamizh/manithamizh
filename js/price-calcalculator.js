var $ = jQuery;

changeBind();
edgeProfileSelect();

/*Add inputs on plus click*/
$("#plus").click(function() {
    var str = $("#measures").html();
    var find = "th-0";
    var replace = new RegExp(find, 'g');

    var html = str.replace(replace, "th-" + $(".length").length);
    $("#mainArea").append(html);
    changeBind();
});

/*Calculate total on keyup 
function measuresKeyUp() {
    $(".length").keyup(function(e) {
        updateTotal();
    });
    $(".width").keyup(function(e) {
        updateTotal();
    });
}
*/

function changeBind(){
   $('#firstScreen input[type="number"]').bind('keyup mousewheel mouseup', function(e) {
       e.stopPropagation();
       updateCost();
   });
   $('#firstScreen input[type="checkbox"]').click(function(e) {
       e.stopPropagation();
       updateCost();
   });
}
/* Function */
function sumColums() {
    var sum = 0.00;

    $(".length").each(function(number) {
        //var id = e.getAttribute("id");
        var input = sumRow(number);
        sum += input;
    });

    return sum;
}

function sumRow(number) {
    var sum = 0.00;

    var l = Number($("#length-" + number).val());
    var w = Number($("#width-" + number).val());
    var value = (l * w);
    if (isNaN(value)) {
        return sum;
    }
    return Number(value);
}

function updateTotal() {
    var total = sumColums() / 304.8; /* convert to SQFT */

    $("#total").text(total.toFixed(2));
    return total;
}
/*
function cutOutKeyUp() {
    $("#cut_out > input").keyup(function(e) {
        var c = $(e.target).attr("class");
        var v = $("." + c).val();
        var s = $('[for="' + c + '"]').text().replace(":", " ");
        if (v !== 0 && v !== "undefined") {
            if ($("#options #" + c).length > 0) {
                $("#options #" + c).text(s + v);
            } else {
                if ($("#options").text() == "No options selected") {
                    $("#options").html('<div id="' + c + '">' + s + v + '</div>');
                } else {
                    $("#options").append('<div id="' + c + '">' + s + v + '</div>');
                }
            }
        }
        updateCost();
    });
}
*/

function edgeProfileSelect() {
    $("#edge-profile img").each(function name() {
        $(this).on('click', function eveniment(e) {
            $("#edge-profile img").each(function() {
                $(this).attr("data-edge", "");
            });
            e = e.target;
            $("#edge-profile img").css({
                "border": "none"
            });
            $(e).css({
                "border": "5px solid rgba(170, 17, 17, 0.96)"
            });
            $(e).attr("data-edge", "desired");
            updateCost();
        });
    });
}
/*
function additionalsCheck() {

    $(".additional input").on('click', function() {
        updateCost();
    });
}
*/
function updateCost() {
    var sqft = updateTotal();
    var sqftPrice = Number($("#price-per-sqrf").val());
    if (isNaN(sqftPrice)) {
        sqftPrice = 0;
    }
    var edgePrice = Number($('[data-edge="desired"]').attr("data-price"));
    var edgesqft = Number($("#edge-length").val());
    var additional = 0;
    $(".additional input").each(function() {
        if (this.checked) {
            additional += Number($(this).attr("data-price"));
        }
    });
    var cutouts = 0;
    $("#cut_out input").each(function() {
        var newVal = Number($(this).val());
        var newValPrice = Number($(this).attr("data-price"));
        if (newVal > 0) {
            cutouts += newVal * newValPrice;
        }
    });
    
    var totalPrice = (sqft*sqftPrice)+(edgesqft*edgePrice)+additional+cutouts;
     $("#total-cost").text(totalPrice.toFixed(2));
}
