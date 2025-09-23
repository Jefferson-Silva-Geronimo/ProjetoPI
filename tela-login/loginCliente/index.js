const usuarios = [
  { login: "cliente", senha: "abcd" },
  { login: "gerente", senha: "1234" },
];

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeUsuario").value.toLowerCase();
  const senha = document.getElementById("senhaUsuario").value;

  const usuarioValido = usuarios.find(
    (u) => u.login === nome && u.senha === senha
  );

  if (usuarioValido) {
    document.getElementById("saida").textContent = "Login bem-sucedido!";
    document.getElementById("saida").style.color = "lightgreen";

    setTimeout(() => (window.location.href = "index.html"), 1000);
  } else {
    document.getElementById("saida").textContent =
      "Usuário ou senha inválidos.";
    document.getElementById("saida").style.color = "red";
  }
});


