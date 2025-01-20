let titulo = document.querySelector('h1');
titulo.innerHTML = 'Hora do Desafio';

let cidade;

function exibirMensagemNoConsole() {
    console.log('O botão foi clicado!')
}

function exibirAlerta() {
    alert('Eu amo Js')
}

function exibirPrompt() {
    let nomeDaCidade = prompt('Digite o nome de uma cidade do Brasil que você gosta muito:')
    alert(`Estive em ${nomeDaCidade} e lembrei de você`)
}

function somandoDoisNumeros() {
    let primeiroNumero = parseInt(prompt('Digite o primeiro número'));
    let segundoNumero = parseInt(prompt('Digite o segundo número'));
    let resultado = primeiroNumero + segundoNumero;
    alert(`${primeiroNumero} + ${segundoNumero} = ${resultado}`)
}


//Carregamos o projeto com o HTML e o CSS para criar a estrutura e o estilo da página que utilizaremos durante o curso;

//Aprendemos a manipular o conteúdo dos elementos HTML, como o H1 e o parágrafo (p), utilizando JavaScript para alterar dinamicamente o texto exibido na página;

//Entendemos a importância da interação entre o HTML e o JavaScript para criar páginas web dinâmicas e interativas.