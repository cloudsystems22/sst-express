// window.onload = function (){

// };

//forma 1 
// seletor.addEventListener("click", function(){

// })

//forma 2
//seletor.onclick = function(){};

let btnNSetor = document.getElementById('btnNSetor');
let colunaSetorNovo = document.getElementById('coluna-setornovo');
let caixaDialogo = document.getElementById('cxdSetor');

function creatNovoSetor(){
    let flexStores = document.getElementById('flex-setores');

    let divColNSetor = document.createElement('div');
    divColNSetor.setAttribute('id', 'coluna-setornovo');

    let caixaDlg = document.createElement('div');
    caixaDlg.setAttribute('class', 'caixa-dialogo visivel');
    caixaDlg.setAttribute('id', 'cxdSetor');

    let p = document.createElement('p');
    p.innerText = 'Insira aqui o nome do setor ';

    let btnCancel = document.createElement('a');
    btnCancel.setAttribute('href', '#');
    btnCancel.setAttribute('title', 'Cancelar');
    btnCancel.setAttribute('onclick', 'cancelInsertSetor()');

    let faTimes = document.createElement('i');
    faTimes.setAttribute('class', 'fas fa-times');

    btnCancel.appendChild(faTimes);
    p.appendChild(btnCancel);

    let cpslNovoSetor = document.createElement('div');
    cpslNovoSetor.setAttribute('class', 'capsula-novosetor');
    cpslNovoSetor.setAttribute('id', 'frmNovosetor');

    let formSetor = document.createElement('form');
    formSetor.setAttribute('id', 'formSetor');

    let inputSetores = document.createElement('input');
    inputSetores.setAttribute('type', 'text');
    inputSetores.setAttribute('class', 'form-control');
    inputSetores.setAttribute('name', 'setores');
    inputSetores.setAttribute('id', 'txtSetor');
    inputSetores.setAttribute('autocomplete', 'off');
    inputSetores.setAttribute('onfocus', 'cxaDialogo()');
    inputSetores.setAttribute('onblur', 'cxaDialogo()');
    inputSetores.setAttribute('placeholder', 'Descrição setor')

    let button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('onclick', 'insertSetor()');
    button.innerText = 'Inserir';

    caixaDlg.appendChild(p);

    divColNSetor.appendChild(caixaDlg);

    formSetor.appendChild(inputSetores);
    formSetor.appendChild(button);
    cpslNovoSetor.appendChild(formSetor);
    divColNSetor.appendChild(cpslNovoSetor);

    flexStores.appendChild(divColNSetor);

    divColNSetor.classList.toggle('visivel');
    //caixaDialogo.classList.toggle('visivel');

}

function editarSetor(e){
    let setor = document.getElementById('col-setor-' + e);
    setor.classList.toggle('ocultar');
    
}


function cxaDialogo(){
    document.getElementById('cxdSetor').classList.toggle('visivel');
}

function cancelInsertSetor(){
    let flexStores = document.getElementById('flex-setores');
    let novoSetor = document.getElementById('coluna-setornovo');
    flexStores.removeChild(novoSetor);
}

function creatSetorCol(e, setor){
    let flexStores = document.getElementById('flex-setores');
    let colSetorNovo = document.getElementById('coluna-setornovo');
    colSetorNovo.setAttribute('class', 'coluna-setor')
    colSetorNovo.setAttribute('id', 'col-setor-' + e);
    
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
    //divColSetor.appendChild(cpsSetor);
    colSetorNovo.appendChild(cpsSetor);
    //flexStores.appendChild(divColSetor);

}

