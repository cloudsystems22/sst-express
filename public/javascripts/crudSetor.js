// window.onload = function (){

// };

//forma 1 
// seletor.addEventListener("click", function(){

// })

//forma 2
//seletor.onclick = function(){};


//requisição ajax por baixo do capo
let frmSetor = document.getElementById('formSetor')

frmSetor.addEventListener('submit', function(e){
    e.preventDefault();
    let bodyForm = {
        //id: 1,
        setores: frmSetor.setores.value,
        //descricao: (!frmSetor.descricao.value) ? frmSetor.descricao.value : '',
        //num_func_m: (!frmSetor.num_func_m.value) ? frmSetor.num_func_m.value : '',
        //num_func_f: (!frmSetor.num_func_f.value) ? frmSetor.num_func_f.value : '',
        clientes_id: frmSetor.clientes_id.value
    
    };
    insertSetor(bodyForm);

});

function creatSetorCol(e, setor){
    let flexStores = document.getElementById('flex-setores');
    
    let divColSetor = document.createElement('div');
    divColSetor.setAttribute('class', 'coluna-setor');
    divColSetor.setAttribute('id', 'col-setor-' + e);

    let cpsSetor = document.createElement('div');
    cpsSetor.setAttribute('class', 'capsula-setor');
    
    let row = document.createElement('div');
    row.setAttribute('class', 'row');

    let colmd9 = document.createElement('div');
    colmd9.setAttribute('class', 'col-md-9');

    let p = document.createElement('p');
    p.innerText = setor;

    let lnkEdit = document.createElement('a');
    lnkEdit.setAttribute('href', '#');
    lnkEdit.setAttribute('title', 'Editar Setor');
    lnkEdit.setAttribute('onclick', 'carregarSetor('+ e +')');

    let faEdit = document.createElement('i')
    faEdit.setAttribute('class', 'fas fa-edit');

    let lnkExcluSetor = document.createElement('a');
    lnkExcluSetor.setAttribute('href', '#');
    lnkExcluSetor.setAttribute('title', 'Excluir Setor');
    lnkExcluSetor.setAttribute('onclick', 'removSetor('+ e +')')

    let faTimes = document.createElement('i');
    faTimes.setAttribute('class', 'fas fa-times'); 

    let colmd3 = document.createElement('div');
    colmd3.setAttribute('class', 'col-md-3');

    let lnkNovoRisco = document.createElement('a');
    lnkNovoRisco.setAttribute('href', '#');
    lnkNovoRisco.setAttribute('title', 'Novo Risco');

    let plusCircle = document.createElement('i');
    plusCircle.setAttribute('class', 'fas fa-plus-circle'); 

    
    lnkEdit.appendChild(faEdit);
    lnkExcluSetor.appendChild(faTimes);
    lnkNovoRisco.appendChild(plusCircle);
    
    colmd3.appendChild(lnkNovoRisco);

    p.appendChild(lnkEdit);
    p.appendChild(lnkExcluSetor);

    colmd9.appendChild(p);

    row.appendChild(colmd9);
    row.appendChild(colmd3);
    cpsSetor.appendChild(row);
    divColSetor.appendChild(cpsSetor);
    flexStores.appendChild(divColSetor);

}

function insertSetor(b){
    //console.log(JSON.stringify(b));
    let settings = {
        method: "POST",
        headers: {
            //MIne-Types
            "Content-Type":"application/json",
            //"x-api-key":""
        },
        body: JSON.stringify(b)
    };
    
    fetch('/setores/create', settings)
        .then(function (response){
            return response.json();
        })
        .then(function(info) {
            //console.log(info);
            creatSetorCol(info.id, info.setores);
            let textSetor = document.getElementById('textSetor');
            textSetor.value = '';

        }).catch(function (error) {
            alert("Erro ao criar um novo setor" + error);
        });

}

function carregarSetor(e){
    let frmSetor = document.getElementById('formSetor');
    let setorId = { id: e };
    let settings = {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(setorId)
    };
    fetch('/setores/load', settings)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        //console.log(data[0].setores);
        frmSetor.setores.value = data[0].setores;
        let modalFooter = document.getElementById('modalFooter');
        let incluirSetor = document.getElementById('incluirSetor');
        modalFooter.removeChild(incluirSetor);

    }).catch(function (error){
        alert('Erro ao carregar setor!' + error)
    })
}

 
function removSetor(e){
    let frmSetor = document.getElementById('formSetor');
    let idSetor = {
        id:e,
        idCliente: frmSetor.clientes_id.value
    }

    if(window.confirm('Deseja excluir o setor ' + e + ' ?')){
        let settings = {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(idSetor)
        }
        fetch('/setores/delete', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            //console.log(dados);
            let flexSet = document.getElementById('flex-setores');
            let setor = document.getElementById('col-setor-' + e);
            flexSet.removeChild(setor);
        }).catch(function (error){
            alert("Erro ao apagar setor!" + error);
        })

    }

}


   