$("#search").click(function(){
    var title = $("#title").val();
    var content = $("#content").val();
    var data = 'title='+title+'&text='+content;
    $.ajax({
        url:'/service/search',
        type:'GET',
        data:data,
        success:function(msg){
            console.log(message);
        }
    });
});