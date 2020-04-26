const strengthMeter = document.getElementById('strenght-meter');
const passwordInput = document.getElementById('password-input');
const reasonsCon = document.getElementById('reasons');

passwordInput.addEventListener('input',updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter(){
    const weaknesses = calculatePassStrength(passwordInput.value) 
    let strength = 100
    reasonsCon.innerText = ''
   weaknesses.forEach(weakness => {
       if (weakness == null) return 
    strength -= weakness.deduction
    const messageElement = document.createElement('div')
    messageElement.innerText = weakness.message
    reasonsCon.appendChild(messageElement)
   })
   strengthMeter.style.setProperty('--strength', strength)
}


function calculatePassStrength (password){
    const weaknesses = [] 
    weaknesses.push(lengthWeakness(password))
    weaknesses.push(lowerCaseWeakness(password))
    weaknesses.push(upperCaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    weaknesses.push(specialWeakness(password))
    weaknesses.push(repeatWeakness(password))
    

    return weaknesses
}


function lengthWeakness(password) {
   const length = password.length
   
   if (length <= 5) {
       return {
           message: 'Hasło jest zbyt krótkie.',
           deduction: 40,
       }
   }
   if (length <= 10) {
       return {
           message: 'Stać cię na wiecej....',
           deduction: 15,
       }
   }
}

function lowerCaseWeakness(password) {
    return characterTypeWeakness(password, /[a-z]/g || [], 'małych liter.')
}

function upperCaseWeakness(password) {
    return characterTypeWeakness(password, /[A-Z]/g || [], 'duzych liter')
}
function numberWeakness(password) {
    return characterTypeWeakness(password, /[0-9]/g || [], 'cyfr')
}
function specialWeakness(password) {
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g || [], 'znaków specjalnych')
}

function characterTypeWeakness(password, regex, type) {
    const matches = password.match(regex) || []

    if (matches.length === 0) 
   return {
    message: `Hasło nie posiada ${type}.`,
    deduction:20,
}
if (matches.length  <= 2) 
   return {
    message: `Hasło powinno mieć wiecej ${type}.`,
    deduction: 5,
}
}

function repeatWeakness(password) {
    const matches = password.match(/(.)\1/g) || []
    if(matches.length > 0) {
        return {
            message: 'W twoim haśle powtarzają się znaki.',
            deduction: matches.length * 10,
        }
    }
}