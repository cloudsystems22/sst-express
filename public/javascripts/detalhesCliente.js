
let spnDetal = document.getElementById('spndetalhes');

window.addEventListener('load', function (){
    showBtnDetalhes();
  
});

 //Detalhes setor
 let corpo = document.getElementById('corpo')

 function showDetalhes(){
     let divNumFuncm = document.createElement('div');
     divNumFuncm.setAttribute('class', 'col-md-6');

     let labelNumFuncm = document.createElement('label');
     labelNumFuncm.innerText = 'Nº Func Masculinos';

     let inputNumFuncm = document.createElement('input');
     inputNumFuncm.setAttribute('type', 'text');
     inputNumFuncm.setAttribute('class', 'form-control');
     inputNumFuncm.setAttribute('name', 'num_func_m')

     let divNumFuncf = document.createElement('div');
     divNumFuncf.setAttribute('class', 'col-md-6');

     let labelNumFuncf = document.createElement('label')
     labelNumFuncf.innerText = 'Nº Func Femininos';

     let inputNumFuncf = document.createElement('input');
     inputNumFuncf.setAttribute('type', 'text');
     inputNumFuncf.setAttribute('class', 'form-control');
     inputNumFuncf.setAttribute('name', 'num_func_f');

     let divDescr = document.createElement('div');
     divDescr.setAttribute('class', 'col-md-12');

     let labelDescr = document.createElement('label');
     labelDescr.innerText = 'Descricao';

     let textAreaDescr = document.createElement('textarea');
     textAreaDescr.setAttribute('class', 'form-control');
     textAreaDescr.setAttribute('name', 'descricao');

     divNumFuncm.appendChild(labelNumFuncm);
     divNumFuncm.appendChild(inputNumFuncm);

     divNumFuncf.appendChild(labelNumFuncf);
     divNumFuncf.appendChild(inputNumFuncf);

     divDescr.appendChild(labelDescr)
     divDescr.appendChild(textAreaDescr);

     corpo.appendChild(divNumFuncm);
     corpo.appendChild(divNumFuncf);
     corpo.appendChild(divDescr);

 }
 
 function showBtnDetalhes(){
    let btnDetal = document.createElement('a');
    btnDetal.setAttribute('href', '#');
    btnDetal.setAttribute('id', 'btnDetalhes');
    btnDetal.setAttribute('onclick', 'mostrarDetalhes()')
    btnDetal.innerText = 'mostrar detalhes';

    spnDetal.appendChild(btnDetal);
 }

 function showBtnOcultar(){
     let btnOc = document.createElement('a');
     btnOc.setAttribute('href', '#');
     btnOc.setAttribute('id', 'btnOcultar');
     btnOc.setAttribute('onclick', 'ocultarDetalhes()')
     btnOc.innerText = 'ocultar detalhes';

     spnDetal.appendChild(btnOc);
 }

 function mostrarDetalhes(){
    showDetalhes();
    let btnDetal = document.getElementById('btnDetalhes');
    spnDetal.removeChild(btnDetal);
    showBtnOcultar();
 }

 function ocultarDetalhes(){
    corpo.innerText = ''
    let btnOc = document.getElementById('btnOcultar');
    spnDetal.removeChild(btnOc);
    showBtnDetalhes();
 }

//  let btnDetalhes = document.getElementById('btnDetalhes');
//  btnDetalhes.addEventListener('click', function(){
//      showDetalhes();
//      spnDetal.removeChild(this);
//      showBtnOcultar();
//  });

//  let btnOcultar = document.getElementById('btnOcultar');
//  btnOcultar.addEventListener('click', function(){
//     corpo.innerText = ''
//     spnDetal.removeChild(this);
//     showBtnDetalhes();
//  });

