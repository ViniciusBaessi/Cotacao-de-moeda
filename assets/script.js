const graficoDolar = document.getElementById('graficoDolar')

const lista = document.querySelector('[data-lista]')



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



   // Os dados são atualizados de forma constante para que o usuário veja o valor mais recente. O comando (setInterval) chama a função (conectaAPI) a cada 5 segundos.
   setInterval(() =>  conectaAPI(), 5000)

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


    imprimeCotacao("dólar", valor)
  }


 
 






  
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






function imprimeCotacao (nome, valor) {

  //Limpando os dados da lista

  lista.innerHTML = ""

  //Multiplicando a variável (multiplicador = 1) por 10 até que ele seja igual a 1000
  for (let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10){

    //Variável (listaItem) cria um elemento (li) dentro do HTML
    const listaItem = document.createElement('li')


    valor = (valor*multiplicador).toFixed(2)


    if (valor.length == 4) {
      let string = valor.toString(); // converte a variável numérica para uma string
      valor = string.slice(0, 1) + ',' + string.slice(2); // insere o ponto após o primeiro caractere
    }  
    

   



    //O (li) recebe os valores
    listaItem.innerHTML = `${multiplicador} ${nome}: R$${valor}`

    //A lista do HTML recebe o li junto aos valores, assim realizando o print na tela
    lista.appendChild(listaItem)

    
  }
}
