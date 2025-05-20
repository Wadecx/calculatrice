import { addition, soustraction, multiplication, division } from "./calcul.js";

const form = document.querySelector("form");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const operator = document.getElementById("operator");
const resultat = document.getElementById("resultat");

const historiqueContainer = historique();
document.body.appendChild(historiqueContainer.container);
const listeHistorique = historiqueContainer.liste;
const ancienneOperation = [];

function historique() {
  const container = document.createElement("div");
  container.innerHTML = "<h3>Historique des opérations</h3>";
  const liste = document.createElement("ul");
  container.appendChild(liste);
  return { container, liste };
}

function valeurInput() {
  const num1 = parseFloat(value1.value);
  const num2 = parseFloat(value2.value);
  const operation = operator.value;
  return { num1, num2, operation };
}

function isValidInput(num1, num2) {
  return !isNaN(num1) && !isNaN(num2);
}

function calcul(num1, num2, operation) {
  let result;
  let operatorSymbol;

  switch (operation) {
    case "plus":
      result = addition(num1, num2);
      operatorSymbol = "+";
      break;
    case "moins":
      result = soustraction(num1, num2);
      operatorSymbol = "-";
      break;
    case "multiplier":
      result = multiplication(num1, num2);
      operatorSymbol = "*";
      break;
    case "diviser":
      if (num2 === 0) {
        return { error: "Division par 0", result: null, operatorSymbol: "/"};
      }
      result = division(num1, num2);
      operatorSymbol = "/";
      break;
    default:
      return {
        error: "Opération non reconnue",
        result: null,
        operatorSymbol: "",
      };
  }

  return { result, operatorSymbol, error: null };
}

function rafrachirResultat(result) {
  if (result > 0) {
    resultat.style.color = "green";
  } else if (result === 0) {
    resultat.style.color = "blue";
  } else {
    resultat.style.color = "orange";
  }

  resultat.textContent = `Résultat : ${result}`;
}

function updateErreur(message) {
  resultat.style.color = "gray";
  resultat.textContent = `Résultat : ${message}`;
}

function addToHistorique(num1, num2, operatorSymbol, result) {
  const operationString = `${
    ancienneOperation.length + 1
  } : ${num1} ${operatorSymbol} ${num2} = ${result}`;
  ancienneOperation.push(operationString);

  const historique = document.createElement("li");
  historique.textContent = operationString;
  listeHistorique.appendChild(historique);
}

function calculate(event) {
  event.preventDefault();
  const { num1, num2, operation } = valeurInput();

  if (!isValidInput(num1, num2)) {
    updateErreur("Veuillez entrer des nombres valides.");
    return;
  }

  const { result, operatorSymbol, error } = calcul(num1, num2, operation);

  if (error) {
    updateErreur(error);
    return;
  }

  rafrachirResultat(result);
  addToHistorique(num1, num2, operatorSymbol, result);
}

export function setup() {
  if (form != null) {
    form.addEventListener("submit", calculate);
  } else {
    console.log("Erreur");
  }
}

window.addEventListener("DOMContentLoaded", setup);
