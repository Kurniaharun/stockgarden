// API endpoint configuration
const API_ENDPOINT = '/api/stock'; // Update this with your actual API endpoint

// Function to update stock display
function updateStockDisplay(containerId, data) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (const [name, item] of Object.entries(data)) {
        const stockItem = document.createElement('div');
        stockItem.className = 'stock-item';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.EggName || name;
        
        const amountSpan = document.createElement('span');
        amountSpan.className = 'amount';
        amountSpan.textContent = `x${item.Stock}`;
        
        stockItem.appendChild(nameSpan);
        stockItem.appendChild(amountSpan);
        container.appendChild(stockItem);
    }
}

// Function to update weather display
function updateWeatherDisplay(data) {
    const container = document.getElementById('weather-container');
    container.innerHTML = `
        <div class="stock-item">
            <span>${data.event}</span>
            <span class="amount">Ends: ${new Date(data.endTime * 1000).toLocaleString()}</span>
        </div>
    `;
}

// Function to fetch and update all data
async function updateAllData() {
    try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        // Update each section
        if (data.seeds) updateStockDisplay('seeds-container', data.seeds);
        if (data.eggs) updateStockDisplay('eggs-container', data.eggs);
        if (data.gear) updateStockDisplay('gear-container', data.gear);
        if (data.cosmetic) updateStockDisplay('cosmetic-container', data.cosmetic);
        if (data.weather) updateWeatherDisplay(data.weather);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update data every 30 seconds
setInterval(updateAllData, 30000);

// Initial data load
updateAllData(); 