input.onButtonPressed(Button.A, () => {
    mearm.openGrip()
})
input.onButtonPressed(Button.B, () => {
    mearm.closeGrip()
})
input.onButtonPressed(Button.AB, () => {
    mearm.moveToAngle(MearmServo.Base, 0)
    mearm.moveToAngle(MearmServo.Lower, 45)
    mearm.moveToAngle(MearmServo.Upper, 67)
    mearm.openGrip()
})
basic.forever(() => {
    if (mearm.joystick(Joystick.LeftHorizontal) < 0) {
        mearm.moveByAngle(MearmServo.Base, -5)
    } else {
        mearm.moveByAngle(MearmServo.Base, 5)
    }
    if (mearm.joystick(Joystick.LeftVertical) < 0) {
        mearm.moveByAngle(MearmServo.Lower, -5)
    } else {
        mearm.moveByAngle(MearmServo.Lower, 5)
    }
    if (mearm.joystick(Joystick.RightVertical) < 0) {
        mearm.moveByAngle(MearmServo.Upper, -5)
    } else {
        mearm.moveByAngle(MearmServo.Upper, 5)
    }
    if (mearm.joystick(Joystick.RightHorizontal) < 0) {
        mearm.moveByAngle(MearmServo.Grip, -5)
    } else {
        mearm.moveByAngle(MearmServo.Grip, 5)
    }
})
