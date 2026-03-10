const validateWeight = (weight) => {
    if (typeof weight !== 'number' || isNaN(weight)) {
        return false;
    }

    return weight > 0;
};

const validateWeightRange = (weight, minWeight = 0.1, maxWeight = 10000) => {
    if (typeof weight !== 'number' || isNaN(weight)) {
        return false;
    }

    return weight >= minWeight && weight <= maxWeight;
};

const getMaxWeightByCategory = (category) => {
    const maxWeightsByCategory = {
        'Mamífero': 6000,
        'Ave': 150,
        'Reptil': 1000,
        'Anfibio': 10,
        'Pez': 2000
    };

    return maxWeightsByCategory[category] || 1000;
};

module.exports = {
    validateWeight,
    validateWeightRange,
    getMaxWeightByCategory
};