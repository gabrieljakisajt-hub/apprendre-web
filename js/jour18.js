const form = document.querySelector("#form-idee");
const auteur = document.querySelector("#auteur");
const idee = document.querySelector("#idee");
const erreurAuteur = document.querySelector("#erreur-auteur");
const erreurIdee = document.querySelector("#erreur-idee");
const succes = document.querySelector("#succes");

form.addEventListener("submit", (event) => {
  // 1. EMPÊCHER le rechargement — TOUJOURS en premier
  event.preventDefault();

  // 2. LIRE et NETTOYER
  const nomSaisi = auteur.value.trim();
  const ideeSaisie = idee.value.trim();

  // 3. RÉINITIALISER l'affichage
  erreurAuteur.textContent = "";
  erreurIdee.textContent = "";
  succes.classList.add("cache");

  let valide = true;

  // 4. VÉRIFIER
  if (nomSaisi === "") {
    erreurAuteur.textContent = "Le prénom est obligatoire.";
    valide = false;
  }
  if (ideeSaisie === "") {
    erreurIdee.textContent = "L'idée est obligatoire.";
    valide = false;
  } else if (ideeSaisie.length < 3) {
    erreurIdee.textContent = "L'idée doit faire au moins 3 caractères.";
    valide = false;
  } else if (ideeSaisie.length > 100) {
    erreurIdee.textContent = "L'idée ne doit pas dépasser 100 caractères.";
    valide = false;
  }

  // 5. DÉCIDER
  if (!valide) {
    return;
  }

  // 6. TRAITER (chemin heureux)
  succes.textContent = `Merci ${nomSaisi} ! Idée enregistrée : "${ideeSaisie}"`;
  succes.classList.remove("cache");
  form.reset();
});