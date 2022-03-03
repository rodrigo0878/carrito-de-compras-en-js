//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventsListeners();
function cargarEventsListeners(){
    // cuando agregas un curso presioanndo agregar al carrito
    listaCursos.addEventListener('click', agregarCurso)

    //elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso)

    //muestra los cursos almacenados en localStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        //una ves listo mandamos a imprimir carrito html para que muetr lo que esta en local storage
        carritoHTML();
    })

    //vaciar carrito btn
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = []//reseteamos el arrelo
        limpiarHTML();//eliminamos todo el html del carirto
    })
}

function agregarCurso(e){
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)

    }
    

}

//elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        carritoHTML();
    }
}
//leer datos del html y ectrae la informacion

function leerDatosCurso(curso){

    //console.log(curso);

    //craer un objeto con el contenido del curso actual

    const infoCurso={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

        //REvisar si un elemeto ya esta en el carrito
        //SOME permite iterear sonbre el arrgleo de objetos y verificiar si ya exsiste en el objeto
        const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
        if(existe){
            //actualizamos la CAntidad
            const cursos = articulosCarrito.map( curso =>{
                if(curso.id === infoCurso.id){
                    curso.cantidad++;
                    return curso;//retorna el objeto actualizado

                } else {
                    return curso;//retorna el objeto que no esta duplicado pero es importante
                }
            });
            articulosCarrito =[...cursos]//actualiza el array

        }else{
            //Agrrega elementos al arreglo de carrito
            articulosCarrito =[...articulosCarrito, infoCurso];
        }
    

    //console.log(articulosCarrito);

    carritoHTML();

}

//muestra el carrito de compras

function carritoHTML(){

    limpiarHTML();
    articulosCarrito.forEach(curso =>{
        //hacemos destruction de las variables y las agregamos al objeto curso
        const {imagen, titulo, precio, cantidad,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML =  ` 
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                    ${titulo}
            </td>
            <td>
                    ${precio}
            </td>
            <td>
                    ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> x </a>
            </td>
        `;

        //Agrega el html del carrito en el body
        contenedorCarrito.appendChild(row);
    })


    //Agregar el carrito de compras a localstorage
    sincronizarStorage();
    
}

function sincronizarStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarrito));
    setTimeout(()=>{
        localStorage.removeItem('carrito');
        console.log('tiempo cumplido')
    },180000)
}


//elimina los cursos del tbody
function limpiarHTML(){
    //forma lenta
    //contenedorCarrito.innerHTML ='';


    //limpia mas rapido
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}


