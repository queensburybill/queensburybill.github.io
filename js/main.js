let btn = document.getElementsByTagName("button")[0];
const form = document.getElementById("form");

form.onsubmit = submit;

function submit() {
  const display1 = document.getElementById("display1");
  const display2 = document.getElementById("display2");

  let person = {};

  person.name = form.name.value;
  person.password = form.password.value;
  person.age = form.age.value;
  person.story = form.story.value;

  const personKeys = Object.keys(person);

  for (let i = 0; i < personKeys.length; i++) {
    let node = document.createElement("h4");
    let textnode = document.createTextNode(personKeys[i]);
    node.appendChild(textnode);
  }

  display1.innerHTML = `Hi ${name}! Your password is ${password}. You are ${age} years old.`;
  display2.innerHTML = `Your story is ${story}`;

  //   alert("Hello " + name + "!");

  event.preventDefault();
}
