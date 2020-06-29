document.addEventListener('load', function (){
    let data = document.getElementById('dateGes').value;
    
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
        body:JSON.stringify({data:dt, setores_riscos_id: setId})
    }
    fetch('/gerencriscos/carrega', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            console.log(dados);
            
        }).catch(function (error){
            alert("Erro ao apagar setor!" + error);
        })
}