const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API Everest banheiras rodando 100%' })
});

// Rota principal
app.post('/api/leads', (req, res) => {
    const { nome, telefone, email, modelo } = req.body;

    // Simulando o recebimento no terminal
    console.log(`🎯 [NOVO LEAD] Nome: ${nome} | whatsapp: ${telefone} | email: ${email} | modelo: ${modelo}`)

    /* Aqui no futuro entrará o código nodemailer para disparar o email
    ...
    */
   
    // Resposta de sucesso para o frontend
    res.status(200).json({
        success: true,
        message: 'Lead capturado com sucesso, entraremos em contato!'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor da Everest banheira rodando na porta ${PORT}`);
});
