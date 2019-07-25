$("#search").click(function () {
    $("#search").attr("disabled","disabled");
    $("#search").text("Searching...");
    var title = $("#title").val();
    var content = $("#content").val();
    var daterange = $('#demo').val();
    var startdateMonth = daterange.substr(0,2);
    var startdateDay = daterange.substr(3,2);
    var startdateYear = daterange.substr(6,4);
    var startdate = new Date(startdateYear+"-"+startdateMonth+"-"+startdateDay+" 00:00:00").getTime()/1000;
    var enddateMonth = daterange.substr(13,2);
    var enddateDay = daterange.substr(16,2);
    var enddateYear = daterange.substr(19,4);
    var enddate = new Date(enddateYear+"-"+enddateMonth+"-"+enddateDay+" 00:00:00").getTime()/1000;
    if (title == '' && content == '') {
        $('#myModal').modal('show');
    } else {
        var data = 'title=' + title + '&text=' + content +'&startdate=' + startdate + '&enddate=' + enddate;
        $.ajax({
            url: '/service/search',
            type: 'GET',
            data: data,
            success: function (msg) {
                console.log(JSON.parse(msg));                
            },
            complete:function(XMLHttpRequest,status){
                console.log(XMLHttpRequest.status);
                console.log('status:' + status);
                $("#search").removeAttr("disabled");
                $("#search").text("Search");
            }
        });
    }
});

var dateObject = new Date("2011-01-01 00:00:00");
var s =new Date(dateObject.getTime());
var e = new Date(dateObject.addDays(1000).getTime());
$('#demo').daterangepicker({
    "showDropdowns": true,
    "showWeekNumbers": true,
    "alwaysShowCalendars": true,
    "startDate": s,
    "endDate": e,
    "opens": "left"
});