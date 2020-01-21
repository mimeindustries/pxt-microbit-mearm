Blocks for MeArm micro:bit connector
====================================

Blocks that support the micro:bit connector board for the MeArm. The board has two two-axis joysticks on-board which are hooked up to pins P0 - P3. The click presses of the joysticks are hooked up to buttons A and B on the micro:bit. The USB connector on board will give the MeArm 5V to run the servos and feeds 3.3V into the micro:bit so that only one power supply is required. It is possible to connect both the micro:bit USB connection to program it and the main power supply at the same time as there is protection.

## API Documentation

* **moveToAngle** - Moves the specified servo to an absolute angle

```
  mearm.moveToAngle(MearmServo.Base, 90);
```

* **moveByAngle** - Moves the specified servo by a number of degrees (can be positive or negative)

```
  mearm.moveByAngle(MearmServo.Base, -5);
```

* **openGrip** - Opens the grip

```
  mearm.openGrip();
```

* **closeGrip** - Closes the grip

```
  mearm.closeGrip();
```

* **joystick** - Reads the specified joystick and returns a value between -512 and 512, with 0 being the joystick at rest

```
  mearm.joystick(Joystick.LeftHorizontal);
```

### Servo identifiers

 * **MearmServo.Base** - the base servo
 * **MearmServo.Right** - the servo on the right of the arm
 * **MearmServo.Left** - the servo of the left of the arm
 * **MearmServo.Grip** - the grip
 
### Joystick identifiers

 * **Joystick.LeftJoyX** - the horizontal axis of the left joystick
 * **Joystick.LeftJoyY** - the vertical axis of the left joystick
 * **Joystick.RightJoyX** - the horizontal axis of the right joystick
 * **Joystick.RightJoyY** - the vertical axis of the right joystick


## License

MIT

## Supported targets

 * for PXT/microbit

```package
mearm-microbit=github:mearm/pxt-microbit-mearm
```
