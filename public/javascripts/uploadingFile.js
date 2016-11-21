$(document).ready(function(){
    var imgTarget = $('.input-group .uploadImg');
    var docsTarget = $('.input-group .uploadDocs');
    var uploadCount = 0;
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
            $('.uploads-display#'+(uploadCount++)).append('<input type="text" class="form-control" placeholder="'+file.name+'에 대해 해쉬태그와 함께 설명해주세요!"><br>' +
                '<p class="btn-primary" name="cancel" onclick="removeAttachment(this.parentNode.id)">취소하기</p><br>');
        });
        reader.readAsDataURL(file);
    }

    function myOnload(e){
        var src = e.target.result;
        $('.uploadImgList').append('<div class="uploads-display" id="'+(uploadCount)+'"><div class="uploads-thumb-wrap"><img src="'+src+'" class="uploads-thumb"></div></div>');
    }
});

function removeAttachment(id) {
    console.log(id);
    console.log(document.getElementsByClassName('uploads-display'));
    document.getElementsByClassName('uploads-display')[id].innerHTML='';
}