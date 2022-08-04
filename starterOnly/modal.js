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

const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const tournoi = document.querySelectorAll('input[type=radio][name="location"]');

const errorMsg = document.querySelectorAll(".errorMessage");
const btnSubmit = document.querySelector(".btn-submit");
const confirmationPage = document.querySelector(".bground2");

// launch modal event
modalBtn.forEach((btn) => {
  btn.addEventListener("click", launchModal);
});
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  infoForm();
  checkFormValidity();
}

// Récupere les informations du formulaire
function infoForm() {
  const formKey = {
    infoForm: {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      DateOfBirth: birthdate.value,
      QuantityTournoi: quantity.value,
    },
  };
  return formKey;
}

// Contrôle les données saisie dans le formulaire a l'aide des regex
function checkFormValidity(event) {
  // Regex
  const myRegex = /^(?!\s*$).+/;
  const myRegex_letter = /^[a-zA-Z-\s]{2,20}$/;
  const myRegex_email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //  Error de saisie
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

  if (
    !hasErrorForFirstname ||
    !hasErrorForlastname ||
    !hasErrorForEmail ||
    !hasErrorForDateOfBirth ||
    !hasErrorForTournoi
  ) {
    return false;
  } else {
    return true;
  }
}
let responseCheck = [];

function checkboxEvent() {
  tournoi.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked === false) {
        document.getElementById("errorMsg-tournoi").innerHTML =
          "Veuillez selectionner un tournoi";
        responseCheck.push("false");
        return false;
      } else {
        document.getElementById("errorMsg-tournoi").innerHTML = "";
        responseCheck.push("true");
        return true;
      }
    });
  });

  if (responseCheck[0] === "true") {
    console.log("check true");
    return true;
  } else {
    console.log("check false");
    return false;
  }
}

function checkInputValidityAndDisplayErrorIfNeeded(
  inputToCheck,
  selectorForErrorMessage,
  errorMessage,
  myRegex
) {
  formData.forEach((form) =>
    form.addEventListener("input", (e) => {
      const errorWindowTarget = e.target.parentElement.attributes[1];
      const errorWindow = errorWindowTarget;

      if (inputToCheck.value.trim() == "") {
        document.getElementById(selectorForErrorMessage).innerHTML =
          errorMessage;
        return false;
      } else if (myRegex.test(inputToCheck.value.trim()) == false) {
        document.getElementById(selectorForErrorMessage).innerHTML =
          errorMessage;
        errorWindow.value = true;
        return false;
      } else if (myRegex.test(inputToCheck.value.trim()) == true) {
        document.getElementById(selectorForErrorMessage).innerHTML = "";
        errorWindow.value = false;
      }
    })
  );

  if (inputToCheck.value.trim() == "") {
    // document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
    return false;
  } else if (myRegex.test(inputToCheck.value.trim()) == false) {
    document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
  } else if (myRegex.test(inputToCheck.value.trim()) == true) {
    document.getElementById(selectorForErrorMessage).innerHTML = "";
    return true;
  }
  return false;
}

const btnClose = document.querySelector(".close");
btnClose.addEventListener("click", () => {
  modalbg.style.display = "none";
  console.log(btnClose);
});

// Envoyer les données du formulaire
const btn = document.querySelector(".btn-submit");

function validate(event) {
  event.preventDefault();
  const check = checkFormValidity();
  if (check === true) {
    console.log("true");
    confirmationPage.style.display = "block";
  } else {
    console.log("false");
    confirmationPage.style.display = "none";
  }
  if (responseCheck[0] === "true") {
    console.log("check true");
    return true;
  } else {
    document.getElementById("errorMsg-tournoi").innerHTML =
      "Veuillez selectionner un tournoi";
    console.log("check false");
    return false;
  }
  // infoForm();
}

// const myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
// const myRegex_email =
//   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// const msgError1 = document.querySelector(".errorMsg");

// function checkInput(form) {
//   const errorWindow = form.target.parentElement.attributes[1];
//   const errorW = errorWindow;
//   const errorText = form.target.parentElement.children[4];
//   if (form.target.id === "first" || form.target.id === "last") {
//     if (myRegex_letter.test(form.target.value.trim()) == false) {
//       errorW.value = true;
//       errorText.style.display = "block";
//     } else {
//       errorW.value = false;
//       errorText.style.display = "none";
//     }
//   } else if (form.target.id == "email") {
//     if (myRegex_email.test(form.target.value.trim()) == false) {
//       errorW.value = true;
//       errorText.style.display = "block";
//     } else {
//       errorW.value = false;
//       errorText.style.display = "none";
//     }
//   } else if (form.target.id == "birthdate") {
//     if (form.target.value == "") {
//       errorW.value = true;
//       errorText.style.display = "block";
//     } else {
//       errorW.value = false;
//       errorText.style.display = "none";
//     }
//   } else if (form.target.name == "location") {
//     if (form.target.checked === false) {
//       msgError1.style.display = "block";
//     } else {
//       msgError1.style.display = "none";
//     }
//   } else if (form.target.id === "checkbox1")
//     if (form.target.checked === true) {
//       document.querySelector(".errorMsg1").innerHTML = "";
//       localStorage.setItem("Radio", JSON.stringify(form.value));
//     } else {
//       document.querySelector(".errorMsg1").innerHTML =
//         "Veuillez acceptez les conditions";
//     }
// }
// Fermer la fenetre
