;(function(win, doc, $) {

    'use strict';

    // クラスを生成
    var Main = function() {
        this.$el = {
            win           : $(window),
            body          : $('body'),
            sectionVisual : $('.sectionVisual'),
            videoWrap     : $('.video-wrap'),
            opening       : $('.opening'),
            newsList      : $('.news__list'),
            instaFeed      : $('.instagram__feed')
        };

        this.scrollTop     = 0;
        this.posArr = [];

        this._init();
    };

    Main.prototype._init = function() {
        var self = this;
        var visitedCookie = $.cookie('openingLoad');


        this.initEvents();
        if(!visitedCookie && !$.ua.isTouchDevice) {
            $.cookie('openingLoad', 'visited', { expires: 3 });
            this.$el.win.on('load', $.proxy(this._setOpening, this));
            this._setMovie();
        } else{
            this.$el.opening.hide();
            this.setMv();
        }
        this.loadFacebookPosts();
        this.loadInstagramPosts();
    };


    Main.prototype.loadFacebookPosts = function() {
        /*
         * facebookの更新を取得
         */
        var self = this;

        $.getJSON('https://graph.facebook.com/v2.5/sakuzan.japan/feed?access_token=1251515268210006|5TQ1f7mNF54L2SxaRtS3APOl68U', function(json) {
            var userData = json.data;

            // load ID
            var id = [];
            for (var d = 0; d < userData.length; d++) {
                id.push(userData[d].id);
            }

            // load Data
            var jqxhdr = [];
            for (var i = 0; i < id.length; i++) {
                jqxhdr.push($.ajax({
                    url: 'https://graph.facebook.com/'+ id[i] +'?fields=full_picture,link,message,created_time,type',
                    type: 'GET',
                    dataType: 'json'
                }));
            }

            $.when.apply($, jqxhdr).done(function() {
                var data = [];
                var result,
                    ymd;

                var count = 0;

                // 表示数
                var showNum = 3;

                for (var i = 0; i < showNum; i++) {
                    result = arguments[i];
                    data.push(result[0]);

                    ymd = data[i].created_time.split('T')[0].split('-');

                    // メッセージが未入力の場合
                    if (data[i].message === undefined) {
                        data[i].message = 'この投稿にはメッセージがありません。クリックで投稿された写真を表示します。';
                    }

                    if (data[i].type === 'link') {
                        self.$el.newsList.append('<li><a href="https://www.facebook.com/'+ data[i].id +'" target="_blank"><time class="news__date">'+ ymd[1] +'/'+ ymd[2] +'</time><div class="news__thumb thumb"><span style="background: url('+ data[i].full_picture +') no-repeat 50% 50% / cover;"></span></div><p>'+ data[i].message.substr(0,28) +'...</p></a></li>');
                    } else {
                        self.$el.newsList.append('<li><a href="https://www.facebook.com/'+ data[i].id +'" target="_blank"><time class="news__date">'+ ymd[1] +'/'+ ymd[2] +'</time><div class="news__thumb thumb"><span style="background: url('+ data[i].full_picture +') no-repeat 50% 50% / cover;"></span></div><p>'+ data[i].message.substr(0,28) +'...</p></a></li>');
                    }
                }

            });
        });
    };


    Main.prototype.loadInstagramPosts = function() {
        /*
         * instagramの更新を取得
         */
        var self  = this;
        var user  = '1920187014';
        var token = '1138340667.5d7eef6.3f687827531b4a12816631664397f7bb';

        var count = 0;

        // 表示数
        var showNum = 12;

        $.ajax({
            url: 'https://api.instagram.com/v1/users/'+ user +'/media/recent',
            data: { access_token: token },
            dataType: 'jsonp',
            timeout: 10000,
            success: function(json) {
                _pushItems(json);
            },
            error: function(xhr) {
                console.log(xhr);
            }
        });

        function _pushItems(json) {
            var data   = json.data;

            for (var i = 0; i < showNum; i++) {
                self.$el.instaFeed.find('ul').find('li').append('<a href="'+ data[i].link +'" target="_blank" style="background: url('+ data[i].images.standard_resolution.url +') no-repeat 50% 50% / cover;"></a>');
            }
        }
    };


    Main.prototype.initEvents = function() {
        var self = this;

        this.$el.win.on('scroll', function(){
            self.scrollTop = self.$el.win.scrollTop();
        });

        this.$el.win.on('load', $.proxy(this.setCss, this));
    };

    Main.prototype.setCss = function(){
        var $openingLogo = $('.opening__logo');
        var h = 0;
        $openingLogo.find('img').each(function(){
            h = h + $(this).height();
        });

        $openingLogo.css({height: h});
    };

    Main.prototype._setMovie =function(){
        var self = this;


        self.$el.videoWrap.vidbg({
            'mp4': 'asset/media/opening.mp4',
            'poster': 'asset/img/index/mv_poster.png'
        }, {
          muted: true,
          loop: false,
          overlay: false,
          autoplay: false
        });
    };

    // Main.prototype._setOpening = function() {
    //     var self = this;
    //     var $opening     = $('.opening');
    //     var $videoWrap   = $('.video-wrap');
    //     var $openingLogo = $('.opening').find('.opening__logo');

    //     $opening.find('.mask').velocity({opacity: 0}, 2400,  function(){
    //         $(this).addClass('is-hide');
    //     });
    //     $opening.find('video')[0].play();
    //     $openingLogo.delay(2500).queue(function(){
    //         $(this).addClass('is-show').dequeue();
    //     });
    //     setTimeout(function(){
    //         $openingLogo.velocity({
    //           translateY: -80
    //         },{
    //           duration: 2100,
    //           queue: false,
    //           easing: 'easeInCubic'
    //         }).velocity({
    //           opacity: 0
    //         },{
    //           duration: 1800,
    //           delay:400,
    //           easing: 'easeInOutQuad'
    //         });
    //         // $openingLogo.velocity({translateY: -80}, 2300, 'easeInQuart')
    //         self.setMv();
    //     }, 5800);

    //     setTimeout(function(){
    //         $opening.find('.mask').velocity({opacity: 1}, 2000);
    //         $opening.delay(1500).velocity({opacity: 0}, 2000, function(){
    //             $(this).hide();
    //         });
    //     },6400);

    // };

    Main.prototype.setMv = function() {
        var slider = $('.mainVisual__slider').bxSlider({
            mode: 'fade',
            controls: false,
            speed: 800,
            auto: true,
            onSlideAfter: function(){
                slider.startAuto();
            }
        });
    };


    $(function() {
        new Main();
    });

})(this, this.document, jQuery);
