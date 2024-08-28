const inputs = document.querySelectorAll("#email, #password");
const form = document.querySelector("form");
let formatEmailChecker = false;
let formatPasswordChecker = false;

// CHECK SI LE FORMAT DE L'EMAIL EST CORRECT
async function emailChecker(value) {
  if (!value.match(/^[\w-_.]+@[\w-]+\.[a-z]{2,4}$/i)) {
    spanEmail.style.display = "block";
    formatEmailChecker = false;
  } else {
    spanEmail.style.display = "none";
    formatEmailChecker = true;
  }
}

// CHECK SI LE FORMAT DU MOT DE PASSE EST CORRECT
async function passwordChecker(value) {
  if (
    value.length > 4 &&
    !value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)
  ) {
    spanPassword.textContent = "Au moins un chiffre et une majuscule";
    formatPasswordChecker = false;
  } else if (value.length < 5) {
    spanPassword.textContent = "Au moins 5 caractères minimum";
    formatPasswordChecker = false;
  } else {
    spanPassword.textContent = "";
    formatPasswordChecker = true;
  }
}

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "email":
        emailChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let user = {
    email: email.value,
    password: password.value,
  };

  login(user);
});

// FUNCTION POUR VALIDER OU NON LA CONNEXION
async function login(user) {
  console.log(user);

  if (formatEmailChecker == false || formatPasswordChecker == false) {
    spanEmailPassword.textContent =
      "Le format de l'email et/ou du mot de passe est incorrect";
  } else {
    await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((dataLog) => {
        console.log(dataLog);
        if (dataLog.message || dataLog.error) {
          spanEmailPassword.textContent =
            "L'email et/ou le mot de passe est incorrect";
        } else {
          sessionStorage.setItem("token", dataLog.token);
          window.location.href = "index.html";
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }
}
