"use client";
import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { UPIObject, getUPILink, parseUPILink } from "upi-parser";
import { Button } from "../about/Button";

function Scan() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualSerialNumber, setManualSerialNumber] = useState("");
  const [scanStart, setscanStart] = useState(false);
  const [showform, setshowform] = useState(false);
  const [payLink, setpayLink] = useState("");
  const [payDetails, setpayDetails] = useState<UPIObject>({
    merchantName: "",
    merchantCode: "",
    merchantId: "",
    currency: "",
    amount: "",
    tn: "",
  });

  var message: string, amount: string, paymentlink: string;

  function changePayLink(amount: string, message: string) {
    const upiLINK = getUPILink(payDetails, amount, message);
    setpayLink(upiLINK);
     
    alert(upiLINK);
  }

  function handleInputChange(e: any) {
    if (e.target.name === "amount") {
      amount = e.target.value;
      console.log(amount);
      alert(amount);
    }
    if (e.target.name === "msg") {
      message = e.target.value;
      console.log(message);
      alert(message);
    }

    changePayLink(amount, message);
  }

  function handleUPI(upiLink: string) {
    const upiObj = parseUPILink(upiLink);
    console.log(upiObj);
    if (upiObj != null) {
      setpayDetails(upiObj);
    }
    alert(upiObj?.merchantName);

    setshowform(true);
  }

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
        handleUPI(result);
      }
    }

    function error(err: any) {
      console.warn(err);
    }

    return () => {
      scanner.clear(); // Ensure scanner is stopped when component unmounts
    };
  }, [scanStart]);

  function handleManualSerialNumberChange(event: any) {
    setManualSerialNumber(event.target.value);
  }

  function handleScan() {
    setscanStart(true);
    setScanResult(null);
  }

  return (
    <div className="scan">
      <h1>Scan QR Code To Pay</h1>
      {scanResult ? (
        <div>
          <form>
            <div>kumar</div>
          </form>
          <a href={scanResult}>
            <button className="btn pay">Pay Now</button>
          </a>
          <p>
            Success: <a href={scanResult}>{scanResult}</a>
          </p>

          <div>
            {showform ? (
              <div>
                <form>
                  <div>
                    <label htmlFor="amount">Enter Amount</label>
                    <input
                      type="number"
                      name="amount"
                      onChange={handleInputChange}
                      value={amount}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="msg">Enter Message</label>
                    <input
                      type="text"
                      name="msg"
                      onChange={handleInputChange}
                      value={message}
                    ></input>
                  </div>
                  <a href={payLink}>
                    <button>Pay Now</button>
                  </a>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
          <button onClick={handleScan} style={{ marginTop: "3rem" }}>
            Scan Again
          </button>
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
