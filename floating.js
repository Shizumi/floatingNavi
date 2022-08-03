(function ($) {
	$.fn.floating = function (o) {
		const objects = o.objects;
		const pixels = o.pixels ?? {};

		function getScrollPosition() {
			return (document.documentElement.scrollTop || document.body.scrollTop);
		}

		function setScrollPosition(objectSize) {
			const rest = objectSize.documentH - objectSize.scrollP  // 残りの高さ
			const left = (objectSize.windowW + objectSize.mainW) / 2 + (pixels.sideMargin ?? 0);
			let top = objectSize.windowH - objectSize.objectH - (pixels.bottomMargin ?? 0);

			if (objectSize.scrollP >= (pixels.fadein ?? 0)) {
				$(objects.navi).fadeIn();
			} else {
				$(objects.navi).fadeOut();
			}

			let h = (objectSize.windowH + objectSize.footerH) - rest;
			if (h > 0) {
				// フッターメニューにかかったら
				top -= h;
			}

			$(objects.navi).css({
				"top": top,
				"left": left
			});
		}

		$(objects.navi).hide();

		$(window).on('load', () => {
			const objectSize = {
				objectH: $(objects.navi).height(),
				documentH: $(document).height(),
				mainW: $(objects.main).width(),
				footerH: $(objects.bottomStandard).height(),
				windowH: $(window).height(),
				windowW: $(window).width(),
				scrollP: getScrollPosition()
			};

			setScrollPosition(objectSize);

			// 画面サイズが変わった時
			$(window).on('resize', () => {
				objectSize.windowW = $(window).width();
				objectSize.windowH = $(window).height();
				objectSize.scrollP = getScrollPosition();

				setScrollPosition(objectSize);
			});

			// スクロールされた時
			$(window).on('scroll', () => {
				objectSize.scrollP = getScrollPosition();

				setScrollPosition(objectSize);
			})

		});
	}
})(jQuery);
