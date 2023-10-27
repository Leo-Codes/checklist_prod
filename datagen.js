var apartamentos = [];

for (var torre =1; torre <= 2; torre++) {
    console.log('looptorre:' + torre);
    var torreLetra = torre == 1 ? 'A' : 'B';

    for (var andar = 1; andar <= 15; andar++) {
        for (var numero = 1; numero <= 4; numero++) {
            var apartamento = andar * 10 + numero + torreLetra;
            var ambiente = [
                { ambiente: 'cozinha', piso: 'pendente', parede: 'pendente' },
                { ambiente: 'A.S', piso: 'pendente', parede: 'pendente' },
                { ambiente: 'sacada', piso: 'pendente' },
                { ambiente: 'lavabo', piso: 'pendente', parede: 'pendente' },
                { ambiente: 'WC Social', piso: 'pendente', parede: 'pendente' },
                { ambiente: 'WC Suíte', piso: 'pendente', parede: 'pendente' }
            ];

            apartamentos.push({ apartamento: apartamento, detalhes: ambiente });
        }
    }
    
}

console.log(apartamentos);
var jsonData = JSON.stringify(apartamentos, null, 2); // O segundo argumento (null) e o terceiro argumento (2) são usados para formatar o JSON para legibilidade.

// Criar um novo Blob com o conteúdo JSON
var blob = new Blob([jsonData], { type: "application/json" });

// Criar um URL temporário para o Blob
var url = URL.createObjectURL(blob);

// Criar um elemento 'a' para fazer o download do arquivo JSON
var a = document.createElement("a");
a.href = url;
a.download = "apartamentos.json";
a.textContent = "Clique aqui para baixar o arquivo JSON";

// Adicionar o elemento 'a' à página
document.body.appendChild(a);

// Clique no link para iniciar o download
a.click();

// Remover o elemento 'a' após o download
document.body.removeChild(a);

// Revogar o URL temporário
URL.revokeObjectURL(url);