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
        $('#myModal').modal('show');
    } else {
        $("#search").attr("disabled", "disabled");
        $("#search-form").attr("class",$("#search-form").attr("class")+" after-search");
        $("#search-result").html("");
        var data = 'title=' + title + '&text=' + content + '&startdate=' + startdate + '&enddate=' + enddate;
        $.ajax({
            url: '/service/search',
            type: 'GET',
            data: data,
            timeout: 50000,
            success: function (msg) {
                console.log(msg);
                SearchApp.showSearchResultList(JSON.parse(msg));
            },
            complete: function (XMLHttpRequest, status) {
                console.log(XMLHttpRequest.status);
                console.log('status:' + status);
                $("#search").removeAttr("disabled");
            }
        });
    }
});

var dateObject = new Date("2011-01-01 00:00:00");
var s = new Date(dateObject.getTime());
var e = new Date(dateObject.addDays(1000).getTime());
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
    var acticles = SearchApp.searchResult.resultList =data.articles;
    // var articlesJSONString = {
    //     "articles": [{
    //         "title": "David Lee Roth scream box \u2013 Arduino & Adafruit WaveShield davidleeroth",
    //         "URL": "http://www.adafruit.com/blog/2012/03/20/david-lee-roth-scream-box-arduino-adafruit-waveshield-davidleeroth/",
    //         "text": "",
    //         "date": "2012-03-21"
    //     }, {
    //         "title": "General david petraeus's rules for living",
    //         "URL": "http://www.thedailybeast.com/newsweek/2012/11/04/general-david-petraeus-s-rules-for-living.html",
    //         "text": "",
    //         "date": "2012-11-10"
    //     }, {
    //         "title": "Gmail - Compose Mail - david.lloydjonesgmail.com",
    //         "URL": "https://mail.google.com/mail/?view=cm&fs=1&to&su=myubuntuone%27s+Channel+-+YouTube&body=http://www.youtube.com/myubuntuone&ui=2&tf=1&shva=1",
    //         "text": null,
    //         "date": "2011-11-17"
    //     }, {
    //         "title": "Bo\u00eete de r\u00e9ception - herautdavidgmail.com - Gmail",
    //         "URL": "https://mail.google.com/mail/u/0/?tab=wm#inbox",
    //         "text": null,
    //         "date": "2012-10-27"
    //     }, {
    //         "title": "Foodchem-david's blog",
    //         "URL": "http://foodchem-david.blogspot.jp/",
    //         "text": "Are Food Additives Safe? Aspartame Side Effects",
    //         "date": "2012-05-08"
    //     }, {
    //         "title": "Cool water davidoff",
    //         "URL": "http://www.beautystorage.com/catalogsearch/advanced/result/?manufacturer[]=18",
    //         "text": "",
    //         "date": "2012-08-06"
    //     }, {
    //         "title": "Cheap david krejci jersey",
    //         "URL": "http://www.365djerseys.com/cheap-boston-bruins-david-krejci-jersey-46-black-2011-stanley-c-p-4711.html",
    //         "text": "",
    //         "date": "2012-08-06"
    //     }, {
    //         "title": "King david garage door repair long island",
    //         "URL": "http://www.kingdavidgaragedoor.com/",
    //         "text": "garage doors long island experts.professional services,and installation\ncommercial and residential",
    //         "date": "2011-05-08"
    //     }, {
    //         "title": "Archaeologists asking for help to interpret a discovery in the city of david",
    //         "URL": "http://www.cityofdavid.org.il/ArticleDetails_eng.asp?id=327",
    //         "text": "",
    //         "date": "2011-12-11"
    //     }, {
    //         "title": "Anonymous defaces davidguetta.co",
    //         "URL": "http://www.davidguetta.co",
    //         "text": "",
    //         "date": "2012-01-26"
    //     }]
    // };
    // var acticles = articlesJSONString.articles;
    for (key in acticles) {
        var title = acticles[key].title;
        var text = acticles[key].text != null&&acticles[key].text != ''  ? acticles[key].text : '...';
        var date = acticles[key].date;
        var url = acticles[key].URL != 'null' ? acticles[key].URL : '';
        var itemDiv = $('<div class="col-sm-12 article-item"></div>');
        var itemArticleDiv = $('<a href="' + url + '" target="_blank"><div class="article-title col-sm-12">' + title + '</div></a>');
        var itemArticleTextDiv = $('<div class="col-sm-12 row"><div class="publish-time">' + date + '</div><div class="date-to-text-icon">&nbsp&nbsp-</div><div class="article-text">&nbsp&nbsp' + text + '</div></div>');
        var itemArticleURLDiv = $('<div class="article-url col-sm-12 row"><a href="' + url + '" target="_blank"><div class="article-url-text col-sm-8 row">' + url + '</div></a></div>');
        itemDiv.append(itemArticleDiv);        
        itemDiv.append(itemArticleURLDiv);
        itemDiv.append(itemArticleTextDiv);
        //itemDiv.text(title+ + "  " +date+ "\n"+ url +"\n"+text);
        $("#search-result").append(itemDiv);
    }
};