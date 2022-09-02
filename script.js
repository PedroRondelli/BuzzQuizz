console.log("Estou aquui")
requisicaoQuizzes()

function rendenizaQuizzes(resposta) {
    console.log(resposta.data)
    resposta.data.forEach(element => {
        // if(element.image!=="https://http.cat/411.jpg"){
        let templateDivQuizz = `<div onclick="mudartela2(this);" class="visualizacaoQuizz"><div class="degrade"></div><img src="${element.image}"/><h2 class="tituloQuizzPedro">${element.title}</h2></div>`
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



    console.log(quizz.id);

    /*
    PEGAR:
    TÍTULO
    IMAGEM
    QUESTOES
    
    DENTRO DE QUESTOES
    TÍTULO DA PERGUNTA
    COR
    
    */
}

function requisicaoQuizzes() {
    let promessaTeste = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/1")
    promessaTeste.then(renderizaQuizz)
    promessaTeste.catch(requisicaoQuizzes)
}

function renderizaQuizz() {
    let promessaTeste = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promessaTeste.then(rendenizaQuizzes)
    promessaTeste.catch(requisicaoQuizzes)


`<div class="imagemQuizz-tela2">
<div class="tituloQuizz-tela2">
    <h1>Título do meu quizz</h1>
</div>
</div>
`
    
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

