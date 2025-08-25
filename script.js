document.addEventListener('DOMContentLoaded', () => {
    // Campos de entrada
    const publicoTotalInput = document.getElementById('publico-total');
    const percCaptacaoInput = document.getElementById('perc-captacao');
    const percWhatsappInput = document.getElementById('perc-whatsapp');
    const percCompraInput = document.getElementById('perc-compra');
    const valorProdutoInput = document.getElementById('valor-produto');
    
    // Campos de resultado em texto
    const resultadoCaptacaoEl = document.getElementById('resultado-captacao');
    const resultadoWhatsappEl = document.getElementById('resultado-whatsapp');
    const resultadoCompraEl = document.getElementById('resultado-compra');
    const faturamentoBrutoEl = document.getElementById('faturamento-bruto');

    // Botão de calcular
    const calculateBtn = document.getElementById('calculate-btn');

    // --- NOVOS CAMPOS DO FUNIL VISUAL ---
    const funnelValueTotal = document.getElementById('funnel-value-total');
    const funnelValueCaptado = document.getElementById('funnel-value-captado');
    const funnelValueWhatsapp = document.getElementById('funnel-value-whatsapp');
    const funnelValueCompra = document.getElementById('funnel-value-compra');


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

        // Atualiza os resultados em texto
        resultadoCaptacaoEl.textContent = Math.round(publicoCaptado);
        resultadoWhatsappEl.textContent = Math.round(avancaramWhatsapp);
        resultadoCompraEl.textContent = Math.round(totalCompras);

        faturamentoBrutoEl.textContent = faturamento.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        // --- ATUALIZA OS VALORES NO FUNIL VISUAL ---
        funnelValueTotal.textContent = Math.round(publicoTotal);
        funnelValueCaptado.textContent = Math.round(publicoCaptado);
        funnelValueWhatsapp.textContent = Math.round(avancaramWhatsapp);
        funnelValueCompra.textContent = Math.round(totalCompras);
    }

    // A função 'calcularFunil' é chamada quando o botão é CLICADO.
    calculateBtn.addEventListener('click', calcularFunil);
});
