$(function() {

  // Inline IMG to SVG - fetch svg code with a local AJAX call to the img folder
  // This won't work on chrome/safari when working locally.
  $("img.svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(imgURL, function (data) {
      var $svg = $(data).find("svg");
      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      }
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }
      $svg = $svg.removeAttr("xmlns:a");
      if ($(this)[0].url === "img/w-nav-logo.svg") {
        $svg.on("click", function() {
          const $pedigree = $(".header--pedigree");
          $pedigree.slideToggle({
            start: function () {
              $(this).css({ display: "flex" });
            }, 
            duration: 250
          });
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

});

$(window).on("resize", function() {
  const $navList = $("#nav-list");
  if ($navList.width() >= $(window).width()) {
    $("#menu-btn").removeClass("active");
    $("#nav-navbar").removeClass("active");
    $("#nav-list").removeClass("active");
    $navList.slideUp(500);
  }
});


