enum MearmServo {
  //% block="Base"
  Base = 0,
  //% block="Right"
  Right = 1,
  //% block="Left"
  Left = 2,
  //% block="Grip"
  Grip = 3
}

enum Joystick {
  //% block="Left JoyX"
  LeftJoyX = 0,
  //% block="Left JoyY"
  LeftJoyY = 1,
  //% block="Right JoyY"
  RightJoyY = 2,
  //% block="Right JoyX"
  RightJoyX = 3
}

/**
 * Control the MeArm from the micro:bit
 */
//% weight=80 color=#00A3E0
namespace mearm {
  
  let servos = [
    {minPulse: 600,  maxPulse: 2400, minAngle: 0,   maxAngle: 180,  currentAngle: 999, pin: AnalogPin.P13, joystick: AnalogPin.P0, direction: 1},
    {minPulse: 1050, maxPulse: 2400, minAngle: 0,   maxAngle: 135,  currentAngle: 999, pin: AnalogPin.P15, joystick: AnalogPin.P1, direction: 1},
    {minPulse: 800,  maxPulse: 2100, minAngle: 30,   maxAngle: 160, currentAngle: 999, pin: AnalogPin.P14, joystick: AnalogPin.P2, direction: 1},
    {minPulse: 1500, maxPulse: 2400, minAngle: 0,   maxAngle: 90,  currentAngle: 999, pin: AnalogPin.P16, joystick: AnalogPin.P3, direction: 1}
  ];

  // Disable the LEDs
  led.enable(false);
  
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
    if(angle !== _servo.currentAngle){
      _servo.currentAngle = angle;
      let pulseWidth = _servo.maxPulse - ((angle - _servo.minAngle) * (_servo.maxPulse - _servo.minPulse)) / (_servo.maxAngle - _servo.minAngle);

      pins.servoSetPulse(_servo.pin, pulseWidth);
    }
  }

  /**
   * Move a servo to an absolute angle
   */
  //% weight=90
  //% blockId=move_to block="move|%servo=MearmServo|to|%angle|degrees"
  export function moveToAngle(servo: MearmServo, angle: number){
    setServoAngle(servo, angle);
  }

  /**
   * Move a servo by a relative angle
   */
  //% weight=80
  //% blockId=move_by block="move|%servo=MearmServo|by|%angle|degrees"
  export function moveByAngle(servo: MearmServo, angle: number){
    setServoAngle(servo, servos[servo].currentAngle + angle);
  }

  /**
   * Move a servo to centre (90 deg for easier calibration)
   */
  //% weight=70
  //% blockId=move_to_centre block="move|%servo=MearmServo|to centre position"
  export function moveToCentre(servo: MearmServo){
    setServoAngle(servo, 90);
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
   * Returns the value of a joystick as a percentage with zero at the centre point (-ve = left / down, +ve = right / up)
   */
  //% weight=30
  //% blockId=joystick_value block="%joystick=Joystick|joystick"
  export function joystick(joystick: Joystick): number {
    // cutoffs to factor out off-centre resistor divider
    let lowCutoff = 20;
    let highCutoff = 505;

    // Enable the joystick going into P3 so it doesn't affect the LEDs
    if(joystick === Joystick.RightJoyX){
      pins.digitalWritePin(DigitalPin.P12, 1);
    }
    // Read the value
    let rawValue = pins.analogReadPin(servos[joystick].joystick);
    // Disable again
    if(joystick === Joystick.RightJoyX){
      pins.digitalWritePin(DigitalPin.P12, 0);
    }

    // Turn into a percentage
    let centred = rawValue - 512;
    let direction = centred < 0 ? -1 : 1;
    let absolute = centred * direction;
    let val = absolute - lowCutoff;

    if(val < 0){
      val = 0;
    }else if(val > highCutoff - lowCutoff){
      val = highCutoff - lowCutoff;
    }

    let percentage = (servos[joystick].direction * direction * val * 100) / (highCutoff - lowCutoff);

    return percentage;
  }
}
