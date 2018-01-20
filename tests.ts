function reset()  {
    mearm.moveToCentre(MearmServo.Base)
    mearm.moveToCentre(MearmServo.Lower)
    mearm.moveToCentre(MearmServo.Upper)
    mearm.moveToCentre(MearmServo.Grip)
}
input.onButtonPressed(Button.B, () => {
    mearm.closeGrip()
})
input.onButtonPressed(Button.A, () => {
    mearm.openGrip()
})
input.onButtonPressed(Button.AB, () => {
    reset()
})
reset()
basic.forever(() => {
    if (mearm.joystick(Joystick.LeftHorizontal) < 0) {
        mearm.moveByAngle(MearmServo.Base, -5)
    } else if (mearm.joystick(Joystick.LeftHorizontal) > 0) {
        mearm.moveByAngle(MearmServo.Base, 5)
    }
    if (mearm.joystick(Joystick.LeftVertical) < 0) {
        mearm.moveByAngle(MearmServo.Lower, -5)
    } else if (mearm.joystick(Joystick.LeftVertical) > 0) {
        mearm.moveByAngle(MearmServo.Lower, 5)
    }
    if (mearm.joystick(Joystick.RightVertical) < 0) {
        mearm.moveByAngle(MearmServo.Upper, -5)
    } else if (mearm.joystick(Joystick.RightVertical) > 0) {
        mearm.moveByAngle(MearmServo.Upper, 5)
    }
    if (mearm.joystick(Joystick.RightHorizontal) < 0) {
        mearm.moveByAngle(MearmServo.Grip, -5)
    } else if (mearm.joystick(Joystick.RightHorizontal) > 0) {
        mearm.moveByAngle(MearmServo.Grip, 5)
    }
})
