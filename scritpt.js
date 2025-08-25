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
        // Pega os valores dos campos, convertendo para número. Se um campo estiver vazio, considera como 0.
        const publicoTotal = parseFloat(publicoTotalInput.value) || 0;
        const percCaptacao = parseFloat(percCaptacaoInput.value) || 0;
        const percWhatsapp = parseFloat(percWhatsappInput.value) || 0;
        const percCompra = parseFloat(percCompraInput.value) || 0;
        const valorProduto = parseFloat(valorProdutoInput.value) || 0;

        // --- LÓGICA DO FUNIL ---
        // 1. Calcula o público captado
        const publicoCaptado = publicoTotal * (percCaptacao / 100);

        // 2. Calcula quantos avançaram para o WhatsApp (baseado no público que já foi captado)
        const avancaramWhatsapp = publicoCaptado * (percWhatsapp / 100);

        // 3. Calcula quantos concluíram a compra (baseado em quem avançou para o WhatsApp)
        const totalCompras = avancaramWhatsapp * (percCompra / 100);

        // 4. Calcula o faturamento bruto final
        const faturamento = totalCompras * valorProduto;

        // --- ATUALIZA OS RESULTADOS NA TELA ---
        // Arredonda os resultados para não ter "meia pessoa"
        resultadoCaptacaoEl.textContent = Math.round(publicoCaptado);
        resultadoWhatsappEl.textContent = Math.round(avancaramWhatsapp);
        resultadoCompraEl.textContent = Math.round(totalCompras);

        // Formata o faturamento como moeda brasileira (R$) para uma exibição amigável
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

    // Adiciona um "ouvinte de evento" a cada campo. 
    // O evento 'input' é disparado toda vez que você digita ou altera algo no campo.
    // Assim que o evento acontece, a função 'calcularFunil' é chamada AUTOMATICAMENTE.
    inputs.forEach(input => {
        input.addEventListener('input', calcularFunil);
    });

    // Chama a função uma vez quando a página carrega, para zerar os campos de resultado
    calcularFunil();
});
