$(function() {
  
  // let windowH = $(window).height();

  // $(window).scroll(() => {
  //   parallax();
  // });

  // Inline IMG to SVG - fetch svg code with a local AJAX call to the img folder
  // This will produce a CORS error on chrome when working locally.
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

  // $(".image-box").hover(function() {
  //   const $img = $(this).find("img:first-child");
  //   const text = $img.attr("data-name");
  //   $img.replace(`img/portfolio/portfolio-advertising.jpg`);
  // });
  
  // Parallax helper function.
  const parallax = () => {
    let wScroll = $(window).scrollTop();
  
    $("body").css("background-position", "center " + (wScroll * 0.7) + "px");
  
    // const $coffeeHand = $("#coffee-hand");
    $("#coffee-hand").css("top", windowH + (wScroll * -2) + "px");
  
  };
  
});


