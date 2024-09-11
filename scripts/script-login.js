const form = document.querySelector('.form')
const emailField = document.getElementById('email')
const passwordField = document.getElementById('password')
const emailControl = document.querySelector('.email-control')
const passwordControl = document.querySelector('.password-control')


document.addEventListener('DOMContentLoaded', () => {
    handleForm()
})



const handleForm = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const errors = handleErrors()
        showErrors(errors)
        if(Object.keys(errors).length > 0) {
            return
        }
        console.log('Success submitting form login')
    })

}



// UTILS
const handleErrors = () => {
    let errors = {}

    if(emailField.value === '') {
        errors.email = 'Email field is required'
    } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailField.value)) {
        errors.email = 'Email not valid'
    } else {
        delete errors.email
    }

    if(passwordField === '') {
        errors.password = 'Password field is required'
    } else if(passwordField.value.length < 8) {
        errors.password = 'Minimum password length is 8 characters or more'
    } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),./;'])[A-Za-z\d@$!%*?&.,/;']{8,}$/.test(passwordField.value)) {
        errors.password = 'Password not valid'
    } else {
        delete errors.password
    }
    return errors
}

const showErrors = (errors) => {
    if(errors.email) {
        const errorEmail = emailControl.querySelector('.input-error')
        if(errorEmail) {
            errorEmail.innerHTML = errors.email
        } else {
            const errorEmailEle = document.createElement('p')
            errorEmailEle.setAttribute('class', 'input-error')
            errorEmailEle.innerHTML = errors.email
            emailControl.appendChild(errorEmailEle)
        }
    } else if(errors.email === undefined) {
        const errorEmail = emailControl.querySelector('.input-error')
        if(errorEmail) {
            errorEmail.remove()
        }
    }

    if(errors.password) {
        const errorPassword = passwordControl.querySelector('.input-error')
        if(errorPassword) {
            errorPassword.innerHTML = errors.password
        } else {
            const errorPasswordEle = document.createElement('p')
            errorPasswordEle.setAttribute('class', 'input-error')
            errorPasswordEle.innerHTML = errors.password
            passwordControl.appendChild(errorPasswordEle)
        }
    } else if(errors.email === undefined) {
        const errorPassword = passwordControl.querySelector('.input-error')
        if(errorPassword) {
            errorPassword.remove()
        }
    }
}
