const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Configuração de CORS (Essencial para o deploy Vercel + Render)
app.use(cors());
app.use(express.json());

// Rota para receber os leads (Task #2: Formulário com Endereço)
app.post('/enviar-lead', (req, res) => {
    const { 
        nome, 
        email, 
        whatsapp, 
        cep, 
        logradouro, 
        numero, 
        bairro, 
        cidade 
    } = req.body;

    // Log de QA: Validando se os dados chegaram completos
    console.log('--- NOVO LEAD RECEBIDO ---');
    console.log(`Cliente: ${nome} | E-mail: ${email}`);
    console.log(`Contato: ${whatsapp}`);
    console.log(`Endereço: ${logradouro}, ${numero} - ${bairro}, ${cidade} (CEP: ${cep})`);
    console.log('---------------------------');

    // Simulação de Validação (QA Mindset)
    if (!nome || !email || !whatsapp || !cep) {
        return res.status(400).json({ 
            success: false, 
            message: 'Erro: Campos obrigatórios ausentes.' 
        });
    }

    // Aqui futuramente integraremos com o PostgreSQL ou serviço de E-mail
    // Por enquanto, enviamos sucesso para o Frontend
    res.status(200).json({ 
        success: true, 
        message: 'Lead recebido com sucesso! O cálculo de frete será enviado em breve.' 
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Pronto para receber leads do projeto Everest.`);
});