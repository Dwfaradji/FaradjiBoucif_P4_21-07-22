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
const selectCheckboxCondition = document.getElementById("checkbox1");

const errorMsg = document.querySelectorAll(".errorMessage");
const btnSubmit = document.querySelector(".btn-submit");
const confirmationPage = document.querySelector(".bground2");
const textControl = document.querySelectorAll(".text-control");

// launch modal event
modalBtn.forEach((btn) => {
  btn.addEventListener("click", launchModal);
});

// launch modal form
function launchModal(e) {
  modalbg.style.display = "block";
  deleteSendError();
  checkboxEvent();
}

// Contrôle les données saisie dans le formulaire a l'aide des regex
function checkFormValidity() {
  // Regex
  const myRegex = /^(?!\s*$).+/;
  const myRegex_letter = /^[a-zA-Z-\s]{2,20}$/;
  const myRegex_email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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

  const hasErrorForTournoi = checkboxEvent(
    "errorMsg-tournoi",
    "Veuillez selectionné un tournoi"
  );

  const hasErrorForCondition = checkboxConditionError(
    "errorMsg-condition",
    "Veuillez acceptez les conditions"
  );

  if (response == false) {
    document.getElementById("errorMsg-tournoi").innerHTML =
      "Veuillez selectionné un tournoi";
  }
  // check si toute les valeur son true ou si elle sont false
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
// Check les erreur des input
function checkInputValidityAndDisplayErrorIfNeeded(
  inputToCheck,
  selectorForErrorMessage,
  errorMessage,
  myRegex
) {
  deleteSendError();
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
// supprime les messages d'erreur
function deleteSendError() {
  textControl.forEach((deleteSendErrorLink) =>
    deleteSendErrorLink.addEventListener("input", (e) => {
      const errorWindowTarget = e.target.parentElement.attributes[1];
      const errorWindow = errorWindowTarget;
      const msgError = e.target.parentElement.children[4];
      const value = e.target.value;
      errorWindow.value = true;
      if (value !== "") {
        msgError.innerHTML = null;
      }
      if (value.length === 2) {
        console.log("OK");
        errorWindow.value = true;
      } else {
        console.log("KO");
        errorWindow.value = false;
      }
    })
  );
}

// check si un tournoi a été selectionné ou pas
let response = false;
function checkboxEvent(selectInputMsg, selectMsgError) {
  formData[5].addEventListener("change", (e) => {

    if (e.target.checked == false) {
      response = false;
      document.getElementById("errorMsg-tournoi").innerHTML =
        "Veuillez selectionné un tournoi";
    } else {
      response = true;
      document.getElementById("errorMsg-tournoi").innerHTML = "";
    }
  });
  return response;
}

// check si les conditions on été cocher ou non

selectCheckboxCondition.addEventListener("input", checkboxConditionError);
function checkboxConditionError(selectErrorMsg, messageError) {
  if (selectCheckboxCondition.checked === true) {
    document.getElementById("errorMsg-condition").innerHTML = "";
    return true;
  } else {
    document.getElementById("errorMsg-condition").innerHTML =
      "Veuillez acceptez les conditions";
    return false;
  }
}

// Ferme les fenetres
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
function validate(event) {
  event.preventDefault();
  const check = checkFormValidity();
  if (check === true) {
    confirmationPage.style.display = "block";
  } else {
    confirmationPage.style.display = "none";
  }
}

// Récupere les informations du formulaire
// function infoForm() {
//   let formKey = {
//     infoForm: {
//       firstName: firstName.value,
//       lastName: lastName.value,
//       email: email.value,
//       DateOfBirth: birthdate.value,
//       QuantityTournoi: quantity.value,
//     },
//   };
//   return formKey;
// }
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
