const produtos = [
  { nome: "Nike Dunk Low", preco: 899.9, imagem: "img/tenis1.jpg" },
  { nome: "Air Jordan 1", preco: 1299.9, imagem: "img/tenis2.jpg" },
  { nome: "Nike Air Force", preco: 799.9, imagem: "img/tenis3.jpg" },
  { nome: "Nike Dunk Low", preco: 899.9, imagem: "img/tenis1.jpg" },
  { nome: "Air Jordan 1", preco: 1299.9, imagem: "img/tenis2.jpg" },
  { nome: "Nike Air Force", preco: 799.9, imagem: "img/tenis3.jpg" }
];

const grid = document.getElementById("grid-produtos");
const btnIncluir = document.querySelector(".btn-incluir");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close");
const form = document.getElementById("produto-form");
const modalTitle = document.getElementById("modal-title");

let editIndex = null;

// Renderiza os produtos
function renderProdutos() {
  grid.innerHTML = "";
  produtos.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card-produto";
    card.innerHTML = `
      <img src="${p.imagem}" alt="${p.nome}">
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
      <div class="acoes">
        <button class="btn-editar"><i class="fa fa-pen"></i> Editar</button>
        <button class="btn-excluir"><i class="fa fa-trash"></i> Excluir</button>
      </div>
    `;
    grid.appendChild(card);

    // Botões
    card.querySelector(".btn-excluir").addEventListener("click", () => {
      produtos.splice(i, 1);
      renderProdutos();
    });

    card.querySelector(".btn-editar").addEventListener("click", () => {
      editIndex = i;
      modalTitle.textContent = "Editar Produto";
      form.nome.value = p.nome;
      form.preco.value = p.preco;
      form.imagem.value = p.imagem;
      modal.style.display = "block";
    });
  });
}

// Modal
btnIncluir.onclick = () => {
  editIndex = null;
  modalTitle.textContent = "Novo Produto";
  form.reset();
  modal.style.display = "block";
};

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target == modal) modal.style.display = "none"; };

// Salvar produto
form.onsubmit = (e) => {
  e.preventDefault();
  const novo = {
    nome: form.nome.value,
    preco: parseFloat(form.preco.value),
    imagem: form.imagem.value
  };
  if(editIndex !== null){
    produtos[editIndex] = novo;
  } else {
    produtos.push(novo);
  }
  modal.style.display = "none";
  renderProdutos();
};

// Inicializa
renderProdutos();
