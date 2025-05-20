import { addition } from "./calcul.js";

const form = document.querySelector("form");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const operator = document.getElementById("operator");
const resultat = document.getElementById("resultat");
const historiqueContainer = document.createElement("div");

document.body.appendChild(historiqueContainer);
const listeHistorique = document.createElement("ul");
historiqueContainer.innerHTML = "<h3>Historique des opérations</h3>";
historiqueContainer.appendChild(listeHistorique);

const ancienneOperation = [];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const num1 = parseFloat(value1.value);
  const num2 = parseFloat(value2.value);
  const operation = operator.value;

  if (isNaN(num1) || isNaN(num2)) {
    resultat.textContent = "Résultat : Veuillez entrer des nombres valides.";
    return;
  }

  let result;
  let operatorSymbol;

  switch (operation) {
    case "plus":
      result = addition(num1, num2);
      operatorSymbol = "+";
      break;
    case "multiplier":
      result = num1 * num2;
      operatorSymbol = "*";
      break;
    case "diviser":
      if (num2 === 0) {
        resultat.style.color = "Gray";
        resultat.textContent = "Résultat : Division par 0 ";
        return;
      }
      result = num1 / num2;
      operatorSymbol = "/";
      break;
    case "moins":
      result = num1 - num2;
      operatorSymbol = "-";
      break;
    default:
      resultat.textContent = "Erreur";
      return;
  }

  if (result > 0) {
    resultat.style.color = "green";
  } else if (result === 0) {
    resultat.style.color = "blue";
  } else {
    resultat.style.color = "orange";
  }

  resultat.textContent = `Résultat : ${result}`;

  const operationString = `${
    ancienneOperation.length + 1
  } : ${num1} ${operatorSymbol} ${num2} = ${result}`;

  ancienneOperation.push(operationString);

  const historique = document.createElement("li");

  historique.textContent = operationString;
  listeHistorique.appendChild(historique);
});
