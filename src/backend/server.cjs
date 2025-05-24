// server.js
const express = require("express");
const ModbusRTU = require("modbus-serial");
const app = express();
const client = new ModbusRTU();

const DIRIS_IP = "192.168.0.100"; // Your A-30’s IP
const MODBUS_PORT = 502;
const UNIT_ID = 1; // Slave address

app.get("/api/voltage", async (req, res) => {
  try {
    await client.connectTCP(DIRIS_IP, { port: MODBUS_PORT });
    client.setID(UNIT_ID);
    const { data } = await client.readHoldingRegisters(3000, 2);
    res.json({ registers: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    client.close();
  }
});

app.listen(3001, () => console.log("Bridge running on http://localhost:3001"));
