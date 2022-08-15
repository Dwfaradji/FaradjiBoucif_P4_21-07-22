export default function deleteSendError() {
  const textControl = document.querySelectorAll(".text-control");
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
