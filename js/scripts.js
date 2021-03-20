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