$(function() {

//**********************************************************************/
//*** TECH *************************************************************/

  // Close tech pop-up on click away
  $(document).mouseup(e => {
    const $techGrid = $(".tech--grid");
    const $techPopup = $(".tech--popup");

    // if the target of the click is neither the tech grid nor a descendant.
    if (!$techGrid.is(e.target) && $techGrid.has(e.target).length === 0) {
      $techPopup.slideUp(500);
      $(".tech--grid-icon").removeClass("active");
    }
  });

  // Add event listeners to tech icons.
  const technologies = $(".tech--grid-icon");

  technologies.each((i, technology) => {
    const $tech = $(technology);
    $tech.on("click", function() {

      $(".tech--grid-icon").removeClass("active");
      $(this).addClass("active");

      const $dataElement = $($(this).find("[data-tech-proficiency]")[0]);

      let name = $dataElement.attr("data-tech-name");
      let percent  = $dataElement.attr("data-tech-proficiency");
      let text = $dataElement.text();

      displayTechPopup($(this), percent, name, text);

    });
  });

//*** TECH HELPER FUNCTIONS ********************************************/

  function displayTechPopup(gridIcon, newPercent, techName, techText) {

    const $techPopup = $(".tech--popup");
    const $techExpName = $($techPopup.find("#tech--popup-experience-name")[0]);
    const $techExpDesc = $($techPopup.find("#tech--popup-experience-description")[0]);
    const $techProfText = $($techPopup.find(".tech--popup-proficiency-text")[0]);
    const $percentSpan = $($techProfText.find("h1 span")[0]);
    let oldPercent = parseInt($percentSpan.text());
    const circleGroups = $($techPopup.find("svg g"));

    // Set new tech name and description
    $techExpName.text(techName);
    $techExpDesc.text(techText);

    const isFirstTime = $techPopup.css('display') === "none";

    if (isFirstTime) {
      $techPopup.slideDown(500);
      // This loop hides the previous proficiency graphic before sliding open.
      for (let i = 0; i <= circleGroups.length - 1; i++) {
        $techProfText.addClass("vis-hidden");
        toggleHideCircles(circleGroups, i);
      }
    }

    // Removes old gold color (and runs the randomizer and 
    // hides all circles if the pop-up was already open.).
    for (let i = 0; i <= circleGroups.length - 1; i++) {
      setTimeout(() => {
        toggleCircleColors(circleGroups, oldPercent, i);
        if (!isFirstTime) {
          toggleHideCircles(circleGroups, i);
          percentRandomizer($percentSpan, newPercent);
        }
      }, 15 * i);

      // Shows circles.
      setTimeout(() => {
        toggleHideCircles(circleGroups, i);
      }, 15 * (i + 36));

      // Applies new gold color.
      // If pop-up was already open, this will run
      // simultaneously with the above setTimeout.
      setTimeout(() => {
        $techProfText.removeClass("vis-hidden");
        if (i >= Math.floor(36 * (newPercent / 100))) {
          if (newPercent.length === 1) newPercent = "0" + newPercent;
          $percentSpan.text(newPercent);
        } else {
          percentRandomizer($percentSpan, newPercent);
          toggleCircleColors(circleGroups, newPercent, i, false);
        }
      }, 15 * (i + (isFirstTime ? 72 : 36)));
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