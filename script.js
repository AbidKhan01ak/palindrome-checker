const txtInput = document.querySelector(".inputs input"),
    checkBtn = document.querySelector(".inputs button"),
    infoTxt = document.querySelector(".info-txt"),
    historyList = document.querySelector(".history ul"),
    downloadBtn = document.querySelector(".download-btn"),
    factTxt = document.querySelector(".fact-txt");
let filterInput;

// Palindrome fun facts array
const funFacts = [
    "The longest single-word palindrome in the Oxford English Dictionary is 'tattarrattat', coined by James Joyce.",
    "The word 'palindrome' was coined by the English playwright Ben Jonson in the 17th century.",
    "'Aibohphobia' is a humorous term for the fear of palindromes.",
    "There are palindromic dates, such as 02-02-2020, that read the same backward and forward.",
    "In the game of chess, the palindrome 'deified' can represent a position that looks the same on both sides.",
    "A palindrome is a word, phrase, number, or sequence that reads the same backward as forward.",
    "The term 'palindrome' comes from the Greek words 'palin' (again) and 'dromos' (way or direction).",
    "Palindromes exhibit perfect symmetry in their structure, making them unique and aesthetically pleasing.",
    "Common word palindromes include 'madam', 'level', 'radar', and 'racecar'.",
    "Palindrome phrases include 'A man, a plan, a canal, Panama!' and 'Able was I, I saw Elba.'",
    "Numbers like 121, 1331, and 12321 are palindromes. They remain the same when reversed.",
    "Certain dates are palindromes, such as 02/02/2020 or 12/02/2021 (depending on the date format used).",
    "In DNA, sequences like GAATTC (which reads the same backward on the complementary strand) are palindromic and play important roles in genetics.",
    "'Tattarrattat', coined by James Joyce in *Ulysses*, is one of the longest single-word palindromes.",
    "Palindromes exist in almost every language, including Hindi ('नयन'), Malayalam ('മലയാളം'), and Arabic ('تات').",
    "In mathematics, palindromic primes are prime numbers that are also palindromes, like 131 or 929.",
    "Checking whether a string is a palindrome is a popular programming problem, often used in coding interviews.",
    "Some poets write entire poems as palindromes, where each line or the whole poem reads the same backward.",
    "When the date forms a palindrome for 10 consecutive days (e.g., 8/10/18 to 8/19/18 in MM/DD/YY format), it's celebrated as Palindrome Week!",
    "Some natural phenomena, such as cyclic processes, have palindromic properties.",
    "Palindromes often appear in puzzles, word games, and even fictional names, such as 'Otto' or 'Hannah'.",
    "Some musical compositions are written to be palindromes, playing the same forward and backward.",
    "Palindromes are an example of how symmetry and patterns can be used creatively in different fields, including design and cryptography."
];


// Function to display a random fun fact
const displayFunFact = () => {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    factTxt.textContent = funFacts[randomIndex];
};


// Helper function to find the longest palindrome in a string
function findLongestPalindrome(text) {
    let longest = "";
    for (let i = 0; i < text.length; i++) {
        for (let j = i; j < text.length; j++) {
            let substring = text.slice(i, j + 1).toLowerCase().replace(/[^a-z0-9]/gi, "");
            if (substring === substring.split("").reverse().join("") && substring.length > longest.length) {
                longest = substring;
            }
        }
    }
    return longest;
}

const historyMap = new Map();

// Event listener for the "Check Palindrome" button
checkBtn.addEventListener("click", () => {
    let reverseInput = filterInput.split("").reverse().join("");
    infoTxt.style.display = "block";

    if (filterInput !== reverseInput) {
        infoTxt.innerHTML = `No, <span>'${txtInput.value}'</span> isn't a palindrome!`;
    } else {
        infoTxt.innerHTML = `Yes, <span>'${txtInput.value}'</span> is a palindrome!`;
    }

    // Find and display the longest palindrome
    let longestPalindrome = findLongestPalindrome(txtInput.value);
    if (longestPalindrome) {
        infoTxt.innerHTML += `<br>Longest Palindrome: <span>'${longestPalindrome}'</span>`;
    }

    const inputText = txtInput.value;
    const result = (filterInput === reverseInput) ? "is a palindrome!" : "isn't a palindrome!";
    const historyKey = `${inputText}: ${result}`;

    // Update history map
    if (historyMap.has(historyKey)) {
        historyMap.set(historyKey, historyMap.get(historyKey) + 1);
    } else {
        historyMap.set(historyKey, 1);
    }

    // Update history UI
    historyList.innerHTML = "";
    historyMap.forEach((count, key) => {
        historyList.innerHTML += `<li>${key} Checked ${count} time${count > 1 ? "s" : ""}.</li>`;
    });

    displayFunFact();
});

// Live checking as the user types
txtInput.addEventListener("keyup", () => {
    filterInput = txtInput.value.toLowerCase().replace(/[^a-z0-9]/gi, "");
    if (filterInput) {
        checkBtn.classList.add("active");
    } else {
        infoTxt.style.display = "none";
        checkBtn.classList.remove("active");
    }
});

// Download history
downloadBtn.addEventListener("click", () => {
    let historyItems = Array.from(historyList.children).map(item => item.textContent).join("\n");
    const blob = new Blob([historyItems], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "palindrome_history.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
