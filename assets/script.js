const graficoDolar = document.getElementById('graficoDolar')

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
  });

  async function conectaAPI() {

    //O (fatch) faz a requisição de dados para a API e o comando (await) espera até que a resposta chegue.
    const conecta = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")

    //Ao receber a resposta no comando anterior, a variável (conecta) é convertida para JSON e o comando await espera até que a execução seja finalizada
    const conectaTraduzido = await conecta.json()


    //o script fica "pausado" até que recebam as informações pelo await.
    console.log(conectaTraduzido)
  }


  // Os dados são atualizados de forma constante para que o usuário veja o valor mais recente. O comando (setInterval) chama a função (conectaAPI) a cada 5 segundos.
  setInterval(() =>  conectaAPI(), 5000)