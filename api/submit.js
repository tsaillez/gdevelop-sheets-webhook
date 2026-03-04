const fetch = require('node-fetch');

// REPLACE THIS WITH YOUR APPS SCRIPT URL (ends in /exec)
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxOCrQ5Q1GJTstUbQWIRGv8fLZcTXNXsLwzBRBElC8zsTVfmggbceruLCYQ9aGLkJR9/exec";

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;

    // Validate data
    if (!payload.PPID || !payload.trials) {
      return res.status(400).json({
        error: "Missing PPID or trials in payload"
      });
    }

    // Send to Google Sheets
    const response = await fetch(SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Failed to send to Sheets:", response.statusText);
      return res.status(500).json({
        error: "Failed to send data to Google Sheets",
        details: response.statusText
      });
    }

    console.log("Data sent to Sheets for PPID:", payload.PPID);
    res.status(200).json({
      status: "success",
      message: "Data sent to Google Sheets",
      ppid: payload.PPID
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error: "Server error",
      message: error.toString()
    });
  }
};
