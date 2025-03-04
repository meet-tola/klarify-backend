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
  