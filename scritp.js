
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os campos de entrada e de resultado
    const publicoTotalInput = document.getElementById('publico-total');
    const percCaptacaoInput = document.getElementById('perc-captacao');
    const percWhatsappInput = document.getElementById('perc-whatsapp');
    const percCompraInput = document.getElementById('perc-compra');
    const valorProdutoInput = document.getElementById('valor-produto');

    const resultadoCaptacaoEl = document.getElementById('resultado-captacao');
    const resultadoWhatsappEl = document.getElementById('resultado-whatsapp');
    const resultadoCompraEl = document.getElementById('resultado-compra');
    const faturamentoBrutoEl = document.getElementById('faturamento-bruto');

    // Função principal que realiza todos os cálculos
    function calcularFunil() {
        // Pega os valores dos campos, convertendo para número. Se estiver vazio, usa 0.
        const publicoTotal = parseFloat(publicoTotalInput.value) || 0;
        const percCaptacao = parseFloat(percCaptacaoInput.value) || 0;
        const percWhatsapp = parseFloat(percWhatsappInput.value) || 0;
        const percCompra = parseFloat(percCompraInput.value) || 0;
        const valorProduto = parseFloat(valorProdutoInput.value) || 0;

        // --- LÓGICA DO FUNIL ---
        // 1. Calcula o público captado
        const publicoCaptado = publicoTotal * (percCaptacao / 100);

        // 2. Calcula quantos avançaram para o WhatsApp
        const avancaramWhatsapp = publicoCaptado * (percWhatsapp / 100);

        // 3. Calcula quantos concluíram a compra
        const totalCompras = avancaramWhatsapp * (percCompra / 100);

        // 4. Calcula o faturamento bruto
        const faturamento = totalCompras * valorProduto;

        // --- ATUALIZA OS RESULTADOS NA TELA ---
        // Usamos Math.round() para não ter "meia pessoa"
        resultadoCaptacaoEl.textContent = Math.round(publicoCaptado);
        resultadoWhatsappEl.textContent = Math.round(avancaramWhatsapp);
        resultadoCompraEl.textContent = Math.round(totalCompras);

        // Formata o faturamento como moeda brasileira (R$)
        faturamentoBrutoEl.textContent = faturamento.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    // Cria uma lista de todos os campos de entrada
    const inputs = [
        publicoTotalInput,
        percCaptacaoInput,
        percWhatsappInput,
        percCompraInput,
        valorProdutoInput
    ];

    // Adiciona um "ouvinte" a cada campo. Sempre que você digitar algo, a função 'calcularFunil' será chamada.
    inputs.forEach(input => {
        input.addEventListener('input', calcularFunil);
    });

    // Roda a função uma vez quando a página carrega, para o caso de haver valores iniciais
    calcularFunil();
});
