$("#search").click(function () {
    var title = $("#title").val();
    var content = $("#content").val();
    var daterange = $('#demo').val();
    var startdateMonth = daterange.substr(0, 2);
    var startdateDay = daterange.substr(3, 2);
    var startdateYear = daterange.substr(6, 4);
    var startdate = new Date(startdateYear + "-" + startdateMonth + "-" + startdateDay + " 00:00:00").getTime() / 1000;
    var enddateMonth = daterange.substr(13, 2);
    var enddateDay = daterange.substr(16, 2);
    var enddateYear = daterange.substr(19, 4);
    var enddate = new Date(enddateYear + "-" + enddateMonth + "-" + enddateDay + " 00:00:00").getTime() / 1000;
    if (title == '' && content == '') {
        $('#search-msg').modal('show');
    } else {
        $("#search").attr("disabled", "disabled");
        $("#search-form").attr("class", $("#search-form").attr("class") + " after-search");
        $("#search-result").html("");
        var data = 'title=' + title + '&text=' + content + '&startdate=' + startdate + '&enddate=' + enddate;
        SearchApp.showWaiting();
        $.ajax({
            url: '/service/search',
            type: 'GET',
            data: data,
            timeout: 50000,
            success: function (data) {
                var msg = JSON.parse(data);
                if(msg.articles.length !=0){
                    SearchApp.showSearchResultList(msg);
                }else{
                    SearchApp.showNoResult("No Search Results!");
                }      
            },
            complete: function (XMLHttpRequest, status) {
                console.log(XMLHttpRequest.status);
                console.log('status:' + status);
                $("#search").removeAttr("disabled");
                SearchApp.hideWaiting();
            }
        });
    }
});

$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        var title = $("#title").val();
        var content = $("#content").val();
        var daterange = $('#demo').val();
        var startdateMonth = daterange.substr(0, 2);
        var startdateDay = daterange.substr(3, 2);
        var startdateYear = daterange.substr(6, 4);
        var startdate = new Date(startdateYear + "-" + startdateMonth + "-" + startdateDay + " 00:00:00").getTime() / 1000;
        var enddateMonth = daterange.substr(13, 2);
        var enddateDay = daterange.substr(16, 2);
        var enddateYear = daterange.substr(19, 4);
        var enddate = new Date(enddateYear + "-" + enddateMonth + "-" + enddateDay + " 00:00:00").getTime() / 1000;
        if (title == '' && content == '') {
            $('#search-msg').modal('show');
        } else {
            $("#search").attr("disabled", "disabled");
            $("#search-form").attr("class", $("#search-form").attr("class") + " after-search");
            $("#search-result").html("");
            var data = 'title=' + title + '&text=' + content + '&startdate=' + startdate + '&enddate=' + enddate;
            SearchApp.showWaiting();
            $.ajax({
                url: '/service/search',
                type: 'GET',
                data: data,
                timeout: 50000,
                success: function (data) {
                    var msg = JSON.parse(data);
                    if(msg.articles.length !=0 ){
                        SearchApp.showSearchResultList(msg);                    
                    }else{
                        SearchApp.showNoResult("No Search Results!");
                    }                    
                },
                complete: function (XMLHttpRequest, status) {
                    console.log(XMLHttpRequest.status);
                    console.log('status:' + status);
                    $("#search").removeAttr("disabled");
                    SearchApp.hideWaiting();
                }
            });
        }
    }
});

var dateObject = new Date("2011-01-01 00:00:00");
var s = new Date(dateObject.getTime());
var e = new Date(dateObject.addDays(2000).getTime());
$('#demo').daterangepicker({
    "showDropdowns": true,
    "showWeekNumbers": true,
    "alwaysShowCalendars": true,
    "startDate": s,
    "endDate": e,
    "opens": "left"
});

var SearchApp = {};
SearchApp.searchResult = {};
SearchApp.searchResult.resultList = [];
SearchApp.showSearchResultList = function (data = "") {
    var acticles = SearchApp.searchResult.resultList = data.articles;
    for (key in acticles) {
        var title = acticles[key].title;
        var text = acticles[key].text != null && acticles[key].text != '' ? acticles[key].text : '...';
        var date = acticles[key].date;
        var url = acticles[key].URL != null && acticles[key].URL != ''? acticles[key].URL : '';
        var itemDiv = $('<div class="col-sm-12 article-item"></div>');
        var itemArticleDiv = $('<a href="' + url + '" target="_blank"><div class="article-title col-sm-12">' + title + '</div></a>');
        var itemArticleTextDiv = $('<div class="article-text-box col-sm-12"><span class="publish-time">' + date + '</span><span class="date-to-text-icon">&nbsp&nbsp-&nbsp&nbsp</span><span class="article-text">' + text + '</span></div>');
        var itemArticleURLDiv = $('<div class="article-url col-sm-12"><a href="' + url + '" target="_blank"><div class="article-url-text col-sm-8">' + url + '</div></a></div>');
        itemDiv.append(itemArticleDiv);
        itemDiv.append(itemArticleURLDiv);
        itemDiv.append(itemArticleTextDiv);
        //itemDiv.text(title+ + "  " +date+ "\n"+ url +"\n"+text);
        $("#search-result").append(itemDiv);
    }
};

SearchApp.showNoResult = function(msg){
    var messageDiv = $('<div class="search-no-result">'+msg+'</div>');
    $("#search-result").append(messageDiv);
}

SearchApp.showWaiting = function(){   
    $("#waiting-gif-box").css("display","block");
}

SearchApp.hideWaiting = function(){
    $("#waiting-gif-box").css("display","none");
}