console.log("Estou aquui")
requisicaoQuizzes()

function printar(resposta) {
    console.log(resposta.data)
}

function requisicaoQuizzes() {
    let promessaTeste = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    promessaTeste.then(printar)
    promessaTeste.catch(requisicaoQuizzes)
}