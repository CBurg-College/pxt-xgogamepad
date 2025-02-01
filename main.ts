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

    export enum Direction {
        //% block="none"
        //% block.loc.nl="geen"
        None,
        //% block="forward"
        //% block.loc.nl="vooruit"
        Forward,
        //% block="right forward"
        //% block.loc.nl="rechts vooruit"
        ForwRight,
        //% block="right"
        //% block.loc.nl="rechts"
        Right,
        //% block="right reverse"
        //% block.loc.nl="rechts achteruit"
        RevRight,
        //% block="reverse"
        //% block.loc.nl="achteruit"
        Reverse,
        //% block="left reverse"
        //% block.loc.nl="links achteruit"
        RevLeft,
        //% block="left"
        //% block.loc.nl="links"
        Left,
        //% block="left forward"
        //% block.loc.nl="links vooruit"
        ForwLeft
    }

    let JSANGLE = 0
    let JSPOWER = 0
    let JSDIR = Direction.None

    export enum Power {
        //% block="Full power"
        //% block.loc.nl="volle kracht"
        Full,
        //% block="Half full power"
        //% block.loc.nl="halfvolle kracht"
        Halffull,
        //% block="Half power"
        //% block.loc.nl="halve kracht"
        Half,
        //% block="Low power"
        //% block.loc.nl="weinig kracht"
        Low,
        //% block="without power"
        //% block.loc.nl="zonder kracht"
        Powerless
    }
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

    let EventJoystickX: gamepadHandler
    let EventJoystickN: gamepadHandler
    let EventJoystickNE: gamepadHandler
    let EventJoystickE:  gamepadHandler
    let EventJoystickSE: gamepadHandler
    let EventJoystickS:  gamepadHandler
    let EventJoystickSW: gamepadHandler
    let EventJoystickW:  gamepadHandler
    let EventJoystickNW: gamepadHandler

    let EventPressed1: gamepadHandler
    let EventPressed2: gamepadHandler
    let EventPressed3: gamepadHandler
    let EventPressed4: gamepadHandler

    let EventReleased1: gamepadHandler
    let EventReleased2: gamepadHandler
    let EventReleased3: gamepadHandler
    let EventReleased4: gamepadHandler

    export function handleEventJoystick(value: number) {
        JSPOWER = Math.floor(value / 1000)
        JSANGLE = value - JSPOWER * 1000
        let dir: Direction

        if (JSPOWER) {
            if (JSANGLE > 338 || JSANGLE < 23) dir = Direction.Forward
            if (JSANGLE > 23 && JSANGLE < 68) dir = Direction.ForwRight
            if (JSANGLE > 68 && JSANGLE < 113) dir = Direction.Right
            if (JSANGLE > 113 && JSANGLE < 158) dir = Direction.RevRight
            if (JSANGLE > 158 && JSANGLE < 203) dir = Direction.Reverse
            if (JSANGLE > 203 && JSANGLE < 248) dir = Direction.RevLeft
            if (JSANGLE > 248 && JSANGLE < 293) dir = Direction.Left
            if (JSANGLE > 293 && JSANGLE < 338) dir = Direction.ForwLeft
        }
        else
            dir = Direction.None

        if (dir == JSDIR) return;
        JSDIR = dir

        if ((JSDIR == Direction.None) && EventJoystickX)
            EventJoystickX()
        if ((JSDIR == Direction.Forward) && EventJoystickN)
            EventJoystickN()
        if ((JSDIR == Direction.ForwRight) && EventJoystickNE)
            EventJoystickNE()
        if ((JSDIR == Direction.Right) && EventJoystickE)
            EventJoystickE()
        if ((JSDIR == Direction.RevRight) && EventJoystickSE)
            EventJoystickSE()
        if ((JSDIR == Direction.Reverse) && EventJoystickS)
            EventJoystickS()
        if ((JSDIR == Direction.RevLeft) && EventJoystickSW)
            EventJoystickSW()
        if ((JSDIR == Direction.Left) && EventJoystickW)
            EventJoystickW()
        if ((JSDIR == Direction.ForwLeft) && EventJoystickNW)
            EventJoystickNW()
    }

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
        if (value >= 1000)
            handleEventJoystick(value - 1000)
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

    //% block="joystick direction"
    //% block.loc.nl="joystick-richting"
    export function direction(): number {
        return JSANGLE
    }

    //% block="joystick-power"
    //% block.loc.nl="joystick-kracht"
    export function value(): number {
        return JSPOWER
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

    //% block="when the joystick direction is %dir"
    //% block.loc.nl="wanneer de joystick richting %dir is"
    export function onJoystick(dir: Direction, programmableCode: () => void): void {
        switch (dir) {
            case Direction.None: EventJoystickX = programmableCode; break;
            case Direction.Forward: EventJoystickN = programmableCode; break;
            case Direction.ForwRight: EventJoystickNE = programmableCode; break;
            case Direction.Right: EventJoystickE = programmableCode; break;
            case Direction.RevRight: EventJoystickSE = programmableCode; break;
            case Direction.Reverse: EventJoystickS = programmableCode; break;
            case Direction.RevLeft: EventJoystickSW = programmableCode; break;
            case Direction.Left: EventJoystickW = programmableCode; break;
            case Direction.ForwLeft: EventJoystickNW = programmableCode; break;
        }
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
