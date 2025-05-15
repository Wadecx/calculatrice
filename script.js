const form = document.querySelector("form");
const value1 = document.getElementById("value1");
const value2 = document.getElementById("value2");
const operator = document.getElementById("operator");
const resultat = document.getElementById("resultat");

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
        switch (operation) {
            case "plus":
                result = num1 + num2;
                break;
            case "multiplier":
                result = num1 * num2;
                break;
            case "diviser":
                if (num2 === 0) {
                    resultat.textContent = "Résultat : Division par 0";
                    return;
                }
                result = num1 / num2;
                break;
            case "moins":
                result = num1 - num2;
                break;
            default:
                resultat.textContent = "Erreur";
                return;
        }

  
        resultat.textContent = `Résultat : ${result}`;
    });