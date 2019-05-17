$(function() {

  $(window).scroll(() => {
    parallax();
  });

  // Inline IMG to SVG
  $("img.svg").each(function () {
    var $img = $(this);
    var imgID = $img.attr("id");
    var imgClass = $img.attr("class");
    var imgURL = $img.attr("src");
    $.get(imgURL, function (data) {
      console.log(data);
      var $svg = $(data).find("svg");
      if (typeof imgID !== "undefined") {
        $svg = $svg.attr("id", imgID);
      }
      if (typeof imgClass !== "undefined") {
        $svg = $svg.attr("class", imgClass + " replaced-svg");
      }
      $svg = $svg.removeAttr("xmlns:a");
      $img.replaceWith($svg);
    }, "xml");
  });

  // # : none
  // $ : code-special
  // ^ : code-function
  let i = 0;
  const para1 = { name: "para1", isHeading: true, text: "$wp#.$myStory#;*" };
  const para2 = { name: "para2", isHeading: false, text: "#for my entire career I felt like I was trying to fit a square peg into a round hole — as soon as I started coding I knew I found my passion*" };
  const paraArr = [para1, para2];
  let speed = 50;
  
  for (let para of paraArr) {

    const $para = $(`#${para.name}`);
    if (para.isHeading) $para.addClass("code-heading");
    let j = 0;

    while (j < para.text.length) {
      if (/[$#^]/.test(para.text.charAt(j))) {
        let paraType = para.text.charAt(j);
        j++;
        const $span = jQuery(
          `<span${paraType === "#" 
            ? ""
            : `${paraType === "$" 
              ? " class='code-special'"
              : " class='code-function'"}`
            }></span>`
        );
        let phrase = "";

        while (!/[$#^*]/.test(para.text.charAt(j))) {
          let char = para.text.charAt(j);
          setTimeout(() => {
            if (para.text.charAt(para.text.indexOf(char)-1) === paraType) {
              $para.append($span);
            }
            phrase += char;
            $span.text(phrase);
          }, speed * i);
          i++; j++;
        }

      } else {
        i++; j++;
      }
    }
  }
  
  // Parallax helper function.
  const parallax = () => {
    let wScroll = $(window).scrollTop();
  
    $("body").css("background-position", "center " + (wScroll * 0.7) + "px");
  
    $("#coffee-hand").css("top", 26 + (wScroll * -0.15) + "em");
  
  };
  
});


