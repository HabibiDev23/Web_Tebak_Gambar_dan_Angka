// JAVASCRIPT USERDASHBOARD \\

// JAVASCRIPT QUIZ \\
document.addEventListener("DOMContentLoaded", () => {

    const steps = document.querySelectorAll('.quiz-box');
    let currentSteps = Array.from(steps).findIndex((el) => 
        el.classList.contains("is-active")
    );
    if (currentSteps < 0) currentSteps = 0;

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
            if (currentSteps < steps.length - 1) {
                goToStep(currentSteps + 1);
            }
        });
    });

    document.querySelectorAll("btn-submit-quiz").forEach((btn) => {
        btn.addEventListener("click", () => {
            localStorage.setItem("quiz-completed", "true");
            localStorage.setItem("quiz-submitted-at", new Date().toISOString());

            window.location.href = "result.html";
        });
    });
});

// JAVASCRIPT RESULT \\
const isCompleted = localStorage.getItem("quiz-completed");
if (!isCompleted) {
    window.location.href = "quiz.html";
}