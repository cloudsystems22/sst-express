document.addEventListener('load', function (){
    alert("!")
    let data = document.getElementById('dateGes').value;
    
    let riscosGes;
})

function abrirPlanRiscos(e){
    document.getElementById('planRisco'+e).classList.toggle('visivel');
}

function incluirGes(e){
    let riscoGer = {
       data: document.getElementById('dateGes').value,
       fase: document.getElementById('faseGes').value,
       agentes_riscos_id: document.getElementById('hddAgRisc').value,
       danos: document.getElementById('inputDanos' + e).value,
       descr_risco: document.getElementById('inputDescrRiscos' + e).value,
       lim_expo: document.getElementById('inputLimExp' + e).value,
       fonte_geradora: document.getElementById('inputFont' + e).value,
       intensidade: document.getElementById('inputInts' + e).value,
       tecnica_util: document.getElementById('slcTecnica' + e).value,
       pequ: document.getElementById('slcPequ' + e).value,
       grand: document.getElementById('slcGrand' + e).value,
       risco: document.getElementById('slcRisc' + e).value,
       in: document.getElementById('inputIn' + e).value,
       defin_acoes: document.getElementById('inputDefAc' + e).value,
       monitoramento: document.getElementById('inputMonit' + e).value,
       setores_riscos_id: e
    };
    let settings = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(riscoGer)
    }
    fetch('/gerencriscos/create', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            console.log(dados);
            
            // document.getElementById('setor-'+ e).innerText = dados[0].setores;
            // let setorDetail = document.getElementById('detailSetor' + e);
            // setorDetail.classList.toggle('visivel');
            
        }).catch(function (error){
            alert("Erro ao apagar setor!" + error);
        })
}

function carregaRisco(dt, setId){
    let settings = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({data:dt, setores_id: setId})
    }
    fetch('/gerencriscos/carrega', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            riscosGes = dados;
            //console.log(riscosGes.filter(r => r.setores_riscos.agentes_riscos_id == 2));
            console.log(riscosGes);
            dados.forEach(r => {
                let id = r.setores_riscos.id;
                riscosInputs(id);
            })

        }).catch(function (error){
            alert("Erro ao apagar setor!" + error);
        })
}

function riscosInputs(id){
    console.log(id);
    let risco = riscosGes.filter(r => r.setores_riscos.id == id);
    //console.log(riscosGes.filter(r => r.setores_riscos.id == id));
    console.log(risco);
    document.getElementById('inputDescrRiscos' + id).value = risco[0].descr_risco;
    console.log(document.getElementById('inputDescrRiscos' + id));
    document.getElementById('inputDanos' + id).value = risco[0].danos;

}

let dataGes = document.getElementById('dateGes');
dataGes.addEventListener('change', function() {
    let valData = document.getElementById('dateGes').value;
    let setId = document.getElementById('hddSetorId').value;
    carregaRisco(valData, setId);
})