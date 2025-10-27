const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

exports.generateDescription = async (req, res) => {

  const { keywords } = req.body;
  if (!keywords || keywords.trim().length === 0) {
    return res.status(400).json({ message: "Keywords are required" });
  }

  const prompt = `You are a helpful e-commerce assistant. A seller is listing an item on ResQMart, a marketplace for surplus food.
  Write a short, persuasive, and appealing product description (about 2-3 sentences) based on these keywords: "${keywords}".
  Do not use hashtags.`;

  try {
    // console.log("🟢 Prompt:", prompt);

    const result = await model.generateContent(prompt);
    // console.log("🧠 RAW RESULT from Gemini ↓↓↓");
    // console.dir(result, { depth: null });

    let description = "";

    // ✅ Try every known response shape
    try {
      if (result?.response?.text) {
        description = result.response.text();
      } else if (result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        description = result.response.candidates[0].content.parts[0].text;
      } else if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
        description = result.candidates[0].content.parts[0].text;
      }
    } catch (extractErr) {
      console.error("⚠️ Extraction error:", extractErr);
    }

    console.log("✅ Extracted description:", description);

    if (!description) {
      return res
        .status(500)
        .json({ message: "Gemini returned no text", raw: result });
    }

    res.status(200).json({ description: description.trim() });
  } catch (err) {
    console.error("🔥 Gemini error:", err);
    res
      .status(500)
      .json({ message: "Failed to generate description", error: err.message });
  }
};
