$(document).ready(function (){
    //let userId = document.getElementById('hddUserId').value;
    let clienteId = (document.getElementById('hddId')) ? document.getElementById('hddId').value : 0;
    carregarCliente(clienteId);
   
});


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
            alert('Erro ao inserir cliente' + ex);
        }
        
    });

}

function carregarCliente(e){
    $.ajax({
        type:'POST',
        url: '/clientes/show',
        data: { id: e },
        success: function (data){
            console.log(data.id);
            if(data.id != undefined){
                Atualizar();
                let urlImag = data.logo ? data.logo : '/images/imginexist.png';
                carregaImg(urlImag);
                //document.getElementById('hddId').value = data.id;
                document.getElementById('txtCnpj').value = data.cnpj;
                //textCNPJ.setAttribute('value', data.cnpj);
                document.getElementById('txtIe').value = data.ie;
                document.getElementById('txtRazaoSocial').value = data.razao_social;
                document.getElementById('txtNomeFantasia').value = data.nome_fantasia;
                document.getElementById('txtCNAE').value = data.cnae;
                document.getElementById('txtCEP').value = data.cep;
                document.getElementById('txtLograd').value = data.logradouro;
                document.getElementById('txtNumero').value = data.numero;
                document.getElementById('txtBairro').value = data.bairro;
                document.getElementById('txtMunicipio').value = data.municipio;
                document.getElementById('txtEstado').value = data.estado;
                document.getElementById('txtSite').value = data.site;
                document.getElementById('txtFone').value = data.fone;
                document.getElementById('txtEmail').value = data.email;
                document.getElementById('hddIdUplogo').value = data.id;
                
            } else if(data.id == undefined) {
                CriarCliente();
                carregaImg('/images/imginexist.png');
            }

        },
        erro: function (ex){
            alert('Erro ao carregar cliente');
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

    // console.log(id);
    // console.log(cnpj);
    $.ajax({
        type:'POST',
        url: '/clientes/update',
        data: { id, cnpj, ie, razao_social, nome_fantasia, cnae, cep, logradouro, numero, bairro, municipio, estado, site, fone, email, usuario_id },
        success: function(data){
            alert('Seu cliente foi atualizada com sucesso');

        },
        erro: function(ex){
            alert('Erro ao inserir cliente' + ex);
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
        url: '/clientes/uplogo',
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

    contImag.innerText = "";
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

    // let hddId = document.createElement('hddId2');
    // hddId.setAttribute('value', data.id);

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