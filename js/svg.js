$(function() {

  $(document).mouseup(e => {
    const $techGrid = $(".tech--grid");
    const $techPopup = $(".tech--popup");

    // if the target of the click isn't the tech grid nor a descendant of the tech grid
    if (!$techGrid.is(e.target) && $techGrid.has(e.target).length === 0) {
      $techPopup.slideUp(500);
      $(".tech--grid-icon").removeClass("active");
    }
  });

  // TECH POP-UP
  const technologies = $(".tech--grid-icon");

  // Add event listeners to tech icons.
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

  // Helper function to display tech pop-up.
  function displayTechPopup(gridIcon, origPercent, techName, techText) {

    const $techPopup = $(".tech--popup");
    const $techExpName = $($techPopup.find("#tech--popup-experience-name")[0]);
    const $techExpDesc = $($techPopup.find("#tech--popup-experience-description")[0]);
    const $techProfText = $($techPopup.find(".tech--popup-proficiency-text")[0]);
    const $percentSpan = $($techProfText.find("h1 span")[0]);
    const circleGroups = $($techPopup.find("svg g"));

    // Set new tech name and description
    $techExpName.text(techName);
    $techExpDesc.text(techText);

    const isFirstTime = $techPopup.css('display') === "none";

    if (isFirstTime) {
      $techPopup.slideDown(1000);
      for (let i = 0; i <= circleGroups.length - 1; i++) {
        $techProfText.addClass("vis-hidden");
        let jCircleGroup = $(circleGroups[i]);
        jCircleGroup.find("path").each((index, path) => {
          const jPath = $(path);
          jPath.removeClass("tech--popup-proficiency-fill");
          jPath.addClass("display-none");
        });
      }
    } else {
      // FIRST LOOP: hides currently displayed circles
      for (let i = 0; i <= circleGroups.length - 1; i++) {
        let jCircleGroup = $(circleGroups[i]);
        setTimeout(() => {
          let num = Math.floor((Math.random() * origPercent)).toString();
          if (num.length === 1) num = "0" + num
          $percentSpan.text(num);
          jCircleGroup.find("path").each((index, path) => {
            const jPath = $(path);
            jPath.removeClass("display-none");
          });
        }, 15 * i);
      }
    }

    // Loop through all 36 sets of circles
    for (let i = 0; i <= circleGroups.length - 1; i++) {
      let jCircleGroup = $(circleGroups[i]);
      setTimeout(() => {
        jCircleGroup.find("path").each((index, path) => {
          const jPath = $(path);
          jPath.removeClass("tech--popup-proficiency-fill");
          jPath.addClass("display-none");
        });
      }, 15 * i);
      setTimeout(() => {
        jCircleGroup.find("path").each((index, path) => {
          const jPath = $(path);
          jPath.removeClass("display-none");
        });
      }, 15 * (i + 36) + (isFirstTime ? 300 : 0));
    }

    // Then loop through XX% of circles and apply color fill.
    for (let i = 0; i <= Math.floor(36 * (origPercent / 100)); i++) {
      setTimeout(() => {
        $techProfText.removeClass("vis-hidden");
        if (i === Math.floor(36 * (origPercent / 100))) {
          $percentSpan.text(origPercent);
        } else {
          let num = Math.floor((Math.random() * origPercent)).toString();
          if (num.length === 1) num = "0" + num
          $percentSpan.text(num);
        }
        let jCircleGroup = $(circleGroups[i]);
        jCircleGroup.find("path").each((index, path) => {
          const jPath = $(path);
          jPath.addClass("tech--popup-proficiency-fill");
        });
      }, 15 * (i + (isFirstTime ? 72 : 36)) + (isFirstTime ? 300 : 0));
    }
  };

});