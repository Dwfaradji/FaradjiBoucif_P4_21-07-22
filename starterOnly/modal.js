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
const test = document.querySelectorAll(".text-control");
// launch modal event
modalBtn.forEach((btn) => {
  btn.addEventListener("click", launchModal);
});

// launch modal form
function launchModal(e) {
  modalbg.style.display = "block";
  infoForm();
  deleteSendError();
}

// Récupere les informations du formulaire
function infoForm() {
  var formKey = {
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

let responseCheck = [];

// Contrôle les données saisie dans le formulaire a l'aide des regex
function checkFormValidity(event) {
  const errorWindowTarget = event;

  // Regex
  const myRegex = /^(?!\s*$).+/;
  const myRegex_letter = /^[a-zA-Z-\s]{2,20}$/;
  const myRegex_email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //  Error de saisie

  const hasErrorForFirstname = checkInputValidityAndDisplayErrorIfNeeded(
    errorWindowTarget,
    firstName,
    "errorMsg-first",
    "Veuillez entrer 2 caractères ou plus pour le champ du prénon.",
    myRegex_letter
  );

  const hasErrorForlastname = checkInputValidityAndDisplayErrorIfNeeded(
    errorWindowTarget,
    lastName,
    "errorMsg-last",
    "Veuillez entrer 2 caractères ou plus pour le champ du Nom.",
    myRegex_letter
  );

  const hasErrorForEmail = checkInputValidityAndDisplayErrorIfNeeded(
    errorWindowTarget,
    email,
    "errorMsg-email",
    "Veuillez entrer email valide.",
    myRegex_email
  );

  const hasErrorForDateOfBirth = checkInputValidityAndDisplayErrorIfNeeded(
    errorWindowTarget,
    birthdate,
    "errorMsg-birthdate",
    "Veuillez entrer votre date de naissance",
    myRegex
  );
  const hasErrorForTournoi = checkboxEvent(
    tournoi,
    "errorMsg-tournoi",
    "Veuillez selectionné un tournoi"
  );
  console.log(hasErrorForTournoi);

  const hasErrorForCondition = checkboxConditionError(
    "errorMsg-condition",
    "Veuillez acceptez les conditions"
  );

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

// formData[5].addEventListener("change", (e) => {
//   checkboxEvent(e);
// });

// function checkboxEvent(e, selectInput, selectErrorMsg, messageError) {
//   console.log(e.target.checked);
//   if (e.target.checked == "false") {
//     console.log(e.target.checked);
//     document.getElementById("errorMsg-tournoi").innerHTML =
//       "Veuillez selectionné un tournoi";
//     return false;
//   } else {
//     console.log(e);
//     document.getElementById("errorMsg-tournoi").innerHTML = "";
//     return true;
//   }
// }

function checkboxEvent(selectInput, selectErrorMsg, messageError) {
  selectInput.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      console.log(e);
      if (e.target.checked === false) {
        document.getElementById(selectErrorMsg).innerHTML = messageError;
        responseCheck.push("false");
        return false;
      } else {
        document.getElementById(selectErrorMsg).innerHTML = "";
        responseCheck.push("true");
        return true;
      }
    });
  });

  if (responseCheck[0] === "true") {
    return true;
  } else {
    document.getElementById(selectErrorMsg).innerHTML = messageError;
    return false;
  }
}

formData.forEach((form) =>
  form.addEventListener("input", checkboxConditionError)
);

function checkboxConditionError(selectErrorMsg, messageError2) {
  if (selectCheckboxCondition.checked === true) {
    document.getElementById("errorMsg-condition").innerHTML = "";
    return true;
  } else {
    document.getElementById("errorMsg-condition").innerHTML =
      "Veuillez acceptez les conditions";
    return false;
  }
}

function deleteSendError() {
  test.forEach((deleteSendErrorLink) =>
    deleteSendErrorLink.addEventListener("input", (e) => {
      const errorWindowTarget = e.target.parentElement.attributes[1];
      const errorWindow = errorWindowTarget;
      const msgError = e.target.parentElement.children[4];
      const value = e.target.value;
      console.log(value);
      errorWindow.value = true;
      if (value !== "") {
        msgError.innerHTML = null;
      }
      console.log(value);
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

function checkInputValidityAndDisplayErrorIfNeeded(
  e,
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

  // const target = e.target;
  // const errorWindowTarget = e.target.parentElement.attributes[1];
  // const errorWindow = errorWindowTarget;

  // if (inputToCheck.value.trim() === "") {
  //   document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
  //   return false;
  // } else if (myRegex.test(inputToCheck.value.trim()) === false) {
  //   document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
  //   errorWindow.value = "true";
  //   return false;
  // } else {
  //   document.getElementById(selectorForErrorMessage).innerHTML = "";
  //   // errorWindow.value = "false"; @TODO probleme
  //   return true;
  // }
}

// function checkInputValidityAndDisplayErrorIfNeeded(
//   inputToCheck,
//   selectorForErrorMessage,
//   errorMessage,
//   myRegex
// ) {
//   formData.forEach((form) =>
//     form.addEventListener("input", (e) => {
//       const errorWindowTarget = e.target.parentElement.attributes[1];
//       const errorWindow = errorWindowTarget;

//       if (inputToCheck.value.trim() == "") {
//         document.getElementById(selectorForErrorMessage).innerHTML =
//           errorMessage;
//         return false;
//       } else if (myRegex.test(inputToCheck.value.trim()) == false) {
//         document.getElementById(selectorForErrorMessage).innerHTML =
//           errorMessage;
//         errorWindow.value = true;
//         return false;
//       } else if (myRegex.test(inputToCheck.value.trim()) == true) {
//         document.getElementById(selectorForErrorMessage).innerHTML = "";
//         errorWindow.value = false;
//       } else {
//         console.log("erreur");
//       }
//     })
//   );

//   if (inputToCheck.value.trim() == "") {
//     document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
//     return false;
//   } else if (myRegex.test(inputToCheck.value.trim()) == false) {
//     document.getElementById(selectorForErrorMessage).innerHTML = errorMessage;
//   } else if (myRegex.test(inputToCheck.value.trim()) == true) {
//     document.getElementById(selectorForErrorMessage).innerHTML = "";
//     return true;
//   }
//   return false;
// }

const btnClose = document.querySelector(".close");
btnClose.addEventListener("click", () => {
  modalbg.style.display = "none";
  console.log(btnClose);
});

// Envoyer les données du formulaire

btnSubmit.addEventListener("submit", (event) => {
  console.log(event);
  validate(event);
});
function validate(event) {
  event.preventDefault();
  // checkFormValidity(event);
  const check = checkFormValidity(event);
  if (check === true) {
    console.log("true");
    confirmationPage.style.display = "block";
  } else {
    console.log("false");
    confirmationPage.style.display = "none";
  }
  // if (responseCheck[0] === "true") {
  //   return true;
  // } else {
  //   document.getElementById("errorMsg-tournoi").innerHTML =
  //     "Veuillez selectionner un tournoi";

  //   return false;
  // }
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
