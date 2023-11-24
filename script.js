// Declarando variáveis globais
let estudantes = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo cliente
    let btnNovoEstudante = document.getElementById("btnNovoEstudante");
    let modalNovoEstudante = document.getElementById("modalNovoEstudante");
    let spanNovoEstudante = modalNovoEstudante.querySelector(".close");

    // Configurando eventos do modal novo cliente
    btnNovoEstudante.onclick = function () {
        modalNovoEstudante.style.display = "block";
    };

    spanNovoEstudante.onclick = function () {
        modalNovoEstudante.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoEstudante) {
            modalNovoEstudante.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar cliente por placa
function identifica(nome) {
    for (let estu of estudantes) {
        if (estu.nome === nome.id) {
            return estu;
        }
    }
    return null;
}

// Função para exibir modal de informações do cliente
function modal(button) {
    let estu = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cliente
    let nomeModal = modal.querySelector("#nomeModal");
    let turmaModal = modal.querySelector("#turmaModal");
    let atencaoModal = modal.querySelector("#atencaoModal");
    let desenvolvimentoModal = modal.querySelector("#desenvolvimentoModal");
    let criatividadeModal = modal.querySelector("#criatividadeModal");
    let qualidadeEntregaModal = modal.querySelector("#qualidadeEntregaModal");
    let btnExcluirEstudante = modal.querySelector("#btnExcluirEstudante");

    if (!nomeModal || !turmaModal || !atencaoModal || !desenvolvimentoModal || !criatividadeModal || !qualidadeEntregaModal || !btnExcluirEstudante) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    nomeModal.innerHTML = estu.nome;
    turmaModal.innerHTML = estu.turma;
    atencaoModal.innerHTML = estu.atencao;
    desenvolvimentoModal.innerHTML = estu.desenvolvimento;
    criatividadeModal.innerHTML = estu.criatividade;
    qualidadeEntregaModal.innerHTML = estu.qualidadeEntrega;

    // Configurando o botão de excluir
    btnExcluirEstudante.onclick = function () {
        excluirEstudante(estu.nome);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir cliente
function excluirEstudante(nome) {
    estudantes = estudantes.filter(estu => estu.nome !== nome);
    localStorage.setItem("estudantes", JSON.stringify(estudantes));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("escola");
    estudantes = JSON.parse(localStorage.getItem("estudantes")) || [];

    tabela.innerHTML = "";

    for (let estu of estudantes) {
        let botaoid = `<td><button id='${estu.nome}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${estu.nome}</td>
            <td>${estu.turma}</td>
            <td>${estu.atencao}</td>
            <td>${estu.desenvolvimento}</td>
            <td>${estu.criatividade}</td>
            <td>${estu.qualidadeEntrega}</td>            
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo cliente
function cadastrarEstudante() {
    let nome = document.getElementById("nome").value;
    let turma = document.getElementById("turma").value;
    let atencao = document.getElementById("atencao").value;
    let desenvolvimento = document.getElementById("desenvolvimento").value;
    let criatividade = document.getElementById("criatividade").value;
    let qualidadeEntrega = document.getElementById("qualidadeEntrega").value;

    // Verifica se a placa já está cadastrada
    if (estudanteExistente(nome)) {
        alert("Estudante já cadastrado. Confira as informações.");
        return;
    }

    let novoEstudante = {
        nome: nome,
        turma: turma,
        atencao: atencao,
        desenvolvimento: desenvolvimento,
        criatividade: criatividade,
        qualidadeEntrega: qualidadeEntrega
    };

    estudantes = JSON.parse(localStorage.getItem("estudantes")) || [];
    estudantes.push(novoEstudante);

    // Salva no localStorage
    localStorage.setItem("estudantes", JSON.stringify(estudantes));

    // Recarrega a tabela após cadastrar um novo cliente
    carrega();

    // Esconde o modal de novo cliente
    modalNovoEstudante.style.display = "none";
}

// Função para verificar se o cliente já existe
function estudanteExistente(nome) {
    return estudantes.some(estu => estu.nome === nome);
}