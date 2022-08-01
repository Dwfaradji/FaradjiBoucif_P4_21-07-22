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

const errorMsg = document.querySelectorAll(".errorMessage");
const btnSubmit = document.querySelector(".btn-submit");
const confirmationPage = document.querySelector(".bground2");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
formData.forEach((form) => form.addEventListener("input", checkInput));
// launch modal form
function launchModal(e) {
  modalbg.style.display = "block";
  checkInput(e);
}
// Fermer la fenetre

const btnClose = document.querySelector(".close");
btnClose.addEventListener("click", () => {
  modalbg.style.display = "none";
  console.log(btnClose);
});

// Contrôle les données saisie dans le formulaire a l'aide des regex
const myRegex_letter = /^[a-zA-Z-\s]{3,20}$/;
const myRegex_email =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const msgError1 = document.querySelector(".errorMsg");

function checkInput(form) {
  const errorWindow = form.target.parentElement.attributes[1];
  const errorW = errorWindow;
  const errorText = form.target.parentElement.children[4];
  if (form.target.id === "first" || form.target.id === "last") {
    if (myRegex_letter.test(form.target.value.trim()) == false) {
      errorW.value = true;
      errorText.style.display = "block";
    } else {
      errorW.value = false;
      errorText.style.display = "none";
    }
  } else if (form.target.id == "email") {
    if (myRegex_email.test(form.target.value.trim()) == false) {
      errorW.value = true;
      errorText.style.display = "block";
    } else {
      errorW.value = false;
      errorText.style.display = "none";
    }
  } else if (form.target.id == "birthdate") {
    if (form.target.value == "") {
      errorW.value = true;
      errorText.style.display = "block";
    } else {
      errorW.value = false;
      errorText.style.display = "none";
    }
  } else if (form.target.name == "location") {
    if (form.target.checked === false) {
      msgError1.style.display = "block";
    } else {
      msgError1.style.display = "none";
    }
  } else if (form.target.id === "checkbox1")
    if (form.target.checked === true) {
      document.querySelector(".errorMsg1").innerHTML = "";
      localStorage.setItem("Radio", JSON.stringify(form.value));
    } else {
      document.querySelector(".errorMsg1").innerHTML =
        "Veuillez acceptez les conditions";
    }
}

// Sauvegarde les données saisie dans le local storage
function saveFormLocalStore(selectInput, key) {
  selectInput.addEventListener("input", (e) => {
    const valueInput = e.target.value;
    const seizeInput = valueInput;
    localStorage.setItem(key, JSON.stringify(seizeInput));
  });
}

saveFormLocalStore(formData[0].children[2], "FirstName");
saveFormLocalStore(formData[1].children[2], "LastName");
saveFormLocalStore(formData[2].children[2], "Mail");
saveFormLocalStore(formData[3].children[2], "DateOfBirth");
saveFormLocalStore(formData[4].children[2], "Quantity");

// Sauvegarde les boutton de type Radio dans le local storage
let radios = document.querySelectorAll('input[type=radio][name="location"]');
const msgError = document.querySelector(".errorMsg");

radios.forEach((radio) =>
  radio.addEventListener("change", (e) => {
    if (e.target.checked == "false") {
      msgError.style.display = "block";
    } else {
      msgError.style.display = "none";
      localStorage.setItem("Radio", JSON.stringify(radio.value));
    }
  })
);

// Envoyer les données du formulaire

const veryfiInput1 = document.querySelector("#first");
const veryfiInput2 = document.querySelector("#last");
const veryfiInput3 = document.querySelector("#email");
const veryfiInput4 = document.querySelector("#birthdate");
const veryfiInput5 = document.querySelector("#checkbox1");

// veryfiInput1.addEventListener("input", validate);

function validate(event) {
  event.preventDefault();
  const testa = checkInput(event);
  console.log(testa);
  if ((testa == true)) {
    checkInput(event);
    modalbg.style.display = "none";
    confirmationPage.style.display = "block";
  } else {
    console.log("KO");
  }
  // console.log("test");
}
