Mobile Programming Assignment Drawer and Bottom and Nested Navigations - IT3R10
##
Mobile Programming

#include <LiquidCrystal_I2C.h>
#include <SoftwareSerial.h>

// LCD Initialization
LiquidCrystal_I2C lcd(0x27, 16, 2);

// HC-05 Bluetooth
SoftwareSerial bluetooth(10, 11); // RX, TX for HC-05

// Relay pin
const int relayPin = 2;

// Flags for manual/automatic mode
bool manualMode = false;
bool motorState = false; // To track motor state (ON/OFF)

void setup() {
  // Initialize serial communication
  Serial.begin(9600);          // Debugging via Serial Monitor
  bluetooth.begin(9600);       // HC-05 default baud rate

  // Initialize LCD
  lcd.init();
  lcd.backlight();
  lcd.clear();

  // Set relay pin as output and turn it off initially
  pinMode(relayPin, OUTPUT);
  digitalWrite(relayPin, HIGH);

  // Display startup message
  lcd.setCursor(0, 0);
  lcd.print("Synchro AWAS");
  lcd.setCursor(0, 1);
  lcd.print("Initializing...");
  delay(3000);
  lcd.clear();

  // System ready message
  lcd.setCursor(0, 0);
  lcd.print("IRRIGATION");
  lcd.setCursor(0, 1);
  lcd.print("SYSTEM IS ON");
  delay(3000);
  lcd.clear();

  Serial.println("System Initialized");
}

void loop() {
  // Check if Bluetooth data is available
  if (bluetooth.available()) {
    String command = bluetooth.readStringUntil('\n'); // Read command from Bluetooth
    command.trim(); // Remove any whitespace
    Serial.println("Command received: " + command);

    // Handle Bluetooth commands
    if (command == "ON") {
      manualMode = true;
      motorState = true; // Update motor state
      digitalWrite(relayPin, LOW); // Turn on pump
      lcd.setCursor(0, 0);
      lcd.print("Manual Mode: ON ");
      Serial.println("Pump turned ON manually");
    } else if (command == "OFF") {
      manualMode = true;
      motorState = false; // Update motor state
      digitalWrite(relayPin, HIGH); // Turn off pump
      lcd.setCursor(0, 0);
      lcd.print("Manual Mode: OFF");
      Serial.println("Pump turned OFF manually");
    } else if (command == "AUTO") {
      manualMode = false;
      lcd.setCursor(0, 0);
      lcd.print("Mode: Automatic ");
      Serial.println("Switched to Automatic Mode");
    }
  }

  // Automatic irrigation system (only active in AUTO mode)
  if (!manualMode) {
    int value = analogRead(A0); // Read moisture sensor value
    Serial.print("Moisture Value: ");
    Serial.println(value);

    // Relay control and status display
    if (value > 800) {
      digitalWrite(relayPin, LOW); // Activate pump (relay on)
      motorState = true;          // Update motor state
    } else {
      digitalWrite(relayPin, HIGH); // Deactivate pump (relay off)
      motorState = false;          // Update motor state
    }

    // Update LCD with motor status
    lcd.setCursor(0, 0);
    if (motorState) {
      lcd.print("Water Pump: ON ");
    } else {
      lcd.print("Water Pump: OFF");
    }

    // Moisture level display
    lcd.setCursor(0, 1);
    if (value < 300) {
      lcd.print("Moisture: HIGH ");
    } else if (value <= 950) {
      lcd.print("Moisture: MID  ");
    } else {
      lcd.print("Moisture: LOW  ");
    }
  }

  delay(500); // Small delay for sensor stability
}
