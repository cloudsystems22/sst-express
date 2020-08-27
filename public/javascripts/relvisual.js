let relatorioGro = document.getElementById('relatorio-gro');
let meses = [
    'jan', 'fev', 'mar', 'abr', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'
]
function groInicio(){
    
    let settings = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
        }
        //body:{}
    }
    fetch('/relavisual/groinicio', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            //dados = JSON.parse(dados);
            //console.log(dados);
            
            dados.forEach(g => {
                let tr = document.createElement('tr');
                // let tdid = document.createElement('td');
                let tddata = document.createElement('td');
                let tdsetor = document.createElement('td');
                let tdareas = document.createElement('td');
                let tdatividade = document.createElement('td');
                let tdconsequ = document.createElement('td');
                let tdg = document.createElement('td');
                let tdp = document.createElement('td');
                let tdgxp = document.createElement('td');
                let tdrisco = document.createElement('td');
                let tdpsfi = document.createElement('td');
                let tdcorrec = document.createElement('td');

                // tdid.innerText = g.id;
                let data = new Date(g.data);
                let m = data.getMonth();
                tddata.innerText = meses[m];
                tdsetor.innerText = g.setores_riscos.Setores.setores;
                tdareas.innerText = g.fase;
                tdatividade.innerText = g.setores_riscos.Setores.descricao;
                tdconsequ.innerText = g.danos;
                tdg.innerText = g.grand;
                tdp.innerText = g.pequ;
                tdgxp.innerText = g.risco;
                tdrisco.innerText = g.setores_riscos.agentes_riscos.risco;
                tdpsfi.innerText = g.defin_acoe;
                tdcorrec.innerText = g.monitoramento;
                
                // tr.appendChild(tdid);
                tr.appendChild(tddata);
                tr.appendChild(tdsetor);
                tr.appendChild(tdareas);
                tr.appendChild(tdatividade);
                tr.appendChild(tdrisco);
                tr.appendChild(tdconsequ);
                tr.appendChild(tdg);
                tr.appendChild(tdp);
                tr.appendChild(tdgxp);
                tr.appendChild(tdpsfi);
                tr.appendChild(tdcorrec);
                relatorioGro.appendChild(tr);
            })
 
        }).catch(function (error){
            alert("Erro ao carregar relatório!" + error);
        })
}
groInicio();

function clienteSetores(){
    let settings = {
        method: "GET",
        headers:{
            "Content-Type":"application/json",
        }
        //body:{}
    }
    fetch('/relavisual/clienteSetor', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            //dados = JSON.parse(dados);
            console.log(dados);
                        
        }).catch(function (error){
            alert("Erro ao carregar relatório!" + error);
        })
}
clienteSetores();