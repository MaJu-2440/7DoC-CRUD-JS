let nome = document.getElementById("nome");
let data = document.getElementById("data");
let buttonEnviar = document.querySelector("button");

buttonEnviar.addEventListener("click", () => {
    console.log(nome.value);
    console.log(data.value);
});
