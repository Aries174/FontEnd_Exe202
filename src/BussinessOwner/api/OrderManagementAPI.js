const BASE_URL = "https://apiqrcodeexe201-production.up.railway.app";
const TEST_TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImRlbW9AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoicmVzdGF1cmFudCIsInJlc3RhdXJhbnRfaWQiOjEsImlzcyI6ImdvLWFwaSIsImV4cCI6MTc2OTk2OTM4NCwiaWF0IjoxNzY5ODgyOTg0fQ.04TQpNS7nDAl6qO9JHDKkHqklH2_V8gepFHHXonWfbc"
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
    const response = await fetch(
      `${BASE_URL}/api/v1/tables/${tableId}`,
      {
        method: "DELETE", // soft delete
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify({
          is_active: false,
        }),
      }
    );

    // ✅ 404 → coi như đã xóa mềm
    if (response.status === 404) {
      console.warn("Table not found on server, treat as deleted");
      return { success: true };
    }

    // ❌ response lỗi khác
    if (!response.ok) {
      const text = await response.text(); // ⚠️ KHÔNG json()
      throw new Error(text || response.statusText);
    }

    // ✅ chỉ parse JSON nếu thực sự là JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    // ✅ body rỗng
    return { success: true };
  } catch (error) {
    console.error("Soft delete table failed:", error);
    throw error;
  }
};
export const updateTableOrder = async (tableId, tableData) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/tables/${tableId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify(tableData),
      }
    );

    if (!response.ok) {
      const text = await response.text(); // ⚠️ KHÔNG json()
      throw new Error(text || response.statusText);
    }   
    return await response.json();
  } catch (error) {
    console.error("Update table failed:", error);
    throw error;
  } 
}
