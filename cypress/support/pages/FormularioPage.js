// cypress/support/pages/FormularioPage.js

class FormularioPage {
    // 1. MAPEAMENTO DE ELEMENTOS (Os endereços)
    SELETORES = {
        nomeField: '[data-cy="input-nome"]',
        emailField: '[data-cy="input-email"]',
        whatsappField: '[data-cy="input-whatsapp"]',
        cepField: '[data-cy="input-cep"]',
        logradouroField: '[data-cy="input-logradouro"]',
        numeroEnderecoField: '[data-cy="input-numero"]',
        bairroField: '[data-cy="input-bairro"]',
        cidadeField: '[data-cy="input-cidade"]',
        btnSubmitForm: '[data-cy="btn-submit"]'
    }

    // 2. AÇÕES DA PÁGINA
    acessarPagina() {
        cy.visit('/frontend/index.html');
    }

    preencherDadosLead(nome, email, whatsapp) {
        cy.get(this.SELETORES.nomeField).type(nome);
        cy.get(this.SELETORES.emailField).type(email);
        cy.get(this.SELETORES.whatsappField).type(whatsapp);
    }

    preencherCepEValidarRua(cep, ruaEsperada, numeroCasa) {
        // ==========================================
        // CULTURA DE QUALIDADE: Validação com Regex (Shift-Left)
        // ==========================================
        // ^ indica o começo, \d+ exige 1 ou mais dígitos (números), $ indica o fim.
        // Se a variável 'cep' tiver letras ou espaços, o teste para aqui com a mensagem customizada.
        const regexApenasNumeros = /^\d+$/; 
        expect(cep).to.match(regexApenasNumeros, 'Erro de Automação: O CEP enviado na massa de dados contém letras ou caracteres inválidos!');

        // Lógica de digitar o cep, dar o blur e validar o logradouro
        cy.get(this.SELETORES.cepField).type(cep).blur();
        cy.get(this.SELETORES.logradouroField).should('have.value', ruaEsperada);
        cy.get(this.SELETORES.numeroEnderecoField).type(numeroCasa);
    }

    enviarFormulario() {
        cy.get(this.SELETORES.btnSubmitForm).click();
    }
}

// Exporta uma INSTÂNCIA da classe para usarmos nos testes
export default new FormularioPage();