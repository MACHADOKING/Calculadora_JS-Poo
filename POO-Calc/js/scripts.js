// 1° Ligar objetos html ao javascript
const previousOperationText = document.getElementById("previous-operation");
const currentOperationText = document.getElementById("current-operation");
const buttons = document.querySelectorAll("#buttons-container");
// 3° Começar lógica criando objeto na calculadora e instanciando o inicio do objeto passando ao primeiras fases.
// para não ficar selecionando objetos do DOM toda hora.
class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText; // Oque aparece na tela da seleção 'passada'
    this.currentOperationText = currentOperationText; // Oque aparece na tela da seleção 'atual'
    this.currentOperation = ""; // Oque a pessoa está digitando agora.
  }

  //  5° Primeira acão na calculadora, que seria adicionar um número/digito.
  //   add digit to calculator screen
  addDigit(digit) {
    // 7° Precisamos checar como primeira validaçõo, se o usuario ja colocou algum '.'
    // check if current operation already have a dot.
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }
    this.currentOperation = digit;
    this.updateScreen();
  }

  // 8° Agora vamos precisar trabalhar o processo de operador da calculadora.
  //   Process all calculator operations
  processOperation(operation) {
    // 10° Checar se o 'current' está vazio
    // check if current is empty
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Change operation
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }
    // primeiramente vamos pegar o valor anterior digitado e o valor atual digitado, para podermos efetuar a operação.
    // Get current and previous value.
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDellOperator();
        break;
      case "CE":
        this.processClearCurrentOperation();
        break;
      case "C":
        this.processClearAllOperations();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // 6° Precisamos atualizar a tela do usuario logo após de ter pego o botão clicado acima.
  //   Change values of calculator screen
  // 9° Enviar o parametros do processOperation para o updateScreen trabalhar.
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // Check if value is zero, if it is just add current value.
      if (previous === 0) {
        operationValue = current;
      }

      // Add current value to previous.
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // 11° Mudar o operador caso o usuário troque de idéia
  // Change math operation
  changeOperation(operation) {
    const mathOperations = ["*", "/", "+", "-"];

    if (!mathOperations.includes(operation)) {
      return;
    }
    // Tirar o ultimo caractere, que seria o operador.
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  //   Delete de last digit.
  processDellOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  //   Clear current operation.
  processClearCurrentOperation() {
    this.currentOperationText.innerText = "";
  }

  //   Clear all operation
  processClearAllOperations() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  //   Process an operation
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}
// 4° Chamar o objeto para inicializar.
const calc = new Calculator(previousOperationText, currentOperationText);
// 2° Começo do código, colocar evento de click, em todos os botões da calculadora.
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
