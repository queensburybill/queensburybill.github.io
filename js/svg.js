$(function() {

  const circleGroups = $("#tech-proficiency-svg g");
  const proficiency = $(".tech-proficiency-text");
  const percentSpan = $(".tech-proficiency-text h1 span");
  const origPercent = $(".tech-proficiency-text h1 span").text();

  for (let i = 0; i <= circleGroups.length - 1; i++) {
    setTimeout(() => {

      let num = Math.floor((Math.random() * origPercent)).toString();
      if (num.length === 1) num = "0" + num
      percentSpan.text(num);

      let jCircleGroup = $(circleGroups[i]);
      jCircleGroup.find("path").each((index, path) => {
        const jPath = $(path);
        jPath.removeClass("display-none");
      });
    }, 20 * i);
  }

  for (let i = 0; i <= Math.floor(36 * (origPercent / 100)); i++) {
    setTimeout(() => {

      proficiency.removeClass("vis-hidden")

      if (i === Math.floor(36 * (origPercent / 100))) {
        percentSpan.text(origPercent);
      } else {
        let num = Math.floor((Math.random() * origPercent)).toString();
        if (num.length === 1) num = "0" + num
        percentSpan.text(num);
      }

      let jCircleGroup = $(circleGroups[i]);
      jCircleGroup.find("path").each((index, path) => {
        const jPath = $(path);
        jPath.addClass("tech-proficiency-fill");
      });
    }, 20 * (i+36));
  }

  // This uses jQuery's "delay()" method, but it works kind of funny,
  // and I couldn't find great support for how to use it this way.

  // circleGroups.each((i, group) => {
  //   const jCircleGroup = $(group);
  //   jCircleGroup.find("path").each((index, path) => {
  //     const jPath = $(path);
  //     jPath.delay(25 * i).queue(function(next) {
  //       console.log("is this happening?");
  //       $(this).addClass("tech-proficiency-fill");
  //       $(this).dequeue();
  //     });
  //   });
  // });
    
  
});