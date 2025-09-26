const carrinhoItems = document.querySelector('.carrinho-items');
const subtotalSpan = document.querySelector('.subtotal');
const freteSpan = document.querySelector('.frete');
const resultado = document.querySelector('.resultado');
const FRETE = 29.90;

// Formata número para R$
function formatarPreco(valor) {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

// Converte string "R$ 1.599,90" para número 1599.90
function precoParaNumero(precoStr) {
  return parseFloat(precoStr.replace('R$ ', '').replace(/\./g, '').replace(',', '.'));
}

// Atualiza subtotal, frete e total
function atualizarResumo() {
  const itens = document.querySelectorAll('.carrinho-items .item');
  let subtotal = 0;

  itens.forEach(item => {
    const precoText = item.querySelector('.preco').textContent;
    const preco = precoParaNumero(precoText);
    const quantidade = parseInt(item.querySelector('.quantidade').value);
    subtotal += preco * quantidade;
  });

  subtotalSpan.textContent = formatarPreco(subtotal);
  freteSpan.textContent = formatarPreco(itens.length > 0 ? FRETE : 0);
  resultado.textContent = formatarPreco(subtotal + (itens.length > 0 ? FRETE : 0));

  if (itens.length === 0) {
    carrinhoItems.innerHTML = `<p style="text-align:center; font-size:1.2rem; color:#555;">Seu carrinho está vazio.</p>`;
  }
}

// Adiciona eventos de remover e alterar quantidade
function ativarEventos() {
  const removerBotoes = carrinhoItems.querySelectorAll('.remover');
  const inputsQuantidade = carrinhoItems.querySelectorAll('.quantidade');

  removerBotoes.forEach(botao => {
    botao.addEventListener('click', (e) => {
      const item = e.target.closest('.item');
      item.remove();
      atualizarResumo();
    });
  });

  inputsQuantidade.forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.value < 1) e.target.value = 1;
      atualizarResumo();
    });
  });
}

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  ativarEventos();
  atualizarResumo();
});
