const form = document.querySelector('.form')
const usernameField = document.getElementById('username')
const emailField = document.getElementById('email')
const passwordField = document.getElementById('password')
const usernameControl = document.querySelector('.username-control')
const emailControl = document.querySelector('.email-control')
const passwordControl = document.querySelector('.password-control')

const passwordRuleLength = document.querySelector('.password-rule-length')
const passwordRuleLowercase = document.querySelector('.password-rule-lowercase')
const passwordRuleUppercase = document.querySelector('.password-rule-uppercase')
const passwordRuleNumeric = document.querySelector('.password-rule-numeric')
const passwordRuleUniqueChar = document.querySelector('.password-rule-uniquechar')


document.addEventListener('DOMContentLoaded', () => {
    handleForm()
})

// FORM
const handleForm = () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const errors = handleErrors()
        showErrors(errors)
        validatePasswordRule(passwordField.value)
        if(Object.keys(errors).length > 0) {
            return
        }
        console.log('Success submitting form login')
    })
}


// UTILS
const handleErrors = () => {
    let errors = {}

    if(usernameField.value === '') {
        errors.username = 'Username field is required'
    } else {
        delete errors.username
    }

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
    if(errors.username) {
        const errorUsername = emailControl.querySelector('.input-error')
        if(errorUsername) {
            errorUsername.innerHTML = errors.email
        } else {
            const errorUsernameEle = document.createElement('p')
            errorUsernameEle.setAttribute('class', 'input-error')
            errorUsernameEle.innerHTML = errors.email
            usernameControl.appendChild(errorUsernameEle)
        }
    } else if(errors.username === undefined) {
        const errorUsername = usernameControl.querySelector('.input-error')
        if(errorUsername) {
            errorUsername.remove()
        }
    }
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
    } else if(errors.password === undefined) {
        const errorPassword = passwordControl.querySelector('.input-error')
        if(errorPassword) {
            errorPassword.remove()
        }
    }
}

const validatePasswordRule = (password) => {
    if(password.length > 8) {
        passwordRuleLength.classList.add('password-rule-eligible')
        if(!passwordRuleLength.innerHTML.includes('✅')) {
            passwordRuleLength.innerHTML += '✅'
        }
    } else {
        passwordRuleLength.classList.remove('password-rule-eligible')
        if(passwordRuleLength.innerHTML.includes('✅')) {
            passwordRuleLength.innerHTML = passwordRuleLength.innerHTML.slice(0, -1)
        }
    }
    if(pass1Low(password)) {
        passwordRuleLowercase.classList.add('password-rule-eligible')
        if(!passwordRuleLowercase.innerHTML.includes('✅')) {
            passwordRuleLowercase.innerHTML += '✅'
        }
    } else {
        passwordRuleLowercase.classList.remove('password-rule-eligible')
        if(passwordRuleLowercase.innerHTML.includes('✅')) {
            passwordRuleLowercase.innerHTML = passwordRuleLowercase.innerHTML.slice(0, -1)
        }
    }
    if(pass1Upp(password)) {
        passwordRuleUppercase.classList.add('password-rule-eligible')
        if(!passwordRuleUppercase.innerHTML.includes('✅')) {
            passwordRuleUppercase.innerHTML += '✅'
        }
    } else {
        passwordRuleUppercase.classList.remove('password-rule-eligible')
        if(passwordRuleUppercase.innerHTML.includes('✅')) {
            passwordRuleUppercase.innerHTML = passwordRuleUppercase.innerHTML.slice(0, -1)
        }
    }
    if(pass1Num(password)) {
        passwordRuleNumeric.classList.add('password-rule-eligible')
        if(!passwordRuleNumeric.innerHTML.includes('✅')) {
            passwordRuleNumeric.innerHTML += '✅'
        }
    } else {
        passwordRuleNumeric.classList.remove('password-rule-eligible')
        passwordRuleNumeric.classList.remove('password-rule-eligible')
        if(passwordRuleNumeric.innerHTML.includes('✅')) {
            passwordRuleNumeric.innerHTML = passwordRuleNumeric.innerHTML.slice(0, -1)
        }
    }
    if(pass1Uniq(password)) {
        passwordRuleUniqueChar.classList.add('password-rule-eligible')
        if(!passwordRuleUniqueChar.innerHTML.includes('✅')) {
            passwordRuleUniqueChar.innerHTML += '✅'
        }
    } else {
        passwordRuleUniqueChar.classList.remove('password-rule-eligible')
        passwordRuleUniqueChar.classList.remove('password-rule-eligible')
        if(passwordRuleUniqueChar.innerHTML.includes('✅')) {
            passwordRuleUniqueChar.innerHTML = passwordRuleUniqueChar.innerHTML.slice(0, -1)
        }
    }
}

const pass1Low = (value) => /[a-z]/.test(value)
const pass1Upp = (value) => /[A-Z]/.test(value) 
const pass1Num = (value) => /[0-9]/.test(value)
const pass1Uniq = (value) => /[!@#$%^&*(),./;']/.test(value)
