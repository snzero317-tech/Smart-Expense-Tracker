let transactions = JSON.parse(localStorage.getItem('txns')) || [];
const api_url = "https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD"; // Replace with your key

async function convertCurrency() {
    const currency = document.getElementById('currency-api').value;
    // Logic to fetch conversion rates and update the UI labels
    alert("Switching to " + currency + "... (Connect API Key in script.js for live rates)");
}

function updateUI() {
    const list = document.getElementById('transaction-list');
    const balance = document.getElementById('total-balance');
    const income = document.getElementById('income-val');
    const expense = document.getElementById('expense-val');

    list.innerHTML = '';
    
    let total = 0, inc = 0, exp = 0;

    transactions.forEach((t, index) => {
        const sign = t.amount < 0 ? '-' : '+';
        const item = document.createElement('li');
        item.classList.add('transaction-item', 'animate-slide-up');
        
        item.innerHTML = `
            <div>
                <strong>${t.desc}</strong><br>
                <small style="color:#aaa">${t.cat}</small>
            </div>
            <span style="color: ${t.amount < 0 ? '#e74c3c' : '#2ecc71'}">
                ${sign}$${Math.abs(t.amount)}
            </span>
        `;
        list.appendChild(item);

        total += t.amount;
        if(t.amount > 0) inc += t.amount;
        else exp += t.amount;
    });

    balance.innerText = $${total.toFixed(2)};
    income.innerText = $${inc.toFixed(2)};
    expense.innerText = $${Math.abs(exp).toFixed(2)};

    updateChart(inc, Math.abs(exp));
}

function addTransaction() {
    const desc = document.getElementById('desc').value;
    const amt = document.getElementById('amt').value;
    const cat = document.getElementById('cat').value;

    if(!desc || !amt) return alert("Please fill details");

    transactions.push({ desc, amount: +amt, cat });
    localStorage.setItem('txns', JSON.stringify(transactions));
    updateUI();
    toggleModal();
}

function toggleModal() {
    const modal = document.getElementById('modal');
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

// Chart.js with dynamic updates
let myChart;
function updateChart(inc, exp) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    if (myChart) myChart.destroy();
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                data: [inc, exp],
                backgroundColor: ['#2ecc71', '#e74c3c'],
                hoverOffset: 4,
                borderWidth: 0
            }]
        },
        options: {
            plugins: { legend: { labels: { color: 'white' } } }
        }
    });
}

updateUI();