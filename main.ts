function _1_degret () {
    motor.setDelay(10)
    motor.moveClockwise(Calculateur, stepUnit.Rotations)
}
input.onButtonPressed(Button.A, function () {
    basic.pause(100)
    NbPhoto += 1
    basic.pause(100)
    compteur = NbPhoto
})
function winner () {
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showIcon(IconNames.SmallDiamond)
    basic.showIcon(IconNames.Diamond)
    basic.showIcon(IconNames.Diamond)
    basic.pause(2000)
    basic.clearScreen()
}
input.onButtonPressed(Button.B, function () {
    basic.pause(100)
    NbPhoto += -1
    basic.pause(100)
    compteur = NbPhoto
})
input.onPinPressed(TouchPin.P1, function () {
    // calcule
    Calculateur = RATIO / NbPhoto
    CTRlimite = Calculateur
    compteur = NbPhoto
    // calcule
    while (CTRlimite < RATIO) {
        for (let index = 0; index < NbPhoto; index++) {
            for (let index = 0; index < rotation; index++) {
                _1_degret()
                CTRlimite += Calculateur
            }
            basic.pause(800)
            PriseDeVue()
            compteur += -1
        }
    }
    CTRlimite = 0
})
function PriseDeVue () {
    pins.digitalWritePin(DigitalPin.P8, 1)
    basic.pause(1000)
    pins.digitalWritePin(DigitalPin.P8, 0)
    basic.pause(1000)
}
let CTRlimite = 0
let compteur = 0
let Calculateur = 0
let RATIO = 0
let rotation = 0
let NbPhoto = 0
let motor: stepperMotor.Motor = null
motor = stepperMotor.createMotor(
DigitalPin.P13,
DigitalPin.P14,
DigitalPin.P15,
DigitalPin.P16
)
pins.digitalWritePin(DigitalPin.P8, 0)
NbPhoto = 0
rotation = 1
RATIO = 15
basic.forever(function () {
    if (CTRlimite > RATIO) {
        winner()
        CTRlimite = 0
    }
})
basic.forever(function () {
    basic.showString("" + (compteur))
    basic.pause(1000)
    basic.clearScreen()
})
basic.forever(function () {
    if (NbPhoto < 1) {
        NbPhoto = 0
        compteur = 0
        CTRlimite = 0
    }
})
