def _1_degret():
    pass

def on_button_pressed_a():
    global NbPhoto, CTRlimite
    basic.pause(100)
    NbPhoto += 1
    basic.pause(100)
    CTRlimite = NbPhoto
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global NbPhoto, CTRlimite
    basic.pause(100)
    NbPhoto += -1
    basic.pause(100)
    CTRlimite = NbPhoto
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_pin_pressed_p1():
    global Calculateur, CTRlimite, compteur
    # calcule
    Calculateur = 3.8 + NbPhoto
    CTRlimite = Calculateur
    compteur = NbPhoto
    # calcule
    while CTRlimite < 3.8:
        for index in range(NbPhoto):
            for index2 in range(rotation):
                _1_degret()
                CTRlimite += Calculateur
            basic.pause(800)
            PriseDeVue()
            compteur += -1
    CTRlimite = 0
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)

def PriseDeVue():
    pass
compteur = 0
Calculateur = 0
CTRlimite = 0
rotation = 0
NbPhoto = 0
motor = stepperMotor.create_motor(DigitalPin.P13,
    DigitalPin.P14,
    DigitalPin.P15,
    DigitalPin.P16)
pins.digital_write_pin(DigitalPin.P8, 0)
NbPhoto = 0
rotation = 1

def on_forever():
    basic.show_string("" + str((compteur)))
    basic.pause(1000)
    basic.clear_screen()
basic.forever(on_forever)

def on_forever2():
    global NbPhoto, compteur, CTRlimite
    if NbPhoto < 1:
        NbPhoto = 0
        compteur = 0
        CTRlimite = 0
basic.forever(on_forever2)
