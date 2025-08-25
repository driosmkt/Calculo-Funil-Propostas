// PROVA REAL: Se este alerta aparecer, o arquivo está sendo carregado corretamente.
alert("O arquivo script.js foi carregado com sucesso!");

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os campos de entrada (onde você digita os valores)
    const publicoTotalInput = document.getElementById('publico-total');
    const percCaptacaoInput = document.getElementById('perc-captacao');
    const percWhatsappInput = document.getElementById('perc-whatsapp');
    const percCompraInput = document.getElementById('perc-compra');
    const valorProdutoInput = document.getElementById('valor-produto');

    // Seleciona todos os campos de resultado (onde os cálculos aparecem)
    const resultadoCaptacaoEl = document.getElementById('resultado-captacao');
    const resultadoWhatsappEl = document.getElementById('resultado-whatsapp');
    const resultadoCompraEl = document.getElementById('resultado-compra');
    const faturamentoBrutoEl = document.getElementById('faturamento-bruto');

    // Função principal que realiza todos os cálculos
    function calcularFunil() {
        const publicoTotal = parseFloat(publicoTotalInput.value) || 0;
        const percCaptacao = parseFloat(percCaptacaoInput.value) || 0;
        const percWhatsapp = parseFloat(percWhatsappInput.value) || 0;
        const percCompra = parseFloat(percCompraInput.value) || 0;
        const valorProduto = parseFloat(valorProdutoInput.value) || 0;

        const publicoCaptado = publicoTotal * (percCaptacao / 100);
        const avancaramWhatsapp = publicoCaptado * (percWhatsapp / 100);
        const totalCompras = avancaramWhatsapp * (percCompra / 100);
        const faturamento = totalCompras * valorProduto;

        resultadoCaptacaoEl.textContent = Math.round(publicoCaptado);
        resultadoWhatsappEl.textContent = Math.round(avancaramWhatsapp);
        resultadoCompraEl.textContent = Math.round(totalCompras);

        faturamentoBrutoEl.textContent = faturamento.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    const inputs = [
        publicoTotalInput,
        percCaptacaoInput,
        percWhatsappInput,
        percCompraInput,
        valorProdutoInput
    ];

    // Adiciona um "ouvinte" a cada campo. 
    // Sempre que você digitar algo, a função 'calcularFunil' será chamada.
    inputs.forEach(input => {
        input.addEventListener('input', calcularFunil);
    });

    // Roda a função uma vez quando a página carrega para o caso de haver valores iniciais
    calcularFunil();
});
