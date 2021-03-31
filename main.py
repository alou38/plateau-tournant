def _360():
    global NbPhoto, Calculateur, CTRlimite, compteur
    basic.show_leds("""
        . . . . #
        . # . . #
        # # # . #
        . # . . #
        . # # # #
        """)
    basic.pause(10000)
    NbPhoto = 350
    # calcule
    Calculateur = RATIO / NbPhoto
    CTRlimite = Calculateur
    compteur = NbPhoto
    # calcule
    while CTRlimite < RATIO:
        for index in range(NbPhoto):
            for index2 in range(rotation):
                _1_degret()
                CTRlimite += Calculateur
            basic.pause(10)
            compteur += -1
    CTRlimite = 0
    control.reset()

def on_button_pressed_a():
    global TIMER, NbPhoto, compteur
    TIMER = 5000
    basic.pause(100)
    NbPhoto += 1
    basic.pause(100)
    compteur = NbPhoto
input.on_button_pressed(Button.A, on_button_pressed_a)

def _1_degret10():
    motor.set_delay(10)
    motor.move_clockwise(Calculateur, stepUnit.ROTATIONS)
def winner():
    basic.clear_screen()
    basic.show_leds("""
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        """)
    basic.show_icon(IconNames.SMALL_DIAMOND)
    basic.show_icon(IconNames.DIAMOND)
    basic.show_icon(IconNames.DIAMOND)
    basic.pause(2000)
    basic.clear_screen()
    control.reset()

def on_button_pressed_b():
    global Calculateur, CTRlimite, compteur
    if NbPhoto >= 1:
        # calcule
        Calculateur = RATIO / NbPhoto
        CTRlimite = Calculateur
        compteur = NbPhoto
        # calcule
        while CTRlimite < RATIO:
            for index3 in range(NbPhoto):
                for index4 in range(rotation):
                    _1_degret()
                    CTRlimite += Calculateur
                basic.pause(800)
                PriseDeVue()
                compteur += -1
        CTRlimite = 0
        control.reset()
    elif NbPhoto == 0:
        _360()
input.on_button_pressed(Button.B, on_button_pressed_b)

def PriseDeVue():
    pins.digital_write_pin(DigitalPin.P8, 1)
    basic.pause(1000)
    pins.digital_write_pin(DigitalPin.P8, 0)
    basic.pause(1000)
def _1_degret():
    motor.set_delay(5)
    motor.move_clockwise(Calculateur, stepUnit.ROTATIONS)
TIMER = 0
compteur = 0
CTRlimite = 0
Calculateur = 0
RATIO = 0
rotation = 0
NbPhoto = 0
motor: stepperMotor.Motor = None
motor = stepperMotor.create_motor(DigitalPin.P13,
    DigitalPin.P14,
    DigitalPin.P15,
    DigitalPin.P16)
pins.digital_write_pin(DigitalPin.P1, 0)
pins.digital_write_pin(DigitalPin.P8, 0)
NbPhoto = 0
rotation = 1
RATIO = 15

def on_forever():
    global NbPhoto, compteur, CTRlimite
    if NbPhoto < 1:
        NbPhoto = 0
        compteur = 0
        CTRlimite = 0
basic.forever(on_forever)

def on_forever2():
    global CTRlimite
    if CTRlimite > RATIO:
        winner()
        CTRlimite = 0
basic.forever(on_forever2)

def on_forever3():
    basic.show_string("" + str((Calculateur)))
    basic.pause(1000)
    basic.clear_screen()
basic.forever(on_forever3)
