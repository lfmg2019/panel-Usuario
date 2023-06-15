const btnGuardarCliente=document.querySelector('#guardar-cliente');

//guardar la informacion del cliente 
let cliente ={
    mesa:'',
    hora:'',
    pedido:[]
}

const categorias={
    1:'Pizzas',
    2:'Postres',
    3:'Jugos',
    4:'Comida',
    5:'Café'
}

btnGuardarCliente.addEventListener('click',guardarCliente);

function guardarCliente(){
    const mesa=document.querySelector('#mesa').value
    const hora=document.querySelector('#hora').value
    
    const camposVacios=[mesa,hora].some(campo=>campo=='');
    //console.log(mesa,hora)
    if(camposVacios){
        //si los campos estan vacios
        //console.log('campos vacios')
        const existeAlerta= document.querySelector('.invalida');
        if(!existeAlerta){
            const alerta=document.createElement('div');
            alerta.classList.add('invadilda','d-block','text-center');
            alerta.textContent='Los campos no pueden estar vacios';
            document.querySelector('.modal-body form').appendChild(alerta)

            setTimeout(()=>{
                alerta.remove();
            },3000);
        }
    }else{
        console.log('campos llenos');
        cliente={...cliente,mesa,hora};

        //ocultar la ventana modal despues de haber realizado ese registro
        var modalFormulario=document.querySelector('#formulario');
        var modal =bootstrap.Modal.getInstance(modalFormulario);
        modal.hide();

        mostrarSeccion();
        obtenerMenu();
    }
}


function mostrarSeccion(){
    const seccion=document.querySelectorAll('.d-none');
    //console.log(seccion);
    seccion.forEach(i=>i.classList.remove('d-none'));
}

function obtenerMenu(){
    const url='http://localhost:3000/menu';
    
    fetch(url)
        .then(respuesta=>respuesta.json())
        .then(resultado=>mostrarMenu(resultado))
        .catch(error=>console.log(error))
}
function mostrarMenu(menu){
   /// console.log('mostrar menu');
   // console.log(menu)

   const contenido= document.querySelector('#menu .contenido');
   menu.forEach(menu=>{
    const fila=document.createElement('div');
    fila.classList.add('row','border-top');

    const nombre = document.createElement('div');
    nombre.textContent=menu.nombre;
    nombre.classList.add('col-md-4','py-3');
    fila.appendChild(nombre);

    const precio=document.createElement('div');
    precio.textContent= menu.precio;
    precio.classList.add('col-md-4','py-3');
    fila.appendChild(precio);

    const categoria=document.createElement('div');
    categoria.textContent=categorias [menu.categoria];
    categoria.classList.add('col-md-4','py-3');
    fila.appendChild(categoria);

    contenido.appendChild(fila);

   })

}



