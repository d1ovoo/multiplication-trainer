// ===========================
// STATE MANAGEMENT
// ===========================
const state = {
    currentProblem: null,
    sessionSolves: [],
    timerInterval: null,
    timerStartTime: null,
    isTimerRunning: false,
    practiceStarted: false,
};

// ===========================
// STORAGE KEYS
// ===========================
const STORAGE_KEYS = {
    HISTORY: 'multiplicationHistory',
    THEME: 'selectedTheme',
};

// ===========================
// INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadHistory();
    updateStatistics();
    updateSessionStats();
    setupThemeSelector();
});

function initializeApp() {
    loadHistory();
    updateSessionStats();
    // Show initial state with Generate button
    showInitialState();
    // Load saved theme
    loadSavedTheme();
}

function setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', switchTab);
    });

    document.getElementById('generateBtn').addEventListener('click', startPractice);
    document.getElementById('submitBtn').addEventListener('click', submitAnswer);
    document.getElementById('answerInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitAnswer();
    });
    document.getElementById('newProblemBtn').addEventListener('click', nextProblem);
    document.getElementById('resetSessionBtn').addEventListener('click', resetSession);
    document.getElementById('clearHistoryBtn').addEventListener('click', clearAllData);

    document.getElementById('answerInput').focus();
}

// ===========================
// THEME SYSTEM
// ===========================
const THEMES = {
    cafe: {
        name: 'cafe',
        color: 'linear-gradient(135deg, #a89968, #8a7a54)'
    },
    strawberry: {
        name: 'strawberry',
        color: 'linear-gradient(135deg, #ff6b7a, #dd5a68)'
    },
    creamsicle: {
        name: 'creamsicle',
        color: 'linear-gradient(135deg, #ffb366, #dd9952)'
    },
    iv_clover: {
        name: 'iv_clover',
        color: 'linear-gradient(135deg, #7a7a7a, #6b6b6b)'
    },
    alpine: {
        name: 'alpine',
        color: 'linear-gradient(135deg, #b8a998, #9a8b7a)'
    },
    striker: {
        name: 'striker',
        color: 'linear-gradient(135deg, #4a90e2, #3a7acc)'
    },
    serika_dark: {
        name: 'serika_dark',
        color: 'linear-gradient(135deg, #e4c4a0, #c4a480)'
    },
    repose_dark: {
        name: 'repose_dark',
        color: 'linear-gradient(135deg, #b3aa93, #9a9a83)'
    },
    sonokai: {
        name: 'sonokai',
        color: 'linear-gradient(135deg, #a3d900, #8abe00)'
    },
    viridescent: {
        name: 'viridescent',
        color: 'linear-gradient(135deg, #6b9f79, #5a8f68)'
    }
};

function setupThemeSelector() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            if (theme) {
                setTheme(theme);
            }
        });
    });
}

function setTheme(themeName) {
    // Set the data-theme attribute on root
    document.documentElement.setAttribute('data-theme', themeName);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.THEME, themeName);
    
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('active');
        }
    });
}

function loadSavedTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || 'cafe';
    setTheme(savedTheme);
}

// ===========================
// INITIAL STATE
// ===========================
function showInitialState() {
    // Hide problem display
    document.getElementById('num1').textContent = '--';
    document.getElementById('num2').textContent = '--';
    
    // Reset input
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').disabled = true;
    
    // Reset timer
    resetTimer();
    
    // Clear feedback
    clearFeedback();
    
    // Update button states
    document.getElementById('generateBtn').disabled = false;
    document.getElementById('newProblemBtn').disabled = true;
    document.getElementById('submitBtn').disabled = true;
    
    state.practiceStarted = false;
}

function startPractice() {
    state.practiceStarted = true;
    generateNewProblem();
    document.getElementById('generateBtn').style.display = 'none';
    document.getElementById('newProblemBtn').style.display = 'inline-block';
}

