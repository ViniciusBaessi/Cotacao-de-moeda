const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
  });

  async function conectaAPI() {

    //O (fatch) faz a requisição de dados para a API e o comando (await) espera até que a resposta chegue.
    const conecta = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")

    //Ao receber a resposta no comando anterior, a variável (conecta) é convertida para JSON e o comando await espera até que a execução seja finalizada. O script fica "pausado" até que recebam as informações pelo await.
    const conectaTraduzido = await conecta.json()

    //Armazena o horário atual na variável tempo
    let tempo = geraHorario()

    //Armazena o dado da API na variável valor
    let valor = conectaTraduzido.USDBRL.ask
    
    //Chama a função para adicionar os dados
    adicionarDados(graficoParaDolar, tempo, valor)
  }



  // Os dados são atualizados de forma constante para que o usuário veja o valor mais recente. O comando (setInterval) chama a função (conectaAPI) a cada 5 segundos.
  setInterval(() =>  conectaAPI(), 5000)






  
  function geraHorario() {

    //O comando (new date) pega o dia e o horário atual do usuário e guarda na variável (data)
    let data = new Date()

    //A variável (horário) vai receber somente a hora, minuto e segundo da variável (data) de forma concatenada.

    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds()


    console.log(horario)


    //Deixando a variável acessível no escopo global
    return horario
  }
  geraHorario() 






  //Criando uma função para adicionar os dados da API ao gráfico, os parâmetros se referem ao gráfico, a hora(legenda) e os dados da API (dados)
  function adicionarDados(grafico, legenda, dados) {

    //Acessa a área de labels do gráfico e insere a leganda através do comando (push)
    grafico.data.labels.push(legenda);

    //Acessa a área de datasets do gráfico e insere os dados em cada unidade do array por meio do (foreach) e através do comando (push)
    grafico.data.datasets.forEach((dataset) => {

        dataset.data.push(dados);
    });

    //Comando para atualizar o gráfico para imprimir os novos dados
    grafico.update();
}