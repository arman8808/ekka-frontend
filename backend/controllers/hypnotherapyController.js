// Helper function to process form data
const processProgramData = (req) => {
  let programData;
  
  if (req.file) {
    // If there's a file upload, process form data
    programData = JSON.parse(JSON.stringify(req.body));
    
    // Handle arrays that were stringified
    if (programData.cardPoints) {
      programData.cardPoints = JSON.parse(programData.cardPoints);
    }
    if (programData.learningSections) {
      programData.learningSections = JSON.parse(programData.learningSections);
    }
    if (programData.upcomingEvents && programData.upcomingEvents.length > 0) {
      programData.upcomingEvents = JSON.parse(programData.upcomingEvents);
      
      // Convert date strings to Date objects for upcoming events
      programData.upcomingEvents = programData.upcomingEvents.map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }));
    }
    
    // Add the thumbnail filename
    programData.thumbnail = req.file.filename;
  } else {
    // No file upload, use body directly
    programData = req.body;
    
    // Convert date strings to Date objects for upcoming events
    if (programData.upcomingEvents && programData.upcomingEvents.length > 0) {
      programData.upcomingEvents = programData.upcomingEvents.map(event => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }));
    }
  }
  
  return programData;
};
