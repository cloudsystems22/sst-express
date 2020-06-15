function fechaBarra(e){
    let barraRisco = document.getElementById('brRiscos' + e);
    barraRisco.classList.toggle('visivel');

    let lstGrupoRisco = document.getElementById('lstgruposRisco'+e);
    lstGrupoRisco.innerText = '';

    let ulGRiscos = document.getElementById('ulGruposRisco' + e);
    ulGRiscos.innerText = '';
}
function barraRiscos(e){
    // var el = document.getElementById('cpsl-' + e);
    // var coordenadas = el.getBoundingClientRect();

    let barraRisco = document.getElementById('brRiscos' + e);
    barraRisco.classList.toggle('visivel');

    gruposRiscos(e);
    gruposAded(e);
    // barraRisco.style.top = (coordenadas.top - 56) + 'px';
    // barraRisco.style.left = (coordenadas.left - 241.99) + 'px';
    // console.log("top:" + coordenadas.top + " left:" + coordenadas.left );
}


function gruposRiscos(e){
    let settings = {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({})
    }
    fetch('/riscos/grupoRiscos', settings)
    .then(function (response){
        return response.json();
    })
    .then(function (dados){
        //console.log(dados);
        dados.forEach(element => {
            //console.log(element.tipo);
            let divlstGrupoRiscos = document.getElementById('lstgruposRisco' + e);
            
            if(element.tipo == 'Físicos'){
                let divBarraGrupos = document.createElement('div');
                divBarraGrupos.setAttribute('class', 'barra-grupos');
                divBarraGrupos.setAttribute('id', 'fisico'+e);
                let divRisco = document.createElement('div');
                divRisco.setAttribute('class', 'riscos-fisicos');
                let pRisco = document.createElement('p');
                pRisco.innerText = 'Riscos Físicos';
                
                divRisco.appendChild(pRisco);
                divBarraGrupos.appendChild(divRisco);
                divlstGrupoRiscos.appendChild(divBarraGrupos);
                listaRiscos('fisico', e, 'Físicos');
            }
            if(element.tipo == 'Químicos'){
                let divBarraGrupos = document.createElement('div');
                divBarraGrupos.setAttribute('class', 'barra-grupos');
                divBarraGrupos.setAttribute('id', 'quimico'+e);
                let divRisco = document.createElement('div');
                divRisco.setAttribute('class', 'riscos-quimicos');
                let pRisco = document.createElement('p');
                pRisco.innerText = 'Riscos Químicos';

                divRisco.appendChild(pRisco);
                divBarraGrupos.appendChild(divRisco);
                divlstGrupoRiscos.appendChild(divBarraGrupos);
                listaRiscos('quimico', e, 'Químicos');
            }
            if(element.tipo == 'Biológicos'){
                let divBarraGrupos = document.createElement('div');
                divBarraGrupos.setAttribute('class', 'barra-grupos');
                divBarraGrupos.setAttribute('id', 'biologico'+e);
                let divRisco = document.createElement('div');
                divRisco.setAttribute('class', 'riscos-biologico');
                let pRisco = document.createElement('p');
                pRisco.innerText = 'Riscos Biológicos';

                divRisco.appendChild(pRisco);
                divBarraGrupos.appendChild(divRisco);
                divlstGrupoRiscos.appendChild(divBarraGrupos);
                listaRiscos('biologico', e, 'Biológicos');
            }
            if(element.tipo == 'Ergonômicos'){
                let divBarraGrupos = document.createElement('div');
                divBarraGrupos.setAttribute('class', 'barra-grupos');
                divBarraGrupos.setAttribute('id', 'ergonomico'+e);
                let divRisco = document.createElement('div');
                divRisco.setAttribute('class', 'riscos-ergonomico');
                let pRisco = document.createElement('p');
                pRisco.innerText = 'Riscos Ergonômicos';

                divRisco.appendChild(pRisco);
                divBarraGrupos.appendChild(divRisco);
                divlstGrupoRiscos.appendChild(divBarraGrupos);
                listaRiscos('ergonomico', e, 'Ergonômicos');
            }
            if(element.tipo == 'Acidentes'){
                let divBarraGrupos = document.createElement('div');
                divBarraGrupos.setAttribute('class', 'barra-grupos');
                divBarraGrupos.setAttribute('id', 'acidente'+e);
                let divRisco = document.createElement('div');
                divRisco.setAttribute('class', 'riscos-acidentes');
                let pRisco = document.createElement('p');
                pRisco.innerText = 'Riscos Acidentes';

                divRisco.appendChild(pRisco);
                divBarraGrupos.appendChild(divRisco);
                divlstGrupoRiscos.appendChild(divBarraGrupos);
                listaRiscos('acidente', e, 'Acidentes');
            }


        });
    }).catch(function (error){
        alert('Erro ao carregar os grupos de risco! ' + error);
    })
    
}


