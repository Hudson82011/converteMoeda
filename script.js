async function getCotacoes() {
    let campoValor = document.getElementById('valor');
    let campoResposta = document.getElementById('resposta');
    let campoReais = document.getElementById('Reais');
    let campoDolares = document.getElementById('Dolares');
    let campoEuros = document.getElementById('Euros');
    let dados;
    try {
        let url = 'https://api.hgbrasil.com/finance?format=json-cors&key=be8ec40a';
        let resposta = await fetch(url);
        dados = await resposta.json();
    } catch(err) {
        campoResposta.style.display = 'none';
        return;
    }
    let formatadorReais = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    let formatadorDolares = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'USD',
    });
    let formatadorEuros = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'EUR',
    });
    let Reais = parseFloat(campoValor.value);
    let Dolares = parseFloat(dados.results.currencies.USD.buy)
    let Euros = parseFloat(dados.results.currencies.EUR.buy)
    campoResposta.style.display = 'block';
    campoReais.innerText = formatadorReais.format(Reais);
    campoDolares.innerText = formatadorDolares.format(Reais / Dolares);
    campoEuros.innerText = formatadorEuros.format(Reais / Euros);
}

function checaValor() {
    let Reais = parseFloat(document.getElementById('valor').value);
    let campoErro = document.getElementById('erro');
    if(isNaN(Reais) || Reais < 0) {
        campoErro.style.display = 'block';
    } else {
        campoErro.style.display = 'none';
        getCotacoes();
    }
}