let btn = document.getElementsByTagName("button")[0];
const form = document.getElementById("form");

// This is an unnecessary script for a sticky navbar. It's unnecessary because
// you can just use "position: sticky; top: 0;" to achieve the same result in a
// more browser-friendly way.
// let navbar = document.getElementById("navbar");
// document.addEventListener("scroll", function() {
//   navbar.style.top = Math.max(120, window.scrollY) + "px";
// });

form.onsubmit = submit;

function submit() {
  const display1 = document.getElementById("display1");
  const display2 = document.getElementById("display2");

  let name = form.name.value;
  let password = form.password.value;
  let age = form.age.value;
  let story = form.story.value.trim().split(" ");

  for (let i = 0; i < story; i++) {
    let node = document.createElement("h4");
    let textnode = document.createTextNode(personKeys[i]);
    node.appendChild(textnode);
  }

  display1.innerHTML = `Hi ${name}! Your password is ${password}. You are ${age} years old.`;
  display2.innerHTML = `Your favorite fruits are ${story}`;

  event.preventDefault();
}
