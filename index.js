let btn_singup = document.querySelector('#btn_singup')
let btn_login = document.querySelector('#btn_login')
let singup = document.querySelector('#singup')
let login = document.querySelector('#login')


btn_singup.addEventListener('click', ()=>{
    singup.classList.remove("noActive");
    login.classList.add("noActive");
})

btn_login.addEventListener('click', ()=>{
    login.classList.remove("noActive");
    singup.classList.add("noActive");
})



const createLocal = () => {
    if(localStorage.getItem('users') === null){
        let users = JSON.stringify([])
        localStorage.setItem('users', users)
    }
}
createLocal();
let localUser = JSON.parse(localStorage.getItem('users'));
console.log(localUser)


document.addEventListener("DOMContentLoaded", function () {
   
    const loginForm = document.getElementById("login-form");

    // SING-UP
    const formularioSingUp = document.querySelector('#registro-form')

     const inputSingUp = document.querySelectorAll('#registro-form input')
    //Validación
    const expresion = {

        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        password: /^.{8,12}$/ // 4 a 12 digitos.

    }

    const check = {

        email: false,
        usuario: false,
        password: false

    }

    const checkValidation = (e) => {
       
        if (e.target.name === 'email_singup') validations(expresion.email, e.target, 'email')
        if (e.target.name === 'usuario_singup') validations(expresion.usuario, e.target, 'usuario')
        if (e.target.name === 'passwordsingup__') {
            validations(expresion.password, e.target, 'password')
            checkpassword();
        }
        if (e.target.name === 'password2_singup') checkpassword()

    }

    const validations = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.querySelector(`#${campo}_singup`).classList.add('check-active')
            document.querySelector(`#${campo}_singup`).classList.remove('check-error')
            document.querySelector(`#error_${campo}`).classList.add('error__inactive')
            check[campo] = true;
            console.log('hola if')
        } else {
            document.querySelector(`#${campo}_singup`).classList.remove('check-active')
            document.querySelector(`#${campo}_singup`).classList.add('check-error')
            document.querySelector(`#error_${campo}`).classList.remove('error__inactive')
            check[campo] = false;
            console.log('hola else')
        }
    }
    inputSingUp.forEach((input) => {
        input.addEventListener('keyup', checkValidation)
        input.addEventListener('blur', checkValidation)
    }) 



    //Validación password
     const checkpassword = () => {
        const pass1 = document.getElementById('password_singup').value
        const pass2 = document.getElementById('password2_singup').value

        if (pass1 !== pass2) {
            document.querySelector(`#password2_singup`).classList.remove('check-active')
            document.querySelector(`#password2_singup`).classList.add('check-error')
            document.querySelector(`#error_password2`).classList.add('error-active')
            check['password'] = false;
        } else {
            document.querySelector(`#password2_singup`).classList.add('check-active')
            document.querySelector(`#password2_singup`).classList.remove('check-error')
            document.querySelector(`#error_password2`).classList.remove('error-active')
            check['password'] = true;

        }
    } 



    //Guardar datos
     formularioSingUp.addEventListener('submit', (e) => {
    
        e.preventDefault();
        if( check.email && check.usuario && check.password){
            
            let email = document.getElementById('email_singup').value
            let usuario = document.getElementById('usuario_singup').value
            let password = document.getElementById('password_singup').value
            
            
            let users = {
                
                email,
                usuario,
                password               
            }
            
            localUser.push(users);
            localStorage.setItem('users', JSON.stringify(localUser));
            localUser = JSON.parse(localStorage.getItem('users'))
            localUser.push(users)
            localStorage.setItem('users',JSON.stringify(localUser))
            formularioSingUp.reset();
            document.querySelector('#login').classList.remove('noActive')
            document.querySelector('#registro').classList.add('noActive')
            console.log(localUser, 'localUser')
        }
    }) 





    //Enviar datos para poder registrarse
    formularioSingUp.addEventListener("submit", function (event) {
        event.preventDefault();

        const usuario = document.getElementById("usuario_singup").value;
        const password = document.getElementById("password_singup").value;
        const sing = document.getElementById('singup')
        sing.style.display = 'none'
        document.getElementById('login').classList.remove("inactive")

        // ... (obtener otros campos)

        // Almacenar en Local Storage (ejemplo)
        const userData = { usuario, password };
        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Datos registrados exitosamente");
        //        window.location.href = "login.html"; // Redirigir a la página login.html 
    });


    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginUsuario = document.getElementById("usuario_login").value;
        const loginPassword = document.getElementById("password_login").value;

        // Obtener los datos almacenados
        const storedUserData = JSON.parse(localStorage.getItem("users"));
        const usuarioPrueba = storedUserData.find((user) => user.usuario == loginUsuario)
        console.log(usuarioPrueba)
        if (usuarioPrueba.password === loginPassword && usuarioPrueba.usuario === loginUsuario) {
            alert("Inicio de sesión exitoso");
            window.location.href = "home.html"; // Redirigir a la página home.html

        } else {
            alert("Datos incorrectos");
        }
    });
});