/**
 * jQueryオブジェクトの拡張
 *
 * @date 2015-01-08
 */
(function($) {
  /**
   * userAgent判定フラグ
   *
   * @date 2014-09-03
   */
  var ua = navigator.userAgent.toLowerCase();
  $.ua = {
    // Windows
    isWindows: /windows/.test(ua),
    // Mac
    isMac: /macintosh/.test(ua),
    // IE
    isIE: /msie (\d+)|trident/.test(ua),
    // IE8未満
    isLtIE8: /msie (\d+)/.test(ua) && RegExp.$1 < 8,
    // IE9未満
    isLtIE9: /msie (\d+)/.test(ua) && RegExp.$1 < 9,
    // IE10未満
    isLtIE10: /msie (\d+)/.test(ua) && RegExp.$1 < 10,
    // Firefox
    isFirefox: /firefox/.test(ua),
    // WebKit
    isWebKit: /applewebkit/.test(ua),
    // Chrome
    isChrome: /chrome/.test(ua),
    // Safari
    isSafari: /safari/.test(ua)&&(!/chrome/.test(ua))&&(!/mobile/.test(ua)),
    // iOS
    isIOS: /i(phone|pod|pad)/.test(ua),
    // iPhone、iPod touch
    isIPhone: /i(phone|pod)/.test(ua),
    // iPad
    isIPad: /ipad/.test(ua),
    // Android
    isAndroid: /android/.test(ua),
    // モバイル版Android
    isAndroidMobile: /android(.+)?mobile/.test(ua),
    // タッチデバイス
    isTouchDevice: 'ontouchstart' in window,
    // スマートフォン
    isMobile: /i(phone|pod)/.test(ua)||/android(.+)?mobile/.test(ua),
    // タブレット型端末
    isTablet: /ipad/.test(ua)||/android(.+)(?!mobile)/.test(ua)
  };



  /**
   * ロールオーバー
   *
   * @date 2012-10-01
   *
   * @example $('.rollover').rollover();
   * @example $('.rollover').rollover({ over: '-ov' });
   * @example $('.rollover').rollover({ current: '_cr', currentOver: '_cr_ov' });
   * @example $('.rollover').rollover({ down: '_click' });
   */
  $.fn.rollover = function(options) {
    var defaults = {
      over: '_ov',
      current: null,
      currentOver: null,
      down: null
    };
    var settings = $.extend({}, defaults, options);
    var over = settings.over;
    var current = settings.current;
    var currentOver = settings.currentOver;
    var down = settings.down;
    return this.each(function() {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = (isCurrent && currentOver) ? current + ext : ext;
      var replace = (isCurrent && currentOver) ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;
      $(this).mouseout(function() {
        this.src = src;
      }).mouseover(function() {
        this.src = overSrc;
      });

      if (down) {
        var downSrc = src.replace(search, down + ext);
        new Image().src = downSrc;
        $(this).mousedown(function() {
          this.src = downSrc;
        });
      }
    });
  };



  /**
   * フェードロールオーバー
   *
   * @date 2012-11-21
   *
   * @example $('.faderollover').fadeRollover();
   * @example $('.faderollover').fadeRollover({ over: '-ov' });
   * @example $('.faderollover').fadeRollover({ current: '_cr', currentOver: '_cr_ov' });
   */
  $.fn.fadeRollover = function(options) {
    var defaults = {
      over: '_ov',
      current: null,
      currentOver: null
    };
    var settings = $.extend({}, defaults, options);
    var over = settings.over;
    var current = settings.current;
    var currentOver = settings.currentOver;
    return this.each(function() {
      var src = this.src;
      var ext = /\.(gif|jpe?g|png)(\?.*)?/.exec(src)[0];
      var isCurrent = current && new RegExp(current + ext).test(src);
      if (isCurrent && !currentOver) return;
      var search = (isCurrent && currentOver) ? current + ext : ext;
      var replace = (isCurrent && currentOver) ? currentOver + ext : over + ext;
      var overSrc = src.replace(search, replace);
      new Image().src = overSrc;

      $(this).parent()
      .css('display','block')
      .css('width',$(this).attr('width'))
      .css('height',$(this).attr('height'))
      .css('background','url("'+overSrc+'") no-repeat');

      $(this).parent().hover(function() {
        $(this).find('img').stop().animate({opacity: 0}, 200);
      }, function() {
        $(this).find('img').stop().animate({opacity: 1}, 200);
      });
    });
  };



  /**
   * 不透明度ロールオーバー
   *
   * @date 2014-09-03
   *
   * @example $('.opacity').opacityRollover();
   * @example $('.opacity').opacityRollover({ overOpacity: 0.6 });
   * @example $('.opacity').opacityRollover({ fade: false });
   */
  $.fn.opacityRollover = function(options) {
    var defaults = {
      fade: true,
      defaultOpacity: 1,
      overOpacity: 0.7,
      inDuration: 250,
      outDuration: 200,
      easing: 'easeOutQuart'
    };
    var settings = $.extend({}, defaults, options);
    var fade = settings.fade;
    var defaultOpacity = settings.defaultOpacity;
    var overOpacity = settings.overOpacity;
    var inDuration = settings.inDuration;
    var outDuration = settings.outDuration;
    var easing = settings.easing;
    return this.each(function() {
      $(this).hover(function() {
        if (fade) {
          $(this).stop().animate({opacity: overOpacity}, inDuration, easing);
        } else {
          $(this).css({opacity: overOpacity});
        }
      }, function() {
        if (fade) {
          $(this).stop().animate({opacity: defaultOpacity}, outDuration, easing);
        } else {
          $(this).css({opacity: defaultOpacity});
        }
      });
    });
  };

  /**
   * スクロール時に見出しを固定
   *
   * @date 2012-09-12
   *
   * @example $('article.entry').elementFollow({follow: 'header'});
   *
   *
   * based on
   * m5elementFollow
   * @author       nori (norimania@gmail.com)
   * @copyright    5509 (http://5509.me/)
   * @license      The MIT License
   * @link         http://5509.me/log/m5elementfollow
   */
  $.fn.elementFollow = function(options) {
    if ( $.ua.isIE6 ) return false;

    var conf = $.extend({
        follow: '.title',
        top: 0,
        followingClass: 'following',
        zIndex: 100
      }, options),
      chkScrollPos = function() {
        return {
          y: document.body.scrollTop || document.documentElement.scrollTop
        };
      },
      scrollPos = chkScrollPos();

    $(this).each(function() {
      var parent = $(this),
        parentHeight = parent.get(0).offsetHeight,
        parentOffset = parent.offset(),
        parentBorderLeftWidth = parseInt(parent.css('borderLeftWidth'));

      if ( ! parent.css('position').match(/absolute|relative/) ) {
        parent.css('position', 'relative');
      }

      $(window).resize(function() {
        parentOffset = parent.offset();
      });

      $(conf.follow, this).each(function() {

        var follow = $(this)
            .css({
              width: $(this).width(),
              height: $(this).height()
            }),
          followHeight = follow.get(0).offsetHeight,
          followPos = follow.position(),
          followPosAdjusted = {
            top: followPos.top,
            left: followPos.left + parentOffset.left + parentBorderLeftWidth
          };

        var clone = follow
            .clone()
            .css({
              display: 'none',
              position: 'absolute',
              top: followPos.top + conf.top,
              left: followPosAdjusted.left,
              width: follow.width(),
              height: follow.height(),
              zIndex: conf.zIndex
            });

        $(this).after(clone);
        $(this).parent().addClass('followed');

        $(window)
          .resize(function() {
            follow.css('visibility', 'visible');
            followPos = follow.position();
            followPosAdjusted = {
              top: followPos.top,
              left: followPos.left + parentOffset.left + parentBorderLeftWidth
            };
            clone.css({
              top: followPos.top + conf.top,
              left: followPosAdjusted.left
            });
          })
          .scroll(function() {
            var lineOn = parentOffset.top + parentHeight - followHeight + conf.top,
              lineOut = parentOffset.top - conf.top;
            scrollPos = chkScrollPos();
            if ( scrollPos.y >= lineOut && scrollPos.y < lineOn ) {

              follow.css('visibility', 'hidden');
              clone
                .css({
                  display: 'block',
                  position: 'fixed',
                  top: followPos.top + conf.top,
                  left: followPosAdjusted.left
                })
                .addClass(conf.followingClass);
            } else
            if ( scrollPos.y >= lineOn ) {
              clone
                .css({
                  position: 'absolute',
                  top: parentHeight - followHeight,
                  left: followPos.left
                });
            } else
            if ( scrollPos.y < lineOut ) {
              follow.css('visibility', 'visible');
              clone
                .css({
                  display: 'none',
                  position: 'absolute'
                });
            }
          });

      });
    });

    return this;
  };


  /**
   * スムーズスクロール
   *
   * @date 2014-12-01
   *
   * @example $.scroller();
   * @example $.scroller({ hashMarkEnabled: true });
   * @example $.scroller({ scopeSelector: '#container', noScrollSelector: '.no-scroll' });
   * @example $.scroller('#content');
   * @example $.scroller('#content', { pitch: 20, delay: 5, marginTop: 200, callback: function(){} });
   */
  $.scroller = function() {
    var self = $.scroller.prototype;
    if (!arguments[0] || typeof arguments[0] == 'object') {
      self.init.apply(self, arguments);
    } else {
      self.scroll.apply(self, arguments);
    }
  };

  // プロトタイプにメンバを定義
  $.scroller.prototype = {
    // 初期設定
    defaults: {
      hashMarkEnabled: false,
      scopeSelector: 'body',
      noScrollSelector: '.noscroll',
      pitch: 10,
      delay: 10,
      marginTop: 0,
      callback: function() {}
    },

    // 初期化
    init: function(options) {
      var self = this;
      var settings = this.settings = $.extend({}, this.defaults, options);
      $(settings.scopeSelector).find('a[href^="#"]').not(settings.noScrollSelector).each(function() {
        var hash = this.hash || '#';
        var eventName = 'click.scroller';
        $(this).off(eventName).on(eventName, function(e) {
          e.preventDefault();
          this.blur();
          self.scroll(hash, settings);
        });
      });
    },

    // スクロールを実行
    scroll: function(id, options) {
      if (this.timer) this.clearScroll();
      var settings = (options) ? $.extend({}, this.defaults, options) : (this.settings) ? this.settings : this.defaults;
      if (!settings.hashMarkEnabled && id == '#') return;
      var self = this;
      var win = window;
      var $win = $(win);
      var d = document;
      var pitch = settings.pitch;
      var delay = settings.delay;
      var scrollLeft = $win.scrollLeft();
      if (($.ua.isIPhone || $.ua.isAndroidMobile) && win.pageYOffset === 0) win.scrollTo(scrollLeft, (($.ua.isAndroidMobile) ? 1 : 0));
      var scrollEnd = (id == '#') ? 0 : $(id + ', a[name="' + id.substr(1) + '"]').eq(0).offset().top;
      var windowHeight = ($.ua.isAndroidMobile) ? Math.ceil(win.innerWidth / win.outerWidth * win.outerHeight) : win.innerHeight || d.documentElement.clientHeight;
      var scrollableEnd = $(d).height() - windowHeight;
      if (scrollableEnd < 0) scrollableEnd = 0;
      scrollEnd = scrollEnd - settings.marginTop;
      if (scrollEnd > scrollableEnd) scrollEnd = scrollableEnd;
      if (scrollEnd < 0) scrollEnd = 0;
      scrollEnd = Math.floor(scrollEnd);

      if ($.ua.isAndroid && scrollEnd === 0) scrollEnd = 1;
      var dir = (scrollEnd > $win.scrollTop()) ? 1 : -1;
      (function _scroll() {
        var prev = self.prev;
        var current = self.current || $win.scrollTop();
        if (current == scrollEnd || typeof prev == 'number' && (dir > 0 && current < prev || dir < 0 && current > prev)) {
          self.clearScroll();
          settings.callback();
          return;
        }
        var next = current + (scrollEnd - current) / pitch + dir;
        if (dir > 0 && next > scrollEnd || dir < 0 && next < scrollEnd) next = scrollEnd;
        win.scrollTo(scrollLeft, next);
        self.prev = current;
        self.current = next;
        self.timer = setTimeout(function() {
          _scroll();
        }, delay);
      })();
    },

    // スクロールを解除
    clearScroll: function() {
      clearTimeout(this.timer);
      this.timer = null;
      this.prev = null;
      this.current = null;
    }
  };



  /**
   * orientationchangeに関するイベントハンドラ登録用メソッド
   *
   * @date 2011-05-30
   *
   * @example $(window).orientationchange(function() { alert(window.orientation); });
   * @example $(window).portrait(function() { alert(window.orientation); });
   * @example $(window).landscape(function() { alert(window.orientation); });
   */
  var type = ($.ua.isAndroid) ? 'resize' : 'orientationchange';
  $.fn.extend({
    // オリエンテーションチェンジ
    orientationchange: function(fn) {
      return this.bind(type, fn);
    },
    // ポートレイト
    portrait: function(fn) {
      return this.bind(type, function() {
        if (window.orientation === 0) fn();
      });
    },
    // ランドスケープ
    landscape: function(fn) {
      return this.bind(type, function() {
        if (window.orientation !== 0) fn();
      });
    }
  });



  /**
   * script要素のsrc属性を利用して指定したファイル名のルートにあたるパスを取得
   *
   * @date 2011-06-20
   *
   * @example $.getScriptRoot('common/js/base.js');
   */
  $.getScriptRoot = function(filename) {
    var elms = document.getElementsByTagName('script');
    for (var i = elms.length - 1; i >= 0; i--) {
      var src = elms[i].src;
      if (new RegExp('(.*)?' + filename + '([\?].*)?').test(src)) return RegExp.$1;
    }
    return false;
  };



  /**
   * script要素のsrc属性からオブジェクトに変換したクエリを取得
   *
   * @date 2011-06-20
   *
   * @example $.getScriptQuery();
   * @example $.getScriptQuery('common/js/base.js');
   */
  $.getScriptQuery = function(filename) {
    var elms = document.getElementsByTagName('script');
    if (!filename) {
      return $.getQuery(elms[elms.length - 1].src);
    } else {
      for (var i = elms.length - 1; i >= 0; i--) {
        var src = elms[i].src;
        if (new RegExp(filename).test(src)) return $.getQuery(src);
      }
      return false;
    }
  };



  /**
   * 文字列からオブジェクトに変換したクエリを取得
   *
   * @date 2011-05-30
   *
   * @example $.getQuery();
   * @example $.getQuery('a=foo&b=bar&c=foobar');
   */
  $.getQuery = function(str) {
    if (!str) str = location.search;
    str = str.replace(/^.*?\?/, '');
    var query = {};
    var temp = str.split(/&/);
    for (var i = 0, l = temp.length; i < l; i++) {
      var param = temp[i].split(/=/);
      query[param[0]] = decodeURIComponent(param[1]);
    }
    return query;
  };



  /**
   * 画像をプリロード
   *
   * @date 2012-09-12
   *
   * @example $.preLoadImages('/img/01.jpg');
   */
  var cache = [];
  $.preLoadImages = function() {
    var args_len = arguments.length;
    for (var i = args_len; i--;) {
      var cacheImage = document.createElement('img');
      cacheImage.src = arguments[i];
      cache.push(cacheImage);
    }
  };



  /**
   * スクロール時に要素を遅延表示
   *
   * @date 2015-01-08
   *
   * @example $('img').scrollDisplay();
   * @example $('img').scrollDisplay({duration: 2000, posFix: 200});
   * @example $('img').scrollDisplay({beforeFadeIn: function() {...}, afterFadeIn: function() {...}});
   */
  $.fn.scrollDisplay = function(options) {
    var defaults = {
      duration: 1000,
      easing: 'easeInOutQuart',
      posFix: 100,
      beforeFadeIn: function() {},
      afterFadeIn: function() {}
    };
    var settings = $.extend({}, defaults, options);
    return this.each(function() {
      var win = window;
      var _this = this;
      var obj = $(this);
      var length = obj.length;
      var pos = [];

      var func = {
        init: function() {
          obj.not('.faded').css({opacity: 0});

          for (var i = 0; i < length; i++) {
            var posY = obj.eq(i).offset().top;
            pos.push(posY);
          }
          func.scroll();
        },

        scroll: function() {
          var scrollTop  = $(win).scrollTop();
          var windowBottom = $(win).height() + scrollTop - settings.posFix;

          for (var i = 0; i < obj.length; i++) {
            if (pos[i] <= windowBottom) {
              func.fadeIn(i);
            }
          }
        },

        fadeIn: function(i) {
          if (!obj.eq(i).hasClass('faded')) {
            settings.beforeFadeIn.call(_this);
            obj.eq(i).animate({opacity: 1}, settings.duration, settings.easing, function() {
              settings.afterFadeIn.call(_this);
            }).addClass('faded');
          }
        }
      };

      func.init();

      $(win).on('scroll', function() {
        func.scroll();
      });
    });
  };



  /**
   * 高さ揃え
   *
   * @date 2014-08-27
   *
   * @example $('#itemList').heightAlign();
   * @example $('#itemList').heightAlign({target: 'li'});
   * @example $('#itemList').heightAlign({target: 'li', base: 'ul'});　※各 <ul> ごとに <li> の高さを揃える
   * @example $('#itemList').heightAlign({target: 'li', col: 5});　※個数ごとに <li> の高さを揃える（1行分の数など）
   * @example $('#itemList').heightAlign({target: 'li', resizable: true});　※ウィンドウリサイズ時に高さを再設定
   */
  $.fn.heightAlign = function(options) {
    var _this = this;

    var defaults = {
      target: 'a',
      base: null,
      col: 0,
      resizable: false
    };

    var settings = $.extend({}, defaults, options);
    var windowResizeId = Math.random();
    var imgLoadCompleted = false;

    // 高さを調べて揃える
    var setHeight = function(elm) {
      var maxHeight = 0;
      var imgElm = elm.find('img');
      var imgCnt = imgElm.length;
      var loadChkSpan = 20;
      var loadWait = 1000;
      var waiting = 0;

      var func = function() {
        elm.each(function() {
          if ($(this).height() > maxHeight) {
            maxHeight = $(this).height();
          }
        });
        elm.css('height', maxHeight);
      };

      if (!imgLoadCompleted) {
        imgElm.on('load', function() { imgCnt--; });
        var loadCheckTimer = setInterval(function() {
          if (imgCnt === 0 || waiting > loadWait) {
            clearTimeout(loadCheckTimer);
            imgLoadCompleted = true;
            func();
          } else {
            waiting = waiting + loadChkSpan;
          }
        }, loadChkSpan);
      } else {
        func();
      }
    };

    // 要素を個数ごと（行ごと）に小分け　→ 高さを調べて揃える
    var setHeightByRow = function(elms) {
      var rows = [],
        temp = [];

      elms.each(function(i) {
        temp.push(this);
        if (i % settings.col == (settings.col - 1)) {
          rows.push(temp);
          temp = [];
        }
      });
      if (temp.length) rows.push(temp);

      $.each(rows, function() {
        setHeight($(this));
      });
    };

    // リサイズイベント追加
    var attachResizeEvent = function() {
      $(window).off('resize.' + windowResizeId).on('resize.' + windowResizeId, function() {
        refresh();
      });
    };

    // リサイズイベント削除
    var removeResizeEvent = function() {
      $(window).off('resize.' + windowResizeId);
    };

    // optionに応じて処理を振り分け
    var alignFunc;
    if (settings.base) {
      alignFunc = function() {
        $(_this).find(settings.base).each(function() {
          if (settings.col > 1) {
            setHeightByRow($(this).find(settings.target));
          } else {
            setHeight($(this).find(settings.target));
          }
        });
      };
    } else {
      alignFunc = function() {
        if (settings.col > 1) {
          setHeightByRow($(_this).find(settings.target));
        } else {
          setHeight($(_this).find(settings.target));
        }
      };
    }
    if (settings.resizable) {
      attachResizeEvent();
    }
    alignFunc();

    var refresh = function() {
      destroy();
      alignFunc();
    };

    var destroy = function() {
      $(_this).find(settings.target).css('height', '');
    };


    /**
     *
     * PUBLIC FUNCTIONS
     *
     */

    // 高さ揃え再設定
    _this.refresh = function() {
      refresh();
      if (settings.resizable) {
        attachResizeEvent();
      }
    };

    // 高さ揃えを解除
    _this.destroy = function() {
      destroy();
      removeResizeEvent();
    };

    return this;
  };
})(jQuery);



