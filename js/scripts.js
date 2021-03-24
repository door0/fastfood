var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood'

$(function() {
    $('.btn-search').click(function() {
        var searchKeyword = $('#txt-search').val();
        search(1, 10, searchKeyword); //search(null, null, searchKeyword); 과 같다.
    });

    //enter키 = 검색키
    $('#txt-search').on('keypress', function(e) {
        if(e.keyCode === 13) {
            $('.btn-search').trigger('click'); // 실제로 마우스로 클릭하지 않아도 trigger 강제로 이벤트 발생시킴으로써 효과나타남
        }
    });
});

//패스트 푸드점 개수 출력하기 
function search(page, perPage, searchKeyword) { //10개씩 보기, 20개씩 보기 기능을 넣을때를 위해  perPage값 전달
    if(typeof page !== 'number' || page < 1) 
        page = 1;
    if(typeof perPage !== 'number' || perPage <= 0)
        perPage = 10;
    
        $.get(API_URL, { 
            page: page,
            perPage:perPage,
            searchKeyword: searchKeyword 
            }, 
            function(data) {
            var list = data.list;
            var total = data.total;

            $('.total').html('총 '+ total +'개의 패스트푸드점을 찾았습니다. ');

            //패스트푸드점 목록 출력하기
            var $list = $('.list');

            for(var i=0; i< list.length; i++) {
                //각 아이템 하나하나마다 DOM객체를 만들어서 $list에 추가한다.
                var item = list[i];

                //템플릿을 이용하여 엘리먼트 생성
                var $elem = $('#item-template')
                .clone()
                .removeAttr('id');

                $elem.find('.item-no').html(i+1); //$elem에 속한 자식들만 나오게 함
                $elem.find('.item-name').html(item.name);
                $elem.find('.item-addr').html(item.addr);

                $list.append($elem); //인자로 받은 엘리먼트를 가장 마지막자식으로 추가함으로써 전체 목록 생성
            }   

            showPaging(page, perPage, total);
        });
}

//paging 영역  (paging바 dhdld 1부터 10까지 )
function showPaging(page, perPage, total, searchKeyword) {

    var $paging = $('.paging').empty(); //empty()는 함수 실행시 마다 하위 태그들을 모두 없애줌.    
    var numPages = 5;
    var pageStart = Math.floor((page - 1) / numPages) * numPages + 1;
    var pageEnd = pageStart + numPages - 1;
    var totalPages = Math.floor(total / perPage) + 1; // 총 페이지수

    if(pageEnd > totalPages) 
        pageEnd = totalPages;

    var prevPage = pageStart - 1; // 이전
    if( prevPage < 1) 
        prePage = 1;
    
    var nextPage = pageEnd + 1; // 다음
    if( nextPage > totalPages)
        nextPage = totalPages;

    var $prevElem = $('<a href = "javascript:search(' + prevPage + ',' + perPage + ',\'' + searchKeyword + '\')")>이전</a>');
    $prevElem.addClass('prev');
    $paging.append($prevElem);

    
    for(var i = pageStart; i <= pageEnd; i++) {
        var $elem = $('<a href = "javascript:search(' + i + ',' + perPage + ',\'' + searchKeyword + '\')">' + i + '</a>');

        if(i === page) {
            $elem.addClass('current'); //css 수정할 수 있도록! 
        }
        $paging.append($elem);
    }

    var $nextElem = $('<a href = "javascript:search(' + nextPage + ',' + perPage + ',\'' + searchKeyword + '\')")>다음</a>');
    $nextElem.addClass('next');
    $paging.append($nextElem);
}