const extractText = (sectionTitle: string, roadmapText: string[]) => {
  let extracting = false;
  const extractedContent = [];

  for (const line of roadmapText) {
    const cleanLine = line.replace(/^#+\s*/, "").trim(); // Remove markdown headers (####, ###, ##, #)
    
    if (cleanLine.toLowerCase().includes(sectionTitle.toLowerCase())) {
      extracting = true; // Start extracting from this section
      continue; // Skip the section title itself
    }
    
    if (extracting) {
      if (cleanLine === "" || cleanLine.includes(":")) {
        break; // Stop extracting at an empty line or next section title
      }
      extractedContent.push(cleanLine.replace(/^-/, "").trim()); // Remove bullet points (-)
    }
  }

  return extractedContent.length ? extractedContent : ["No data available"];
};

export default extractText;


/**
 * Safely extracts and parses the first valid JSON object from a string.
 * Handles extra text, Markdown code blocks, and malformed endings.
 */
export const extractValidJsonFromText = (rawText: string): any => {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error("Invalid input for JSON extraction");
  }

  let jsonText = '';

  // 1. Try to extract from Markdown-style code block
  const codeBlockMatch = rawText.match(/```json([\s\S]*?)```/i);
  if (codeBlockMatch) {
    jsonText = codeBlockMatch[1].trim();
  } else {
    // 2. Fallback: Try to extract from first JSON-like structure
    const firstMatch = rawText.match(/\{[\s\S]*\}/);
    if (!firstMatch) {
      throw new Error("No JSON found in the response");
    }
    jsonText = firstMatch[0];
  }

  // 3. Sanitize (remove newlines and trailing commas)
  jsonText = jsonText.replace(/(\r\n|\n|\r)/gm, '');
  jsonText = jsonText.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']'); // Remove trailing commas

  // 4. Attempt to parse
  try {
    return JSON.parse(jsonText);
  } catch (err: any) {
    console.error("Failed JSON content:", jsonText);
    throw new Error("Failed to parse JSON: " + err.message);
  }
};
