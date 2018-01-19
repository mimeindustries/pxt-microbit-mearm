enum MearmServo {
  //% block="Base"
  Base = 0,
  //% block="Lower"
  Lower = 1,
  //% block="Upper"
  Upper = 2,
  //% block="Grip"
  Grip = 3
}

enum Joystick {
  //% block="Left Horizontal"
  LeftHorizontal = 0,
  //% block="Left Vertical"
  LeftVertical = 1,
  //% block="Right Horizontal"
  RightHorizontal = 2,
  //% block="Right Vertical"
  RightVertical = 3
}

/**
 * Control the MeArm from the micro:bit
 */
//% weight=80 color=#00A3E0
namespace mearm {
  
  let servos = [
    {minPulse: 530,  maxPulse: 2400, minAngle: -90, maxAngle: 90,  currentAngle: 0,  pin: AnalogPin.P13},
    {minPulse: 530,  maxPulse: 1450, minAngle: 0,   maxAngle: 90,  currentAngle: 45, pin: AnalogPin.P15},
    {minPulse: 530,  maxPulse: 2000, minAngle: 0,   maxAngle: 135, currentAngle: 67, pin: AnalogPin.P14},
    {minPulse: 1400, maxPulse: 2400, minAngle: 0,   maxAngle: 90,  currentAngle: 45, pin: AnalogPin.P16}
  ];
  
  let joystickPins = [AnalogPin.P0, AnalogPin.P1, AnalogPin.P1, AnalogPin.P3];

  /**
   * Implementation of moving a servo to a specific angle
   */
  function setServoAngle(servo: MearmServo, angle: number){
    let _servo = servos[servo];
    if(angle < _servo.minAngle){
      angle = _servo.minAngle;
    }else if(angle > _servo.maxAngle){
      angle = _servo.maxAngle;
    }
    _servo.currentAngle = angle;
    let pulseWidth = _servo.maxPulse - (((angle - _servo.minAngle) / (_servo.maxAngle - _servo.minAngle)) * (_servo.maxPulse - _servo.minPulse));

    //console.log("pulsewidth " + pulseWidth);

    pins.servoSetPulse(_servo.pin, pulseWidth);
  }

  /**
   * Move a servo to an absolute angle
   */
  //% weight=90
  //% blockId=move_to block="move|%servo=MearmServo|servo|to|%angle|degrees"
  export function moveToAngle(servo: MearmServo, angle: number){
    setServoAngle(servo, angle);
  }

  /**
   * Move a servo by a relative angle
   */
  //% weight=80
  //% blockId=move_by block="move|%servo=MearmServo|servo|by|%angle|degrees"
  export function moveByAngle(servo: MearmServo, angle: number){
    setServoAngle(servo, servos[servo].currentAngle + angle);
  }
  
  /**
   * Open the grip
   */
  //% weight=50
  //% blockId=open_grip block="open grip"
  export function openGrip(){
    setServoAngle(MearmServo.Grip, 90);
  }

  /**
   * Close the grip
   */
  //% weight=40
  //% blockId=close_grip block="close grip"
  export function closeGrip(){
    setServoAngle(MearmServo.Grip, 0);
  }

  /**
   * Returns the value of a joystick with zero at the centre point (-ve = left / down, +ve = right / up)
   */
  //% weight=30
  //% blockId=joystick_value block="%joystick=Joystick|joystick"
  export function joystick(joystick: Joystick): number {
    let value = pins.analogReadPin(joystickPins[joystick]);
    return value - 512;
  }
}