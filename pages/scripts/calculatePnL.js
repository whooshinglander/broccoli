// scripts/calculatePnL.js
const fs = require('fs');
const path = require('path');

// Define file paths
const tradesFile = path.join(__dirname, '../data/trades.json');
const pricesFile = path.join(__dirname, '../data/last_prices.json');

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

// Calculate PnL for each ticker
function calculatePnL() {
  const trades = loadJSON(tradesFile);
  const lastPrices = loadJSON(pricesFile);
  if (!trades || !lastPrices) return;

  const pnlResults = trades.reduce((acc, trade) => {
    const { ticker, volume, price: purchasePrice } = trade;
    const currentPrice = lastPrices[ticker];
    if (currentPrice === null || currentPrice === undefined) {
      console.warn(`No current price for ${ticker}`);
      return acc;
    }

    const pnl = (currentPrice - purchasePrice) * volume;
    if (!acc[ticker]) acc[ticker] = { totalPnL: 0, totalVolume: 0 };
    acc[ticker].totalPnL += pnl;
    acc[ticker].totalVolume += volume;

    return acc;
  }, {});

  console.log("PnL Results:");
  Object.entries(pnlResults).forEach(([ticker, { totalPnL, totalVolume }]) => {
    console.log(`${ticker}: PnL = ${totalPnL.toFixed(2)}, Volume = ${totalVolume}`);
  });
}

calculatePnL();
