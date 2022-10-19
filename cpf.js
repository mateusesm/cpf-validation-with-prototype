//const cpfToValidation = '111.111.111-11'
const cpfToValidation = '705.484.450-52'

function ValidaCPF(cpfSended) {

    Object.defineProperty(this, 'cpfClean', {
        get: () => cpfSended.replace(/\D+/g, '')
    })
    
}

ValidaCPF.prototype.validationCPF = function() {

    if (!this.cpfClean || this.cpfClean.length !== 11 || this.isSequence()) {
        return false
    }

    const cpfParcial = this.cpfClean.slice(0, -2)

    const digit1 = this.getDigitCPF(cpfParcial)
    const digit2 = this.getDigitCPF(cpfParcial + digit1)

    const newCpf = cpfParcial + digit1 + digit2

    return newCpf === this.cpfClean

}

ValidaCPF.prototype.getDigitCPF = function(cpfParcial) {

    const cpfArray = cpfParcial.split('')
    let counter = cpfArray.length + 1

    const total = cpfArray.reduce((ac, valor) => {
        ac += Number(valor) * counter
        counter--
        return ac
    }, 0)

    const digit = 11 - (total % 11)
    
    return digit > 9 ? String(0) : String(digit)
}

ValidaCPF.prototype.isSequence = function() {
    return this.cpfClean[0].repeat(this.cpfClean.length) === this.cpfClean
}

const cpf = new ValidaCPF(cpfToValidation)

if (cpf.validationCPF()) {
    console.log('CPF válido')
}else {
    console.log('CPF inválido')
}
