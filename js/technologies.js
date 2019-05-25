$(function() {

//**********************************************************************/
//*** TECH *************************************************************/

  // Add event listeners to tech icons.
  const technologies = $(".tech--grid-icon");

  technologies.each((i, technology) => {

    const $tech = $(technology);

    // Enables tech icon hover fx.
    $tech.hover(
      function() { 
        const $techIconPopup = $($(this).find(".tech--grid-icon-popup")[0]);
        $techIconPopup.removeClass("display-none");
      }, 
      function() { 
        const $techIconPopup = $($(this).find(".tech--grid-icon-popup")[0]);
        $techIconPopup.addClass("display-none");
      } 
    );

    $tech.on("click", function() {

      if (!$(".tech--grid-icon").hasClass("running")) {
        $(".tech--grid-icon").removeClass("active");
        $(this).addClass("active");

        // Adds the argument in the viewTechnologies "function"
        const $viewTech = $("#view-technologies");
        const $techName = $($(this).find("[data-tech-name]")[0]).attr("data-tech-name");
        $viewTech.text(`${$techName}`) ;

        const $dataElement = $($(this).find("[data-tech-proficiency]")[0]);

        let name = $dataElement.attr("data-tech-name");
        let percent  = $dataElement.attr("data-tech-proficiency");
        let $text = $dataElement.html();

        runTechAnimation($(this), percent, name, $text);
      } else return;

    });
  });

//*** TECH HELPER FUNCTIONS ********************************************/

  function runTechAnimation($gridIcon, newPercent, techName, $techHTML) {

    $gridIcon.addClass("running");

    const $techPopup = $(".tech--popup");
    const $techExpName = $($techPopup.find("#tech--popup-experience-name")[0]);
    const $techExpDesc = $($techPopup.find("#tech--popup-experience-description")[0]);
    const $techProfText = $($techPopup.find(".tech--popup-proficiency-text")[0]);
    const $percentSpan = $($techProfText.find("h1 span")[0]);
    let oldPercent = parseInt($percentSpan.text());
    const circleGroups = $($techPopup.find("svg g"));

    // Set new tech name and description
    $techExpName.text(techName);
    $techExpDesc.html($techHTML);


    for (let i = 0; i <= circleGroups.length - 1; i++) {
      
      // Removes old gold color, runs the randomizer, and hides all circles.
      setTimeout(() => {
        toggleCircleColors(circleGroups, oldPercent, i);
        toggleHideCircles(circleGroups, i);
        percentRandomizer($percentSpan, newPercent);
      }, 15 * i);

      // Shows circles and applies new gold color.
      setTimeout(() => {
        toggleHideCircles(circleGroups, i);
        if (i >= Math.floor(36 * (newPercent / 100))) {
          if (newPercent.length === 1) newPercent = "0" + newPercent;
          $percentSpan.text(newPercent);
        } else {
          percentRandomizer($percentSpan, newPercent);
          toggleCircleColors(circleGroups, newPercent, i, false);
        }
      }, 15 * (i + 36));

      if (i === circleGroups.length - 1) {
        setTimeout(() => {
          $gridIcon.removeClass("running");
        }, 15 * (i + 36));
      }
    }

  };

});

function percentRandomizer($percentSpan, percent) {
  let num = Math.floor((Math.random() * percent)).toString();
  if (num.length === 1) num = "0" + num;
  $percentSpan.text(num);
}

function toggleCircleColors(circleGroups, percent, i, isOldPercent) {
  let $jCircleGroup = $(circleGroups[i]);
  $jCircleGroup.find("path").each((index, path) => {
    const $path = $(path);
    if (i < Math.floor(36 * (percent / 100))) {
      $path.toggleClass("tech--popup-proficiency-fill");
    }
  });
}

function toggleHideCircles(circleGroups, i) {
  let $jCircleGroup = $(circleGroups[i]);
  $jCircleGroup.find("path").each((index, path) => {
    const $path = $(path);
    $path.toggleClass("display-none");
  });
}