// Seletores dos elementos
const produtoSelect = document.getElementById("produto");
const quantidadeInput = document.getElementById("quantidade");
const listaProdutos = document.getElementById("lista-produtos");
const valorTotalSpan = document.getElementById("valor-total");

// Reseta a quantidade ao trocar de produto
produtoSelect.addEventListener("change", () => {
    quantidadeInput.value = ""; // Define o valor da quantidade como 0
  });
  
// Variável para armazenar os produtos no carrinho
let carrinho = [];

// Função para adicionar produtos ao carrinho
function adicionar() {
  const produtoInfo = produtoSelect.value;
  const quantidade = parseInt(quantidadeInput.value, 10);

  if (isNaN(quantidade) || quantidade <= 0) {
    alert("Por favor, insira uma quantidade válida.");
    return;
  }

  // Extrai o nome e o preço do produto
  const [produtoNome, precoStr] = produtoInfo.split(" - R$");
  const preco = parseFloat(precoStr);

  // Verifica se o produto já existe no carrinho
  const produtoExistente = carrinho.find(item => item.nome === produtoNome);

  if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
  } else {
    carrinho.push({ nome: produtoNome, preco, quantidade });
  }

  atualizarCarrinho();
}

// Função para limpar o carrinho
function limpar() {
  carrinho = [];
  atualizarCarrinho();
}

// Função para atualizar o carrinho na interface
function atualizarCarrinho() {
  // Limpa a lista de produtos exibida
  listaProdutos.innerHTML = "";

  // Adiciona os produtos do carrinho à lista
  let total = 0;
  carrinho.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const produtoElemento = document.createElement("section");
    produtoElemento.classList.add("carrinho__produtos__produto");
    produtoElemento.innerHTML = `
      <span class="texto-azul">${item.quantidade}x</span> ${item.nome}
      <span class="texto-azul">R$${subtotal.toFixed(2)}</span>
    `;
    listaProdutos.appendChild(produtoElemento);
  });

  // Atualiza o valor total
  valorTotalSpan.textContent = `R$${total.toFixed(2)}`;
}
