// cypress/support/pages/FormularioPage.js

class FormularioPage {
    // 1. MAPEAMENTO DE ELEMENTOS (Os endereços)
    // Crie métodos (getters) que retornam os elementos da tela.
    SELETORES = {
        nomeField: '[data-cy="input-nome"]',
        emailField: '[data-cy="input-email"]',
        whatsappField: '[data-cy="input-whatsapp"]',
        cepField: '[data-cy="input-cep"]',
        logradouroField: '[data-cy="input-logradouro"]',
        numeroEnderecoField: '[data-cy="input-numero"]',
        bairroField: '[data-cy="input-bairro"]',
        cidadeField: '[data-cy="input-cidade"]',
        btnSubbmitForm: '[data-cy="btn-submit"]'
    }

    /*
    get inputNome() { 
        // DICA: retorne o cy.get('#nome') aqui 
        cy.get(SELETORES.nameField).type('Robô Cypress TechNova');
    }
    
    get inputEmail() { 
        // implemente... 
         cy.get(SELETORES.emailField).type('robocy@test.com');
    }

    get inputWhatsapp() {
        //Whatsapp
        cy.get(SELETORES.whatsappField).type('11988887777');
    }

    get inputCEP() {
        //Whatsapp
        cy.get(SELETORES.cepField).type('02417040').blur();
        cy.get(SELETORES.logradouroField).should('have.value', 'Rua Clóvis Cunha Canto');
         cy.get(SELETORES.numeroEnderecoField).type('100');
    }
    
    get btnSubmit() { 
        // implemente... 
        cy.get(SELETORES.btnSubbmitForm).contains('Tenho Interesse');
    }
    */

    // ... mapeie os outros elementos que você vai precisar usar

    // 2. AÇÕES DA PÁGINA (O que o usuário faz)
    // Crie métodos que usam os elementos mapeados acima para realizar ações.
    
    acessarPagina() {
        // DICA: coloque o cy.visit() aqui
       cy.visit('/frontend/index.html');
    }

   preencherDadosLead(nome, email, whatsapp) {
        cy.get(this.SELETORES.nomeField).type(nome);
        cy.get(this.SELETORES.emailField).type(email);
        cy.get(this.SELETORES.whatsappField).type(whatsapp);
    }

    preencherCepEValidarRua(cep, ruaEsperada, numeroCasa) {
        // implemente a lógica de digitar o cep, dar o blur e validar o logradouro
        cy.get(this.SELETORES.cepField).type(cep).blur()
        cy.get(this.SELETORES.logradouroField).should('have.value', ruaEsperada);
        cy.get(this.SELETORES.numeroEnderecoField).type(numeroCasa);
    }

    enviarFormulario() {
        // implemente o clique no botão
        cy.get(this.SELETORES.btnSubbmitForm).click()
    }
}

// Exporta uma INSTÂNCIA da classe para usarmos nos testes
export default new FormularioPage();