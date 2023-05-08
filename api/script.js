//Como guardar toda a informação? Criar uma classe e objetos que irão armazenas e manipular as propriedades dos objetos

//TypeScript

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement) {
            this.previousOperandTextElement = previousOperandTextElement
            this.currentOperandTextElement = currentOperandTextElement
            this.clear()
    } 
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined

    }
    delete(){
        //Exclui, de trás pra frente, um a um, números do currentOperand
        this.currentOperand = this.currentOperand.toString().slice(0,-1)

    }

    appendNumber(number){
        // Testa se o numero do próximo click é um "." e se já tem algum "." no currentOperand. Se sim, "return" sem nada que faz com que a funcção appendNumber não faça nada
        if(number === '.' && this.currentOperand.includes('.')) return

        //toString pra concatenar e não somar
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){//Se já houver uma operation pendente de ser computada, computa e atualiza o screen pra aparecer o resultado e a nova operation digitada
            this.compute()
        }
        //Se clicar em "2" e depois "+", ele sobe o 2, ou seja, atualiza previousOperand e limpa o currentOperand para que a pessoa insira o número a ser somada à "2"
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break

            case '-':
                computation = prev - current
                break

            case '*': 
                computation = prev * current
                break

            case '/': 
                computation = prev / current
                break
            
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay= ''

        } else{
            integerDisplay = integerDigits.toLocaleString('en',{
            maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.previousOperand} ${this.operation}`   
        }else{
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-del]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()

    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()

    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})
