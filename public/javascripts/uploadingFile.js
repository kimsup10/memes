$(document).ready(function(){
    var imgTarget = $('.input-group .uploadImg');
    var docsTarget = $('.input-group .uploadDocs');
    var uploadId=0;
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
        $('button')[0].disabled=false;
    });

    function showPreview(file){
        var reader = new FileReader();
        var thumbnailId = file.name.replace(/(\.)|(\s)/g, '-');

        reader.onload = function myOnload(e){
            var src = e.target.result;
            $('.uploadImgList').append('<div class="uploads-display" id='+thumbnailId+'><div class="uploads-thumb-wrap"><img src="'+src+'" class="uploads-thumb"></div></div>');
        };

        reader.addEventListener('load', function () {
            $('.uploads-display#'+thumbnailId).append('<input type="textarea" name ="description" class="form-control" placeholder="'+file.name+'에 대해 해쉬태그와 함께 설명해주세요!">' +
                '<p class="btn-primary" name="cancel" onclick="removeAttachment(this.parentNode.id)">취소하기</p><br>');
        });
        reader.readAsDataURL(file);
    }


});

function removeAttachment(id) {
    var thumbnail = document.getElementById(id);
    var files = document.getElementById('attachFile').files[0]='';

    // TODO: Delete files from input FileList.
    for (var i in files){
        if (files[i].name != id)
            document.getElementById('attachFile').files[i]='';
    }

    document.getElementsByClassName('uploadImgList')[0].removeChild(thumbnail);
    if ($('.uploads-display').length==0)
        document.getElementsByTagName('button')[0].disabled=true;
}