

  //***************************************************************************************/
  //***** TYPING EFFECT *******************************************************************/
  //***************************************************************************************/

  // This script requires an html file with p tags having IDs that match name properties below.
  // # : normal (no class added)
  // $ : code-special
  // ^ : code-function
  // | : paragraph gets indented
  // * : end of paragraph
  
  let i = 0;
  const para1 = { name: "para1", isHeading: true, text: "$w#.$myStory# = {*" };
  const para2 = { name: "para2", isHeading: false, text: "|$propOne: #'Lorem ipsum dolor blah blah blah.',*" };
  const para3 = { name: "para3", isHeading: false, text: "|$propTwo: #'Lorem ipsum dolor blah blah blah.',*" };
  const para4 = { name: "para5", isHeading: false, text: "#};*"}
  const paraArr = [para1, para2, para3, para4];
  let speed = 10;
  
  for (let para of paraArr) {

    let j = 0;
    const $para = $(`#${para.name}`);
    if (para.isHeading) $para.addClass("code-heading");
    if (para.text[0] === "|") {
      $para.addClass("tab-1");
      j++;
    }

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