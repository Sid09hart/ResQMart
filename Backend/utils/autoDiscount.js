// utils/autoDiscount.js
module.exports = function autoDiscount(expiryDate, basePrice) {
    const daysLeft = Math.ceil((new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24));

    let discountRate = 0; // This is the discount percentage

    if (daysLeft <= 1) {
        discountRate = 0.5; // 50% off for items expiring within 1 day
    } else if (daysLeft <= 3) {
        discountRate = 0.3; // 30% off for items expiring within 3 days
    } else if (daysLeft <= 7) {
        discountRate = 0.15; // 15% off for items expiring within a week
    }
    // No discount is applied for items expiring in more than 7 days

    const discountedPrice = basePrice * (1 - discountRate);
    
    // Round to 2 decimal places to handle cents correctly
    return Math.round(discountedPrice * 100) / 100;
}