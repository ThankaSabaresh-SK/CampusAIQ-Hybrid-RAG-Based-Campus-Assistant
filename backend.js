
const sessionId =
    sessionStorage.getItem("chatSessionId") ||
    crypto.randomUUID();

sessionStorage.setItem(
    "chatSessionId",
    sessionId
);


async function sendMessage(userQuestion) {

    try {

        const response = await fetch(
            "http://127.0.0.1:5001/ask",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: userQuestion,
                    session_id: sessionId
                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            addBotMessage(data.answer);

        } else {

            addBotMessage(
                data.error || "Sorry, something went wrong."
            );
        }


    } catch (error) {

        console.error("API Error:", error);

        addBotMessage(
            "Unable to connect to the AI assistant."
        );
    }
}