// ===========================
// TAB SWITCHING
// ===========================
function switchTab(e) {
    const tabName = e.target.closest('.tab-btn').dataset.tab;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.closest('.tab-btn').classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    if (tabName === 'statistics') {
        updateStatistics();
    }

    if (tabName === 'practice') {
        setTimeout(() => {
            document.getElementById('answerInput').focus();
        }, 100);
    }
}

// ===========================
// PROBLEM GENERATION
// ===========================
function generateNewProblem() {
    const num1 = Math.floor(Math.random() * 90) + 10;
    const num2 = Math.floor(Math.random() * 90) + 10;

    state.currentProblem = {
        num1,
        num2,
        answer: num1 * num2,
        startTime: Date.now(),
    };

    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;

    stopTimer();
    resetTimer();
    clearFeedback();

    const input = document.getElementById('answerInput');
    input.value = '';
    input.disabled = false;
    input.focus();

    // Enable submit button
    document.getElementById('submitBtn').disabled = false;
    document.getElementById('newProblemBtn').disabled = true;

    startTimer();
}

function nextProblem() {
    generateNewProblem();
}

// ===========================
// TIMER LOGIC
// ===========================
function startTimer() {
    state.timerStartTime = Date.now();
    state.isTimerRunning = true;

    state.timerInterval = setInterval(() => {
        const elapsed = (Date.now() - state.timerStartTime) / 1000;
        document.getElementById('timer').textContent = elapsed.toFixed(2) + 's';
    }, 10);
}

function stopTimer() {
    if (state.timerInterval) {
        clearInterval(state.timerInterval);
        state.isTimerRunning = false;
    }
}

function resetTimer() {
    document.getElementById('timer').textContent = '0.00s';
}

function getElapsedTime() {
    return (Date.now() - state.timerStartTime) / 1000;
}

// ===========================
// ANSWER SUBMISSION
// ===========================
function submitAnswer() {
    if (!state.currentProblem) return;

    const userAnswer = parseInt(document.getElementById('answerInput').value);

    if (isNaN(userAnswer)) {
        showFeedback('Please enter a valid number', 'incorrect');
        return;
    }

    stopTimer();
    const elapsedTime = getElapsedTime();

    if (userAnswer === state.currentProblem.answer) {
        showFeedback('✓ Correct!', 'correct');

        const solve = {
            num1: state.currentProblem.num1,
            num2: state.currentProblem.num2,
            answer: state.currentProblem.answer,
            userAnswer,
            time: elapsedTime,
            timestamp: new Date().toISOString(),
            correct: true,
        };

        state.sessionSolves.push(solve);
        saveToHistory(solve);
        updateSessionStats();

        // Disable input and submit, enable next problem button
        document.getElementById('answerInput').disabled = true;
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('newProblemBtn').disabled = false;

    } else {
        showFeedback(`✗ Incorrect! Answer is ${state.currentProblem.answer}`, 'incorrect');

        const solve = {
            num1: state.currentProblem.num1,
            num2: state.currentProblem.num2,
            answer: state.currentProblem.answer,
            userAnswer,
            time: elapsedTime,
            timestamp: new Date().toISOString(),
            correct: false,
        };

        saveToHistory(solve);

        // Disable input and submit, enable next problem button
        document.getElementById('answerInput').disabled = true;
        document.getElementById('submitBtn').disabled = true;
        document.getElementById('newProblemBtn').disabled = false;
    }
}

// ===========================
// FEEDBACK
// ===========================
function showFeedback(message, type) {
    const feedback = document.getElementById('feedback');
    feedback.textContent = message;
    feedback.className = `feedback ${type}`;
}

function clearFeedback() {
    const feedback = document.getElementById('feedback');
    feedback.textContent = '';
    feedback.className = 'feedback';
}

