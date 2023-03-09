/*const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener('blur', (evento) =>{
    validarNacimiento(evento.target);
})*/

//SE agrego dataAtribut porque no es buena idea usar Id

export function valida(input){
    const tipoDeInput = input.dataset.tipo; //coleccion de todos los datas y el .tipo es el data-tipo="nacimiento

    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }
    
    //console.log(input.parentElement)
    //console.log(input.validity.valid)
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
];

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo password no puede estar vacio",
        patternMismatch: "Al menos 6 caracters, máximo 12, debe contener una letra minúscula, una letra máyuscula, un numero y no puede contener caracteresespeciales",
    },

    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError:  "Debe tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "Este campo no puede esta vacio",
        patternMismatch: "El formato requerido es (XXX) XXXX XXXX"
    },
    direccion: {
        valueMissing: "Este campo no puede esta vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "Este campo no puede esta vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres."
    },
    estado: {
        valueMissing: "Este campo no puede esta vacio",
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres."
    },
   
   
   
}

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function  mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = " ";
    tipoDeErrores.forEach(error => {
        if(input.validity[error]){
           console.log(error); 
           console.log(mensajesDeError[tipoDeInput][error])
           mensaje = mensajesDeError[tipoDeInput][error];
        }
    })

    return mensaje;
}




function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = '';
    mayorDeEdad(fechaCliente);

    if(!mayorDeEdad(fechaCliente)){
        mensaje= 'Debes tener almenos 18 años de edad'
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    //console.log(fecha,"---", fechaActual)
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        );

    return(diferenciaFecha <= fechaActual);


}

