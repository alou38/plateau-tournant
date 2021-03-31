function progIncre () {
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
    control.reset()
}
function _360 () {
    basic.showLeds(`
        . . . . #
        . # . . #
        # # # . #
        . # . . #
        . # # # #
        `)
    basic.pause(10000)
    motor.setDelay(2)
    motor.moveClockwise(15, stepUnit.Rotations)
    basic.pause(10)
    winner()
    control.reset()
}
input.onButtonPressed(Button.A, function () {
    TIMER = 5000
    basic.pause(100)
    NbPhoto += 1
    basic.pause(100)
    compteur = NbPhoto
})
function _1_degret10 () {
    motor.setDelay(10)
    motor.moveClockwise(Calculateur, stepUnit.Rotations)
}
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
    control.reset()
}
input.onButtonPressed(Button.B, function () {
    if (NbPhoto >= 1) {
        progIncre()
    } else if (NbPhoto == 0) {
        _360()
    }
})
function PriseDeVue () {
    pins.digitalWritePin(DigitalPin.P8, 1)
    basic.pause(1000)
    pins.digitalWritePin(DigitalPin.P8, 0)
    basic.pause(1000)
}
function _1_degret () {
    motor.setDelay(5)
    motor.moveClockwise(Calculateur, stepUnit.Rotations)
}
let TIMER = 0
let compteur = 0
let CTRlimite = 0
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
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P8, 0)
NbPhoto = 0
rotation = 1
RATIO = 15
basic.forever(function () {
    if (NbPhoto < 1) {
        NbPhoto = 0
        compteur = 0
        CTRlimite = 0
    }
})
basic.forever(function () {
    if (CTRlimite > RATIO) {
        winner()
        CTRlimite = 0
    }
})
basic.forever(function () {
    basic.showString("" + (Calculateur))
    basic.pause(1000)
    basic.clearScreen()
})
