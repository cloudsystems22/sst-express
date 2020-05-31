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

// function creatSetorCol(e, setor){
//     let flexStores = document.getElementById('fle-setores');
//     let divColSetor = document.createElement('div');
//     divColSetor.setAttribute('class', 'coluna-setor');
//     divColSetor.setAttribute('id', 'col-setor-' + e);

//     let cpsSetor = document.createElement('div');
//     cpsSetor.setAttribute('class', 'capsula-setor');
    
//     let row = document.createElement('div');
//     row.setAttribute('class', 'row');

//     let colmd9 = document.createElement('div');
//     colmd9.setAttribute('class', 'col-md-9');

//     let p = document.createElement('p');
//     p.innerText = setor;

//     let lnkEdit = document.createElement('a');
//     lnkEdit.setAttribute('href', '#');
//     lnkEdit.setAttribute('title', 'Editar Setor');

//     let faEdit = document.createElement('i')
//     faEdit.setAttribute('class', 'fas fa-edit');

//     let lnkExcluSetor = document.createElement('a');
//     lnkExcluSetor.setAttribute('href', '#');
//     lnkExcluSetor.setAttribute('title', 'Excluir Setor');

//     let plusCircle = document.createElement('i')
//     plusCircle.setAttribute('class', 'fas fa-times');

//     lnkEdit.appendChild(faEdit);
//     lnkExcluSetor.appendChild(plusCircle);
//     p.appendChild(lnkEdit);
//     p.appendChild(lnkExcluSetor);
//     colmd9.appendChild(p);
//     row.appendChild(colmd9);
//     cpsSetor.appendChild(row);
//     divColSetor.appendChild(cpsSetor);


//     let colmd3 = document.createElement('div');
//     colmd3.setAttribute('class', 'col-md-3');

//     let lnkNovoRisco = document.createElement('a');
//     lnkNovoRisco.setAttribute('href', '#');
//     lnkNovoRisco.setAttribute('title', 'Novo Risco');

//     let plusCircle = document.createElement('i')
//     plusCircle.setAttribute('class', 'fas fa-plus-circle');

//     lnkNovoRisco.appendChild(plusCircle);
//     colmd3.appendChild(lnkNovoRisco);

//     row.appendChild(colmd3);

//     flexStores.appendChild(colmd9);
//     flexStores.appendChild(colmd3);

// }

function insertSetor(b){
    console.log(JSON.stringify(b));
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
            console.log(info);
            //creatSetorCol(info.id, info.setores)
        }).catch(function (error) {
            alert(error);
        });

}

 
function removSetor(e){
    let frmSetor = document.getElementById('formSetor');
    let idSetor = {
        id:e,
        idCliente: frmSetor.clientes_id.value
    }

    if(window.confirm('Deseja excluir o setor ' + e + ' ?')){
        let settings = {
            method: "POST",
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
            console.log(dados);
            let flexSet = document.getElementById('flex-setores');
            let setor = document.getElementById('col-setor-' + e);
            flexSet.removeChild(setor);
        }).catch(function (error){
            alert(error);
        })

    }

}


   