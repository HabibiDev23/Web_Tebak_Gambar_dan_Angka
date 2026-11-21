// JAVASCRIPT USERDASHBOARD \\

// JAVASCRIPT QUIZ \\
document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll('.quiz-box');
    if (!steps.length) return;

    const optionSelector = ".firstanswer-box, .secondanswer-box, .thirdanswer-box, fourthanswer-box";
    const selectedAnswers = {};

    let currentSteps = Array.from(steps).findIndex((el) => 
        el.classList.contains("is-active")
    );
    if (currentSteps < 0) currentSteps = 0;

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

    function goToStep(index) {
        if (index < 0 || index >= steps.length) return;

        steps.forEach((el, i ) => {
            const active = i === index;
            el.classList.toggle('is-active', active);

            if (active) {
                el.style.animation = "none";
                el.offsetHeight;
                el.style.animation = "";
            }
        });
        currentSteps = index;
    }

    goToStep(currentSteps);

    document.querySelectorAll(".btn-next-step").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (selectedAnswers[currentSteps] === undefined) {
                Swal.fire({
                    icon: "error",
                    title: "Upss...",
                    text: "Sepertinya ada yang salah ??"
                    });
            }

            if (currentSteps < steps.length - 1) {
                goToStep(currentSteps + 1);
            }
        });
    });

    document.querySelectorAll(".btn-submit-quiz").forEach((btn) => {
        btn.addEventListener("click", () => {
            if (selectedAnswers[currentSteps] === undefined) {
                Swal.fire({
                    icon: "error",
                    title: "Upss...",
                    text: "Pilihlah salah satu jawaban dulu"
                    });
            }

            localStorage.setItem("quiz-completed", "true");
            localStorage.setItem("quiz-submitted-at", new Date().toISOString());
            localStorage.setItem("quiz-answers", JSON.stringify(selectedAnswers));

            window.location.href = "result.html";
        });
    });
});

// JAVASCRIPT RESULT \\