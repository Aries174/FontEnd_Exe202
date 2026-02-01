import { getRestaurantId } from "../../utils/auth";

const BASE_URL = "https://apiqrcodeexe201-production.up.railway.app";
// export const getCategoriesAll = async (restaurantId)=>{
//     try{
//                const token = localStorage.getItem("authToken"); 
//         const response = await fetch(`${BASE_URL}/api/v1/restaurants/${restaurantId}/categories`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                        "Authorization": `Bearer ${token}`,
//             }
//         });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching table orders:", error);
//         throw error;
//     }
// }
// export const createCategory = async (categoryData, restaurantId) => {

//         try{
//                    const token = localStorage.getItem("authToken"); 
//     const response = await fetch(`${BASE_URL}/api/v1/restaurants/${restaurantId}/categories`, {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(categoryData),
//     });
//     const responseData = await response.json();
//     if (!response.ok) {
//       console.error("API Error Response:", responseData);
//       throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
//     }
//     return responseData;
//   }catch (error) {
//     console.error("fetch failed: ", error);
//     throw error;
//   } 
// }
// export const deleteCategory = async (categoryId) => {
//     try {
//                const token = localStorage.getItem("token"); 
//         const response = await fetch(
//         `${BASE_URL}/api/v1/categories/${categoryId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },

//         }
//       );
//         if (response.status === 404) {
//             console.warn("Category not found on server, treat as deleted");
//             return { success: true };
//         }
//         if (!response.ok) {
//         const responseData = await response.json();
//         console.error("API Error Response:", responseData);
//         throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
//       }
//         return { success: true };
//     } catch (error) {
//       console.error("Error deleting category:", error);
//       throw error;
//     }   
// };
// export const updateCategory = async (categoryId, categoryData) => {
//     try{
//                const token = localStorage.getItem("authToken"); 
//     const response = await fetch(`${BASE_URL}/api/v1/categories/${categoryId}`, {
//         method: "PUT",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(categoryData),
//     });
//     const responseData = await response.json();
//     if (!response.ok) {
//         console.error("API Error Response:", responseData);
//         throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
//       }
//     return responseData;
//     }catch (error) {
//     console.error("fetch failed: ", error);
//     throw error;
//     }
// }
// export const getMenuAll = async (restaurantId)=>{
//     try{
//                const token = localStorage.getItem("authToken"); 
//         const response = await fetch(`${BASE_URL}/api/v1/restaurants/${restaurantId}/menu`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json', 
//                 "Authorization": `Bearer ${token}`,
//             }
//         });
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Error fetching menu items:", error);
//         throw error;
//     }   
// }
// export const createMenuItem = async (menuData, restaurantId) => {
//     try{
//                const token = localStorage.getItem("authToken"); 
//     const response = await fetch(`${BASE_URL}/api/v1/restaurants/${restaurantId}/menu`, {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(menuData),
//     });
//     const responseData = await response.json();
//     if (!response.ok) {
//         console.error("API Error Response:", responseData);
//         throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
//       } 
//     return responseData;
//   }catch (error) {
//     console.error("fetch failed: ", error);
//     throw error;
//   }
// }
// export const deleteMenuItem = async (menuId) => {
//     try {
//                const token = localStorage.getItem("authToken"); 
//       const response = await fetch(
//         `${BASE_URL}/api/v1/menu/${menuId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             is_active: false,
//           }),
//         }
//       );
//         if (response.status === 404) {
//             console.warn("Menu item not found on server, treat as deleted");
//             return { success: true };
//         }
//       if (!response.ok) {
//         const responseData = await response.json();
//         console.error("API Error Response:", responseData);
//         throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
//       }
//         return { success: true };
//     } catch (error) {
//       console.error("Error deleting menu item:", error);
//       throw error;
//     }
// };
// export const updateMenuItem = async (menuId, menuData) => {
//     try{
//         const token = localStorage.getItem("authToken"); 
//     const response = await fetch(`${BASE_URL}/api/v1/menu/${menuId}`, {
//         method: "PUT",
//         headers: {
//             "Content-type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify(menuData), 
//     });
//     const responseData = await response.json();
//     if (!response.ok) {
//         console.error("API Error Response:", responseData);
//         throw new Error(`fetch failed: ${response.statusText} - ${JSON.stringify(responseData)}`);
//       }
//     return responseData;
//     }catch (error) {
//     console.error("fetch failed: ", error);
//     throw error;
//     }
// }

const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
export const getCategoriesAll = async () => {
  const restaurantId = getRestaurantId();
  if (!restaurantId) throw new Error("Missing restaurantId");

  const res = await fetch(
    `${BASE_URL}/api/v1/restaurants/${restaurantId}/categories`,
    { headers: getAuthHeaders() }
  );
  return res.json();
};
export const createCategory = async (data) => {
  const restaurantId = getRestaurantId();

  const res = await fetch(
    `${BASE_URL}/api/v1/restaurants/${restaurantId}/categories`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return res.json();
};
export const updateCategory = async (id, data) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/categories/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return res.json();
};
export const deleteCategory = async (id) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/categories/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  return { success: res.ok };
};
export const getMenuAll = async () => {
  const restaurantId = getRestaurantId();

  const res = await fetch(
    `${BASE_URL}/api/v1/restaurants/${restaurantId}/menu`,
    { headers: getAuthHeaders() }
  );
  return res.json();
};
export const createMenuItem = async (data) => {
  const restaurantId = getRestaurantId();

  const res = await fetch(
    `${BASE_URL}/api/v1/restaurants/${restaurantId}/menu`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return res.json();
};
export const updateMenuItem = async (id, data) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/menu/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );
  return res.json();
};
export const deleteMenuItem = async (id) => {
  const res = await fetch(
    `${BASE_URL}/api/v1/menu/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  return { success: res.ok };
};