function listaRiscos(grupo, e, filtro){
    let settings = {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify()
    }
    fetch('/riscos', settings)
    .then(function (response){
        return response.json();
    })
    .then(function (dados){
        let barraGrupo = document.getElementById(grupo+e);
        let listRiscos = dados.filter(r => r.tipo == filtro);
        let ulRiscos = document.createElement('ul');
        ulRiscos.setAttribute('class', 'lista-riscos');
        
        listRiscos.forEach(arrayRiscos => {
            let liRisco = document.createElement('li');
            liRisco.innerHTML = '<a href="#" id="linkRs'+ arrayRiscos.id +'" onclick="addRisco('+ arrayRiscos.id + ', '+ e +')"><i id="ico'+ arrayRiscos.id +'" class="fas fa-plus-circle"></i></a> ' + arrayRiscos.risco;
            ulRiscos.appendChild(liRisco);  

        })    
        barraGrupo.appendChild(ulRiscos);
      
    }).catch(function (error){
        alert("Erro ao carregar lista de riscos!" + error);
    })
}


function addRisco(e, s){
    let riscoSetor = {
        agentes_riscos_id:e,
        setores_id:s
    }

    let settings = {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(riscoSetor)
    }
    fetch('/gerencRiscos/create', settings)
    .then(function (response){
        return response.json();
    })
    .then(function (dados){
        //console.log(dados);
        gruposAded(s);
        // a.style.textDecoration = 'none';
        // i.setAttribute('class', 'fas fa-minus-circle');
        // i.style.color = '#696868';
    }).catch(function (error){
        alert('Erro ao carregar risco! ' + error);
    })
    //alert("Clicou em: " + e);
}

function gruposAded(e){
    // console.log(e)
    let settings = {
        method:'POST',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({setores_id:e})
    }
    fetch('/gerencRiscos/grupos', settings)
    .then(function (response){
        return response.json();
    })
    .then(function (dados){
        // console.log(dados);
        let ulGRiscos = document.getElementById('ulGruposRisco' + e);
        ulGRiscos.innerText = '';
        dados.forEach(element => {
            listGroupRiscos(element.setores_id, element.agentes_riscos.tipo);
        })
    })
}


