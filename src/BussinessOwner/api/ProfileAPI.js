const BASE_URL = "https://apiqrcodeexe201-production.up.railway.app";
const TEST_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImRlbW9AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoicmVzdGF1cmFudCIsInJlc3RhdXJhbnRfaWQiOjEsImlzcyI6ImdvLWFwaSIsImV4cCI6MTc2OTk2OTM4NCwiaWF0IjoxNzY5ODgyOTg0fQ.04TQpNS7nDAl6qO9JHDKkHqklH2_V8gepFHHXonWfbc"
export const getBusinessOwnerProfile = async () => {
    try{
        const response = await fetch(`${BASE_URL}/api/v1/business_owners/1/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                       "Authorization": `Bearer ${TEST_TOKEN}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching business owner profile:", error);
        throw error;
    }
};
export const updateBusinessOwnerProfile = async (profileData) => {
      try{
    const response = await fetch(`${BASE_URL}/api/v1/business_owners/1/profile`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${TEST_TOKEN}`,
      },
      body: JSON.stringify(profileData),
    });
    const responseData = await response.json();
    if (!response.ok) {
      console.error("API Error Response:", responseData);
      throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
    }
    return responseData;
    }catch (error) {    
    console.error("fetch failed: ", error);
    throw error;
  }
};