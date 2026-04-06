// cypress/e2e/formulario.cy.js
import formularioPage from '../support/pages/FormularioPage';

// BDD: Funcionalidade
describe('Funcionalidade: Captura de Leads (Formulário Everest Balnea)', () => {
    
    // Array com nossa massa de dados (Data-Driven)
    const cenariosDeTeste = [
        { 
            descricao: 'Caminho feliz! - Todos os dados válidos', 
            nome: 'Robô Cypress', email: 'test@qa.com.br', whatsapp: '11988887777', 
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '100', 
            devePassar: true 
        },
        { 
            descricao: 'Falha - email com formato inválido', 
            nome: 'Robô Cypress', email: 'email_sem_arroba.com', whatsapp: '11988887777', 
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '150', 
            devePassar: false 
        },
        { 
            descricao: 'Falha - Nome com menos de três caracteres', 
            nome: 'ab', email: 'ab@c.com', whatsapp: '11988887777', 
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '120', 
            devePassar: false 
        },
        { 
            descricao: 'Falha - email com menos de cinco caracteres', 
            nome: 'Ana', email: 'a@b.', whatsapp: '11988887777', 
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '100', 
            devePassar: false 
        },
        { 
            descricao: 'Falha - whatsapp com menos de 10 caracteres', 
            nome: 'Robô Cypress', email: 'robo@cypress.com', whatsapp: '119888777', 
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '120', 
            devePassar: false 
        },
        { 
            descricao: 'Falha - whatsapp com mais de 11 caracteres', 
            nome: 'Robô Cypress', email: 'robo@cypress.com', whatsapp: '119888777777', 
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '120', 
            devePassar: false 
        },
        { 
            descricao: 'Falha - Campo de email ou nome com caracteres maliciosos', 
            nome: '...', email: 'robocypress@test.com', whatsapp: '11988877777', 
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '120', 
            devePassar: false 
        }
    ];

    beforeEach(() => {
        // ==========================================
        // DADO (Given) - O estado inicial do sistema
        // ==========================================
        // Dado que a página do formulário é acessada limpa antes de cada cenário
        formularioPage.acessarPagina();
    });

    // O Cypress itera sobre cada objeto do seu array
    cenariosDeTeste.forEach((cenario) => {
        
        // BDD: Cenário
        it(`Cenário: ${cenario.descricao}`, () => {
            
            // ==========================================
            // QUANDO (When) - A ação executada pelo usuário
            // ==========================================
            // Quando o robô preenche os campos usando os dados do cenário atual
            formularioPage.preencherDadosLead(cenario.nome, cenario.email, cenario.whatsapp);
            formularioPage.preencherCepEValidarRua(cenario.cep, cenario.rua, cenario.numero);
            
            // E tenta enviar o formulário
            formularioPage.enviarFormulario();

            // ==========================================
            // ENTÃO (Then) - A Lógica de Asserção (O juiz do teste)
            // ==========================================
            if (cenario.devePassar) {
                
                // Então o sistema deve processar e mostrar o alerta de sucesso
                cy.on('window:alert', (textoDoAlerta) => {
                    // USO DE REGEX: Procura pela palavra "sucesso" ignorando maiúsculas/minúsculas (/i)
                    const regexSucesso = /sucesso/i;
                    expect(textoDoAlerta).to.match(regexSucesso);
                });
                
                // E o botão fica com o texto de "Enviando" ou foi desabilitado
                cy.get(formularioPage.SELETORES.btnSubmitForm).should('be.disabled');

            } else {
                
                // Então o HTML5 DEVE bloquear o envio apontando os campos inválidos
                cy.get('input:invalid').should('have.length.at.least', 1);

                // E o formulário NÃO deve disparar o evento de loading/sucesso (botão ativo)
                cy.get(formularioPage.SELETORES.btnSubmitForm).should('not.be.disabled');
            }
        });
    });
});