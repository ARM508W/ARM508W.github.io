---
title: "Capstone Project: RPi Pico I2C MUX Breakout Board
description: "The process of designing the custom PCB for the Pico W"
pubDate: "Feb 20 2025"
updatedDate: "Feb 21 2025"
heroImage: "/pico-pcb-ascii.png"
---

My reasoning and process for designing a custom PCB for the Raspberry Pico

## Reasoning
For certain component in my capstone project, I would need to be able to detect whenever an object was taken off the desk display. After looking at some of the possible methods, the method I ended up settling on was using magnets for the detecting method. The way it would work was by having a magnet sensor in the back of the desk with a magnet on the other side of it. I would then also attach a magnet on the object, so when the object's magnet connected to the desk magnet, the magnet sensor behind it would sense the change and could shift the desks theme to correspond with the object. Using this method for detection allowed for wireless and more seamless methods for quickly switching between object themes. 

Initially, to test out this method, I used one TLV493D magnetometer from Adafruit and the RP2040 QT PY board, which had a STEMMA QT port. This was to just test the feasibility of this method so all the microcontroller was programmed to do was to turn on its LED to green whenever a magnet was close by. After this test was performed, I decided this method would work and started to look into what would be needed to scale this up for the capstone project.

While this method would work great for the capstone project, some issues quickly became apparent. The first was the limitations with the magnetometers I2C addressing capitalize. With I2C devices, you are able to connect as many of them into a microcontroller as you can, as long as they don't have the same address, which in this case for the magnetometer was 0x5E. Some I2C sensors support the ability to change the address by soldering a jumper. The TLV493D did not have this ability, and even if it did, it wouldn't scale up once we add more than the supported address changes.
