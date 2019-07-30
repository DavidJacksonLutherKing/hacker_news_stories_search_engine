/**
 *  Author : David Ding
 * 
 *  Init Search App Object
 *  Set attribute and method to object
 */
var SearchApp = {};
SearchApp.queryPara = {};
SearchApp.queryPara.title = "";
SearchApp.queryPara.text = "";
SearchApp.queryPara.startDate = "";
SearchApp.queryPara.endDate = "";
SearchApp.queryPara.page = 1;
SearchApp.queryPara.itemNumInPage = 100;
SearchApp.searchResult = {};
SearchApp.searchResult.resultList = [];

/**
 * Method : Fetch Search Result (CurrentPage = 1, ItemNumberInaPage) = > void
 * Fetch search result Data with Ajax call from backend server
 */
SearchApp.fetchSearchResult = function (page = 1, itemNumInPage = 100) {
    // Package all the data user input.
    var title = SearchApp.queryPara.title = $("#title").val().trim();
    var context = SearchApp.queryPara.text = $("#context").val().trim();
    var daterange = $('#demo').val();
    var startdateMonth = daterange.substr(0, 2);
    var startdateDay = daterange.substr(3, 2);
    var startdateYear = daterange.substr(6, 4);
    var startdate = SearchApp.queryPara.startDate = new Date(startdateYear + "-" + startdateMonth + "-" + startdateDay + " 00:00:00").getTime() / 1000;
    var enddateMonth = daterange.substr(13, 2);
    var enddateDay = daterange.substr(16, 2);
    var enddateYear = daterange.substr(19, 4);
    var enddate = SearchApp.queryPara.endDate = new Date(enddateYear + "-" + enddateMonth + "-" + enddateDay + " 00:00:00").getTime() / 1000;
    SearchApp.queryPara.page = page;
    SearchApp.queryPara.itemNumInPage = itemNumInPage;

    // Check if both the title and the text are leave blank
    if (title == '' && context == '') {
        // If true, show modal to tell user to input something.
        $('#search-msg .modal-body p').text("Watch out for your computer. If you input neither of the title nor the context your care about, it's gonna be hacker. HA! HA!");
        $('#search-msg').modal('show');
    } else {
        // If false, request search result. At the same time disable the search button,push the search form to top as a bar, and show the waiting gif.
        $("#search").attr("disabled", "disabled");
        $("#search-form").attr("class", $("#search-form").attr("class") + " after-search");
        $("#search-result").html("");
        var data = 'title=' + title + '&text=' + context + '&startdate=' + startdate + '&enddate=' + enddate + "&page=" + page + "&itemNum=" + itemNumInPage;
        SearchApp.showWaiting();
        $.ajax({
            url: '/service/search',
            type: 'GET',
            data: data,
            success: function (data) {
                var msg = JSON.parse(data);
                console.log(data);
                if (msg.articles.length != 0) {
                    //if search result is received and has articles, then call showSearchResultList method to deploy the result to the web page.
                    SearchApp.showSearchResultList(msg);
                } else {
                    //if search result is received and has articles, then show the no search result to the web page.
                    SearchApp.showNoResult("No Search Results!");
                }
            },
            complete: function (XMLHttpRequest, status) {
                //After finish request to enable the search button, and hide waiting gif.
                $("#search").removeAttr("disabled");
                SearchApp.hideWaiting();
            },
            error: function (error) {
                //If server error returned, tell the user of the server error and try later.
                $('#search-msg .modal-body p').text("Hackers are sleeping. Try to awake them up very later. HA! HA!");
                $('#search-msg').modal('show');
            }
        });
    }
}

/**
 * Method : Show Search Result List (JSONData) = > void
 * deploy the data to $("search-result-area"), and make the page tool.
 */
SearchApp.showSearchResultList = function (data = "") {
    // parse data to snippet and render data into dom element
    var articles = SearchApp.searchResult.resultList = data.articles;
    var articleList = $('<div class="article-list col-sm-12"></div>')
    var pageDivArray = [];
    var currentPageDiv = $('<div id="page-1" class="article-page col-sm-12"><div>');
    var currentPage = data.pageInfo.currentPage;
    var pageNum = data.pageInfo.pageNum;
    for (key in articles) {
        var title = articles[key].title;
        var text = articles[key].text != null && articles[key].text != '' ? articles[key].text : '...';
        var date = articles[key].date;
        var url = articles[key].URL != null && articles[key].URL != '' ? articles[key].URL : '';
        var itemDiv = $('<div class="col-sm-12 article-item"></div>');
        var itemArticleDiv = $('<a href="' + url + '" target="_blank"><div class="article-title col-sm-12">' + title + '</div></a>');
        var itemArticleTextDiv = $('<div class="article-text-box col-sm-12"><span class="publish-time">' + date + '</span><span class="date-to-text-icon">&nbsp&nbsp-&nbsp&nbsp</span><span class="article-text">' + text + '</span></div>');
        var itemArticleURLDiv = $('<div class="article-url col-sm-12"><a href="' + url + '" target="_blank"><div class="article-url-text col-sm-8">' + url + '</div></a></div>');
        itemDiv.append(itemArticleDiv);
        itemDiv.append(itemArticleURLDiv);
        itemDiv.append(itemArticleTextDiv);
        currentPageDiv = $(currentPageDiv).attr('id') == "page-" + currentPage ? currentPageDiv : $('<div id="page-' + currentPage + '" class="article-page"><div>');
        currentPageDiv.append(itemDiv);
        pageDivArray[currentPage] = currentPageDiv;
    }
    for (page in pageDivArray) {
        articleList.append(pageDivArray[page]);
    }
    // Add page tools, init method is from /web/public/paging.js. This is a plug-in.
    $("#search-result").append(articleList);
    var paging = $("#search-result").append($('<div class="zxf_pagediv"></div>'));
    $(".zxf_pagediv").createPage({
        pageNum: data.pageInfo.pageNum,
        current: currentPage,
        backfun: function (e) {
            SearchApp.fetchSearchResult(e.current, SearchApp.queryPara.itemNumInPage);
            console.log(e);
        }
    });
};

/**
 * Method : Show No Result (Message)
 */
SearchApp.showNoResult = function (msg) {
    var messageDiv = $('<div class="search-no-result">' + msg + '</div>');
    $("#search-result").append(messageDiv);
}

/**
 * Method : Show No Result (Message)
 */
SearchApp.showWaiting = function () {
    $("#waiting-gif-box").css("display", "block");
}

SearchApp.hideWaiting = function () {
    $("#waiting-gif-box").css("display", "none");
}


/**
 * Event Handler on click search button
 */
$("#search").click(function () {
    SearchApp.fetchSearchResult();
});

/**
 * Event Handler on press enter key 
 */
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        SearchApp.fetchSearchResult();
    }
});

/**
 * data range box configures and inits here.
 */
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