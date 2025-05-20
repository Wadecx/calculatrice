/**
 * @jest-environment jsdom
 */

import { calculate, setup } from "./script.js";

beforeEach(() => {
  // Reset le DOM avant chaque test
  document.body.innerHTML = `
    <form>
      <input type="number" name="" id="value1" />
      <select name="operator" id="operator">
        <option value="plus">+</option>
        <option value="multiplier">*</option>
        <option value="diviser">/</option>
        <option value="moins">-</option>
      </select>
      <input type="number" name="" id="value2" />
      <input type="submit" value="Calculer" />
    </form>

    <p id="resultat">Résultat :</p>
  `;
  setup();
});

test("calcul addition", () => {
  document.getElementById("value1").value = "3";
  document.getElementById("value2").value = "4";
  document.getElementById("operator").value = "plus";

  document
    .querySelector("form")
    .dispatchEvent(new Event("submit", { bubbles: true }));

  const result = document.getElementById("resultat");
  expect(result.textContent).toBe("Résultat : 7");
});

test("division par zéro affiche une erreur", () => {
  document.getElementById("value1").value = "10";
  document.getElementById("value2").value = "0";
  document.getElementById("operator").value = "diviser";

  document
    .querySelector("form")
    .dispatchEvent(new Event("submit", { bubbles: true }));

  const result = document.getElementById("resultat");
  expect(result.textContent).toBe("Résultat :");
  expect(result.style.color).toBe("gray");
});
