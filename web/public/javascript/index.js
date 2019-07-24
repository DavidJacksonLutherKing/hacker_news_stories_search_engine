$("#search").click(function () {
    var title = $("#title").val();
    var content = $("#content").val();
    var daterange = $('#demo').val();
    var startdateMonth = daterange.substr(0,2);
    var startdateDay = daterange.substr(3,2);
    var startdateYear = daterange.substr(6,4);
    var startdate = new Date(startdateYear+"-"+startdateMonth+"-"+startdateDay+" 00:00:00").valueOf();
    var enddateMonth = daterange.substr(13,2);
    var enddateDay = daterange.substr(16,2);
    var enddateYear = daterange.substr(19,4);
    var enddate = new Date(enddateYear+"-"+enddateMonth+"-"+enddateDay+" 00:00:00").valueOf();
    if (title == '' && content == '') {
        $('#myModal').modal('show');
    } else {
        var data = 'title=' + title + '&text=' + content +'&startdate=' + startdate + '&enddate=' + enddate;
        $.ajax({
            url: '/service/search',
            type: 'GET',
            data: data,
            success: function (msg) {
                console.log(message);
            }
        });
    }
});

var dateObject = new Date();
var startDate = dateObject.addDays(-6);
var endDate = dateObject;
var last7daysArray = [dateObject.addDays(-6), dateObject];
$('#demo').daterangepicker({
    "showDropdowns": true,
    "showWeekNumbers": true,
    "ranges": {
        "Last 7 Days": last7daysArray,
    },
    "alwaysShowCalendars": true,
    "startDate": startDate,
    "endDate": endDate,
    "opens": "left"
});
var start = new Date(startDate).format('yyyy-MM-dd hh:mm:ss');
var stop = new Date(endDate).format('yyyy-MM-dd hh:mm:ss');