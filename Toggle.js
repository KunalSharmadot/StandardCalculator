const historyBtn = document.querySelector("#history");
const historyContent = document.querySelector("#history-section");
const memoryBtn = document.querySelector("#memory");
const memoryContent = document.querySelector("#memory-section");

memoryBtn.classList.remove("active");
historyBtn.classList.add("active"); // make History active on load

memoryBtn.addEventListener('click', () => {
    // body.classList.remove("historyContent");
    memoryContent.style.display = "block";
    historyContent.style.display = "none";
    memoryBtn.classList.add("active");
    historyBtn.classList.remove("active");
})

historyBtn.addEventListener('click', () => {
    // body.classList.remove("historyContent");
    memoryContent.style.display = "none";
    historyContent.style.display = "block";
    historyBtn.classList.add("active");
    memoryBtn.classList.remove("active");
})

let history = [];
const historyList = document.querySelector("#history-list");

function addToHistory(expression, result) {
    history.push({ expression, result })

    const div = document.createElement("div");
    div.className = "history-item";
    div.textContent = `${expression} = ${result}`;
    
    historyList.appendChild(div);
}