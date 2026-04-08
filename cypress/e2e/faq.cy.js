// cypress/e2e/faq.cy.js
import faqPage from '../support/pages/FaqPage';

// BDD: Funcionalidade
describe('Funcionalidade: FAQ Acordeão (Everest Balnea)', () => {

    beforeEach(() => {
        // DADO (Given) que estou na página inicial
        faqPage.acessarPagina();
    });

    // BDD: Cenários
    it('Cenário 1: Validar resposta sobre a instalação da banheira', () => {
        // QUANDO (When) clico na primeira pergunta do FAQ
        faqPage.abrirPergunta(1);

        // ENTÃO (Then) a resposta fica visível e alerta sobre parceiros homologados
        // Regex: Ignora maiúsculas/minúsculas e aceita espaços variáveis
        const regexInstalacao = /parceiros\s+homologados/i;
        faqPage.validarRespostaVisivelERegex(1, regexInstalacao);
    });

    it('Cenário 2: Validar resposta sobre o tempo de aquecimento', () => {
        // QUANDO (When) clico na segunda pergunta
        faqPage.abrirPergunta(2);

        // ENTÃO (Then) a resposta informa o tempo de 45 a 60 minutos
        const regexAquecimento = /45\s+a\s+60\s+minutos/i;
        faqPage.validarRespostaVisivelERegex(2, regexAquecimento);
    });

    it('Cenário 3: Validar resposta sobre o sistema de cromoterapia', () => {
        // QUANDO (When) clico na terceira pergunta
        faqPage.abrirPergunta(3);

        // ENTÃO (Then) a resposta confirma a cromoterapia em LED
        const regexCromoterapia = /cromoterapia\s+em\s+led/i;
        faqPage.validarRespostaVisivelERegex(3, regexCromoterapia);
    });
});