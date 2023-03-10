const graficoDolar = document.getElementById('graficoDolar')

const lista = document.querySelector('[data-lista]')

const lista2 = document.querySelector('[data-lista2]')

const res = document.getElementById('titulo')
const res2 = document.getElementById('titulo2')

const graficoEuro = document.getElementById('graficoEuro')


const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 3
      }]
    },
  });

  conectaAPI()

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

   console.log(conectaTraduzido)
    
    //Chama a função para adicionar os dados
    adicionarDados(graficoParaDolar, tempo, valor)


    valor = parseFloat(conectaTraduzido.USDBRL.ask);
    let titulo = Number(valor)
    titulo = valor.toFixed(2)
    res.innerHTML = ` <i class="fa fa-dollar"></i> Variação do dólar desde o login | <strong> R$ ${titulo} </strong>`

    imprimeCotacao("dólar","dólares", valor)
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


function imprimeCotacao (nome1, nome2, valor) {

  //Limpando os dados da lista

  lista.innerHTML = ""

  //Multiplicando a variável (multiplicador = 1) por 10 até que ele seja igual a 1000
  for (let multiplicador = 1; multiplicador <= 1000; multiplicador *= 10){

    //Variável (listaItem) cria um elemento (li) dentro do HTML
    const listaItem = document.createElement('li')

    
    valor = (valor*multiplicador).toFixed(2)
    
    //A sequência de ifs abaixo faz a formatação para valores em reais, por exemplo 1550 aparecerá para o usuário como R$ 1.550,00. Se trata apenas de uma formatação para estilo.

    
    if (valor.length == 4) {
      let string = valor.toString(); 
      let valor2 = string.slice(0, 1) + ',' + string.slice(2); 
      //O (li) recebe os valores
      listaItem.innerHTML = `${multiplicador} ${nome1}: R$ ${valor2}`
    }  

    if (valor.length == 5) {
      let string = valor.toString(); 
      let valor3 = string.slice(0, 2) + ',' + string.slice(3); 
      //O (li) recebe os valores
      listaItem.innerHTML = `${multiplicador} ${nome2}: R$ ${valor3}`
    }  

    if (valor.length == 7) {
      let string = valor.toString(); 
      let valor4 = string.slice(0, 3) + ',' + string.slice(5); 
      //O (li) recebe os valores
      listaItem.innerHTML = `${multiplicador} ${nome2}: R$ ${valor4}`
    }  


    if (valor.length == 10) {
      let string = valor.toString(); 
      let valor4 = string.slice(0, 1) + '.' + string.slice(1, 4) + ',' + string.slice(8);
      //O (li) recebe os valores
      listaItem.innerHTML = `${multiplicador} ${nome2}: R$ ${valor4}`
    } 
    
    
    //A lista do HTML recebe o li junto aos valores, assim realizando o print na tela
    lista.appendChild(listaItem)

    
  }
}


//-------------------------- GRÁFICO EURO ---------------------------------------------------



const graficoParaEuro = new Chart(graficoEuro, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Euro',
      data: [],
      borderWidth: 3
    }]
  },
});



conectaAPI2()

   setInterval(() =>  conectaAPI2(), 5000)

  async function conectaAPI2() {

   
    const conecta2 = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
    
    const conectaTraduzido2 = await conecta2.json()
    
    let tempo2 = geraHorario2()
    
    let valor2 = conectaTraduzido2.EURBRL.ask

   console.log(conectaTraduzido2)
    
    
    adicionarDados(graficoParaEuro, tempo2, valor2)


    valor2 = parseFloat(conectaTraduzido2.EURBRL.ask);
    let titulo2 = Number(valor2)
    titulo2 = valor2.toFixed(2)
    res2.innerHTML = ` <i class="fa fa-euro"></i> Variação do euro desde o login | <strong> R$ ${titulo2} </strong> real brasileiro`

    imprimeCotacao2("Euro","Euros", valor2)
  }


  function geraHorario2() {

    
    let data2 = new Date()

  

    let horario2 = data2.getHours() + ":" + data2.getMinutes() + ":" + data2.getSeconds()


    console.log(horario2)

  
    return horario2
}
geraHorario2() 



function adicionarDados2(grafico, legenda, dados) {

  
  grafico.data.labels.push(legenda);

  
  grafico.data.datasets.forEach((dataset) => {

      dataset.data.push(dados);
  });

  
  grafico.update();
}


function imprimeCotacao2 (nome1, nome2, valor) {

  //Limpando os dados da lista

  lista2.innerHTML = ""

  //Multiplicando a variável (multiplicador = 1) por 10 até que ele seja igual a 1000
  for (let multiplicador2 = 1; multiplicador2 <= 1000; multiplicador2 *= 10){

    //Variável (listaItem) cria um elemento (li) dentro do HTML
    const listaItem2 = document.createElement('li')

    
    valor = (valor*multiplicador2).toFixed(2)
    
    //A sequência de ifs abaixo faz a formatação para valores em reais, por exemplo 1550 aparecerá para o usuário como R$ 1.550,00. Se trata apenas de uma formatação para estilo.

    
    if (valor.length == 4) {
      let string2 = valor.toString(); 
      let valor2 = string2.slice(0, 1) + ',' + string2.slice(2); 
      //O (li) recebe os valores
      listaItem2.innerHTML = `${multiplicador2} ${nome1}: R$ ${valor2}`
    }  

    if (valor.length == 5) {
      let string2 = valor.toString(); 
      let valor3 = string2.slice(0, 2) + ',' + string2.slice(3); 
      //O (li) recebe os valores
      listaItem2.innerHTML = `${multiplicador2} ${nome2}: R$ ${valor3}`
    }  

    if (valor.length == 7) {
      let string2 = valor.toString(); 
      let valor4 = string2.slice(0, 3) + ',' + string2.slice(5); 
      //O (li) recebe os valores
      listaItem2.innerHTML = `${multiplicador2} ${nome2}: R$ ${valor4}`
    }  


    if (valor.length == 10) {
      let string2 = valor.toString(); 
      let valor4 = string2.slice(0, 1) + '.' + string2.slice(1, 4) + ',' + string2.slice(8);
      //O (li) recebe os valores
      listaItem2.innerHTML = `${multiplicador2} ${nome2}: R$ ${valor4}`
    } 
    
    
    //A lista do HTML recebe o li junto aos valores, assim realizando o print na tela
    lista2.appendChild(listaItem2)

    
  }
}
