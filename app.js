let listGenerateNumbers = [];
let numberLimitQuantity = 100;
let secretNumber = generateRandonNumber();
let countTry = 1;

function showTextOnScreen(tag, text) {
    let item = document.querySelector(tag);
    item.innerHTML = text;

    // A função (não nativa) que faz o JavaScript falar
    // Primeiro parâmetro é o texto que você quer que ele fale
    // Segundo parâmetro, qual o idioma que queremos
    // O último parâmetro colocado foi para mudar a velocidade da fala
    // No navegador irá aparecer uma caixinha para permitir ou não a fala
    responsiveVoice.speak(text, "Brazilian Portuguese Female", {rate: 1.2});
}

function initialMessage() {
    showTextOnScreen("h1", "Jogo do número secreto");
    showTextOnScreen("p", `Escolha um número entre 1 e ${numberLimitQuantity}`);
}

initialMessage();

function verifyChoosenNumber() {
    let guess = document.querySelector("Input").value;

    if (guess == secretNumber) {
        showTextOnScreen('h1', "Você acertou!");

        let wordTry = countTry == 1 ? "tentativa"  : "tentativas";
        let message = `Você descobriu o número secreto com ${countTry} ${wordTry}!`;

        showTextOnScreen('p', message);

        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if(guess > secretNumber) {
            showTextOnScreen("p", "O número secreto é menor");
        } else {
            showTextOnScreen("p", "O número secreto é maior");
        }

        countTry++;

        clearInput();
    }
}

function generateRandonNumber() {
    let choseNumber = parseInt(Math.random() * numberLimitQuantity + 1);

    let listElementsQuantity = listGenerateNumbers.length;

    // Caso todos os números já tenham sido sorteados, ele irá limpar a lista para ter novamente os números disponiveis para sortear
    if (listElementsQuantity == numberLimitQuantity) {
        listGenerateNumbers = [];
    }

    // Irá pedir para o número ser gerado novamente caso o número já esteja na lista, estamos usando recursão (função que chama ela mesma)
    // Se não tiver o número na lista, ele irá entrar no else e irá colocar o número sorteado na lista
    if (listGenerateNumbers.includes(choseNumber)) {
        return generateRandonNumber();
    } else {
        listGenerateNumbers.push(choseNumber);
        return choseNumber;
    }
}

function clearInput() {
    guess = document.querySelector("input");
    guess.value = "";
}

function resetGame() {
    secretNumber = generateRandonNumber();
    clearInput();
    countTry = 1;

    initialMessage();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}