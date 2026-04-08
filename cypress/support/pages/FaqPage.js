// cypress/support/pages/FaqPage.js

class FaqPage {
    // Mantendo o seu padrão exato de arquitetura
    SELETORES = {
        // Vamos usar IDs genéricos que funcionam para qualquer número de pergunta
        btnPergunta: (index) => `[data-cy="faq-btn-${index}"]`,
        txtResposta: (index) => `[data-cy="faq-content-${index}"]`
    }

    acessarPagina() {
       cy.visit('/');
    }

    abrirPergunta(index) {
        // Clica na pergunta específica baseada no número (1, 2, 3...)
        cy.get(this.SELETORES.btnPergunta(index)).click();
    }

    validarRespostaVisivelERegex(index, regexPattern) {
        // Verifica se a resposta não tem mais a classe 'hidden' (Tailwind) e está visível
        cy.get(this.SELETORES.txtResposta(index))
            .should('not.have.class', 'hidden')
            .and('be.visible');

        // Captura o texto e valida com a nossa malha fina de Regex
        cy.get(this.SELETORES.txtResposta(index)).invoke('text').then((texto) => {
            expect(texto).to.match(regexPattern);
        });
    }
}

export default new FaqPage();