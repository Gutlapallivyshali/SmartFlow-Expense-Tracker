const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const list = document.getElementById("list");

const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");
const typeInput = document.getElementById("type");
const filterDate = document.getElementById("filter-date");
const addBtn = document.getElementById("add-btn");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// UPDATE UI
function updateUI(filtered = transactions) {
    list.innerHTML = "";
    let income = 0, expense = 0;

    filtered.forEach(t => {
        if (t.type === "income") income += t.amount;
        else expense += t.amount;

        const li = document.createElement("li");
        li.className = t.type;
        li.textContent = `${t.title} - ₹${t.amount} (${t.date})`;
        list.appendChild(li);
    });

    incomeEl.textContent = income;
    expenseEl.textContent = expense;
    balanceEl.textContent = income - expense;
}

// ADD TRANSACTION
addBtn.addEventListener("click", () => {
    const title = titleInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;
    const type = typeInput.value;

    if (!title || !amount || !date) {
        alert("Fill all fields");
        return;
    }

    transactions.push({ title, amount, date, type });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    titleInput.value = "";
    amountInput.value = "";
    dateInput.value = "";

    updateUI();
});

// FILTER BY DATE
filterDate.addEventListener("change", () => {
    const filtered = transactions.filter(t => t.date === filterDate.value);
    updateUI(filtered);
});

// INITIAL LOAD
updateUI();
