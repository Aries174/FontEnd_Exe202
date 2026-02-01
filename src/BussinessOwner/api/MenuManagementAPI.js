const BASE_URL = "https://apiqrcodeexe201-production.up.railway.app";
const TEST_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6ImRlbW9AcmVzdGF1cmFudC5jb20iLCJyb2xlIjoicmVzdGF1cmFudCIsInJlc3RhdXJhbnRfaWQiOjEsImlzcyI6ImdvLWFwaSIsImV4cCI6MTc2OTk2OTM4NCwiaWF0IjoxNzY5ODgyOTg0fQ.04TQpNS7nDAl6qO9JHDKkHqklH2_V8gepFHHXonWfbc"
export const getCategoriesAll = async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/api/v1/restaurants/1/categories`, {
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
}
export const createCategory = async (categoryData) => {

        try{
    const response = await fetch(`${BASE_URL}/api/v1/restaurants/1/categories`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify(categoryData),
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
}
export const deleteCategory = async (categoryId) => {
    try {
        const response = await fetch(
        `${BASE_URL}/api/v1/categories/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TEST_TOKEN}`,
          },

        }
      );
        if (response.status === 404) {
            console.warn("Category not found on server, treat as deleted");
            return { success: true };
        }
        if (!response.ok) {
        const responseData = await response.json();
        console.error("API Error Response:", responseData);
        throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
      }
        return { success: true };
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }   
};
export const updateCategory = async (categoryId, categoryData) => {
    try{
    const response = await fetch(`${BASE_URL}/api/v1/categories/${categoryId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify(categoryData),
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
}
export const getMenuAll = async ()=>{
    try{
        const response = await fetch(`${BASE_URL}/api/v1/restaurants/1/menu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                "Authorization": `Bearer ${TEST_TOKEN}`,
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching menu items:", error);
        throw error;
    }   
}
export const createMenuItem = async (menuData) => {
    try{
    const response = await fetch(`${BASE_URL}/api/v1/restaurants/1/menu`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify(menuData),
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
}
export const deleteMenuItem = async (menuId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/menu/${menuId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TEST_TOKEN}`,
          },
          body: JSON.stringify({
            is_active: false,
          }),
        }
      );
        if (response.status === 404) {
            console.warn("Menu item not found on server, treat as deleted");
            return { success: true };
        }
      if (!response.ok) {
        const responseData = await response.json();
        console.error("API Error Response:", responseData);
        throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
      }
        return { success: true };
    } catch (error) {
      console.error("Error deleting menu item:", error);
      throw error;
    }
};
export const updateMenuItem = async (menuId, menuData) => {
    try{
    const response = await fetch(`${BASE_URL}/api/v1/menu/${menuId}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${TEST_TOKEN}`,
        },
        body: JSON.stringify(menuData), 
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
}