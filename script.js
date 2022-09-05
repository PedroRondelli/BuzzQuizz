console.log("Estou aquui")

//Variáveis globais
let quantniveis;
let quantperg;


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

    tela1.classList.toggle("oculto");
    console.log("hello");
    // tela1.classList.add("escondido");
    console.log("ola");
    tela2.classList.toggle("oculto");
    console.log("hola");
    // tela2.classList.add("container");

    window.scrollTo(0, 0);

    let idQuizzClicado = JSON.stringify(quizz);

    console.log(idQuizzClicado);

    let promessaTeste = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${idQuizzClicado}`)
    promessaTeste.then(renderizaQuizz)
    promessaTeste.catch(mudartela2)

    console.log(promessaTeste);
}

// randomiza as perguntas
function comparador() {
    return Math.random() - 0.5;
}

const respostasQuizz = [];

// renderiza o quizz da tela 2 com perguntas embaralhadas
function renderizaQuizz(resposta) {
    // recolhe os dados
    let quizzEscolhido = resposta.data;

    // topo da página de perguntas
    const imagemQuizzTela2 = document.querySelector(".imagemQuizz-tela2");
    imagemQuizzTela2.innerHTML += `
    <img src="${quizzEscolhido.image}" alt="">
    <div class="tituloQuizz-tela2">
        <h1>${quizzEscolhido.title}</h1>
    </div>
    `;

    let qtDePerguntas = quizzEscolhido.questions.length;

    // armazena perguntas + respostas [SÓ ESTÁ ARMAZENANDO AS CORRETAS]
    for (let i = 0; i < qtDePerguntas; i++) {
        for (let j = 0; j < quizzEscolhido.questions[i].answers.length / 2; j++) {
            let respostaQuizz = quizzEscolhido.questions[i].answers[j];
            console.log(respostaQuizz);
            respostasQuizz.push(respostaQuizz);
        }
    }

    // sorteia as perguntas+respostas
    respostasQuizz.sort(comparador);

    // renderiza as perguntas
    const listaDePerguntas = document.querySelector(".listaDePerguntas");
    for (i = 0; i < respostasQuizz.length; i++) {
        listaDePerguntas.innerHTML += `
        <div class="perguntaQuizz">
            <div class="titulopergunta-tela2">
                <h1>${quizzEscolhido.questions[i].title}</h1>
            </div>
            <div class="respostas">
                <div class="resposta">
                    <img src="${respostasQuizz[i].image}" alt="">
                    <p>${respostasQuizz[i].text}</p>
                </div>
                <div class="resposta">
                    <img src="${respostasQuizz[i].image}" alt="">
                    <p>${respostasQuizz[i].text}</p>
                </div>
                <div class="resposta">
                    <img src="${respostasQuizz[i].image}" alt="">
                    <p>${respostasQuizz[i].text}</p>
                </div>
                <div class="resposta">
                    <img src="${respostasQuizz[i].image}" alt="">
                    <p>${respostasQuizz[i].text}</p>
                </div>
            </div>
        </div>
        `;
    }

    // botões do final da página
    listaDePerguntas.innerHTML += `
    <button class="reiniciarQuizz" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
    <div class="voltarHome" onclick="voltarHome()"><p>Voltar pra Home</p></div>
    `;
}

// botão para resetar o quizz atual
function reiniciarQuizz() {
    window.location.reload(true);

    window.scrollTo(0, 0);
}

// botão "voltar home"
function voltarHome() {
    let tela1 = document.querySelector(".tela1");
    let tela2 = document.querySelector(".tela2");

    tela1.classList.toggle("oculto");
    console.log("hello");
    // tela1.classList.add("escondido");
    console.log("ola");
    tela2.classList.toggle("oculto");
    console.log("hola");
    // tela2.classList.add("container");


    window.scrollTo(0, 0);
}

// renderização de perguntas com duplo for {
//     for (let i = 0; i < qtDePerguntas; i++) {
//         for (let j = 0; j < quizzEscolhido.questions[i].answers.length / 2; j++) {
//             listaDePerguntas.innerHTML += `
//             <div class="perguntaQuizz">
//                 <div class="titulopergunta-tela2">
//                     <h1>${quizzEscolhido.questions[i].title}</h1>
//                 </div>
//                 <div class="respostas">
//                     <div class="resposta">
//                         <img src="${quizzEscolhido.questions[i].answers[j].image}" alt="">
//                         <p>${quizzEscolhido.questions[i].answers[j].text}</p>
//                     </div>
//                     <div class="resposta">
//                         <img src="${quizzEscolhido.questions[i].answers[j].image}" alt="">
//                         <p>${quizzEscolhido.questions[i].answers[j].text}</p>
//                     </div>
//                     <div class="resposta">
//                         <img src="${quizzEscolhido.questions[i].answers[j].image}" alt="">
//                         <p>${quizzEscolhido.questions[i].answers[j].text}</p>
//                     </div>
//                     <div class="resposta">
//                         <img src="${quizzEscolhido.questions[i].answers[j].image}" alt="">
//                         <p>${quizzEscolhido.questions[i].answers[j].text}</p>
//                     </div>
//                 </div>
//             </div>
//              `;
//         }
//     }
// }


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
    quantperg = Number(document.querySelector(".quant-perguntas").value);
    quantniveis = Number(document.querySelector(".quant-niveis").value);

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



