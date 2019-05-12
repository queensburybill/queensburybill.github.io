$(function() {

  $(window).scroll(() => {
    parallax();
  });

  
});
// # : none
// $ : code-special
// ^ : code-function
let i = 0;
const para1 = { name: "para1", text: "$wp#....$myStory#;*" };
const para2 = { name: "para2", text: "#Lorem $ipsum #dummy text blabla. Lorem ipsum dummy text blabla. Lorem ipsum dummy text blabla. Lorem ipsum dummy text blabla. Lorem ipsum dummy text blabla.*" };
const paraArr = [para1, para2];
let speed = 200;

for (let para of paraArr) {
  const $para = $(`#${para.name}`)
  for (let j = 0; j < para.text.length; j++) {
    // console.log("j:", j, "character:", para.text.charAt(j));

    // if (para.text.charAt(j) === ".") console.log("character:", para.text.charAt(j));

    switch (para.text.charAt(j)) {

      // LOOK AT REGULAR EXPRESSIONS!!!!!!!!!!!!!
      // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

      case "$": 
        j++;
        const $spanSpec = jQuery("<span class='code-special'></span>");
        while (para.text.charAt(j) !== "#" && para.text.charAt(j) !== "$" && para.text.charAt(j) !== "^" && para.text.charAt(j) !== "*") {
          let char = para.text.charAt(j);
          setTimeout(() => {
            if (para.text.charAt(para.text.indexOf(char)-1) === "$") {
              $para.append($spanSpec);
            }
            $spanSpec.append(char === "$" ? "" : char);
          }, speed * i);
          i++; j++;
        }
        break;

      case "^":
        const $spanFunc = jQuery("<span class='code-function'></span>");
        $para.append($spanFunc);
        j++;
        while (para.text.charAt(j) !== "#" && para.text.charAt(j) !== "$" && para.text.charAt(j) !== "^" && para.text.charAt(j) !== "*") {
          let char = para.text.charAt(j);
          setTimeout(() => {
            $spanFunc.append(char === "^" ? "" : char);
          }, speed * i);
          i++; j++;
        }
        break;

      case "#":
        j++;
        const $spanNone = jQuery("<span></span>");
        while (para.text.charAt(j) !== "#" && para.text.charAt(j) !== "$" && para.text.charAt(j) !== "^" && para.text.charAt(j) !== "*") {
          let char = para.text.charAt(j);
          setTimeout(() => {
            if (para.text.charAt(para.text.indexOf(char)-1) === "#") {
              $para.append($spanNone);
            }
            $spanNone.append(char === "#" ? "" : char);
          }, speed * i);
          i++; j++;
        }
        break;

      default:
        i++;
    }

  }
}

// for (let para of paraArr) {
//   for ( let j = 0; j < para.text.length; j++) {
//     setTimeout(() => {
//       $(`#${para.name}`).append(para.text.charAt(j));
//     }, speed * i);
//     i++;
//   }
// }

// for (let para of paraArr) {
//   let tempText = "";
//   for ( let j = 0; j < para.text.length; j++) {
//     setTimeout(() => {
//       tempText += para.text.charAt(j);
//       $(`#${para.name}`).text(tempText);
//     }, speed * i);
//     i++;
//   }
// }


const parallax = () => {
  let wScroll = $(window).scrollTop();

  $("body").css("background-position", "center " + (wScroll * 0.7) + "px");

  $("#coffee-hand").css("top", 26 + (wScroll * -0.15) + "em");

};


