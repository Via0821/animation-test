$(function(){
		//とにかく透明に
		$("body").css({"opacity":"0"});
		//２秒でフェードイン
		$("body").animate({"opacity":"1"},1000);
		
		//hrefが#から始まるaタグをクリックしたら
		$("a[href^=#]").click(function(){
			//(this=クリックされた要素）のhref属性を変数として頂く
			var myHref=$(this).attr("href");
			//目標地点のy座標を頂く
			var myPos=$(myHref).offset().top;
			//目標地点に向けてanimate
			$("html,body").animate({scrollTop:myPos-0},500);
		});
		
	
	$('#top').hide();
 
    // スクロールした場合
    $(window).scroll(function(){
        // スクロール位置が100を超えた場合
        if ($(this).scrollTop() > 1) {
            // 「ページトップへ」をフェードイン
            $('#top').fadeIn();
            $('#ha-header').stop().animate({'top':'-100px'},300);
        }
        // スクロール位置が100以下の場合
        else {
            // 「ページトップへ」をフェードアウト
            $('#top').fadeOut();
            $('#ha-header').stop().animate({'top':'0'},300);
        }
    });
    
     $('#top').click(function(){
        // ページトップにスクロール
        $('html,body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
	});