function abrirInputsNivel(nivel) {
    let paiNivel = nivel.parentNode;
    paiNivel.querySelector(".inputs-lista-nivel").classList.toggle("oculto");
    paiNivel.querySelector(".div-nivel").classList.toggle("oculto");
}

function ocultarInputsNivel(nivel) {
    let paiNivel = nivel.parentNode;
    let avoNivel = paiNivel.parentNode;
    paiNivel.classList.toggle("oculto");
    avoNivel.querySelector(".div-nivel").classList.toggle("oculto");
}

function constHtmlNivel(i) {
    let templateNivel =
        `<li class="item-lista-nivel crianivel${i}">
        <div class="div-nivel" onclick="abrirInputsNivel(this)">
            <p>Nivel ${i}</p>
            <img src="./editar.svg" alt="Editar nível" onclick="abrirInputsNivel()">
        </div>
        <div class="inputs-lista-nivel inputs${i} oculto">
            <div class="div-titulo-aberto" onclick="ocultarInputsNivel(this)">Nivel ${i}</div>
            <input type="text" class="caixaInput titulo-nivel" placeholder="Título do nível">
            <input type="text" class="caixaInput porcent-acerto-min" placeholder="% de acerto mínima">
            <input type="text" class="caixaInput url-imagem-nivel" placeholder="URL da imagem do nível">
            <input type="text" class="caixaInput descricao-nivel" placeholder="Descrição do nível">
        </div>
    </li>`;
    return (templateNivel);
}

function renderizarListaNiveis() {
    const ul = document.querySelector(".ul-lista-niveis");
    for (let i = 1; i <= quantniveis; i++) {
        let nivel = constHtmlNivel(i);
        ul.innerHTML = ul.innerHTML + nivel;
    }
}

//essa função vai verificar os critérios de todos os níveis gerados na tela
//se bem sucedida, ela vai avançar para a tela de sucesso do quizz - 3.4
//caso não, pedirá para a pessoa verificar as informações

function finalizarCriacaoNiveis() {
    const arrayValid = [];
    let valid = true;

    for (let i = 1; i <= quantniveis; i++) {
        const niveli = document.querySelector(`.crianivel${i}`);
        let cond;

        const titulonivel = niveli.querySelector(".titulo-nivel").value;
        const porcentacertmin = niveli.querySelector(".porcent-acerto-min").value;
        const urlimagem = niveli.querySelector(".url-imagem-nivel").value;
        const descnivel = niveli.querySelector(".descricao-nivel").value;

        const cond1 = (titulonivel.length >= 10);
        const cond2 = (porcentacertmin > 0 && porcentacertmin < 100);
        const cond3 = (verificarURL(urlimagem));
        const cond4 = (descnivel.length > 30);

        if (cond1 && cond2 && cond3 && cond4) {
            cond = true;
        } else {
            cond = false;
        }
        arrayValid.push(cond);
    }

    for (let i = 0; i < arrayValid.length; i++) {
        if (arrayValid[i]) {
            continue;
        } else {
            valid = false;
            alert(`Problema no preenchimento do nível ${i + 1}`)
            break;
        }
    }

    if (valid) {
        //trocar para a tela de sucesso na criação do quizz
        alert("pode proseguir");
    } else {
        alert("Por favor, verifique se as informações estão preenchidas corretamente");
    }
}

quantniveis = 2;
renderizarListaNiveis()