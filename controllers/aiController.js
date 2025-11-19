const {InferenceClient} = require("@huggingface/inference");
const dotenv = require("dotenv");
dotenv.config();

const client = new InferenceClient(process.env.API_KEY);


async function generateBlog(req,res) {            

 try{
    const userPrompt = req.body.prompt;

    const systemPrompt = `You are a professional blog writer.
                                    Write a complete blog based on this topic:
                                    "${userPrompt}"

                                    Return the final result ONLY in this JSON structure:

                                    {
                                    "title": "string",
                                    "introduction": "string",
                                    "sections": [
                                       {
                                        "heading": "string",
                                        "content": "string"
                                        }
                                    ],
                                    "conclusion": "string"
                                    }

                                    Do not include *,# in the content.
                                    Do not include anything outside JSON. No explanation. No markdown.
                                    `;


    const chat = await client.chatCompletion({
                        model: "openai/gpt-oss-120b:fastest",
                        messages: [
                            {
                                role: "system",
                                content: systemPrompt
                            },
                            {
                                role: "user",
                                content: userPrompt,
                            },
                        ],
                        });     
                        

    const rawText = chat.choices[0].message.content;

    const json = JSON.parse(rawText);

    return res.json({success: true, data: json});


                        
 }catch (err){
    console.log(err);

            return res.status(500).json({success:false, error: err.message});
    }

}




module.exports = {
    generateBlog,
   
}