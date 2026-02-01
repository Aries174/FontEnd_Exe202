const BASE_URL = "https://apiqrcodeexe201-production.up.railway.app";
export const getBusinessOwnerProfile = async () => {
const token = localStorage.getItem("authToken");

  console.log("TOKEN:", token);

  if (!token) {
    throw new Error("Chưa đăng nhập");
  }

  const response = await fetch(
    `${BASE_URL}/api/v1/restaurants/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error("401 response:", text);
    throw new Error("Unauthorized");
  }

  return response.json();
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