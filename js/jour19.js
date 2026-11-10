// === CONFIGURATION ===
const CLE_BROUILLON = "brouillon-idee:v1";

// === RÉFÉRENCES DOM ===
const form = document.querySelector("#form-brouillon");
const auteur = document.querySelector("#auteur");
const idee = document.querySelector("#idee");
const erreurAuteur = document.querySelector("#erreur-auteur");
const erreurIdee = document.querySelector("#erreur-idee");
const succes = document.querySelector("#succes");
const info = document.querySelector("#info");

// === 1. LIRE (défensif) ===
function lireBrouillon() {
  try {
    const brut = localStorage.getItem(CLE_BROUILLON);
    if (!brut) return null;
    return JSON.parse(brut);
  } catch (erreur) {
    console.warn("Brouillon illisible :", erreur);
    return null;
  }
}

// === 2. ÉCRIRE (protégé) ===
function sauverBrouillon() {
  try {
    const donnees = {
      auteur: auteur.value.trim(),
      idee: idee.value.trim(),
      misAJour: Date.now(),
    };
    localStorage.setItem(CLE_BROUILLON, JSON.stringify(donnees));
  } catch (erreur) {
    console.warn("Sauvegarde impossible :", erreur);
    info.textContent = "Sauvegarde automatique indisponible (stockage désactivé ou plein).";
    info.classList.remove("cache");
  }
}

// === 3. RESTAURER au chargement ===
function restaurerBrouillon() {
  const brouillon = lireBrouillon();
  if (!brouillon) return;

  if (brouillon.auteur) auteur.value = brouillon.auteur;
  if (brouillon.idee) idee.value = brouillon.idee;

  info.textContent = "Brouillon restauré. Tu peux continuer.";
  info.classList.remove("cache");
}

// === 4. DÉBOUNCE 500 ms ===
let timerSauvegarde;
function planifierSauvegarde() {
  clearTimeout(timerSauvegarde);
  timerSauvegarde = setTimeout(sauverBrouillon, 500);
}
auteur.addEventListener("input", planifierSauvegarde);
idee.addEventListener("input", planifierSauvegarde);

// === 5. SUBMIT (repris de J18) ===
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nomSaisi = auteur.value.trim();
  const ideeSaisie = idee.value.trim();

  erreurAuteur.textContent = "";
  erreurIdee.textContent = "";
  succes.classList.add("cache");

  let valide = true;

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

  if (!valide) return;

  succes.textContent = `Merci ${nomSaisi} ! Idée enregistrée : "${ideeSaisie}"`;
  succes.classList.remove("cache");

  // Nettoyage : le brouillon n'a plus lieu d'être
  try {
    localStorage.removeItem(CLE_BROUILLON);
  } catch (erreur) {
    console.warn("Suppression impossible :", erreur);
  }
  info.classList.add("cache");
  form.reset();
});

// === 6. BOUTON EFFACER LE BROUILLON ===
document.querySelector("#btn-effacer-brouillon").addEventListener("click", () => {
  try {
    localStorage.removeItem(CLE_BROUILLON);
  } catch (erreur) {
    console.warn("Suppression impossible :", erreur);
  }
  info.classList.add("cache");
  succes.classList.add("cache");
  form.reset();
});

// === 7. DÉMARRAGE ===
restaurerBrouillon();