// Garante que o script só rode após o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const cepInput = document.getElementById('cep');

    console.log("Sistema Everest iniciado. Aguardando interações...");

    // 1. LÓGICA DE BUSCA DE CEP (VIACEP)
    if (cepInput) {
        cepInput.addEventListener('blur', function () {
            const cep = this.value.replace(/\D/g, '');

            if (cep.length === 8) {
                console.log("Buscando CEP:", cep);
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            document.getElementById('logradouro').value = data.logradouro;
                            document.getElementById('bairro').value = data.bairro;
                            document.getElementById('cidade').value = data.localidade;
                            document.getElementById('numero').focus();
                        } else {
                            alert('CEP não encontrado.');
                        }
                    })
                    .catch(err => console.error('Erro na API ViaCEP:', err));
            }
        });
    }

    // 2. LÓGICA DE ENVIO DO FORMULÁRIO
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            // 1. Captura o botão e salva o texto original
            const btnSubmit = document.querySelector('[data-cy="btn-submit"]');
            const btnTextoOriginal = btnSubmit.innerHTML;

            // 2. Aplica o estado de "Loading" (Trava o botão)
            btnSubmit.disabled = true;
            btnSubmit.innerHTML = 'Enviando... <span class="animate-pulse">⏳</span>';
            btnSubmit.classList.add('opacity-50', 'cursor-wait');

            const formData = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                whatsapp: document.getElementById('whatsapp').value,
                cep: document.getElementById('cep').value,
                logradouro: document.getElementById('logradouro').value,
                numero: document.getElementById('numero').value,
                bairro: document.getElementById('bairro').value,
                cidade: document.getElementById('cidade').value
            };

            try {
                const response = await fetch('https://everest-backend-fs5k.onrender.com/enviar-lead', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert('Sucesso! Recebemos seu interesse.');
                    form.reset();
                } else {
                    alert('Erro no servidor: ' + result.message);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Erro: Não foi possível conectar ao backend. Verifique a conexão.');
            } finally {
                // 3. Libera o botão novamente, independentemente de dar erro ou sucesso
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = btnTextoOriginal;
                btnSubmit.classList.remove('opacity-50', 'cursor-wait');
            }
        });
    };
});