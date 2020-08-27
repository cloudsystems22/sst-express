//https://www.receitaws.com.br/v1/cnpj/10603855000160

function clienteSetores(cnpj){
    let settings = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
        }
        //body:JSON.stringify({ cnpj })
    }
    fetch('https://www.receitaws.com.br/v1/cnpj/' + cnpj, settings)
        .then(function (response){
            return response.json();
        })
        .then(function (dados){
            //dados = JSON.parse(dados);
            console.log(dados);
                        
        }).catch(function (error){
            alert("Erro ao carregar relatório!" + error);
        })
}