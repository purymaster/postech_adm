$(function() {

    var is_mobile = false, //모바일 판별 변수
        scrollbar_width = window.outerWidth - $(window).width(); // 스크롤바 너비

    /******************** 모바일 판별 및 네비게이션, 검색창 초기화 ********************/

    $(window).on('load resize', function() {
        ($(window).width() + scrollbar_width) > 1024 ?
            (
                is_mobile = false,
                $('header .nav_wrap,nav .main-menu li').removeClass('on'),
                $('header nav .sub-menu').show()
            ) : (
                is_mobile = true,
                $('header .nav_wrap').removeClass('on'),
                $('nav .main-menu li').removeClass('on').find('.sub-menu').hide()
            )
    });

    /******************** 하위브라우저 경고 ********************/

    $('.ie9').find('button').on('click', function() {
        $('.ie9').fadeOut();
    });

    /******************** 네비게이션 제어 ********************/

    $('.main-menu > li').has('.sub-menu').addClass('sub');

    /* 모바일 메뉴 열기 */
    $('header .open_menu').on('click', function() {
        $('header .nav_wrap').addClass('on');
    });

    /* 모바일 메뉴 펼치기 */
    $('nav .main-menu > li > a').on('click', (function() {
        if (is_mobile) {
            $(this).parent().hasClass('on') ?
                $('nav .main-menu li').removeClass('on').find('.sub-menu').stop().slideUp(100) :
                (
                    $('nav .main-menu li').removeClass('on').find('.sub-menu').stop().slideUp(100),
                    $(this).parent().addClass('on').find('.sub-menu').stop().slideDown(100)
                )
            return false;
        }
    }));

    /* 모바일 메뉴 닫기 */
    $('header .close_menu').on('click', function() {
        $('header .nav_wrap').removeClass('on');
        $('nav .main-menu > li').removeClass('on').find('.sub-menu').slideUp(100);
    });

    /******************** 셀렉트박스 제어 ********************/

    var select_form = $('.select_form');

    select_form.on('click', 'button[type="button"]', function() {
        ($(this).hasClass('on')) ?
        select_form.find('button').removeClass('on'):
            (select_form.find('button').removeClass('on'), $(this).addClass('on'));
    }).on('click', 'a', function() {
        $(this).closest('ul').siblings('button').removeClass('on').find('span').html($(this).text());
        $(this).closest('.select_form').find('input[type=hidden]').val($(this).attr('value'));
    });

    $(document).on('mouseup touchend', function(e) {
        if (!select_form.is(e.target) && select_form.has(e.target).length === 0)
            select_form.find('button').removeClass('on');
    });

    /******************** 메인페이지 제어 ********************/

    /* 메인 슬라이드 */
    $('.main_visual [data-slide].main_slide').slick({
        arrows: false,
        fade: true,
        dots: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
    });

    /* 공지사항 슬라이드 */
    var current = $('.main_visual .notice').find('.current'),
        total = $('.main_visual .notice').find('.total');

    $('.main_visual [data-slide].notice_slide').slick({
        arrows: true,
        dots: false,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        pauseOnFocus: false,
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        current.text(nextSlide + 1);
    });

    total.text($('.main_visual [data-slide].notice_slide .slide').not('.slick-cloned').length);

    /******************** Datepicker ********************/

    $('[data-datepicker]').datepicker({
        dateFormat: 'yy-mm-dd',
        showMonthAfterYear: true,
        monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        buttonText: "선택",
        yearSuffix: "년",
        changeYear: true,
        yearRange: "-100:+0",
        showOn: "button",
        buttonImage: "../img/img/img_calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        // defaultDate: "-18y",
    });

    /******************** 스크롤 애니메이션 정의 ********************/

    var move_el = $('[data-animation]'), //무빙 요소
        move_name, //무빙 정의
        move_delay, //순차무빙 딜레이
        move_duration, //순차무빙 시간
        scroll, //스크롤 값
        start_point = $(window).height() * 0.95, //애니메이션 시작 높이(밑에서부터 화면 높이의 5%)
        top_btn = $('.move_top'), //TOP 버튼
        top_btn_flag = 0; //TOP 버튼 상태

    move_el.addClass('wait-animation');
    $(window).on('load scroll', function() {
        scroll = $(this).scrollTop();

        //순차 애니메이션 제어
        move_el.each(function() {
            move_name = $(this).data('animation');
            move_delay = $(this).data('delay') * 100; //단위 0.1초
            move_duration = $(this).data('duration') * 1000; //단위 1초
            $(this).addClass('animated ' + move_name);
            if (move_delay >= 0)
                $(this).css({
                    '-webkit-animation-delay': move_delay + 'ms',
                    'animation-delay': move_delay + 'ms'
                });
            if (move_duration >= 0)
                $(this).css({
                    '-webkit-animation-duration': move_duration + 'ms',
                    'animation-duration': move_duration + 'ms'
                });
            if (scroll > $(this).offset().top - start_point)
                $(this).removeClass('wait-animation');
        });

        //TOP 버튼 제어
        (scroll === 0) ? top_btn.removeClass('on'): top_btn.addClass('on');

        top_btn.find('button').on('click', function() {
            if (top_btn_flag) return false;
            top_btn_flag = 1;
            $('html, body').animate({
                scrollTop: 0
            }, function() {
                top_btn_flag = 0;
                top_btn.removeClass('on');
            });
            return false;
        });

    });

    /******************** FAQ 제어 ********************/

    var faq = $('[data-faq] .question');

    faq.on('click', function() {
        $(this).parent().hasClass('on') ?
            $('[data-faq] > li').removeClass('on') :
            (
                $('[data-faq] > li').removeClass('on'),
                $(this).parent().addClass('on')
            )
    });

    /******************** 모달 제어 ********************/

    $('[data-modal] .close').on('click', function() {
        close_modal();
    })

    /******************** 마이 캘린더 제어 ********************/

    var my_calendar = $('[data-mycalendar]');
    // my_calendar_btn = my_calendar.find('.ctr').children('button');

    my_calendar.on('click', '[data-content="calendar"] td', function() {
        $('[data-content="calendar"] td').removeClass('on');
        $(this).addClass('on');
    }).on('click', '.ctr button', function() {
        $(this).addClass('on').siblings().removeClass('on');
        my_calendar.find('[data-content]').hide();
        my_calendar.find('[data-content=' + $(this).data('view') + ']').show();
    })

    $(document).on('mouseup touchend', function(e) {
        $('[data-content="calendar"] td').removeClass('on');
    });

});

/******************** 모달, 로딩 제어 ********************/

function show_modal(target) {
    $(target).show();
}

function close_modal() {
    $('[data-modal]').hide();
}

function show_loading() {
    $('[data-loading]').show();
}

function hide_loading() {
    $('[data-loading]').hide();
}