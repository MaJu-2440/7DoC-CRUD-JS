// Obtém os elementos do DOM que serão utilizados
let nome = document.getElementById("nome"); // Campo de entrada para o nome
let data = document.getElementById("data"); // Campo de entrada para a data
let enviarForm = document.querySelector(".js-form"); // Botão de envio do formulário


// Função para exibir a tabela com as pessoas armazenadas no localStorage
function exibirTabela() {
    const pessoas = JSON.parse(localStorage.getItem("pessoas"));
    const tabela = document.querySelector(".js-tabela");
    tabela.innerHTML = "";

    pessoas.forEach((pessoa, index) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
        <td class="col-nome">${pessoa.nome}</td>
        <td>${pessoa.data}</td>
        <td><i class="fas fa-edit" id="editar-button" data-index="${index}"></i>
        <i class="fas fa-trash-alt" id="deletar-button" data-index="${index}"></i></td>
        `;
        tabela.appendChild(linha);
    });
    buttonEdit(); 
    buttonDelet();
}

// Adiciona o evento de clique para os botões de edição
function buttonEdit() {
    const editarButtons = document.querySelectorAll("#editar-button");
    editarButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            editarPessoa(index);
        });
    });
}

// Adiciona o evento de clique para os botões de edição
function buttonDelet() {
    const deletButtons = document.querySelectorAll("#deletar-button");
    deletButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            deletarPessoa(index);
        });
    });
}

// Adiciona um listener para o evento de envio do formulário
enviarForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let nomeValue = nome.value;
    let dataValue = data.value;

    // Verifica se estamos editando uma pessoa
    const editIndex = enviarForm.getAttribute("data-edit-index");
    let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

    if (editIndex) {
        // Atualiza a pessoa existente
        pessoas[editIndex] = { nome: nomeValue, data: dataValue };
        // Remove o atributo de edição
        enviarForm.removeAttribute("data-edit-index");
    } else {
        // Cria um novo objeto com os dados da pessoa
        let dadosDaPessoa = { nome: nomeValue, data: dataValue };
        pessoas.push(dadosDaPessoa);
    }

    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    exibirTabela();
});

// Chama a função para exibir a tabela ao carregar a página
exibirTabela();

/**O seu desafio hoje será adicionar uma funcionalidade de edição que torne possível alterar os dados das pessoas, para realizar possíveis mudanças ou correções. */

/**Para implementar a funcionalidade de edição, você vai precisar adicionar um novo botão na tabela. Quando ele estiver implementado, você terá que encontrá-lo, vincular um evento de click a ele e, quando houver tal ação de click, recuperar os dados da linha em questão, alterá-los e preencher o formulário novamente. */

function editarPessoa(index) {
    const pessoas = JSON.parse(localStorage.getItem("pessoas"));
    const pessoa = pessoas[index];

    // Preenche os campos do formulário com os dados da pessoa
    nome.value = pessoa.nome;
    data.value = pessoa.data;

    // Adiciona um atributo ao formulário para saber qual pessoa está sendo editada
    enviarForm.setAttribute("data-edit-index", index);
}

/**
O seu desafio de hoje será criar uma funcionalidade de remoção, com a qual você possa remover uma determinada pessoa da sua persistência física e da tabela de exibição. */

/**A funcionalidade de remover uma pessoa envolve os mesmos princípios da edição. Você pode criar um novo botão com um evento de click para remover a linha da pessoa em questão da tabela. */
function deletarPessoa(index) {
    const pessoas = JSON.parse(localStorage.getItem("pessoas"));
    pessoas.splice(index, 1);
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
    exibirTabela();

    console.log("Pessoa removida!");
}