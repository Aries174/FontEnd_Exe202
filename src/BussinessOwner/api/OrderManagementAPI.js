const BASE_URL = "https://apiqrcodeexe201-production.up.railway.app";
const TEST_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImRlbW9AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoicmVzdGF1cmFudCIsInJlc3RhdXJhbnRfaWQiOjEsImlzcyI6ImdvLWFwaSIsImV4cCI6MTc2OTc5MDMwNiwiaWF0IjoxNzY5NzAzOTA2fQ.I3j6l94Miey-Zy2G6qe_mOZNykBVEAzElo71dWmTbAk"
export const getTableOrders = async () => {
    try{
        const response = await fetch(`${BASE_URL}/api/v1/restaurants/1/tables`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                       "Authorization": `Bearer ${TEST_TOKEN}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching table orders:", error);
        throw error;
    }
};
export const createTableOrder = async (tableData) => {
      try{
    const response = await fetch(`${BASE_URL}/api/v1/restaurants/1/tables`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${TEST_TOKEN}`,
      },
      body: JSON.stringify(tableData),
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
export const deleteTableOrder = async (tableId) => {
      try {
    const response = await fetch(`${BASE_URL}/api/v1/tables/${tableId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${TEST_TOKEN}`,
      },
    });
    
    // 404 không phải lỗi - chỉ là bàn không tồn tại trên server
    if (response.status === 404) {
      console.warn("Table not found on server (404), but continuing with local deletion");
      return { success: true, message: "Table not found on server" };
    }
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      console.error("API Error Response:", errorData);
      throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return { success: true };
  } catch (error) {
    console.error("fetch failed: ", error);
    throw error;
  }
};