function listGroupRiscos(e, tipo){
    let ul = document.getElementById('ulGruposRisco' + e);
    let liGrupo = document.createElement('li');
   
    let divGrupo = document.createElement('div');
    divGrupo.setAttribute('class', 'row div-gruporisco');

    let lnk = document.createElement('a');
    lnk.setAttribute('href', '#');
        
    let icoG = document.createElement('i');
    icoG.setAttribute('class', 'fas fa-chevron-circle-up');
    
    let divLiGrupo = document.createElement('div');
    let grupo;
    if(tipo == "Físicos"){
        grupo = 'fisico';
        liGrupo.setAttribute('id', 'G'+grupo+e);
        divLiGrupo.innerText = 'Físicos';
        icoG.setAttribute('id', 'icoG'+grupo+e)
        lnk.setAttribute('onclick', 'collapseListRisco("'+ 'ulG' + grupo + e +'", "'+grupo+e+'")')
        divLiGrupo.setAttribute('class', 'li-'+ grupo)
        divLiGrupo.setAttribute('id', 'li-' + grupo + e)
        riscosAded(e, 'G'+grupo+e, tipo)
    }
    if(tipo == "Químicos"){
        grupo = 'quimico';
        liGrupo.setAttribute('id', 'G'+grupo+e);
        divLiGrupo.innerText = 'Químicos';
        icoG.setAttribute('id', 'icoG'+grupo+e)
        lnk.setAttribute('onclick', 'collapseListRisco("'+ 'ulG' + grupo + e +'", "'+grupo+e+'")')
        divLiGrupo.setAttribute('class', 'li-'+ grupo)
        divLiGrupo.setAttribute('id', 'li-' + grupo + e)
        riscosAded(e, 'G'+grupo+e, tipo)
    }
    if(tipo == "Biológicos"){
        grupo = 'biologico';
        liGrupo.setAttribute('id', 'G'+grupo+e);
        divLiGrupo.innerText = 'Biológicos';
        icoG.setAttribute('id', 'icoG'+grupo+e)
        lnk.setAttribute('onclick', 'collapseListRisco("'+ 'ulG' + grupo + e +'", "'+grupo+e+'")')
        divLiGrupo.setAttribute('class', 'li-'+ grupo)
        divLiGrupo.setAttribute('id', 'li-' + grupo + e)
        riscosAded(e, 'G'+grupo+e, tipo)
    }
    if(tipo == "Ergonômicos"){
        grupo = 'ergonomico';
        liGrupo.setAttribute('id', 'G'+grupo+e);
        divLiGrupo.innerText = 'Ergonômicos';
        icoG.setAttribute('id', 'icoG'+grupo+e)
        lnk.setAttribute('onclick', 'collapseListRisco("'+ 'ulG' + grupo + e +'", "'+grupo+e+'")')
        divLiGrupo.setAttribute('class', 'li-'+ grupo)
        divLiGrupo.setAttribute('id', 'li-' + grupo + e)
        riscosAded(e, 'G'+grupo+e, tipo)
    }
    if(tipo == "Acidentes"){
        grupo = 'acidente';
        liGrupo.setAttribute('id', 'G'+grupo+e);
        divLiGrupo.innerText = 'Acidentes';
        icoG.setAttribute('id', 'icoG'+grupo+e)
        lnk.setAttribute('onclick', 'collapseListRisco('+ 'ulG' + grupo + e +', "'+grupo+e+'")')
        divLiGrupo.setAttribute('class', 'li-'+ grupo)
        divLiGrupo.setAttribute('id', 'li-' + grupo + e)
        riscosAded(e, 'G'+grupo+e, tipo)
    }
    
    let grupoFExist = document.getElementById('li-fisico' + e);
    let grupoQExist = document.getElementById('li-quimico' + e);
    let grupoEExist = document.getElementById('li-ergonomico' + e);
    let grupoBExist = document.getElementById('li-biologico' + e);
    let grupoAExist = document.getElementById('li-acidente' + e);

    if(grupoFExist == null){
        lnk.appendChild(icoG);
        divGrupo.appendChild(lnk);
        divGrupo.appendChild(divLiGrupo);
        liGrupo.appendChild(divGrupo);
        ul.appendChild(liGrupo);
        grupoFExist = document.getElementById('li-fisico' + e);
    }
    else if(grupoQExist == null){
        lnk.appendChild(icoG);
        divGrupo.appendChild(lnk);
        divGrupo.appendChild(divLiGrupo);
        liGrupo.appendChild(divGrupo);
        ul.appendChild(liGrupo);
        grupoQExist = document.getElementById('li-quimico' + e);
    }
    else if(grupoEExist == null){
        lnk.appendChild(icoG);
        divGrupo.appendChild(lnk);
        divGrupo.appendChild(divLiGrupo);
        liGrupo.appendChild(divGrupo);
        ul.appendChild(liGrupo);
        grupoQExist = document.getElementById('li-ergonomico' + e);
    }
    else if(grupoBExist == null){
        lnk.appendChild(icoG);
        divGrupo.appendChild(lnk);
        divGrupo.appendChild(divLiGrupo);
        liGrupo.appendChild(divGrupo);
        ul.appendChild(liGrupo);
        grupoQExist = document.getElementById('li-biologico' + e);
    }
    else if(grupoAExist == null){
        lnk.appendChild(icoG);
        divGrupo.appendChild(lnk);
        divGrupo.appendChild(divLiGrupo);
        liGrupo.appendChild(divGrupo);
        ul.appendChild(liGrupo);
        grupoQExist = document.getElementById('li-acidente' + e);
    }

}

function riscosAded(e, i, filtro){
    //console.log('setor: ' + e + ' li: ' + i + ' risco: ' + filtro)
    let settings = {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({setores_id:e, tipo:filtro})
    }
    fetch('/gerencRiscos/agentes', settings)
    .then(function (response){
        return response.json();
    })
    .then(function (dados){
        console.log(dados);
        let liGRiscos = document.getElementById(i);
        let ulRiscos = document.createElement('ul');
        ulRiscos.setAttribute('class', 'lista-risco');
        ulRiscos.setAttribute('id', 'ul'+i)
        
        // let listRiscos = dados.filter(r => r.agentes_riscos.tipo == filtro);
        // console.log(listRiscos);

        dados.forEach(arrayRiscos => {
            let liRisco = document.createElement('li');
            liRisco.setAttribute('id', arrayRiscos.id);
            liRisco.innerHTML = '<a href="#"><i class="fas fa-minus-circle"></i></a>' + arrayRiscos.agentes_riscos.risco;
            ulRiscos.appendChild(liRisco);
        })
        liGRiscos.appendChild(ulRiscos);
        //console.log(dados);
    }).catch(function (error){
        alert("Erro ao carregar risco adicionado! " + error);
    })

}

function collapseListRisco(e, i){
    let lstRisco = document.getElementById(e);
    lstRisco.classList.toggle('collapse');

    let eff = lstRisco.classList.value;
    let icog = document.getElementById('icoG'+i);
    console.log(eff);
    if(eff == 'lista-risco collapse'){
        icog.setAttribute('class', 'fas fa-chevron-circle-down');
    } else if(eff == 'lista-risco'){
        icog.setAttribute('class', 'fas fa-chevron-circle-up')
    }
}

function apagarRisco(e){
    let settings = {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id:e})
    }
    fetch('/gerencRiscos/delete', settings)
    .then(function (response) {
        return response.json();
    })
    .then(function (dados){
        let ul = document.getElementById('ulGruposRisco' + e);

    }).catch(function (error){
        alert("Erro ao deletar esse risco! " + error);
    })
}