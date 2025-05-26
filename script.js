const messages = {
    en: {
        success: "Message sent!",
        error: "Error sending message",
        connectionError: "An error occurred. Please try again."
    },
    pt: {
        success: "Enviado!",
        error: "Erro ao enviar",
        connectionError: "Ocorreu um erro. Por favor, tente novamente."
    }
};

const getCurrentLanguage = () => document.documentElement.lang;
const getMessage = (key) => messages[getCurrentLanguage()][key];


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}


document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contact-form");
    
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = document.querySelector("input[name=name]").value;
            const email = document.querySelector("input[name=email]").value;
            const text = document.querySelector("textarea[name=text]").value;

            fetch("https://api.sheetmonkey.io/form/onCm3xPp2zS7VdxCCPYbRf", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, text })
            })
            .then(response => {
                if (response.ok) {
                    alert(getMessage("success"));
                    form.reset();
                } else {
                    alert(getMessage("error"));
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert(getMessage("connectionError"));
            });
        });
    }
});
