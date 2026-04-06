// Importa a instância que exportamos no final do FormularioPage.js
import formularioPage from '../support/pages/FormularioPage';

describe('Formulário de Leads - Everest Balnea - Teste de regressão em massa', () => {
    
    const cenariosDeTeste = [
        {
            descricao: 'Caminho feliz! - Todos os dados válidos',
            nome: 'Robô cypress', emaiL: 'test@qa.com.br', whatsapp: '11988887777', cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '100',
            devePassar: true
        },
        {
            descricao: 'Falha - email com formato inválido',
            nome: 'Robô Cypress', email: 'email_sem_arroba.com', whatsapp: '11988887777',
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '150',
            devePassar: false 
        },
        {
            descricao: 'Falha - CEP inexistente',
            nome: 'Robô Cypress', email: 'emailtest@qa.com.br', whatsapp: '11988887777',
            cep: '99999999',
            devePassar: false 
        },
        {
            descricao: 'Falha - Nome com menos de três caracteres',
            nome: 'ab', email: 'ab@c.com', whatsapp: '11988887777',
            cep: '02417040', rua: 'Clóvis Cunha Canto', numero: '120',
            devePassar: false
        },
        {
            descricao: 'Falha - whatsapp com menos de 10 caracteres',
            nome: 'Robô cypress', email: 'robo@cypress.com', whatsapp: '119888777',
            devePassar: false
        },
        {
            descricao: 'Falha - whatsapp com menos de 10 caracteres',
            nome: 'Robô cypress', email: 'robo@cypress.com', whatsapp: '119888777777',
            devePassar: false
        }


    ];
});