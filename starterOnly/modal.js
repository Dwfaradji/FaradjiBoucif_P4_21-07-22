function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

const selectFirst = document.querySelector("#first");
const selectLast = document.querySelector("#last");
const selectMail = document.querySelector("#email");
const selectBirthdate = document.querySelector("#birthdate");
const selectQuantity = document.querySelector("#quantity");
const errorMsg = document.querySelectorAll(".errorMessage");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Contrôle les données saisie dans le formulaire a l'aide des regex
const myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
const myRegex_email =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function checkInput(inputSelect, error, myRegex) {
  inputSelect.addEventListener("input", (e) => {
    const valueInput = e.target.value;
    const valueLength = valueInput.length;
    console.log(valueLength);
    if (myRegex.test(inputSelect.value.trim()) == false) {
      error.style.display = "block";
      console.log("Ok");
    } else {
      error.style.display = "none";
      console.log("KO");
    }
  });
}
checkInput(selectFirst, errorMsg[0], myRegex_letter);
checkInput(selectLast, errorMsg[1], myRegex_letter);
checkInput(selectMail, errorMsg[2], myRegex_email);

// Sauvegarde les données saisie dans le local storage
function saveFormLocalStore(selectInput, key) {
  selectInput.addEventListener("input", (e) => {
    const valueInput = e.target.value;
    const seizeInput = valueInput;
    localStorage.setItem(key, JSON.stringify(seizeInput));
  });
}

saveFormLocalStore(selectFirst, "FirstName");
saveFormLocalStore(selectLast, "LastName");
saveFormLocalStore(selectMail, "Mail");
saveFormLocalStore(selectBirthdate, "DateOfBirth");
saveFormLocalStore(selectQuantity, "Quantity");

// Sauvegarde les boutton de type Radio dans le local storage
let radios = document.querySelectorAll('input[type=radio][name="location"]');
radios.forEach((radio) =>
  radio.addEventListener("change", () =>
    localStorage.setItem("Radio", JSON.stringify(radio.value))
  )
);

// Verifier si les conditions on bien été accepter
const selectCheckCondition = document.querySelector("#checkbox1");
selectCheckCondition.addEventListener("click", () => {
  if (selectCheckCondition.checked === true) {
    document.querySelector(".errorMsg1").innerHTML = "";
    console.log("OK");
  } else {
    document.querySelector(".errorMsg1").innerHTML =
      "Veuillez acceptez les conditions";
    console.log("KO");
  }
});

// Envoyer les données du formulaire
const btnSubmit = document.querySelector(".btn-submit");
console.log(btnSubmit);
function sendForm(params) {}
