/**
 * Created by Yaran Ann on 2015/7/27 0027.
 * ����������ϸҳJS
 */

/*
 * ��������ֲ���ʼ��
 * */
var swiper = new Swiper('.swiper-detail', {
    pagination: '.swiper-detail .swiper-pagination',
    paginationClickable: true,
    // Disable preloading of all images
    preloadImages: false,
    // Enable lazy loading
    lazyLoading: true,
    loop: true,
    autoplay: 2500,
    autoplayDisableOnInteraction: false
});

/*
 * ����Tab�л�
 * */
var pageNum = 2;
$('.dt-tabs-nav > a').on('click',function(e){
    e.preventDefault();
    var _this = $(this)
        ,_index = _this.index();

    _this.addClass('active').siblings().removeClass('active');
    $("#tab-content > .tab-pane:eq("+_index+")").addClass('active').siblings().removeClass('active');

    if (_this.parent().hasClass('affix')) {
        myScroll.scrollTo(0, -document.getElementById('tab-content').offsetTop);
    } else {
        myScroll.refresh();
    }
});


$(function(){
    /*
     * ԤԼ��������֤
     * */
    $('#myForm').on('click','#J_submitBtn',function(){
        var _this = $(this);
        var _uname = $('#uname').val();
        if ($.trim(_uname) == "") {
            $.gohn._showTip("��������������");
            $('#uname').focus();
            return false;
        }
        var _tel = $('#tel').val();
        if ($.trim(_tel) == "") {
            $.gohn._showTip("�����������ֻ�����");
            $('#tel').focus();
            return false;
        }

        if (!($.utils._regPhone(_tel))) {
            $.gohn._showTip("��������ȷ���ֻ�����")
            $("#tel").focus();
            return false;
        }

        var _demmand = $('#demmand').val();
        if ($.trim(_demmand) == "") {
            $.gohn._showTip("���������Ĺ�������");
            $('#amount').focus();
            return false;
        }

        $.ajax({
            method: "post",
            url: "../assets/ajax/data-apply.json",
            data: $('#myForm').serialize(),
            dataType: 'json',
            beforeSend: function(){
                _this.html('<img src="../assets/img/loading.svg" width="15" height="15" style="vertical-align: top;"> �����ύ...');
                _this[0].disabled = true;
            }
        }).done(function(data){
            $.gohn._showPrompt("success","�ύ�ɹ���");
            _this.html('ȷ���ύ');
            _this[0].disabled = false;
            setTimeout(function(){
                $('#J_applyModal').modal('hide');
            },1000);
        }).fail(function(){
            $.gohn._showPrompt("fail","����ʧ�ܣ�");
            _this.html('ȷ���ύ');
            _this[0].disabled = false;
            setTimeout(function(){
                $('#J_applyModal').modal('hide');
            },1000);
        });
    });
});