/**
 * 初期設定
 *
 * @date 2014-07-09
 */
(function($) {
  ({
    // 初期化
    init: function() {
      $.siteRoot = $.getScriptRoot('asset/js/base.js');
      $(function() {
        if(!$.ua.isTouchDevice){
          $('.rollover').rollover();
          $('.faderollover').fadeRollover();
        }
        $.scroller({noScrollSelector: '.no-scroll'});
      });
      if ($.ua.isLtIE9) this.alphaPng();
      if ($.ua.isLtIE9) this.html5shiv();
      // this.setPagetopUI();
    },

    // アルファPNG半透明化
    alphaPng: function(){
      var selector='.alpha';
      var d = document;
      var siteRoot = $.siteRoot;
      var src = '<script type="text/javascript" src="' + siteRoot + 'common/lib/jquery/jquery.belatedPNG.js' + '"></script>';
      d.open();
      d.write(src);
      d.close();

      $(function() {
        $(selector+'[src$=".png"]').fixPng();
      });
    },

    // html5shiv
    html5shiv: function() {
      var d = document;
      var siteRoot = $.siteRoot;
      d.open();
      d.write('<script type="text/javascript" src="' + siteRoot + 'common/lib/html5shiv/html5shiv.js' + '"></script>');
      d.close();
    },

    setPagetopUI : function(){
    // 設定
      var win = window;
      var $win =$(win);
      var $pageTopName = $('#pagetop'); // 表示・非表示させる要素の名前
      var pageTopHeight = $pageTopName.find('p').height();
      var showScrollPotision = 400; // 上から何pxスクロールすると表示させるか
      var showSpeed = 600 ;// 表示するスピード
      var hideSpeed = 600 ;// 非表示するスピード
      var fixedPosition = 60 ;//fixed時のbottomの距離
      var fixedCallingOff = 180 //固定解除する位置（画面下からの距離）

      // ページトップの表示・非表示
      $pageTopName.hide();
      $win.scroll(function () {
        if ($(this).scrollTop() > showScrollPotision) {
          $pageTopName.fadeIn(showSpeed);
        } else {
          $pageTopName.fadeOut(hideSpeed);
        }
      });

      // フッター固定
      $win.bind("scroll", function() {
        scrollHeight = $(document).height();
        scrollPosition = $win.height() + $win.scrollTop();
        if ((scrollHeight - scrollPosition) <= (fixedCallingOff - fixedPosition)) {
          $pageTopName.addClass('absolute').css({
            'bottom':fixedCallingOff + pageTopHeight
            });
        } else {
          $pageTopName.removeClass('absolute').css({
            'bottom':fixedPosition + pageTopHeight
            });
        }
      });
    }
  }).init();
})(jQuery);


