//API 이용하여 검색 기능 구현하기 
$(function() {
    $('.btn-search').click(function() {
        console.log('search!');
    });
});

var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood'

$(function() {
    $('.btn-search').click(function() {
        $.get(API_URL, {}, function(data) {
            console.log(data);
        });
    });
});

//패스트 푸드점 개수 출력하기 
$.get(API_URL, {}, function(data){
    var list = data.list;
    var total = data.total;

    $('.total').html('총 '+ total +'개의 패스트푸드점을 찾았습니다. ');

    //패스트푸드점 목록 출력하기
    var $list = $('.list');

    for(var i=0; i< list.length; i++) {
        var item = list[i];
        //각 아이템 하나하나마다 DOM객체를 만들어서 $list에 추가한다.
    }
});


