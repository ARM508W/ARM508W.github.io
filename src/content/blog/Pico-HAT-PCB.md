---
title: "Capstone Project: RPi Pico I2C MUX Breakout Board"
description: "The timeline of designing the custom MUX breakout PCB for the Pico W"
pubDate: "Mar 10 2025"
updatedDate: "Mar 14 2025"
heroImage: "/pico-pcb-ascii.png"
---

My reasoning and process for designing a custom PCB for the Raspberry Pico microcontroller

## Reasoning
For certain components in my capstone project, I would need to be able to detect whenever an object was taken off the desk display. After looking at some of the possible methods, the method I ended up settling on was using magnets for the detecting method. The way it would work was by having a magnet sensor in the back of the desk with a magnet on the other side of it. I would then also attach a magnet on the object, so when the object's magnet connected to the desk magnet, the magnet sensor behind it would sense the change and could shift the desks theme to correspond with the object. Using this method for detection allowed for wireless and more seamless methods for quickly switching between object themes. 

Initially, to test out this method, I used one TLV493D magnetometer from Adafruit and the RP2040 QT PY board, which had a STEMMA QT port. This was to just test the feasibility of this method so all the microcontroller was programmed to do was to turn on its LED to green whenever a magnet was close by. After this test was performed, I decided this method would work and started to look into what would be needed to scale this up for the capstone project.

While this method would work great for the capstone project, some issues quickly became apparent. The first was the limitations with the magnetometers I2C addressing capitalize. With I2C devices, you are able to connect as many of them into a microcontroller as you can, as long as they don't have the same address, which in this case for the magnetometer was 0x5E. Some I2C sensors support the ability to change the address by soldering a jumper. The TLV493D did not have this ability, and even if it did, it wouldn't scale up once we add more than the supported address changes.

## Solution Brainstorming
To start off, I checked the available multiplexer devices that Adafruit and Sparkfun had on their store to see if they could work for the project. What I was looking for was a nice and compact MCU that had multiplexer and WiFi capabilities. With these requirements, I wasn't going to find something like this, so I was going to see if the boards with STEMMA connectors would be compact enough with a microcontroller that supports WiFi, such as the FeatherS2. 

![Alt text](/Adafruit_MUX.jpg)

While this fixed the problem of connecting the magnetometers into the microcontroller, two issues arose from this design.

### Size 
While the size of the multiplexer and microcontroller were small, when they were combined together, the footprint was unnecessarily big; the microcontroller would be connected to the multiplexer via the master STEMMA/QWIIC port, which meant the setup was either going to be long horizontally or vertically. Due to this increased size footprint, placing the magnetometers in the places I wanted to was very awkward or, at times, not possible. Another thing I needed to consider is how it would look if someone were to look at the back of the desk, which is where the microcontroller and multiplexer would be at. I didn't want the backside to look like a mess of wires and that reeks of 'simple prototype, will come up with a final design later' look. 

### ESP32 VS RP2040
For this ubiquitous desk component of the project, I decided on using the Raspberry Pi Pico W as the standard microcontroller. The reason for this was due to the versatility and price of the Pico W; there wasn't a microcontroller that could do and connect to nearly anything with WiFi at the price of around $6. The obvious downsides of this versatile microcontroller is that it lacked the features that a board sold from Adafruit for example, a STEMMA port, built-in Neopixel, etc. This meant that if I wanted to use a Pico W as the board the communicates with the magnetometers, I would need to instead solder on wires to both the Pico W and multiplexer, which would even further increase the size footprint, and ruin the aesthetics in the backside of the desk. Another issue that arises from splitting the multiplexer microcontroller from the RP2040 is the slight variations on WiFi and MQTT connections. Instead of using the same setup for handling the connection to the WiFi and MQTT broker on the Pico Ws on the desk, I would need to maintain a separate version of the ESP32. Later down the line could become an issue for debugging problems with the connections to the MQTT, and especially the MQTT broker as I noticed they have little differences between how they receive and publish messages. 

With these issues, I decided to look and research further into a possible solution or better alternative.

## Initial Concepts for custom RPI breakout multiplexer PCB
This is when I started to explore the idea of creating a custom breakout PCB for the Pico W. This would be a serious undertaking, and possibly overshadowing the original project. So I started to research the benefits and possible issues/roadblocks I could run into if I go down this path. 

### First PCB
I would be concepting, designing and testing my first ever PCB whilst a senior in high school. This would provide me some serious experience early on as I pursue a career in electrical engineering. The experience of having a circuit not just be a bunch of wires connected through a breadboard, but instead be a real circuit board has already been a dream of mine. This came with its obvious issues. Since this was my first PCB, there was going to be some learning-pains and roadblocks that I was going to run into. I also needed to keep in mind possible time-constraints, as I would the design to continue working on the project. 

### Flexibility and Control
By creating my own custom PCB for the multiplexer, I could decide what design components I would want that other multiplexer boards had, and what parts I could scrap as I wouldn't need them for the project. This also gave me the ability to add components to the Raspberry Pico that it otherwise wouldn't have, such as a built-in Neopixel. This, however, meant that I would need to handle things that I previously didn't need to handle; it wasn't going to be plug and play as the already made multiplexers from Adafruit and SparkFun. 

### Ascetics and Size Footprint
Having a custom PCB operating the magnetometers would be more impressive than using a bought board. This also allowed me to make the multiplexer more compact than the other two on the market as I could integrate the Pico W directly into the PCB, which is discussed later in the notebook in how I went about this. 
