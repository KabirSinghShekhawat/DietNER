class Util {
    static parseFixedFloat(num, fixedTo = 2) {
        return parseFloat(Number(num).toFixed(fixedTo))
    }
}

class BMIUtil {
    static HEALTHY = 'healthy'
    static OVERWEIGHT = 'overweight'
    static UNDERWEIGHT = 'underweight'

    static healthyLow = 18.5
    static healthyHigh = 24.9
    static overweight = 25

    static CALORIES_PER_KG = 7700
    static CALORIES_CONSUMED_PER_DAY = 2500
    static MAX_CALORIES_BURNT_PER_DAY = 214

    static calculateBMI(weight, height) {
        return Util.parseFixedFloat(weight / Math.pow(height, 2))
    }

    static isHealthy(bmi) {
        if (bmi < BMIUtil.healthyLow) return BMIUtil.UNDERWEIGHT

        if (bmi >= BMIUtil.healthyLow && bmi <= healthyHigh) return BMIUtil.HEALTHY

        if (bmi >= BMIUtil.overweight) return BMIUtil.OVERWEIGHT
    }

    static caloriesToBurn(currWeight, height) {
        const targetBMI = BMIUtil.healthyHigh
        const deltaBMI = BMIUtil.calculateBMI(currWeight, height) - targetBMI
        const deltaWeight = deltaBMI * Math.pow(height, 2)

        return BMIUtil.CALORIES_PER_KG * deltaWeight
    }

    static dietForXDays(totalCalories) {
        let x = totalCalories / BMIUtil.MAX_CALORIES_BURNT_PER_DAY
        return x
    }
}


class DietUtil {
    static reducer(arr, field) {
        return Util.parseFixedFloat(arr.reduce((prev, next) => prev + next[field], 0))
    }
}

class DietRecommender {
    constructor(userProfile) {
        this.user = userProfile
    }

    calculateTotalNutritionalInfo() {
        const nutritionalValues = {}
        const diet = this.user.diet

        const fields = ["calories", "protein", "fat", "carbohydrates"]

        for (let field of fields) {
            nutritionalValues[field] = DietUtil.reducer(diet, field)
        }

        return nutritionalValues
    }

    recommendDiet(foods) {
        let totalCalories = 0
        const newDiet = []

        for (let food of foods) {
            const currentCal = food.energy.amount
            const randomNumber = Math.trunc(Math.random() * 100)

            if (randomNumber % 2 === 0) continue

            if (currentCal + totalCalories < BMIUtil.CALORIES_CONSUMED_PER_DAY) {
                totalCalories += currentCal
                newDiet.push(foodFactory(food))
            }
        }

        return newDiet

    }
}

function foodFactory(food) {
    return {
        _id: food._id,
        foodName: food.name,
        calories: food.energy.amount,
        protein: food.nutrients.protein.amount,
        fat: food.nutrients.fat.amount,
        carbohydrates: food.nutrients.carbohydrates.amount
    }
}

module.exports = DietRecommender
