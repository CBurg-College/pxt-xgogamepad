//% color="#00CC00" icon="\uf1f9"
//% block="XGO Gamepad"
//% block.loc.nl="XGO Gamepad"
namespace CXgoGamepad {

    export enum Group {
        //% block="group 1"
        //% block.loc.nl="groep 1"
        Group1,
        //% block="group 2"
        //% block.loc.nl="groep 2"
        Group2,
        //% block="group 3"
        //% block.loc.nl="groep 3"
        Group3,
        //% block="group 4"
        //% block.loc.nl="groep 4"
        Group4,
        //% block="group 5"
        //% block.loc.nl="groep 5"
        Group5,
        //% block="group 6"
        //% block.loc.nl="groep 6"
        Group6,
        //% block="group 7"
        //% block.loc.nl="groep 7"
        Group7,
        //% block="group 8"
        //% block.loc.nl="groep 8"
        Group8,
        //% block="group 9"
        //% block.loc.nl="groep 9"
        Group9
    }

    let GROUP = Group.Group1

    let JSANGLE = 0
    let JSSIZE = 0

    export enum Gamepad {
        //% block="up"
        //% block.loc.nl="omhoog"
        Button1, //P12
        //% block="down"
        //% block.loc.nl="omlaag"
        Button2, //P15 
        //% block="left"
        //% block.loc.nl="links"
        Button3, //P13
        //% block="right"
        //% block.loc.nl="rechts"
        Button4 //P14
    }

    export let BUTTONMAX = 4

    let PRESSED1 = false
    let PRESSED2 = false
    let PRESSED3 = false
    let PRESSED4 = false

    type gamepadHandler = () => void

    let EventPressed1: gamepadHandler
    let EventPressed2: gamepadHandler
    let EventPressed3: gamepadHandler
    let EventPressed4: gamepadHandler

    let EventReleased1: gamepadHandler
    let EventReleased2: gamepadHandler
    let EventReleased3: gamepadHandler
    let EventReleased4: gamepadHandler

    export function handleEventPressed(button: Gamepad) {
        switch (button) {
            case Gamepad.Button1: PRESSED1 = true; if (EventPressed1) EventPressed1(); break;
            case Gamepad.Button2: PRESSED2 = true; if (EventPressed2) EventPressed2(); break;
            case Gamepad.Button3: PRESSED3 = true; if (EventPressed3) EventPressed3(); break;
            case Gamepad.Button4: PRESSED4 = true; if (EventPressed4) EventPressed4(); break;
        }
    }

    export function handleEventReleased(button: Gamepad) {
        switch (button) {
            case Gamepad.Button1: PRESSED1 = false; if (EventReleased1) EventReleased1(); break;
            case Gamepad.Button2: PRESSED2 = false; if (EventReleased2) EventReleased2(); break;
            case Gamepad.Button3: PRESSED3 = false; if (EventReleased3) EventReleased3(); break;
            case Gamepad.Button4: PRESSED4 = false; if (EventReleased4) EventReleased4(); break;
        }
    }

    radio.onReceivedNumber(function (value: number) {
        if (value >= 1000) {
            value -= 1000
            JSSIZE = Math.floor(value / 1000)
            JSANGLE = value - JSSIZE * 1000
        }
        else {
            if (value >= BUTTONMAX)
                handleEventReleased(value - BUTTONMAX)
            else
                handleEventPressed(value)
        }
    })

    //% block="join %group"
    //% block.loc.nl="sluit aan bij %group"
    export function setGroup(group: Group) {
        GROUP = group + 1
        radio.setGroup(GROUP)
    }

    //% block="%button is up"
    //% block.loc.nl="%button is losgelaten"
    export function isReleased(button: Gamepad): boolean {
        switch (button) {
            case Gamepad.Button1: return !PRESSED1;
            case Gamepad.Button2: return !PRESSED2;
            case Gamepad.Button3: return !PRESSED3;
            case Gamepad.Button4: return !PRESSED4;
        }
        return false;
    }

    //% block="direction"
    //% block.loc.nl="richting"
    export function direction(): number {
        return JSANGLE
    }

    //% block="value"
    //% block.loc.nl="waarde"
    export function value(): number {
        return JSSIZE
    }

    //% block="%button is down"
    //% block.loc.nl="%button is ingedrukt"
    export function isPressed(button: Gamepad): boolean {
        switch (button) {
            case Gamepad.Button1: return PRESSED1;
            case Gamepad.Button2: return PRESSED2;
            case Gamepad.Button3: return PRESSED3;
            case Gamepad.Button4: return PRESSED4;
        }
        return false;
    }

    //% block="when %button is released"
    //% block.loc.nl="wanneer %button wordt losgelaten"
    export function onButtonReleased(button: Gamepad, programmableCode: () => void): void {
        switch (button) {
            case Gamepad.Button1: EventReleased1 = programmableCode; break;
            case Gamepad.Button2: EventReleased2 = programmableCode; break;
            case Gamepad.Button3: EventReleased3 = programmableCode; break;
            case Gamepad.Button4: EventReleased4 = programmableCode; break;
        }
    }

    //% block="when %button is pressed"
    //% block.loc.nl="wanneer op %button gedrukt"
    export function onButtonPressed(button: Gamepad, programmableCode: () => void): void {
        switch (button) {
            case Gamepad.Button1: EventPressed1 = programmableCode; break;
            case Gamepad.Button2: EventPressed2 = programmableCode; break;
            case Gamepad.Button3: EventPressed3 = programmableCode; break;
            case Gamepad.Button4: EventPressed4 = programmableCode; break;
        }
    }

}
