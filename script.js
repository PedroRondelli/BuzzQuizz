//Variáveis globais
let quantniveis;
let quantperg;

function rendenizarQuizzesPrincipal(resposta){
    let arrayDeObjetos = resposta.data
    arrayDeObjetos.forEach(element =>{
        let stringId = JSON.stringify(element.id)
        if(localStorage.getItem(stringId)!==null){
           let DivVazia = document.querySelector(".segundaDivPrimeiraTela")
           let DivQuizzesProprios=document.querySelector(".terceiraDivPrimeiraTela")
           DivVazia.classList.add("escondidoPedro")
           DivQuizzesProprios.classList.remove("escondidoPedro")
        }else{
            let roloTodosOsQuizzes = document.querySelector(".roloTodosOsQuizzes")
            let templateDivQuizz = `<div onclick="mudartela2(${element.id})" style="background-image:url(${element.image});" class="janelaQuizz"><h4>${element.title}</h4><div class="degrade"></div></div>`
            roloTodosOsQuizzes.innerHTML= roloTodosOsQuizzes.innerHTML + templateDivQuizz
        }
    });
}
function Requisicaoprincipal() {
    let promessaPrincipal = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promessaPrincipal.then(rendenizarQuizzesPrincipal)
    promessaPrincipal.catch(rendenizarQuizzesPrincipal)
}
function mudartela2(id){
    console.log(id)
}
function meusQuizzes(arrayMemoria){
    arrayMemoria.forEach(element =>{
        let roloSeusQuizzes = document.querySelector(".roloSeusQuizzes")
        let templateDivQuizz = `<div onclick="mudartela2(${element.id})" style="background-image:url(${element.image});" class="janelaQuizz"><h4>${element.title}</h4><div class="degrade"></div></div>` 
        roloSeusQuizzes.innerHTML = roloSeusQuizzes.innerHTML + templateDivQuizz
    })
}
Requisicaoprincipal()
let memoria = localStorage.getItem("ids")
meusQuizzes(memoria)


/* console.log("Estou aquui")
requisicaoQuizzes()

function rendenizaQuizzes(resposta) {
    console.log(resposta.data)
    resposta.data.forEach(element => {
        // if(element.image!=="https://http.cat/411.jpg"){
            let templateDivQuizz = `<div onclick="mudartela2();" class="visualizacaoQuizz"><div class="degrade"></div><img src="${element.image}"/><h2 class="tituloQuizzPedro">${element.title}</h2></div>`
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
function mudartela2() {
    console.log("Clicou")
    
}
 */

function verificarURL(texto){
    try {
        let url = new URL(texto);
        return(true);
    } catch(err) {
        return(false);
    }
}

function abrirTelaCriarPerguntas(){
    const titquizz = document.querySelector(".titulo-quizz").value;
    const urlimagem = document.querySelector(".url-imagem").value;
    quantperg = Number(document.querySelector(".quant-perguntas").value);
    quantniveis = Number(document.querySelector(".quant-niveis").value);

    const cond1 = (titquizz.length >= 20 && titquizz.length <= 65);
    const cond2 = verificarURL(urlimagem);
    const cond3 = (quantperg >= 3);
    const cond4 = (quantniveis >= 2);

    if(cond1 && cond2 && cond3 && cond4){
        //trocar de tela e acionar a função de renderizar a tela de criar perguntas
        alert("pode proseguir");
    } else {
        alert("Por favor, verifique se as informações estão preenchidas corretamente");
    }
}

function abrirInputsNivel(nivel){
    let paiNivel = nivel.parentNode;
    paiNivel.querySelector(".inputs-lista-nivel").classList.toggle("oculto");
    paiNivel.querySelector(".div-nivel").classList.toggle("oculto");
}

function ocultarInputsNivel(nivel){
    let paiNivel = nivel.parentNode;
    let avoNivel = paiNivel.parentNode;
    paiNivel.classList.toggle("oculto");
    avoNivel.querySelector(".div-nivel").classList.toggle("oculto");
}

function constHtmlNivel(i){
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
    return(templateNivel);
}

function renderizarListaNiveis(){
    const ul = document.querySelector(".ul-lista-niveis");
    for(let i = 1; i<=quantniveis; i++){
        let nivel = constHtmlNivel(i);
        ul.innerHTML = ul.innerHTML + nivel;
    }
}

//essa função vai verificar os critérios de todos os níveis gerados na tela
    //se bem sucedida, ela vai avançar para a tela de sucesso do quizz - 3.4
    //caso não, pedirá para a pessoa verificar as informações

function finalizarCriacaoNiveis(){
    const arrayValid = [];
    let valid = true;

    for(let i=1; i<=quantniveis; i++){
        const niveli = document.querySelector(`.crianivel${i}`);
        let cond;

        const titulonivel = niveli.querySelector(".titulo-nivel").value;
        const porcentacertmin = niveli.querySelector(".porcent-acerto-min").value;
        const urlimagem = niveli.querySelector(".url-imagem-nivel").value;
        const descnivel = niveli.querySelector(".descricao-nivel").value;

        const cond1 = (titulonivel.length >= 10);
        const cond2 = (porcentacertmin > 0 && porcentacertmin <100);
        const cond3 = (verificarURL(urlimagem));
        const cond4 = (descnivel.length > 30);

        if(cond1 && cond2 && cond3 && cond4){
            cond = true;
        } else {
            cond = false;
        }
        arrayValid.push(cond);
    }

    for(let i=0; i<arrayValid.length; i++){
        if(arrayValid[i]){
            continue;
        } else {
            valid = false;
            alert(`Problema no preenchimento do nível ${i+1}`)
            break;
        }
    }

    if(valid){
        //trocar para a tela de sucesso na criação do quizz
        alert("pode proseguir");
    } else {
        alert("Por favor, verifique se as informações estão preenchidas corretamente");
    }
}


quantniveis = 2;
renderizarListaNiveis();