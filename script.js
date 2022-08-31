console.log("Estou aquui")
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