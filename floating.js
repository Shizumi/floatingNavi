(function($) {
	$.fn.extend({
		floating: function (options) {
			// var objects = {bottomStandard : '.footer' // フッター部分(避ける部分)のオブジェクト名
			//              , navi : '.pageup'           // 追随させるオブジェクト名
			//              , main : '.main'             // メインコンテンツの横幅を決めるオブジェクト名
			//               };

			// var pixels = {fadein : 0        // 追随するオブジェクトが表示される位置(ScrollTop)
			//             , sideMargin : 10   // メインコンテンツからの距離
			//             , bottomMargin : 10 // 画面下部からの距離
			// };

			function getScrollPosition() {
			　　return (document.documentElement.scrollTop || document.body.scrollTop);
			}

			function setScrollPosition (objectSize) {
				var remaindH  = objectSize.documentH - objectSize.scrollP   // 残りの高さ
				var left = (objectSize.windowW + objectSize.mainW) / 2 + options.pixels.sideMargin;
				var top = objectSize.windowH - objectSize.objectH - options.pixels.bottomMargin;

				if (objectSize.scrollP >= options.pixels.fadein) {
					$(options.objects.navi).fadeIn();
				} else {
					$(options.objects.navi).fadeOut();
				}

				if ((objectSize.windowH - remaindH + objectSize.footerH) > 0) {
					// フッターメニューにかかったら
					top -= objectSize.windowH - remaindH + objectSize.footerH;
				} else {
					top = objectSize.windowH - objectSize.objectH - options.pixels.bottomMargin;
				}
				$(options.objects.navi).css({"position": "fixed"
				                , "top": top
				                , "left": left});
			}

			$(options.objects.navi).hide();

			$(window).bind('load', function () {
				var objectSize = {objectH   : $(options.objects.navi).height()  // pageupオブジェクトの高さ
				                , documentH : $(document).height()  // Document全体の高さ
				                , mainW     : $(options.objects.main).width()   // 全体の横幅(Windowの横幅ではない)
				                , footerH   : $(options.objects.bottomStandard).height()   // フッターの高さ
				                , windowH   : $(window).height()    // Windowの高さ
				                , windowW   : $(window).width()     // Windowの横
				                , scrollP   : getScrollPosition()   // スクロール位置
				                 };

				setScrollPosition(objectSize);

				// 画面サイズが変わった時
				$(window).resize(function () {
					objectSize.windowW = $(window).width();
					objectSize.windowH = $(window).height();
					objectSize.scrollP = getScrollPosition();

					setScrollPosition(objectSize);
				});

				// スクロールされた時
				$(window).scroll(function () {
					objectSize.scrollP = getScrollPosition();

					setScrollPosition(objectSize);
				})

			});
		}
	});
})(jQuery);
