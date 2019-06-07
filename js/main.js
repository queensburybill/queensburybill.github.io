$(function() {

  // Inline IMG to SVG - fetch svg code with a local AJAX call to the img folder
  // This won't work on chrome/safari when working locally.
  $("img.svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    var imgTitle = $img.attr("title");
    $.get(imgURL, function (data) {
      var $svg = $(data).find("svg");
      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      }
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }
      if (typeof imgTitle !== "undefined") {
        // Places the title in 3 different places in an effort to get tooltips to display in FireFox (but never did).
        $svg = $svg.attr("title", imgTitle);
        $firstChild = $($svg.children()[0]);
        $firstChild.prepend(`<title>${imgTitle}</title>`);
        $svg.prepend(`<title>${imgTitle}</title>`);
      }
      $svg = $svg.removeAttr("xmlns:a");
      if ($(this)[0].url === "img/w-nav-logo.svg") {
        $svg.on("click", function() {
          if($(window).width() >= 480) {
            $(".header--pedigree").toggleClass("active");
          }
        });
      }
      $img.replaceWith($svg);
    }, "xml");
  });

  $("#menu-btn").on("click", function() {
    const $navList = $("#nav-list");
    $navList.slideToggle(500);
    $(this).toggleClass("active");
    $("#nav-navbar").toggleClass("active");
    $("#nav-list").toggleClass("active");
  });

  $("#nav-list li").each((i, li) => {
    const $navList = $("#nav-list");
    $(li).on("click", () => {
      $navList.slideToggle(500);
      $("#menu-btn").toggleClass("active");
      $("#nav-navbar").toggleClass("active");
      $("#nav-list").toggleClass("active");
    });
  });

  // Carousel controller
  $("#design .image-box").each(function() {
    $(this).on("click", function() {
      $content = $($("#design .gallery--wrapper .content")[0]);
      const $img = $($(this).find("img")[0]);
      const carouselId = "#" + $img.attr("data-name");
      const $closeBtn = $(carouselId).find(".close-btn");

      $content.removeClass("active");
      $(carouselId).addClass("active");

      $closeBtn.on("click", function() {
        $content.addClass("active");
        $(carouselId).removeClass("active");
      });

      $(`${carouselId} .owl-carousel`).owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
          0:{ items:1 }
        }
      });
    });
  });

});

// Fade in on scroll fx
$("main").on("scroll resize", function() {
  $(".fadein-left").each(function(i) {
    
    let elementTop = $(this).offset().top;
    let windowHeight = $(window).height();

    if(elementTop - windowHeight * .55 < 0) {
      $(this).animate({
        "opacity": "1",
        "margin-top": "0px",
        "margin-left": "0px"
      },800);
    }
      
  }); 
});

$("main").trigger("scroll");


