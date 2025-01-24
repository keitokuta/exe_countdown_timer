class CountdownTimer {
    constructor() {
        this.hoursInput = document.getElementById("hours");
        this.minutesInput = document.getElementById("minutes");
        this.startButton = document.getElementById("startButton");
        this.resetButton = document.getElementById("resetButton");
        this.timeLeftDisplay = document.getElementById("timeLeft");

        this.timerId = null;
        this.endTime = null;

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.startButton.addEventListener("click", () => this.toggleTimer());
        this.resetButton.addEventListener("click", () => this.resetTimer());

        // 入力値の制限
        this.hoursInput.addEventListener("input", () => this.validateInput(this.hoursInput, 23));
        this.minutesInput.addEventListener("input", () => this.validateInput(this.minutesInput, 59));
    }

    validateInput(input, max) {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 0) {
            input.value = 0;
        } else if (value > max) {
            input.value = max;
        }
    }

    toggleTimer() {
        if (this.timerId) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }

    startTimer() {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;

        if (hours === 0 && minutes === 0) {
            alert("時間を設定してください");
            return;
        }

        const totalMilliseconds = (hours * 60 * 60 + minutes * 60) * 1000;
        this.endTime = Date.now() + totalMilliseconds;

        this.startButton.textContent = "一時停止";
        this.disableInputs(true);

        this.updateDisplay();
        this.timerId = setInterval(() => this.updateDisplay(), 1000);
    }

    pauseTimer() {
        clearInterval(this.timerId);
        this.timerId = null;
        this.startButton.textContent = "再開";
    }

    resetTimer() {
        clearInterval(this.timerId);
        this.timerId = null;
        this.endTime = null;
        this.startButton.textContent = "スタート";
        this.disableInputs(false);
        this.timeLeftDisplay.textContent = "00:00:00";
    }

    updateDisplay() {
        const now = Date.now();
        const timeLeft = this.endTime - now;

        if (timeLeft <= 0) {
            this.resetTimer();
            alert("タイマーが終了しました！");
            return;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        this.timeLeftDisplay.textContent = this.formatTime(hours, minutes, seconds);
    }

    formatTime(hours, minutes, seconds) {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    disableInputs(disabled) {
        this.hoursInput.disabled = disabled;
        this.minutesInput.disabled = disabled;
    }
}

// タイマーのインスタンスを作成
document.addEventListener("DOMContentLoaded", () => {
    new CountdownTimer();
});
