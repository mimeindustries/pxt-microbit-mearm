function reset()  {
    mearm.moveToCentre(MearmServo.Base)
    mearm.moveToCentre(MearmServo.Right)
    mearm.moveToCentre(MearmServo.Left)
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
    if (mearm.joystick(Joystick.LeftJoyX) < 0) {
        mearm.moveByAngle(MearmServo.Base, -5)
    } else if (mearm.joystick(Joystick.LeftJoyX) > 0) {
        mearm.moveByAngle(MearmServo.Base, 5)
    }
    if (mearm.joystick(Joystick.LeftJoyY) < 0) {
        mearm.moveByAngle(MearmServo.Right, -5)
    } else if (mearm.joystick(Joystick.LeftJoyY) > 0) {
        mearm.moveByAngle(MearmServo.Right, 5)
    }
    if (mearm.joystick(Joystick.RightJoyY) < 0) {
        mearm.moveByAngle(MearmServo.Left, -5)
    } else if (mearm.joystick(Joystick.JoyY) > 0) {
        mearm.moveByAngle(MearmServo.Left, 5)
    }
    if (mearm.joystick(Joystick.RightJoyX) < 0) {
        mearm.moveByAngle(MearmServo.Grip, -5)
    } else if (mearm.joystick(Joystick.RightJoyX) > 0) {
        mearm.moveByAngle(MearmServo.Grip, 5)
    }
})
