#include <Arduino_JSON.h>

const int joyXPin = A0;
const int joyYPin = A1;
const int switchPin = 2;
const int maxCalibrationFrames = 3;

float xValue, yValue;
int startX, startY;
float pXValue = -1, pYValue = -1;
float alpha = 0.2;
int calibrationFrames = 0;

JSONVar sensorData;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(38400);

  pinMode(switchPin, INPUT);
  digitalWrite(switchPin, HIGH);
}

void loop() {
  xValue = analogRead(joyXPin);
  yValue = analogRead(joyYPin);

  if (pXValue == -1) {
    pXValue = xValue;
    pYValue = yValue;
  }

  xValue = pXValue + alpha*(xValue - pXValue);
  yValue = pYValue + alpha*(yValue - pYValue);
  
  if (calibrationFrames < maxCalibrationFrames) {
    calibrationFrames++;
    startX = xValue;
    startY = yValue;
  }
  else {
    sensorData["x"] = (int) (xValue - startX);
    sensorData["y"] = (int) (yValue - startY);
    sensorData["sw"] = digitalRead(switchPin) == LOW;

    Serial.println(sensorData);
  }

  pXValue = xValue;
  pYValue = yValue;
}
