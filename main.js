var apartamentos = [];

async function get_apartamentos() {
    let response = await fetch("database/manager.php", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            operation: "fetch",
        }),
    });

    response.json().then((data) => {
        apartamentos = JSON.parse(data);
        renderList();
    })
}

async function renderList() {
    let render_root = document.getElementById('render-root');

    for (let i = 0; i < apartamentos.length; i++) {
        let apartamento = apartamentos[i].apartamento;

        let cozinha = apartamentos[i].detalhes[0];
        let cozinha_piso = apartamentos[i].detalhes[0].piso;
        let cozinha_parede = apartamentos[i].detalhes[0].parede;

        let apto_element = `<div class="apto" id="${apartamento}">
        <div class="apto-info">
            <div class="apto-nmr">
                <span>${apartamento}</span>
            </div>
            <div class="apto-info-item">
                <span>| <strong>Projeto: </strong>Padrão</span>
            </div>
            <div class="apto-info-item">
                | <strong>Revestimento: </strong>Padrão
            </div>
            <div class="apto-info-item">
                | <strong>Marmoraria: </strong>Padrão
            </div>
        </div>
        <div class="apto-items">
            <div class="ambiente" name="Cozinha">
                <div class="ambiente-title">
                    <span>Cozinha</span>
                </div>
                <div class="ambiente-items">
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[0].parede}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[0].ambiente}" data-item_name="parede">
                        <span>parede</span>
                    </div>
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[0].piso}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[0].ambiente}" data-item_name="piso">
                        <span>piso</span>
                    </div>

                </div>
            </div>
            <div class="ambiente" name="A.S">
                <div class="ambiente-title">
                    <span>A.S</span>
                </div>
                <div class="ambiente-items">
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[1].parede}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[1].ambiente}" data-item_name="parede">
                        <span>parede</span>
                    </div>
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[1].piso}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[1].ambiente}" data-item_name="piso">
                        <span>piso</span>
                    </div>

                </div>
            </div>
            <div class="ambiente" name="Sacada">
                <div class="ambiente-title">
                    <span>Sacada</span>
                </div>
                <div class="ambiente-items">
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[2].piso}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[2].ambiente}" data-item_name="piso">
                        <span>piso</span>
                    </div>
                </div>
            </div>
            <div class="ambiente" name="Lavabo">
                <div class="ambiente-title">
                    <span>Lavabo</span>
                </div>
                <div class="ambiente-items">
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[3].piso}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[3].ambiente}" data-item_name="piso">
                        <span>piso</span>
                    </div>
                </div>
            </div>
            <div class="ambiente" name="WC Social">
                <div class="ambiente-title">
                    <span>WC Social</span>
                </div>
                <div class="ambiente-items">
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[4].parede}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[4].ambiente}" data-item_name="parede">
                        <span>parede</span>
                    </div>
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[4].piso}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[4].ambiente}" data-item_name="piso">
                        <span>piso</span>
                    </div>

                </div>
            </div>
            <div class="ambiente" name="WC Suite">
                <div class="ambiente-title">
                    <span>WC Suite</span>
                </div>
                <div class="ambiente-items">
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[5].parede}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[5].ambiente}" data-item_name="parede">
                        <span>parede</span>
                    </div>
                    <div class="ambiente-item" data-status="${apartamentos[i].detalhes[5].piso}" data-apto_id="${i}" data-ambiente_name="${apartamentos[i].detalhes[5].ambiente}" data-item_name="piso">
                        <span>piso</span>
                    </div>

                </div>
            </div>
        </div>
    </div>`

    render_root.innerHTML += apto_element;

    }
    config_buttons();
}

function config_buttons() {
    let buttons = document.getElementsByClassName('ambiente-item');
    Array.from(buttons).forEach((buttom)=>{
        let start_status = buttom.getAttribute('data-status');
        if(start_status == 'OK'){
            let status = buttom.getAttribute('data-status');
            buttom.style.backgroundColor = '#30c500';
        }
        buttom.addEventListener('click',()=>{
            let status = buttom.getAttribute('data-status');
            let apto_id = buttom.getAttribute('data-apto_id');
            let ambiente_name = buttom.getAttribute('data-ambiente_name');
            let item_name = buttom.getAttribute('data-item_name');
            console.log('status: ' + status + ' apto_id: ' + apto_id +' ambiente_name: ' + ambiente_name + ' item_name: ' + item_name);

            let item_index = 0;
            switch (ambiente_name) {
                case 'cozinha': item_index = 0; break;
                case 'A.S': item_index = 1; break;
                case 'sacada': item_index = 2; break;
                case 'lavabo': item_index = 3; break;
                case 'WC Social': item_index = 4; break;
                case 'WC Suíte': item_index = 5; break;

            }
            if(status=='pendente'){
                switch (item_name) {
                    case 'piso': apartamentos[apto_id].detalhes[item_index].piso ='OK'; break;
                    case 'parede': apartamentos[apto_id].detalhes[item_index].parede ='OK'; break;
                }
                buttom.style.backgroundColor = '#30c500';

            }else{
                switch (item_name) {
                    case 'piso': apartamentos[apto_id].detalhes[item_index].piso ='pendente'; break;
                    case 'parede': apartamentos[apto_id].detalhes[item_index].parede ='pendente'; break;
                }
                buttom.style.backgroundColor = 'red';

            }

            post_json();
            
        })
    })
}

async function post_json() {
    let new_json = JSON.stringify(apartamentos);
    let response = await fetch("database/manager.php", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            operation: "update",
            updatedJson: new_json,
        }),
    });

    response.json().then((data) => {
        console.log(data);
    })
}


get_apartamentos();
// renderList();