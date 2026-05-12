import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

async function main(prompt) {

    try {

        const chatCompletion =
            await groq.chat.completions.create({

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ],

                model: "llama-3.1-8b-instant",
                temperature: 0.7,
                max_tokens: 1024,
                top_p: 1

            });

        return (
            chatCompletion.choices[0]?.message?.content
            || "No response generated."
        );

    } catch (error) {

        console.error(error);

        return "Error generating response.";

    }
}

export default main;