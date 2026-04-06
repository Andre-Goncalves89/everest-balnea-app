// Importa a instância que exportamos no final do FormularioPage.js
import formularioPage from '../support/pages/FormularioPage';

describe('Formulário de Leads - Everest Balnea - Teste de regressão em massa', () => {
    
    const cenariosDeTeste = [
        {
            descricao: 'Caminho feliz! - Todos os dados válidos',
            nome: 'Robô cypress', email: 'test@qa.com.br', whatsapp: '11988887777', cep: '02417040', rua: 'Rua Clóvis Cunha Canto', numero: '100',
            devePassar: true
        },
        {
            descricao: 'Falha - email com formato inválido',
            nome: 'Robô Cypress', email: 'email_sem_arroba.com', whatsapp: '11988887777',
            cep: '02417040', rua: 'Rua Clóvis Cunha Canto', numero: '150',
            devePassar: false 
        },
        {
            descricao: 'Falha - Nome com menos de três caracteres',
            nome: 'ab', email: 'ab@c.com', whatsapp: '11988887777',
            cep: '02417040', rua: 'Rua Clóvis Cunha Canto', numero: '120',
            devePassar: false
        },
        {
            descricao: 'Falha - email com menos de cinco caracteres',
            nome: 'Ana', email: 'a@b.c', whatsapp: '11988887777', 
            cep: '02417040', rua: 'Rua Clóvis Cunha Canto', numero: '100',
            devePassar: false
        },
        
        {
            descricao: 'Falha - whatsapp com menos de 10 caracteres',
            nome: 'Robô cypress', email: 'robo@cypress.com', whatsapp: '119888777',
            cep: '02417040', rua: 'Rua Clóvis Cunha Canto', numero: '120',
            devePassar: false
        },
        {
            descricao: 'Falha - whatsapp com mais de 11 caracteres',
            nome: 'Robô cypress', email: 'robo@cypress.com', whatsapp: '119888777777',
            cep: '02417040', rua: 'Rua Clóvis Cunha Canto', numero: '120',
            devePassar: false
        },
        {
            descricao: 'Falha - Campo de email ou nome com caracteres maliciosos',
            nome: '...', email: 'robôcypress@test.com', whatsapp: '11988877777',
            cep: '02417040', rua: 'Rua Clóvis Cunha Canto', numero: '120',
            devePassar: false
        }
    ];

    beforeEach(() => {
        // Acessa a página limpa antes de cada um dos cenários
        formularioPage.acessarPagina();
    });

    // O Cypress itera sobre cada objeto do seu array
    cenariosDeTeste.forEach((cenario) => {
        
        it(`Deve processar o cenário: ${cenario.descricao}`, () => {
            
            // 1. O robô preenche tudo usando os dados do cenário atual
            formularioPage.preencherDadosLead(cenario.nome, cenario.email, cenario.whatsapp);
            formularioPage.preencherCepEValidarRua(cenario.cep, cenario.rua, cenario.numero);
            
            // 2. O robô tenta enviar
            formularioPage.enviarFormulario();

            // 3. A Lógica de Asserção (O juiz do teste)
            if (cenario.devePassar) {
                // Se é o caminho feliz, o sistema deve mostrar o alerta de sucesso
                // O Cypress consegue capturar o window.alert nativo do navegador assim:
                cy.on('window:alert', (textoDoAlerta) => {
                    expect(textoDoAlerta).to.contain('Sucesso');
                });
                
                // Garantimos que o botão ficou com o texto de "Enviando" ou foi desabilitado
                cy.get(formularioPage.SELETORES.btnSubbmitForm).should('be.disabled');

            } else {
                // Se é um cenário de falha, o HTML5 DEVE bloquear o envio.
                // O pulo do gato: Verificamos se existe pelo menos um campo inválido na tela
                // usando a pseudo-classe ':invalid' do próprio HTML!
                cy.get('input:invalid').should('have.length.at.least', 1);

                // E garantimos que o formulário NÃO disparou o evento de loading/sucesso
                cy.get(formularioPage.SELETORES.btnSubbmitForm).should('not.be.disabled');
            }
        });
    });
});