console.log("Estou aquui")
requisicaoteste()

function printar(resposta) {
    console.log(resposta)
}

function requisicaoteste() {
    let promessaTeste = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promessaTeste.then(printar)
    promessaTeste.catch(requisicaoteste)
}