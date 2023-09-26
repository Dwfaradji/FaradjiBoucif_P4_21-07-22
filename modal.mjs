import {
  checkInputOnlive,
  checkboxEvent,
  checkTournoiValid,
} from "./fonction.mjs";

const navIcon = document.getElementById("editNav");
navIcon.addEventListener("click", editNav);
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

// DOM Elements Formulaire
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const selectCheckboxCondition = document.getElementById("checkbox1");
const textControls = document.querySelectorAll(".text-control");
const btnSubmit = document.getElementById("submit-form");
// DOM Elements Page Confirmation
const confirmationPage = document.querySelector(".bground2");
// Regex
const myRegex = /^(?!\s*$).+/;
const myRegex_letter = /^[a-zA-Z-\s]{2,20}$/;
const myRegex_email =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// launch modal event
modalBtn.forEach((btn) => {
  btn.addEventListener("click", launchModal);
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  checkboxEvent();
}

// Contrôle les données saisie dans le formulaire a l'aide des regex
function checkFormValidity() {
  const hasErrorForFirstname = checkInputValidityAndDisplayErrorIfNeeded(
    firstName,
    "errorMsg-first",
    "Veuillez entrer 2 caractères ou plus pour le champ du prénon.",
    myRegex_letter
  );

  const hasErrorForlastname = checkInputValidityAndDisplayErrorIfNeeded(
    lastName,
    "errorMsg-last",
    "Veuillez entrer 2 caractères ou plus pour le champ du Nom.",
    myRegex_letter
  );

  const hasErrorForEmail = checkInputValidityAndDisplayErrorIfNeeded(
    email,
    "errorMsg-email",
    "Veuillez entrer email valide.",
    myRegex_email
  );

  const hasErrorForDateOfBirth = checkInputValidityAndDisplayErrorIfNeeded(
    birthdate,
    "errorMsg-birthdate",
    "Veuillez entrer votre date de naissance",
    myRegex
  );

  const hasErrorForTournoi = checkboxEvent();

  const hasErrorForCondition = checkboxConditionError();

  // Check si toute les valeur son true ou si elle sont false et return true ou false
  if (
    !hasErrorForFirstname ||
    !hasErrorForlastname ||
    !hasErrorForEmail ||
    !hasErrorForDateOfBirth ||
    !hasErrorForTournoi ||
    !hasErrorForCondition
  ) {
    return false;
  } else {
    return true;
  }
}
// Check si les valeur des input son vides ou que les information saisie sont valide
// ou non et return true ou false
function checkInputValidityAndDisplayErrorIfNeeded(
  inputToCheck,
  selectorForErrorMessage,
  errorMessage,
  myRegex
) {
  if (inputToCheck.value.trim() == "") {
    document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
    return false;
  } else if (myRegex.test(inputToCheck.value.trim()) == false) {
    document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
    return false;
  } else {
    return true;
  }
}

// Check si les conditions on été cocher ou non et return true ou false
selectCheckboxCondition.addEventListener("input", checkboxConditionError);
function checkboxConditionError() {
  if (selectCheckboxCondition.checked === true) {
    document.getElementById("errorMsg-condition").innerHTML = "";
    return true;
  } else {
    document.getElementById("errorMsg-condition").innerHTML =
      "Veuillez acceptez les conditions";
    return false;
  }
}

// Click sur les boutton qui ferme les block concerner
const btnCloseConfirm = document.querySelectorAll(".close-confirm");
btnCloseConfirm.forEach((btn) =>
  btn.addEventListener("click", () => {
    confirmationPage.style.display = "none";
    modalbg.style.display = "none";
    location.reload();
  })
);

btnSubmit.addEventListener("submit", (event) => {
  validate(event);
});

// Envoyer les données du formulaire
// et va verifier si la valeur du formulaire son true ou false
function validate(event) {
  event.preventDefault();
  const check = checkFormValidity();
  if (check === true) {
    confirmationPage.style.display = "block";
  } else {
    confirmationPage.style.display = "none";
  }
  if (checkTournoiValid == false) {
    document.getElementById("errorMsg-tournoi").innerHTML =
      "Veuillez selectionné un tournoi";
  }
}

// Check les input et controle la saisie  en direct
textControls.forEach((textControl) => {
  textControl.addEventListener("input", checkInputOnlive);
});
