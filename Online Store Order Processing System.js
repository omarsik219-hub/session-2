/**
 * 
 * @param {Array} orders 
 * @returns {Object} 
 */
function processOrders(orders) {
    let totalRevenue = 0;
    let successfulOrders = 0;
    let processedCount = 0;         
    let consecutiveSkips = 0;
    let totalStockFailures = 0;

    for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        processedCount++;

       
        const isInvalid = (order.status === "cancelled" || order.status === "invalid");
        const stockUnavailable = (order.stockAvailable === false);

        if (isInvalid || stockUnavailable) {
            
            consecutiveSkips++;
            if (stockUnavailable) {
                totalStockFailures++;
            }

           
            if (consecutiveSkips >= 3 || totalStockFailures >= 3) {
                return {
                    totalRevenue,
                    successfulOrders,
                    processedCount,
                    stopMessage: "System stopped due to critical failure"
                };
            }
            continue;  
        }

        totalRevenue += order.amount;
        successfulOrders++;
        consecutiveSkips = 0;  
    }

   
    return {
        totalRevenue,
        successfulOrders,
        processedCount
       
    };
}

const orders = [
    { id: 1, status: "valid", stockAvailable: true, amount: 100 },
    { id: 2, status: "cancelled", stockAvailable: true, amount: 50 },
    { id: 3, status: "valid", stockAvailable: false, amount: 200 },
    { id: 4, status: "invalid", stockAvailable: true, amount: 30 },
    { id: 5, status: "valid", stockAvailable: true, amount: 75 },
];

console.log(processOrders(orders));