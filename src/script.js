// JAVASCRIPT USERDASHBOARD \\

// JAVASCRIPT QUIZ \\
document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll('.quiz-box');
    if (!steps.length) return;

    if (localStorage.getItem("quiz-completed")) {
        localStorage.removeItem("quiz-completed");
        localStorage.removeItem("quiz-answers");
        localStorage.removeItem("quiz-score");
        localStorage.removeItem("quiz-max-score");
        localStorage.removeItem("quiz-started-at");
        localStorage.removeItem("quiz-submitted-at");
    }

    const optionSelector = ".firstanswer-box, .secondanswer-box, .thirdanswer-box, .fourthanswer-box";
    const selectedAnswers = {};

    let currentSteps = Array.from(steps).findIndex((el) => 
        el.classList.contains("is-active")
    );
    if (currentSteps < 0) currentSteps = 0;

    const bobotPoin = {
        0: [2, 4, 8, 3],
        1: [8, 0, 3, 1],
        2: [2, 5, 1, 10],
        3: [0, 9, 2, 3],
        4: [11, 3, 4, 2],
        5: [5, 6, 11, 5],
        6: [5, 6, 11, 7],
        7: [6, 4, 8, 12],
        8: [5, 6, 3, 11],
        9: [5, 9, 3, 2]
    };

    steps.forEach((quizEl, stepIndex) => {
        const options = quizEl.querySelectorAll(optionSelector);

        options.forEach((opt, optIndex) => {
            opt.addEventListener("click", () => {
                options.forEach((item) => item.classList.remove("is-selected"));
                opt.classList.add("is-selected");

                const textEl = opt.querySelector("h4");
                const imgEl = opt.querySelector("img");
                const answerValue = textEl
                    ? textEl.textContent.trim()
                    : imgEl
                    ? imgEl.getAttribute("src")
                    : `Option ${optIndex + 1}`;

                selectedAnswers[stepIndex] = {
                    index: optIndex,
                    value: answerValue
                };
                localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers));
            });
        });
    });

    function updateProgress(index) {
        const total = steps.length;
        const current = index + 1;
        const percent = Math.round((current / total) * 100);

        const fillEl = document.getElementById("quiz-progress-fill");
        const numEl = document.getElementById("current-question-num");
        const percentEl = document.getElementById("progress-percent");

        if (fillEl) fillEl.style.width = percent + "%";
        if (numEl) numEl.textContent = current;
        if (percentEl) percentEl.textContent = percent + "%";
    }

    function goToStep(index) {
        if (index < 0 || index >= steps.length) return;

        steps.forEach((el, i) => {
            const active = i === index;
            el.classList.toggle('is-active', active);

            if (active) {
                el.style.animation = "none";
                el.offsetHeight;
                el.style.animation = "";
            }
        });
        currentSteps = index;
        updateProgress(index);
    }

    goToStep(currentSteps);

    const existingStart = localStorage.getItem("quiz-started-at");
    const hasAnswers = localStorage.getItem("quiz-answers");
    if (!existingStart || !hasAnswers) {
        localStorage.setItem("quiz-started-at", new Date().toISOString());
    }

    document.querySelectorAll(".btn-next-step").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (selectedAnswers[currentSteps] === undefined) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        icon: "warning",
                        title: "Belum Dijawab!",
                        text: "Pilih salah satu jawaban dulu sebelum lanjut.",
                        customClass: {
                            popup: "swal-popup",
                            title: "swal-title",
                            htmlContainer: "swal-text",
                            confirmButton: "swal-btn",
                            icon: "swal-icon"
                        },
                        buttonStyling: false
                    });
                }
                return;
            }

            if (currentSteps < steps.length - 1) {
                goToStep(currentSteps + 1);
            }
        });
    });

    document.querySelectorAll(".btn-submit-quiz").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (selectedAnswers[currentSteps] === undefined) {
                if (typeof Swal !== "undefined") {
                    Swal.fire({
                        icon: "warning",
                        title: "Upss...",
                        text: "Pilihlah salah satu jawaban dulu sebelum submit.",
                        customClass: {
                            popup: "swal-popup",
                            title: "swal-title",
                            htmlContainer: "swal-text",
                            confirmButton: "swal-btn"
                        },
                        buttonStyling: false
                    });
                }
                return;
            }

            let totalPoin = 0;
            for (let i = 0; i < steps.length; i++) {
                if (selectedAnswers[i] && bobotPoin[i]) {
                    totalPoin += bobotPoin[i][selectedAnswers[i].index];
                }
            }

            localStorage.setItem("quiz-score", totalPoin);
            localStorage.setItem("quiz-max-score", 100);
            localStorage.setItem("quiz-completed", "true");
            localStorage.setItem("quiz-submitted-at", new Date().toISOString());
            localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers));

            window.location.href = "result.html";
        });
    });
});

document.addEventListener("keydown", (event) => {
    const activeQuiz = document.querySelector(".quiz-box.is-active");
    if (!activeQuiz) return;

    const key = event.key.toLowerCase();
    const options = activeQuiz.querySelectorAll(
        ".firstanswer-box, .secondanswer-box, .thirdanswer-box, .fourthanswer-box"
    );

    const keyMap = { a:0, "1": 0, b:1, "2": 1, c:2, "3": 2, d:3, "4": 3 };
    if (key in keyMap && options[keyMap[key]]) {
        options[keyMap[key]].click();
        return;
    }

    if (event.key === "Enter" || event.key === "ArrowRight") {
        const nextBtn = activeQuiz.querySelector(".btn-next-step button, .btn-submit-quiz button");
        if (nextBtn) {
            event.preventDefault();
            nextBtn.click();
        }
    }
});

// JAVASCRIPT RESULT \\
if (window.location.pathname.includes("result.html")) {
    const isCompleted = localStorage.getItem("quiz-completed");
    if (!isCompleted) {
        window.location.href = "quiz.html";
    }
}
