window.addEventListener('load', function (){
    let data = document.getElementById('dateGes').value;
    let idsetor = document.getElementById('hddSetorId').value;
    let riscosGes;

    carregaRisco(data, idsetor);
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
            //let risco = dados.filter(r => r.setores_riscos.id == id);
            if(dados){
                let idSet = dados[0].setores_riscos_id;
                let id = dados[0].id;
                console.log(idSet);
                let tdbtns = document.getElementById('tdBtns' + idSet);
                let hddIdGes = document.getElementById('hddIdGes' + idSet);
                hddIdGes.setAttribute('value', id);
                tdbtns.innerText = '';
                let link = document.createElement('a');
                link.setAttribute('href', '#');
                link.setAttribute('onclick', 'atualizarRiscoGes('+ idSet +')');
                link.innerHTML = '<i class="fas fa-sync-alt"></i>';
                tdbtns.appendChild(link);
            }
            //console.log(riscosGes.filter(r => r.setores_riscos.id == id));
            
            
        }).catch(function (error){
            alert("Erro ao carregar risco! " + error);
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
            //console.log(dados);
            if(dados.length > 0){
                riscosGes = dados;
                dados.forEach(r => {
                    let id = r.setores_riscos.id;
                    riscosInputs(id);
                })
            } else {
               limpaCampos();
            }
            //console.log(riscosGes.filter(r => r.setores_riscos.agentes_riscos_id == 2));
            //console.log(riscosGes);
            

        }).catch(function (error){
            alert("Erro ao criar GES!" + error);
        })
}

function riscosInputs(id){
    console.log(id);
    let risco = riscosGes.filter(r => r.setores_riscos.id == id);
    if(risco.length > 0){
        let tdbtns = document.getElementById('tdBtns' + id);
        tdbtns.innerText = '';
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('onclick', 'atualizarRiscoGes('+ id +')');
        link.innerHTML = '<i class="fas fa-sync-alt"></i>';
        tdbtns.appendChild(link);

        document.getElementById('hddIdGes' + id).value = risco[0].id;
        document.getElementById('inputDescrRiscos' + id).value = risco[0].descr_risco;
        document.getElementById('inputDanos' + id).value = risco[0].danos;
        document.getElementById('inputLimExp' + id).value = risco[0].lim_expo;
        document.getElementById('inputFont' + id).value = risco[0].fonte_geradora;
        document.getElementById('inputInts' + id).value = risco[0].intensidade;
        
        document.getElementById('slcTecnica' + id).value = risco[0].tecnica_util;
        document.getElementById('slcPequ' + id).value = risco[0].pequ;
        document.getElementById('slcGrand' + id).value = risco[0].grand;
        document.getElementById('slcRisc' + id).value = risco[0].risco;
    
        document.getElementById('inputIn' + id).value = risco[0].inn;
        document.getElementById('inputDefAc' + id).value = risco[0].defin_acoe;
        document.getElementById('inputMonit' + id).value = risco[0].monitoramento;
    } else {
      
    }
    //console.log(riscosGes.filter(r => r.setores_riscos.id == id));
   

}

function limpaCampos(id){
    document.getElementById('hddIdGes' + id).value = '';
    document.getElementById('inputDescrRiscos' + id).value = '';
    document.getElementById('inputDanos' + id).value = '';
    document.getElementById('inputLimExp' + id).value = '';
    document.getElementById('inputFont' + id).value = '';
    document.getElementById('inputInts' + id).value = '';
    
    document.getElementById('slcTecnica' + id).value = '';
    document.getElementById('slcPequ' + id).value = '';
    document.getElementById('slcGrand' + id).value = '';
    document.getElementById('slcRisc' + id).value = '';

    document.getElementById('inputIn' + id).value = '';
    document.getElementById('inputDefAc' + id).value = '';
    document.getElementById('inputMonit' + id).value = '';
}

let dataGes = document.getElementById('dateGes');
dataGes.addEventListener('change', function() {
    let valData = document.getElementById('dateGes').value;
    let setId = document.getElementById('hddSetorId').value;
    carregaRisco(valData, setId);
})

function atualizarRiscoGes(id){
    let riscoGer = {
        id: document.getElementById('hddIdGes' + id).value,
        data: document.getElementById('dateGes').value,
        fase: document.getElementById('faseGes').value,
        agentes_riscos_id: document.getElementById('hddAgRisc').value,
        danos: document.getElementById('inputDanos' + id).value,
        descr_risco: document.getElementById('inputDescrRiscos' + id).value,
        lim_expo: document.getElementById('inputLimExp' + id).value,
        fonte_geradora: document.getElementById('inputFont' + id).value,
        intensidade: document.getElementById('inputInts' + id).value,
        tecnica_util: document.getElementById('slcTecnica' + id).value,
        pequ: document.getElementById('slcPequ' + id).value,
        grand: document.getElementById('slcGrand' + id).value,
        risco: document.getElementById('slcRisc' + id).value,
        inn: document.getElementById('inputIn' + id).value,
        defin_acoe: document.getElementById('inputDefAc' + id).value,
        monitoramento: document.getElementById('inputMonit' + id).value,
        setores_riscos_id: id
    }
    //console.log(riscoGer);
    let settings = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(riscoGer)
    }
    fetch('/gerencriscos/update', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            console.log(dados);
            
            // document.getElementById('setor-'+ e).innerText = dados[0].setores;
            // let setorDetail = document.getElementById('detailSetor' + e);
            // setorDetail.classList.toggle('visivel');
            
        }).catch(function (error){
            alert("Erro ao atualizar GES!" + error);
        })
}