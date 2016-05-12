;(function($){
    HS.menuFixed = { // 右下角快捷菜单
        _toggle: function(e){
            var ev = event || window.event;
            if ($('.mask').length) {
                $('.mask').remove();
            } else {
                $('body').append('<div class="mask"/>');
            }
            $(ev.currentTarget).parent().toggleClass('open');
        },
        _hide: function(){
            var $menuFixed = $('.menu-fixed');
            if ($menuFixed.hasClass('open')) {
                $menuFixed.removeClass('open');
                $('.mask').remove();
            }
        },
        _init: function(){
            $('body').on('click','.mask',function(){
                HS.menuFixed._hide();
            });
        }
    };
    HS.shopSubMenu = { //商品分类
        _toggle: function(e){
            var ev = event || window.event;
            if ($('.shop-submenu-mask').length) {
                $('.shop-submenu-mask').remove();
            } else {
                $('#content').append('<div class="shop-submenu-mask"/>');
            }
            $(ev.currentTarget).parent().toggleClass('active');
        },
        _hide: function(){
            var $hasSubmenu = $('.shop-bar-tab .has-submenu');
            if ($hasSubmenu.hasClass('active')) {
                $hasSubmenu.removeClass('active');
                $('.shop-submenu-mask').remove();
            }
        },
        _init: function(){
            $('body').on('click','.shop-submenu-mask',function(){
                HS.shopSubMenu._hide();
            });
        }
    };
}(jQuery));