"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scan() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualSerialNumber, setManualSerialNumber] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        // Ensure that `qrbox` is not provided or set to null for live camera scanning
        fps: 5,
        qrbox: 250,
      },
      true,
    );

    let isScanning = true;

    scanner.render(success, error);

    function success(result: any) {
      if (isScanning) {
        scanner.clear();
        setScanResult(result);
        isScanning = false; // Set isScanning to false to stop further scanning
      }
    }

    function error(err: any) {
      console.warn(err);
    }

    return () => {
      scanner.clear(); // Ensure scanner is stopped when component unmounts
    };
  }, []);

  function handleManualSerialNumberChange(event :any) {
    setManualSerialNumber(event.target.value);
  }

  return (
    <div className="App">
      <h1>QR Scanning Code</h1>
      {scanResult ? (
        <div>
          <p>
            Success: <a href={scanResult}>{scanResult}</a>
          </p>
          <p>Serial Number: {scanResult.slice(-16)}</p>
        </div>
      ) : (
        <div>
          <div id="reader"></div>
          <p className="center-text">Or enter the serial number manually:</p>
          <div className="center-input">
            <input
              type="text"
              value={manualSerialNumber}
              onChange={handleManualSerialNumberChange}
            />
            {manualSerialNumber && (
              <p>Serial Number: {manualSerialNumber.slice(-16)}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Scan;
