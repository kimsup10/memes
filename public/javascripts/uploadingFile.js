$(document).ready(function(){
    var imgTarget = $('.input-group .uploadImg');

    imgTarget.on('change', function() {
        console.log('here.....???');

        var files = $(this)[0].files;
        if (!$(this)[0].files[0].type.match(/image\//))
            return;

        for (var i in files ){
            console.log('here.....');

            if(files.hasOwnProperty(i)) {
                showPreview(files[i]);
            }
        }
    });

    function showPreview(file){
        var reader = new FileReader();
        var thumbnailId = file.name.replace(/(\.)|(\s)/g, '-');

        reader.onload = function myOnload(e){
            var src = e.target.result;
            $('.uploadImgList').append('<div class="uploads-display" id='+thumbnailId+'><div class="uploads-thumb-wrap"><img src="'+src+'" class="uploads-thumb"></div></div>');
        };

        reader.addEventListener('load', function () {
            $('.uploads-display#'+thumbnailId).append('<input name ="description" class="form-control" onchange="enableApply()" placeholder="'+file.name+'에 대해 해쉬태그와 함께 설명해주세요!">'
                + '<select name="privacy_level"> <option value = "public">전체공개</option> <option value = "friends">친구공개</option> <option value = "private">비공개</option> </select>'
                +'<button class="btn-danger btn" onclick="removeAttachment(this.parentNode.id)">취소하기</button><br>' );
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

function enableApply(){
    var apply = $('button[name=apply]')[0];
    if($('input[name=description]')[0].value)
        apply.disabled=false;
    else
        apply.disabled=true;
}