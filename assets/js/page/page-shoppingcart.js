/**
 * Created by Yaran Ann on 2015/8/4 0004.
 * 购物车Js
 */
var $J_OrderList = $('#J_OrderList');
var $J_checkAll =  $('#J_checkAll');
var $J_CartList = $('#J_CartList');
/*
 * 自定义模态框
 * */
function myModalHide(){ // 隐藏自定义弹窗
    var $backdrop = $('.modal-backdrop');
    $backdrop.remove();
    $('.modal').removeClass('in');
    setTimeout(function(){
        $('.modal').hide();
    },300);
}
$('[data-dismiss="modal"]').on('click',function(){
    myModalHide()
});
$('body').on('click','.modal-backdrop,.modal',function(){
    myModalHide()
});
$('.modal-dialog').on('click',function(e){
    e.stopPropagation();
});
$J_OrderList.on('click','[data-toggle="modal"]',function(e){
    e.preventDefault();
    var $this = $(this);
    var href    = $this.attr('href');
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
    var $triggerType = $this.data('type');
    $('#J_triggerType').val($triggerType);
    $('<div class="modal-backdrop" />').appendTo($(document.body));
    $target.show();
    $('#J_modalContent').load('./choose-sepc-modal.html', {proID: 25}, function() { //加载规格选择页面
        $('.modal-backdrop').toggleClass('in');
        setTimeout(function(){
            $target.toggleClass('in');
        },10);
        /*
         * 初始化iScroll
         * */
        myScroll1 = new IScroll('.scroller-wrapper',{
            probeType: 2,
            mouseWheel: true,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A|I|SPAN)$/ }
        });
        setTimeout(function(){
           myScroll1.refresh(); // 刷新iScroll
        },0)
    });
});

$(function(){
    /*
     * 监听数量输入框
     * */
    $('.J_Amount').on('keyup paste input',function(){
        this.value = ~~this.value.replace(/\D/g,'');
        if (this.value > 1) $(this).siblings('.J_MinusBtn').removeClass('disabled');
        if(this.value == ''|| this.value < 1) this.value = 1;
    });

    /*
     * 增加数量
     * */
    $('.J_PlusBtn').on('click',function(e){
        e.preventDefault();
        var $this = $(this)
            ,$parent = $this.parent()
            ,$input = $parent.find('.J_Amount')
            ,$inputVal = parseInt($input.val())
            ,_Max_Amount = $this.data('maxamount');
        if ($this.hasClass('disabled')) {
            $.gohn._showTip('超出数量范围');
            return false;
        }
        $this.siblings('.J_MinusBtn').removeClass('disabled');
        $input.val($inputVal+1);
        if (parseInt($input.val()) == _Max_Amount) {
            $this.addClass('disabled');
            return false;
        }
    });

    /*
     * 减少数量
     * */
    $('.J_MinusBtn').on('click',function(e){
        e.preventDefault();
        var $this = $(this)
            ,$parent = $this.parent()
            ,$input = $parent.find('.J_Amount')
            ,$inputVal = parseInt($input.val());
        $this.siblings('.J_PlusBtn').removeClass('disabled');
        if ($this.hasClass('disabled')) return false;
        $input.val($inputVal-1);
        if(parseInt($input.val()) == 1){
            $this.addClass('disabled');
            return false;
        }
    });
});

/*
 * 点击编辑按钮修改数量规格
 * */
$J_CartList.on('click','.J_editMeta',function(e){
    e.stopPropagation();
    e.preventDefault();
    var $this = $(this);
    var $listWrap = $this.parents('.sc-list-wrapper');
    if ($listWrap.hasClass('edit')) {
        $this.html('编辑');
        $listWrap.removeClass('edit');
        $listWrap.find('ul.sc-list li').removeClass('active');
    } else {
        $this.html('完成');
        $listWrap.addClass('edit');
        $listWrap.find('ul.sc-list li').addClass('active');
    }
});

/*
 * 点击完成按钮保存信息
 * */
$J_OrderList.on('click','.J_saveItemBtn',function(){
    $(this).parents('li').removeClass('active');
});

/*
 * 点击删除按钮
 * */
$J_CartList.on('click','.J_delItemBtn',function(e){
    var _this = $(this);
    var $listWrap = _this.parents('.sc-list-wrapper');
    var _itemLen = $listWrap.find('li').length;
    if (window.confirm("确认要删除该商品吗？")) {
        // 执行删除操作
        if (_itemLen == 1) {
            $listWrap.remove();
        } else {
            _this.parents('li').remove();
        }
    }
});

/*
 * icheck选择
 * */
$J_CartList.on('change','.icheck',function(){
    var _this = $(this);
    var $listWrap = _this.parents('.sc-list-wrapper');
    var _headerCheck = $listWrap.find('.sc-list-header .icheck');
    var _bodyCheck = $listWrap.find('li .icheck');
    var _bodyChecked = $listWrap.find('li .icheck:checked');

    if (_this.parent().parent().attr('class') == 'sc-list-header') { // 点击的是头部的checkbox
        if (_this.prop('checked')) {
            _bodyCheck.prop('checked',true);
            $listWrap.find('li').each(function(){
               $(this).addClass('selected');
            });
        } else {
            _bodyCheck.prop('checked',false);
            $listWrap.find('li').each(function(){
                $(this).removeClass('selected');
            });
        }
    } else { // 点击的是主体的checkbox
        if (_this.prop('checked')) {
            _this.parents('li').addClass('selected');
        } else {
            _headerCheck.prop('checked',false);
            _this.parents('li').removeClass('selected');
        }
        if (_bodyCheck.length == _bodyChecked.length) {
            _headerCheck.prop('checked',true);
        } else {
            _headerCheck.prop('checked',false);
        }
    }
    if ($J_CartList.find('.icheck').length == $J_CartList.find('.icheck:checked').length) {
        $J_checkAll.prop('checked',true);
    } else {
        $J_checkAll.prop('checked',false);
    }
    // 计算总价总量
    setTotal();
});

/*
 * 购物车全选
 * */
$J_checkAll.on('change',function(){
    var _this = $(this);
    if (_this.prop('checked')) {
        $J_CartList.find('li').addClass('selected');
        $J_CartList.find('.icheck:not(:checked)').prop('checked',true);
    } else {
        $J_CartList.find('li').removeClass('selected');
        $J_CartList.find('.icheck:checked').prop('checked',false);
    }
    // 计算总价总量
    setTotal();
});

/*
 * 计算总价及总数量
 * */
function setTotal(){
    var moneyTotal = 0, numTotal = 0, freight = 0;
    $J_CartList.find("li.selected").each(function(){
        var $this = $(this)
            ,numVal = $this.find('.J_itemNum').html();
        if ( numVal > 0) {
            moneyTotal += parseInt(numVal)*parseFloat($(this).find('.J_unitPrice').text());
            numTotal += parseInt(numVal);
        }
    });
    $("#J_moneyTotal").html(moneyTotal.toFixed(2));
    $("#J_numTotal").html(numTotal);
}

// 删除全部失效商品
function delAllInvalidItem(){
    if (window.confirm("确认要删除全部失效商品吗？")) {
        // 执行删除操作
        $('#J_invalidItemList').remove();
    }
}