/**
 * common.js
 */

;(function(win, doc, $) {

    'use strict';
    // タッチデバイスで:hoverを擬似実装
    var enableTouchOver = function() {
      if ($.ua.isIOSChrome) {
        return;
      }
      $('a, .touchover').on({
        'touchstart': function() {
          $(this).addClass('js-hover');
        },
        'touchend': function() {
          $(this).removeClass('js-hover');
        }
      });
    };

    // クラスを生成
    var Common = function() {
        this.$el = {
            win           : $(window),
            body          : $('body'),
            fixHeader : $('.header--fix')
        };

        this.scrollTop     = 0;
        this.headerOpenFlg = false;

        this._init();
    };

    Common.prototype._init = function() {
        var self = this;

        this.initEvents();
        this.MobileOpenMenu();
        if(!$.ua.isTouchDevice){
          this.setPulldownMenu();
        } else{
          this.setPulldownMenuSP();
        }
    };


    Common.prototype.initEvents = function() {
        var self = this;

        this.$el.win.on('scroll', function(){
            self.scrollTop = self.$el.win.scrollTop();
        });
        this.$el.win.on('scroll', $.proxy(this.setFixHeader, this));

    };
    Common.prototype.setPulldownMenu = function() {
      $('.header__nav').find('li').hover(function(){
        $(this).children('a').addClass('is-pulldown');
      }, function(){
        $(this).children('a').removeClass('is-pulldown');
      });

      $('.header__nav').find('li').eq(2).hover(function(){
          $('.header--fix').addClass('is-pulldown');
      }, function(){
        $('.header--fix').removeClass('is-pulldown');
      });
    };

    Common.prototype.setPulldownMenuSP = function() {
        var opened = false;

        $('.js-pulldown').on('touchend', function(e){
            e.preventDefault();
            if (!opened) {
                $(this).parent('li').addClass('is-pulldown');
                opened = true;
            } else {
                $(this).parent('li').removeClass('is-pulldown');
                opened = false;
            }
        });
    };

    Common.prototype.MobileOpenMenu = function() {
        var self = this;
        var opened = false;

        $('body').append('<div class="menu-mask"></div>');

        $(document).on('click', '.js-menu-btn a', function(e) {
            e.preventDefault();

            if (!opened) {
              open();
            } else {
                close();
            }
        });
        $(document).on('touchend', '.menu-mask', function(e) {
            close();
        });

        function close (){
            $('.js-menu-btn').removeClass('is-active');
            $('.header__right').removeClass('is-active');
            $('.menu-mask').removeClass('is-active');
            $(window).off('.noScroll');
            opened = false;
        }
        function open (){
            $(window).on('touchmove.noScroll', function(e) {
                e.preventDefault();
            });
            $('.js-menu-btn').addClass('is-active');
            $('.menu-mask').addClass('is-active');
            $('.header__right').addClass('is-active');
            opened = true;
        }
    };


    Common.prototype.setFixHeader = function() {
        if(!this.headerOpenFlg && this.scrollTop > this.$el.win.height() ){
            this.$el.fixHeader.stop().velocity({top: 0}, 300, 'easeOutQaurt');
            this.headerOpenFlg = true;
        } else if(this.headerOpenFlg && this.scrollTop < this.$el.win.height()){
            this.$el.fixHeader.stop().velocity({top: -( this.$el.fixHeader.innerHeight() ) }, 300, 'easeOutQaurt');
            this.headerOpenFlg = false;
        }
    };

    var Map = function() {
        this.$el = {
            win           : $(window),
            body          : $('body')
        };

        this.CreateMap();
    };

    Map.prototype.CreateMap = function() {
        var self       = this;
        var tgnLogoURI, panControl, draggable, tgnZoom;
        var markerSize, LatLngOffice = [];
        var map        = null ;    // 地図のインスタンス
        var logoMarker = [] ;      // ロゴのインスタンス
        var markers    = [] ;      // マーカーのインスタンス

        if($.ua.isTouchDevice){
            markerSize  = [45, 61];
            LatLngOffice = [35.3312197 , 137.2337042];
            draggable    = true; //ドラッグ禁止
        } else{
            markerSize  = [82, 110];
            LatLngOffice = [35.331600447075616 , 137.23365592023777];
            panControl   = false;
            draggable    = true;
        }


        var canvas, latlng, mapOptions, markerOption;
        // キャンパスの要素を取得する
        canvas = document.getElementById( 'map-canvas' ) ;
        // 中心の位置座標を指定する
        latlng = new google.maps.LatLng( LatLngOffice[0], LatLngOffice[1] );
        // 地図のオプションを設定する
        mapOptions = {
            zoom: 17 ,              // ズーム値
            center: latlng ,        // 中心座標 [latlng]
            mapTypeControl: false,
            mapTypeControlOptions: {
                position:google.maps.ControlPosition.TOP_LEFT
            },
            panControl: false,
            panControlOptions: {
              position: google.maps.ControlPosition.TOP_LEFT
            },
            scrollwheel: false,
            draggable: draggable,
            styles: [{ stylers:[{hue: "#666"}, {saturation: -100 }] }], //地図の色を変更
            zoomControl: true,
            zoomControlOptions: {
                position:google.maps.ControlPosition.LEFT_TOP
            },
            streetViewControl: false,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            }
        };
        // [canvas]に、[mapOptions]の内容の、地図のインスタンス([map])を作成する
        map = new google.maps.Map( canvas , mapOptions ) ;

        //マーカーのインスタンスを配列に格納
        logoMarker = [];

        createMarker(35.3312197 , 137.2337042, 0);
        function createMarker(x, y, i){
            logoMarker[ i ] = new google.maps.Marker({
                map: map ,
                position: new google.maps.LatLng( x , y),
                icon: {
                    url: $.siteRoot + 'asset/img/common/access_icon.png',
                    scaledSize: new google.maps.Size( markerSize[0], markerSize[1])
                }
            });
        }
    };


    // クラスを生成
    var SectionVisual = function() {
        this.$el = {
            win           : $(window),
            body          : $('body'),
            sectionVisual : $('.sectionVisual')
        };

        this.scrollTop     = 0;
        this.posArr = [];

        this._init();
    };

    SectionVisual.prototype._init = function() {
        var self = this;

        this.initEvents();
    };


    SectionVisual.prototype.initEvents = function() {
        var self = this;

        this.$el.win.on('scroll', function(){
            self.scrollTop = self.$el.win.scrollTop();
        });

        this.$el.win.on('load resize', $.proxy(this.paraSecVisual, this));
    };

    SectionVisual.prototype.paraSecVisual = function() {
        var self = this;
        var a;
        var $target = $('.sectionVisual');
        var posArr = [];
        var flgArr = [];

        posArr = [];

        $target.each(function(){
            posArr.push($(this).offset().top);
            flgArr.push(false);
        });

        self.$el.win.on('scroll', scroll);

        function scroll (){
            for(var i = 0; i < $target.length; i++  ){
                if(self.scrollTop + self.$el.win.height() >  posArr[i] + ($target.eq(i).height() / 2 ) && self.scrollTop + self.$el.win.height() < posArr[i] + 300 + self.$el.win.height()){
                    a = posArr[i] - self.scrollTop - self.$el.win.height();
                    $target.eq(i).find('img').stop().velocity({ translateY : (a * 0.1)}, 500, 'easeOutSine');
                }
            }
        }
    };


    $(function() {
        new Common();
        $(window).on('load', function(){
          enableTouchOver();
        });
        if( $('body').hasClass('about') || $('body').hasClass('top') || $('body').hasClass('product') ){
          if(!$.ua.isTouchDevice){
            new SectionVisual();
          }
          if( $('body').hasClass('about') || $('body').hasClass('top') ){
            new Map();
          }
        }
    });

})(this, this.document, jQuery);




