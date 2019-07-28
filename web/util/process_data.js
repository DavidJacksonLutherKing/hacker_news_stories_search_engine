module.exports = {
    fetchDataByPage: function (data, page, itemNumInPage) {
        console.log( typeof data);
        if (typeof data != "object"){
            data= JSON.parse(data);
        }
        var articlesObject = data;
        var articlesList = articlesObject.articles;
        if (articlesList != undefined){
            console.log(articlesList);
            var firstItemIndex = (parseInt(page) - 1) * itemNumInPage;
            console.log(page);
            console.log('firstItemIndex:' + firstItemIndex);
            var lastItemIndex = parseInt(page) * itemNumInPage - 1;
            console.log('lastItemIndex:' + lastItemIndex);
            var pageNum = Math.ceil((articlesList.length || 0 )/ itemNumInPage);
            currentPageArticleArray = [];
            for (var key = firstItemIndex;key < articlesList.length && key <= lastItemIndex ; key++) {
                console.log('key:', key);
                var newKey = key - firstItemIndex;
                currentPageArticleArray[newKey] = articlesList[key];
                console.log(articlesList[key]);
    
            }
            articlesObject.articles = currentPageArticleArray;
            articlesObject.pageInfo = {};
            articlesObject.pageInfo.currentPage = page;
            articlesObject.pageInfo.pageNum = pageNum;
            return JSON.stringify(articlesObject);
        }else{
            var result = {};
            result.articles =[];
            console.log(result);
            return JSON.stringify(result);
        }
    }
};