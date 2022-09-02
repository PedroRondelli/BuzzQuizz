console.log("Estou aquui")
requisicaoQuizzes()

function rendenizaQuizzes(resposta) {
    console.log(resposta.data)
    resposta.data.forEach(element => {
        let templateDivQuizz = `<div onclick="mudartela2(${element.id});" class="visualizacaoQuizz"><div class="degrade"></div><img src="${element.image}"/><h2 class="tituloQuizzPedro">${element.title}</h2></div>`
        let listaDeQuizzes = document.querySelector(".listaDeQuizzes")
        listaDeQuizzes.innerHTML = listaDeQuizzes.innerHTML + templateDivQuizz
        // }
    });
    // let templateDivQuizz = `<div style=" background-image: url(${resposta.data[0].image});" class="visualizacaoQuizz"></div>`
    // let listaDeQuizzes = document.querySelector(".listaDeQuizzes")
    // listaDeQuizzes.innerHTML = listaDeQuizzes.innerHTML + templateDivQuizz
}

function requisicaoQuizzes() {
    let promessaTeste = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promessaTeste.then(rendenizaQuizzes)
    promessaTeste.catch(requisicaoQuizzes)
}

function mudartela2(quizz) {
    console.log("Clicou")

    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");

    tela1.classList.remove("container");
    console.log("hello");
    tela1.classList.add("escondido");
    console.log("ola");
    tela2.classList.remove("escondido");
    console.log("hola");
    tela2.classList.add("container");

    let idQuizzClicado = JSON.stringify(quizz);

    console.log(idQuizzClicado);

    let promessaTeste = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizzClicado}`)
    promessaTeste.then(renderizaQuizz)
    promessaTeste.catch(mudartela2)
    /*
    PEGAR:
    TÍTULO
    IMAGEM
    QUESTOES
    
    DENTRO DE QUESTOES
    TÍTULO DA PERGUNTA
    COR
    RESPOSTAS

    DENTRO DAS RESPOSTAS
    IMAGEM
    RESPOSTA CERTA
    RESPOSTAS ERRADAS
    
    */
}


// function requisicaoQuizz() {
//     let promessaTeste = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1")
//     promessaTeste.then(renderizaQuizz)
//     promessaTeste.catch(requisicaoQuizz)
// }

function renderizaQuizz(resposta) {
    console.log("to clicando aqui");
    let quizzEscolhido = resposta.data;
    // ${quizzEscolhido[0].image} ${quizzEscolhido[0].title}
    console.log(quizzEscolhido);
    const imagemQuizzTela2 = document.querySelector(".imagemQuizz-tela2");
    imagemQuizzTela2.innerHTML += `
    <img src="" alt="">
    <div class="tituloQuizz-tela2">
        <h1></h1>
    </div>
    `;

    const listaDePerguntas = document.querySelector(".listaDePerguntas");
    listaDePerguntas.innerHTML += `
            <div class="perguntaQuizz">
                <div class="titulopergunta-tela2">
                    <h1>quem nasceu em Roma????</h1>
                </div>
                <div class="respostas">
                    <div class="resposta">
                        <img src="" alt="">
                        <p>resposta</p>
                    </div>
                    <div class="resposta">
                        <img src="" alt="">
                        <p>resposta</p>
                    </div>
                    <div class="resposta">
                        <img src="" alt="">
                        <p>resposta</p>
                    </div>
                    <div class="resposta">
                        <img src="" alt="">
                        <p>resposta</p>
                    </div>
                </div>
            </div>
    <button class="reiniciarQuizz">Reiniciar Quizz</button>

    <div class="voltarHome"><p>Voltar pra Home</p></div>
`;

}

function verificarURL(texto) {
    try {
        let url = new URL(texto);
        return (true);
    } catch (err) {
        return (false);
    }
}

function abrirTelaCriarPerguntas() {
    const titquizz = document.querySelector(".titulo-quizz").value;
    const urlimagem = document.querySelector(".url-imagem").value;
    const quantperg = Number(document.querySelector(".quant-perguntas").value);
    const quantniveis = Number(document.querySelector(".quant-niveis").value);

    const cond1 = (titquizz.length >= 20 && titquizz.length <= 65);
    const cond2 = verificarURL(urlimagem);
    const cond3 = (quantperg >= 3);
    const cond4 = (quantniveis >= 2);

    if (cond1 && cond2 && cond3 && cond4) {
        //trocar de tela e acionar a função de renderizar a tela de criar perguntas
        alert("pode proseguir");
    } else {
        alert("Por favor, verifique se as informações estão preenchidas corretamente");
    }
}

















