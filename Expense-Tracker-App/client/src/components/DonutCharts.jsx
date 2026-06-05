import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ expenses }) => {

    // 🔥 category-wise total निकालना
    const categoryTotals = {
        food: 0,
        travel: 0,
        shopping: 0,
        others: 0
    };

    expenses.forEach((exp) => {
        const cat = exp.category.toLowerCase();
        categoryTotals[cat] += Number(exp.amount);
    });

    const data = {
        labels: ["Food", "Travel", "Shopping", "Others"],
        datasets: [
            {
                label: "Expenses",
                data: [
                    categoryTotals.food,
                    categoryTotals.travel,
                    categoryTotals.shopping,
                    categoryTotals.others
                ],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0"
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        cutout: "70%",
    };

    return (
        <div style={{ width: "300px" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
};

export default DonutChart;