
function fechaBarra(e){
    let barraRisco = document.getElementById('brRiscos' + e);
    barraRisco.classList.toggle('visivel');

    let lstGrupoRisco = document.getElementById('lstgruposRisco'+e);
    lstGrupoRisco.innerText = '';
}
function barraRiscos(e){
    // var el = document.getElementById('cpsl-' + e);
    // var coordenadas = el.getBoundingClientRect();

    let barraRisco = document.getElementById('brRiscos' + e);
    barraRisco.classList.toggle('visivel');

    gruposRiscos(e);

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
    let a = document.getElementById('linkRs'+e);
    let i = document.getElementById('ico'+e);
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
        dados.forEach(element => {
            listGroupRiscos(element.setores_id, element.agentes_riscos.tipo);
        })
    })
}


function listGroupRiscos(e, tipo){
    console.log('Setor: ' + e + ' grupo: ' + tipo);
    let ul = document.getElementById('ulGruposRisco' + e);
    let liGrupo = document.createElement('li');
   
    let divGrupo = document.createElement('div');
    divGrupo.setAttribute('class', 'row div-gruporisco');

    let lnk = document.createElement('a');
    lnk.setAttribute('href', '#');
    
    let icoG = document.createElement('i');
    icoG.setAttribute('class', 'fas fa-chevron-circle-down');
    
    let divLiGrupo = document.createElement('div');
    let grupo;
    if(tipo == "Físicos"){
        grupo = 'fisico';
        divLiGrupo.innerText = 'Físicos';
        divLiGrupo.setAttribute('class', 'li-'+ grupo)
    }
    if(tipo == "Químicos"){
        grupo = 'quimico';
        divLiGrupo.innerText = 'Químicos';
        divLiGrupo.setAttribute('class', 'li-'+ grupo)
    }
    lnk.setAttribute('onclick', 'collapseListRisco('+ grupo +')');

    let grupoFExist = document.querySelector('.li-fisico');
    let grupoQExist = document.querySelector('.li-quimico');

    if(!grupoFExist){
        lnk.appendChild(icoG);
        divGrupo.appendChild(lnk);
        divGrupo.appendChild(divLiGrupo);
        liGrupo.appendChild(divGrupo);
        ul.appendChild(liGrupo);
    }
    if(!grupoQExist){
        lnk.appendChild(icoG);
        divGrupo.appendChild(lnk);
        divGrupo.appendChild(divLiGrupo);
        liGrupo.appendChild(divGrupo);
        ul.appendChild(liGrupo);
    }

}

function collapseListRisco(e){
    let lstRisco = document.getElementById(e);
    lstRisco.classList.toggle('collapse');
    let eff = lstRisco.classList.value;
    let icog = document.getElementById('icoG'+e);
    if(eff){
        icog.setAttribute('class', 'fas fa-chevron-circle-down');
    } else{
        icog.setAttribute('class', 'fas fa-chevron-circle-up')
    }
}