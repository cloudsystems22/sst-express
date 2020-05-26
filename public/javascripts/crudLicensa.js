$(document).ready(function (){
    let userId = document.getElementById('hddUserId').value;
    carregarLicensa(userId);
   
});

let frmLicensa = document.getElementById('frmDadosLicensa');
let menuInterno = document.getElementById('menu-interno');

function createLicensa(){
    let cnpj = frmLicensa.cnpj.value;
    let ie = frmLicensa.ie.value;
    let razao_social = frmLicensa.razao_social.value;
    let nome_fantasia = frmLicensa.nome_fantasia.value;
    let cnae = frmLicensa.cnae.value;
    let cep = frmLicensa.cep.value;
    let logradouro = frmLicensa.logradouro.value;
    let numero = frmLicensa.numero.value;
    let bairro = frmLicensa.bairro.value;
    let municipio = frmLicensa.municipio.value;
    let estado = frmLicensa.estado.value;
    let site = frmLicensa.site.value;
    let fone = frmLicensa.fone.value;
    let email = frmLicensa.email.value;
    let usuario_id = frmLicensa.usuario_id.value;

    $.ajax({
        type:'POST',
        url: '/licensa',
        data: { cnpj, ie, razao_social, nome_fantasia, cnae, cep, logradouro, numero, bairro, municipio, estado, site, fone, email, usuario_id },
        success: function(data){
            alert('Sua licensa foi criada com sucesso');

        },
        erro: function(ex){
            alert('Erro ao inserir dados licensa' + ex);
        }
        
    });

}

function carregarLicensa(e){
    $.ajax({
        type:'POST',
        url: '/show',
        data: { id: e },
        success: function (data){
            if(data){
                Atualizar();
                carregaImg(data[0].logo);
            } else {
                CriarLicensa();
                carregaImg();
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
    let id = frmLicensa.id.value;
    let cnpj = frmLicensa.cnpj.value;
    let ie = frmLicensa.ie.value;
    let razao_social = frmLicensa.razao_social.value;
    let nome_fantasia = frmLicensa.nome_fantasia.value;
    let cnae = frmLicensa.cnae.value;
    let cep = frmLicensa.cep.value;
    let logradouro = frmLicensa.logradouro.value;
    let numero = frmLicensa.numero.value;
    let bairro = frmLicensa.bairro.value;
    let municipio = frmLicensa.municipio.value;
    let estado = frmLicensa.estado.value;
    let site = frmLicensa.site.value;
    let fone = frmLicensa.fone.value;
    let email = frmLicensa.email.value;
    let usuario_id = frmLicensa.usuario_id.value;

    console.log(id);
    console.log(cnpj);
    $.ajax({
        type:'POST',
        url: '/update',
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
    
    if(e){
        contImag.innerText = '';
        let logoMarca = document.createElement('div');
        logoMarca.setAttribute('id', 'logo-marca');
        logoMarca.setAttribute('style', "background-image: url('.." + e + "')");
        contImag.appendChild(logoMarca);
    } else {
        contImag.innerText = '';
        let logoMarca = document.createElement('div');
        logoMarca.setAttribute('id', 'logo-marca');
        logoMarca.setAttribute('style', "background-image: url('../images/imginexist.png')");
        contImag.appendChild(logoMarca);
    }

}


function Atualizar(){
    let buttonAtualizar = document.createElement('button');
    buttonAtualizar.setAttribute('class', 'btn btn-sm btn-outline-secondary');
    buttonAtualizar.setAttribute('id', 'btnAtualizar');
    buttonAtualizar.setAttribute('onclick', 'atualizarDados()');
    buttonAtualizar.innerText = "Atualizar";

    menuInterno.appendChild(buttonAtualizar);

}

function CriarLicensa(){
    let buttonAtualizar = document.createElement('button');
    buttonAtualizar.setAttribute('class', 'btn btn-sm btn-outline-secondary');
    buttonAtualizar.setAttribute('id', 'btnCriarLicensa');
    buttonAtualizar.setAttribute('onclick', 'createLicensa()')
    buttonAtualizar.innerText = "Criar Licensa";

    menuInterno.appendChild(buttonAtualizar);

}