$(document).ready(function (e){
    let userId = document.getElementById('hddUserId').value;
    let clienteId = (document.getElementById('hddId')) ? document.getElementById('hddId').value : 0;
    //console.log(clienteId);
    carregarCliente(clienteId);
   
});

function carregaForm(e){
    location.href = '/clientes/form';
    console.log(e);
    carregarCliente(1);

}

let frmCliente = document.getElementById('frmDadosCliente');
let menuInterno = document.getElementById('menu-interno');

function createCliente(){
    let cnpj = frmCliente.cnpj.value;
    let ie = frmCliente.ie.value;
    let razao_social = frmCliente.razao_social.value;
    let nome_fantasia = frmCliente.nome_fantasia.value;
    let cnae = frmCliente.cnae.value;
    let cep = frmCliente.cep.value;
    let logradouro = frmCliente.logradouro.value;
    let numero = frmCliente.numero.value;
    let bairro = frmCliente.bairro.value;
    let municipio = frmCliente.municipio.value;
    let estado = frmCliente.estado.value;
    let site = frmCliente.site.value;
    let fone = frmCliente.fone.value;
    let email = frmCliente.email.value;
    //let usuario_id = frmCliente.usuario_id.value;

    $.ajax({
        type:'POST',
        url: '/clientes/create',
        data: { cnpj, ie, razao_social, nome_fantasia, cnae, cep, logradouro, numero, bairro, municipio, estado, site, fone, email },
        success: function(data){
            alert('Cliente cadastrado com sucesso');
            let menuInterno = document.getElementById('menu-interno');
            menuInterno.innerText = '';
            Atualizar(data.id);

        },
        erro: function(ex){
            alert('Erro ao inserir dados licensa' + ex);
        }
        
    });

}

function carregarCliente(e){
    console.log(e);
    $.ajax({
        type:'POST',
        url: '/clientes/show',
        data: { id: e },
        success: function (data){
            console.log(data);
            if(data[0] != undefined){
                Atualizar();
                let urlImag = data[0].logo ? data[0].logo : '/images/imginexist.png';
                carregaImg(urlImag);
            } else if(data[0] == undefined) {
                CriarCliente();
                carregaImg('/images/imginexist.png');
            }
            document.getElementById('hddId').value = data[0].id;
            document.getElementById('txtCnpj').value = data[0].cnpj;
            //textCNPJ.setAttribute('value', data[0].cnpj);
            document.getElementById('txtIe').value = data[0].ie;
            document.getElementById('txtRazaoSocial').value = data[0].razao_social;
            document.getElementById('txtNomeFantasia').value = data[0].nome_fantasia;
            document.getElementById('txtCNAE').value = data[0].cnae;
            document.getElementById('txtCEP').value = data[0].cep;
            document.getElementById('txtLograd').value = data[0].logradouro;
            document.getElementById('txtNumero').value = data[0].numero;
            document.getElementById('txtBairro').value = data[0].bairro;
            document.getElementById('txtMunicipio').value = data[0].municipio;
            document.getElementById('txtEstado').value = data[0].estado;
            document.getElementById('txtSite').value = data[0].site;
            document.getElementById('txtFone').value = data[0].fone;
            document.getElementById('txtEmail').value = data[0].email;
            document.getElementById('hddIdUplogo').value = data[0].id;

        },
        erro: function (ex){
            alert('Erro ao carregar licensa');
        }
    });
}

function atualizarDados(){
    let id = frmCliente.id.value;
    let cnpj = frmCliente.cnpj.value;
    let ie = frmCliente.ie.value;
    let razao_social = frmCliente.razao_social.value;
    let nome_fantasia = frmCliente.nome_fantasia.value;
    let cnae = frmCliente.cnae.value;
    let cep = frmCliente.cep.value;
    let logradouro = frmCliente.logradouro.value;
    let numero = frmCliente.numero.value;
    let bairro = frmCliente.bairro.value;
    let municipio = frmCliente.municipio.value;
    let estado = frmCliente.estado.value;
    let site = frmCliente.site.value;
    let fone = frmCliente.fone.value;
    let email = frmCliente.email.value;
    let usuario_id = frmCliente.usuario_id.value;

    console.log(id);
    console.log(cnpj);
    $.ajax({
        type:'POST',
        url: '/clientes/update',
        data: { id, cnpj, ie, razao_social, nome_fantasia, cnae, cep, logradouro, numero, bairro, municipio, estado, site, fone, email, usuario_id },
        success: function(data){
            alert('Sua licensa foi atualizada com sucesso');

        },
        erro: function(ex){
            alert('Erro ao inserir dados licensa' + ex);
        }
        
    });
}

function uploadLogo(e){
    let frmLogo = document.getElementById('frmLogo');

    //let id = e; 
    let form = frmLogo;
    let dados = new FormData(form);
    console.log(dados);
    $.ajax({
        type: 'POST',
        url: '/uplogo',
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        cache: false,
        data: dados,
        success: function (data) {
            carregaImg(data[0].logo);
        },
        erro: function (ex){
            alert('Falha ao atualizar imagem! ' + ex)
        }

    });
}

const carregaImg = (e) => {
    let contImag = document.getElementById('contImag');

    contImag.innerText = '';
    let logoMarca = document.createElement('div');
    logoMarca.setAttribute('id', 'logo-marca');
    logoMarca.setAttribute('style', "background-image: url('.." + e + "')");
    contImag.appendChild(logoMarca);

}


function Atualizar(e){
    let buttonAtualizar = document.createElement('button');
    buttonAtualizar.setAttribute('class', 'btn btn-sm btn-outline-secondary');
    buttonAtualizar.setAttribute('id', 'btnAtualizar');
    buttonAtualizar.setAttribute('onclick', 'atualizarDados()');
    buttonAtualizar.innerText = "Atualizar";

    let divCommUp = document.getElementById('commUpload');

    let inputFile = document.createElement('input');
    inputFile.setAttribute('type', 'file');
    inputFile.setAttribute('name', 'files');
    inputFile.setAttribute('id', 'inputFile');
    inputFile.setAttribute('class', 'form-control');

    let buttonUpload = document.createElement('button');
    buttonUpload.setAttribute('class', 'btn btn-outline-primary btn-block');
    buttonUpload.setAttribute('id', 'btn-upload');
    buttonUpload.setAttribute('onclick', 'uploadLogo()');
    buttonUpload.setAttribute('type', 'button');

    let i = document.createElement('i');
    i.setAttribute('class', 'fas fa-upload');

    let frmLogo = document.getElementById('frmLogo');
    let inputHddId = document.createElement('input');
    inputHddId.setAttribute('type', 'hidden');
    inputHddId.setAttribute('name', 'id');
    inputHddId.setAttribute('id', 'hddIdUplogo');
    inputHddId.setAttribute('value', e);

    let hddId = document.createElement('hddId');
    hddId.setAttribute('value', data.id);

    frmCliente.appendChild(hddId);

    frmLogo.appendChild(inputHddId);

    menuInterno.appendChild(buttonAtualizar);

    buttonUpload.appendChild(i);
    divCommUp.appendChild(inputFile);
    divCommUp.appendChild(buttonUpload);


}

function CriarCliente(){
    let buttonAtualizar = document.createElement('button');
    buttonAtualizar.setAttribute('class', 'btn btn-sm btn-outline-secondary');
    buttonAtualizar.setAttribute('id', 'btnCriarCliente');
    buttonAtualizar.setAttribute('onclick', 'createCliente()')
    buttonAtualizar.innerText = "Criar Cliente";

    menuInterno.appendChild(buttonAtualizar);

}