$(document).ready(function(){
    var imgTarget = $('.input-group .uploadImg');
    var docsTarget = $('.input-group .uploadDocs');

    imgTarget.on('change', function() {
        var files = $(this)[0].files;
        if (!$(this)[0].files[0].type.match(/image\//))
            return;

        // 추출한 파일명 삽입
        for (var i in files ){
            if(files.hasOwnProperty(i)) {
                showPreview(files[i]);
            }
        }
    });

    function showPreview(file){
        var reader = new FileReader();
        reader.onload = myOnload;
        reader.addEventListener('load', function () {
            $('.uploadImgList').append('<p class="form-control">'+file.name+'</p>');
        });
        reader.readAsDataURL(file);
    }

    function myOnload(e){
        var src = e.target.result;
        $('.uploadImgList').append('<div class="uploads-display"><div class="uploads-thumb-wrap"><img src="'+src+'" class="uploads-thumb"></div></div>');
    };
});
