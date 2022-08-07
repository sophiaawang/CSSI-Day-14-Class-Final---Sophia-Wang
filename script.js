const keysPressed = [];
const secretCode = "what";
const numericCode = "3";
let testNumericCode = {
  7: false,
  9: false,
  2: false,
}
let passwordSubmitted = false;

let clue1 = document.querySelector("#clue-1");
let button = document.querySelector("#button");
let clue2 = document.querySelector("#clue-2");

let page = document.querySelector(".hero");
let body = document.querySelector("#main-body");

let timer = document.querySelector("#timer");
let catpchaSection = document.querySelector("#captcha-stuff");

window.addEventListener("keypress", (e) => {
  console.log(e.key);
  keysPressed.push(e.key);
  console.log(keysPressed);

  let attemptedSecret = keysPressed.slice(-secretCode.length);
  if (attemptedSecret.join("") === secretCode && !passwordSubmitted) {
    passwordSubmitted = true;
    timer.classList.add("hidden");
    clue1.classList.add("hidden");
    button.classList.remove("hidden");
  }

  // let attemptedNum = keysPressed.slice(-numericCode.length);
  // if (attemptedNum.join("") === numericCode && passwordSubmitted) {
  //   console.log("KeyCode Submitted");
  //   clue2.classList.add("hidden");
  //   catpchaSection.classList.remove("hidden");
  // }
});

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key in testNumericCode) {
    testNumericCode[e.key] = true;
    console.log("works");
  }
  if (testNumericCode[7] === true && testNumericCode[9] === true && testNumericCode[2] === true) {
    console.log("KeyCode Submitted");
    clue2.classList.add("hidden");
    catpchaSection.classList.remove("hidden");
  }
});

window.addEventListener("keyup", (e) => {
  console.log("up: " + e.key);
  if (e.key in testNumericCode) {
    testNumericCode[e.key] = false;
    console.log("works keyup");
  }
});

button.addEventListener("click", (e) => {
  button.classList.add("hidden");
  clue2.classList.remove("hidden");
});

setTimeout(() => { timeout() }, 6000)

function timeout() {
  clue1.classList.add("hidden");
  timer.innerHTML = "You ran out of time to guess the passcode!"
}



let captchaText = document.querySelector('#captcha');
var ctx = captchaText.getContext("2d");
ctx.font = "30px Roboto";
ctx.fillStyle = "#08e5ff";

let userText = document.querySelector('#textBox');
let submitButton = document.querySelector('#submitButton');
let output = document.querySelector('#output');
let refreshButton = document.querySelector('#refreshButton');

// alphaNums contains the characters with which you want to create the CAPTCHA
let alphaNums = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let emptyArr = [];
// This loop generates a random string of 7 characters using alphaNums
// Further this string is displayed as a CAPTCHA
for (let i = 1; i <= 7; i++) {
  emptyArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
}
var c = emptyArr.join('');
ctx.fillText(emptyArr.join(''), captchaText.width / 4, captchaText.height / 2);

// This event listener is stimulated whenever the user press the "Enter" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
userText.addEventListener('keyup', function(e) {
  // Key Code Value of "Enter" Button is 13
  if (e.keyCode === 13) {
    if (userText.value === c) {
      output.classList.add("correctCaptcha");
      output.innerHTML = "Correct!";
    } else {
      output.classList.add("incorrectCaptcha");
      output.innerHTML = "Incorrect, please try again";
    }
  }
});
// This event listener is stimulated whenever the user clicks the "Submit" button
// "Correct!" or "Incorrect, please try again" message is
// displayed after validating the input text with CAPTCHA
submitButton.addEventListener('click', function() {
  if (userText.value === c) {
    output.classList.add("correctCaptcha");
    output.innerHTML = "Correct!";
    if (output.innerHTML === "Correct!") {
      catpchaSection.classList.add("hidden");
      page.classList.remove("has-background-black");
      page.classList.add("has-background-dark");
      body.innerHTML =
        '<figure class="image center"><img id="main" src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b02fb51e-6438-4392-8bb3-098a61fc8d23/d6k600s-066d81b7-4348-4062-9c52-1b08f3c3ad6e.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwMmZiNTFlLTY0MzgtNDM5Mi04YmIzLTA5OGE2MWZjOGQyM1wvZDZrNjAwcy0wNjZkODFiNy00MzQ4LTQwNjItOWM1Mi0xYjA4ZjNjM2FkNmUuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ngjeoVazoTyRIBhj7p437kjynlVNP5jhRZe1cw95OPk" alt="Welcome to the Club"></figure>';
    }
  } else {
    output.classList.add("incorrectCaptcha");
    output.innerHTML = "Incorrect, please try again";
  }
});
// This event listener is stimulated whenever the user press the "Refresh" button
// A new random CAPTCHA is generated and displayed after the user clicks the "Refresh" button
refreshButton.addEventListener('click', function() {
  userText.value = "";
  let refreshArr = [];
  for (let j = 1; j <= 7; j++) {
    refreshArr.push(alphaNums[Math.floor(Math.random() * alphaNums.length)]);
  }
  ctx.clearRect(0, 0, captchaText.width, captchaText.height);
  c = refreshArr.join('');
  ctx.fillText(refreshArr.join(''), captchaText.width / 4, captchaText.height / 2);
  output.innerHTML = "";
});