// ===========================
// SESSION STATS
// ===========================
function updateSessionStats() {
    const solves = state.sessionSolves;
    const solvedCount = solves.length;

    document.getElementById('solvedCount').textContent = solvedCount;

    if (solvedCount === 0) {
        document.getElementById('sessionBest').textContent = '—';
        document.getElementById('sessionAvg').textContent = '—';
        return;
    }

    const bestTime = Math.min(...solves.map(s => s.time));
    document.getElementById('sessionBest').textContent = bestTime.toFixed(2) + 's';

    const avgTime = solves.reduce((sum, s) => sum + s.time, 0) / solvedCount;
    document.getElementById('sessionAvg').textContent = avgTime.toFixed(2) + 's';
}

function resetSession() {
    if (confirm('Reset current session? Your history will be preserved.')) {
        state.sessionSolves = [];
        updateSessionStats();
        showInitialState();
        stopTimer();
    }
}

// ===========================
// STORAGE
// ===========================
function saveToHistory(solve) {
    let history = getHistory();
    history.push(solve);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
}

function getHistory() {
    const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return stored ? JSON.parse(stored) : [];
}

function loadHistory() {
    // Already loaded on demand
}

function clearAllData() {
    if (confirm('Are you sure? This will permanently delete all your history and data. This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEYS.HISTORY);
        state.sessionSolves = [];
        updateSessionStats();
        updateStatistics();
    }
}

// ===========================
// STATISTICS CALCULATIONS
// ===========================
function calculateRollingAverage(times, n) {
    if (times.length < n) {
        return null;
    }

    const lastN = times.slice(-n);
    const sorted = [...lastN].sort((a, b) => a - b);
    const trimmed = sorted.slice(1, -1);

    const avg = trimmed.reduce((sum, time) => sum + time, 0) / trimmed.length;
    return avg;
}

function calculateSimpleAverage(times, n) {
    if (times.length < n) {
        return null;
    }

    const lastN = times.slice(-n);
    const sum = lastN.reduce((acc, time) => acc + time, 0);
    return sum / lastN.length;
}

function updateStatistics() {
    const history = getHistory();

    if (history.length === 0) {
        document.getElementById('totalAttempts').textContent = '0';
        document.getElementById('successRate').textContent = '0%';
        document.getElementById('personalBest').textContent = '—';
        document.getElementById('overallAverage').textContent = '—';
        document.getElementById('ao5').textContent = '—';
        document.getElementById('ao12').textContent = '—';
        document.getElementById('ao50').textContent = '—';
        document.getElementById('ao100').textContent = '—';
        updateHistoryTable(history);
        return;
    }

    const totalAttempts = history.length;
    const correctAttempts = history.filter(s => s.correct).length;
    const successRate = Math.round((correctAttempts / totalAttempts) * 100);

    document.getElementById('totalAttempts').textContent = totalAttempts;
    document.getElementById('successRate').textContent = successRate + '%';

    const correctSolves = history.filter(s => s.correct);
    const times = correctSolves.map(s => s.time);

    if (times.length === 0) {
        document.getElementById('personalBest').textContent = '—';
        document.getElementById('overallAverage').textContent = '—';
        document.getElementById('ao5').textContent = '—';
        document.getElementById('ao12').textContent = '—';
        document.getElementById('ao50').textContent = '—';
        document.getElementById('ao100').textContent = '—';
    } else {
        const bestTime = Math.min(...times);
        document.getElementById('personalBest').textContent = bestTime.toFixed(2) + 's';

        const overallAvg = times.reduce((sum, t) => sum + t, 0) / times.length;
        document.getElementById('overallAverage').textContent = overallAvg.toFixed(2) + 's';

        updateRollingAverage('ao5', times, 5);
        updateRollingAverage('ao12', times, 12);
        updateSimpleAverage('ao50', times, 50);
        updateSimpleAverage('ao100', times, 100);
    }

    updateHistoryTable(history);
    updateCharts(correctSolves);
}

function updateRollingAverage(elementId, times, n) {
    const avg = calculateRollingAverage(times, n);
    const element = document.getElementById(elementId);
    const detailElement = document.getElementById(elementId + '-detail');

    if (avg === null) {
        element.textContent = '—';
        detailElement.textContent = '';
    } else {
        element.textContent = avg.toFixed(2) + 's';
        detailElement.textContent = `(Last ${n})`;
    }
}

function updateSimpleAverage(elementId, times, n) {
    const avg = calculateSimpleAverage(times, n);
    const element = document.getElementById(elementId);
    const detailElement = document.getElementById(elementId + '-detail');

    if (avg === null) {
        element.textContent = '—';
        detailElement.textContent = '';
    } else {
        element.textContent = avg.toFixed(2) + 's';
        detailElement.textContent = `(Last ${n})`;
    }
}

// ===========================
// HISTORY TABLE
// ===========================
function updateHistoryTable(history) {
    const tbody = document.getElementById('historyBody');

    if (history.length === 0) {
        tbody.innerHTML = '<tr class="empty-state"><td colspan="5">No data yet. Start practicing!</td></tr>';
        return;
    }

    const displayed = history.slice(-50).reverse();

    tbody.innerHTML = displayed
        .map((solve, index) => {
            const date = new Date(solve.timestamp);
            const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
            const problem = `${solve.num1} × ${solve.num2}`;
            const statusClass = solve.correct ? 'correct' : 'incorrect';
            const statusIcon = solve.correct ? '✓' : '✗';

            return `
                <tr>
                    <td>${history.length - (history.length - 50 > 0 ? 50 : history.length) + index + 1}</td>
                    <td>${problem}</td>
                    <td class="${statusClass}">${solve.userAnswer} ${statusIcon}</td>
                    <td>${solve.time.toFixed(2)}</td>
                    <td>${dateStr}</td>
                </tr>
            `;
        })
        .join('');
}

// ===========================
// CHARTS
// ===========================
let timelineChart = null;
let distributionChart = null;

function updateCharts(correctSolves) {
    updateTimelineChart(correctSolves);
    updateDistributionChart(correctSolves);
}

function updateTimelineChart(solves) {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;

    const times = solves.map(s => s.time);
    const labels = solves.map((_, i) => i + 1);

    const displayTimes = times.slice(-100);
    const displayLabels = labels.slice(-100);

    if (timelineChart) {
        timelineChart.destroy();
    }

    timelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: displayLabels,
            datasets: [
                {
                    label: 'Solve Time (seconds)',
                    data: displayTimes,
                    borderColor: '#818cf8',
                    backgroundColor: 'rgba(129, 140, 248, 0.1)',
                    borderWidth: 2,
                    pointRadius: 3,
                    pointBackgroundColor: '#6366f1',
                    pointBorderColor: '#fff',
                    tension: 0.3,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(100, 116, 139, 0.2)',
                    },
                    ticks: {
                        color: '#cbd5e1',
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: '#cbd5e1',
                    },
                },
            },
        },
    });
}

function updateDistributionChart(solves) {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;

    const times = solves.map(s => s.time);

    if (times.length === 0) return;

    const minTime = Math.floor(Math.min(...times) * 10) / 10;
    const maxTime = Math.ceil(Math.max(...times) * 10) / 10;
    const binSize = 0.5;
    const bins = [];
    const labels = [];

    for (let i = minTime; i < maxTime; i += binSize) {
        const binLabel = i.toFixed(1) + '-' + (i + binSize).toFixed(1);
        labels.push(binLabel);
        const count = times.filter(t => t >= i && t < i + binSize).length;
        bins.push(count);
    }

    if (distributionChart) {
        distributionChart.destroy();
    }

    distributionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Frequency',
                    data: bins,
                    backgroundColor: '#10b981',
                    borderColor: '#059669',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                    },
                    grid: {
                        color: 'rgba(100, 116, 139, 0.2)',
                    },
                    ticks: {
                        color: '#cbd5e1',
                    },
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        color: '#cbd5e1',
                    },
                },
            },
        },
    });
}