//requisição ajax por baixo do capo
let frmSetor = document.getElementById('formSetor')
function insertSetor(){
    //console.log(JSON.stringify(b));
    let txtSetor = document.getElementById('txtSetor').value;
    let bodyForm = {
        //id: 1,
        setores: txtSetor,
        //descricao: (!frmSetor.descricao.value) ? frmSetor.descricao.value : '',
        //num_func_m: (!frmSetor.num_func_m.value) ? frmSetor.num_func_m.value : '',
        //num_func_f: (!frmSetor.num_func_f.value) ? frmSetor.num_func_f.value : '',
        clientes_id: document.getElementById('hddIdCliente').value
    
    };
    let settings = {
        method: "POST",
        headers: {
            //MIne-Types
            "Content-Type":"application/json",
            //"x-api-key":""
        },
        body: JSON.stringify(bodyForm)
    };

    if(txtSetor.length != 0){
        fetch('/setores/create', settings)
            .then(function (response){
                return response.json();
            })
            .then(function(info) {
                //console.log(info);
                let colSetornovo = document.getElementById('coluna-setornovo');
                colSetornovo.innerText = '';
                creatSetorCol(info.id, info.setores);
                creatNovoSetor();
                
                let txtSetor = document.getElementById('txtSetor');
                txtSetor.focus();
    
    
            }).catch(function (error) {
                alert("Erro ao criar um novo setor" + error);
            });
    }
    else {
        alert('O campo texto precisa ser preenchido!')
    }
    

}

function carregarSetor(e){
    let { setores } = document.getElementById('formSetor');
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
        setores.setAttribute('value', data[0].setores);
        let modalFooter = document.getElementById('modalFooter');
        let incluirSetor = document.getElementById('incluirSetor');
        modalFooter.removeChild(incluirSetor);

        let atualizarSetor = document.createElement('button');
        atualizarSetor.setAttribute('type', 'submit');
        atualizarSetor.setAttribute('class', 'btn btn-primary');
        atualizarSetor.setAttribute('id', 'atualizarSetor');
        atualizarSetor.innerText = 'Atualizar Setor';

        modalFooter.appendChild(atualizarSetor);


    }).catch(function (error){
        //console.log('Erro ao carregar setor!' + error)
    })
}


function atualizarDetalhes(e){
    let atualDSetor = {
        id: e,
        setores: document.getElementById('txtDSetor' + e).value,
        descricao: document.getElementById('txtareaDSetor' + e).value,
        num_func_m: document.getElementById('txtDNFM'+ e).value,
        num_func_f: document.getElementById('txtDNFF' + e).value,
        clientes_id: document.getElementById('hddIdCliente').value
    };
    let settings = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(atualDSetor)
    }
    fetch('/setores/update', settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            //console.log(dados[0]);
            document.getElementById('setor-'+ e).innerText = dados[0].setores;
            let setorDetail = document.getElementById('detailSetor' + e);
            setorDetail.classList.toggle('visivel');
            
        }).catch(function (error){
            alert("Erro ao apagar setor!" + error);
        })
}

 
function removSetor(e){
    
    let idSetor = {
        id:e,
        idCliente: document.getElementById('hddIdCliente').value
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

function posicao(e) {
    var el = document.getElementById('cpsl-' + e);
    var coordenadas = el.getBoundingClientRect();
    let setorEdit = document.getElementById('cpsl-edit-' + e);
    setorEdit.style.top = (coordenadas.top - 100) + 'px';
    //setorEdit.style.left = coordenadas.left;
    setorEdit.classList.toggle('visivel');
    //console.log('posição x', coordenadas.left, 'posição y', coordenadas.top, 'elemento ' + el);
}

function cancelar(e){
    let setorEdit = document.getElementById('cpsl-edit-' + e);
    setorEdit.classList.toggle('visivel');
}

function visualDetalhes(e){
    let setorEdit = document.getElementById('cpsl-edit-' + e);
    setorEdit.classList.toggle('visivel');

    let setorDetail = document.getElementById('detailSetor' + e);
    setorDetail.classList.toggle('visivel');
}

function cancelDetalhes(e){
    let setorDetail = document.getElementById('detailSetor' + e);
    setorDetail.classList.toggle('visivel');
}


   