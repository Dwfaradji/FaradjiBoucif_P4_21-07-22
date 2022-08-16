function checkInputOnlive(form) {
  const myRegex = /^(?!\s*$).+/;
  const myRegex_letter = /^[a-zA-Z-\s]{2,20}$/;
  const myRegex_email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const errorWindow = form.target.parentElement.attributes[1];
  const errorW = errorWindow;
  const errorText = form.target.parentElement.children[4];
  if (form.target.id === "first") {
    if (myRegex_letter.test(form.target.value.trim()) == false) {
      errorW.value = true;
      document.getElementById("errorMsg-first").innerHTML =
        " Veuillez entrer 2 caractères ou plus pour le champ du prénon.";
      return false;
    } else {
      errorW.value = false;
      errorText.style.display = "none";
    }
  } else if (form.target.id == "last") {
    if (myRegex_letter.test(form.target.value.trim()) == false) {
      errorW.value = true;
      errorText.style.display = "block";
      document.getElementById("errorMsg-last").innerHTML =
        " Veuillez entrer 2 caractères ou plus pour le champ du nom.";
      return false;
    } else {
      errorW.value = false;
      errorText.style.display = "none";
      return true;
    }
  } else if (form.target.id == "email") {
    if (myRegex_email.test(form.target.value.trim()) == false) {
      errorW.value = true;
      errorText.style.display = "block";
      document.getElementById("errorMsg-email").innerHTML =
        "Veuillez entrer email valide.";
      return false;
    } else {
      errorW.value = false;
      errorText.style.display = "none";
      return true;
    }
  } else if (form.target.id == "birthdate") {
    if (form.target.value == "") {
      errorW.value = true;
      errorText.style.display = "block";
      document.getElementById("errorMsg-birthdate").innerHTML =
        "Veuillez entrer votre date de naissance";
      return false;
    } else {
      errorW.value = false;
      errorText.style.display = "none";
      return true;
    }
  }
  return true;
}
const formData = document.querySelectorAll(".formData");
let checkTournoiValid = false;
function checkboxEvent() {
  formData[5].addEventListener("change", (e) => {
    if (e.target.checked == false) {
      checkTournoiValid = false;
      document.getElementById("errorMsg-tournoi").innerHTML =
        "Veuillez selectionné un tournoi";
    } else {
      checkTournoiValid = true;
      document.getElementById("errorMsg-tournoi").innerHTML = "";
    }
  });
  console.log(checkTournoiValid);
  return checkTournoiValid;
}
export { checkInputOnlive, checkboxEvent, checkTournoiValid };
