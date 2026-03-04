import fetch from 'node-fetch';

// REPLACE THIS WITH YOUR APPS SCRIPT URL
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxOCrQ5Q1GJTstUbQWIRGv8fLZcTXNXsLwzBRBElC8zsTVfmggbceruLCYQ9aGLkJR9/exec";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {1
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
}
