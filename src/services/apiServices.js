import axios from "axios";

const apiUrl = 'http://localhost:2000';
const apiProd = 'https://electronic-backend-production.up.railway.app/'
// Membuat instance axios dengan konfigurasi tertentu
export const apiService = axios.create({
  baseURL: apiProd,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  },
});

export const allProducts = async () => {
  try {
    const response = await apiService.get(`/products`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductCart = async () => {
  try {
    const response = await apiService.get(`/getcarts`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getDetailProduct = async (id) => {
  try {
    const response = await apiService.get(`/products/${id}`)
    return response
  } catch (error) {
    throw error;
  }
}

export const addOneCartProduct = async (data) => {
  try {
    const response = await apiService.post(`/addToCart`, data)
    return response
  } catch (error) {
    throw error;
  }
}

export const getOneCart = async () => {
  try {
    const response = await apiService.get(`/getcarts`)
    return response
  } catch (error) {
    throw error;
  }
}

export const getCheckout = async (userId, selectedItems) => {
  try {
    const response = await apiService.post('/getCheckout', {
      userId,
      items: selectedItems.map(item => ({
        cartItemId: item.id,
      })),
    });
    return response.data;
  } catch (error) {
    console.error('Checkout failed', error);
    throw error;
  }
}

export const getCheckoutProducts = async () => {
  const userId = localStorage.getItem('userid')
  try {
    const response = await apiService.get(`/getCheckoutProduct`, { userId })
    return response;
  } catch (error) {
    console.error('Checkout failed', error);
    throw error;
  }
}

export const incrementCartItemQuantity = async (id) => {
  try {
    const response = await apiService.patch(`/cart/increment/${id}`)
    return response
  } catch (error) {
    throw error;
  }
}

export const decrementCartItemQuantity = async (id) => {
  try {
    const response = await apiService.patch(`/cart/decrement/${id}`)
    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteOneProduct = async (id) => {
  try {
    const response = await apiService.delete(`/cart/delete/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const changeQuantityCart = async (id, newQuantity) => {
  try {
    const response = await apiService.patch('/cart/changeQuantity', { id, newQuantity });
    return response;
  } catch (error) {
    throw error;
  }
}

export const register = async (newUser) => {
  try {
    const response = await apiService.post("/register", newUser);
    return response;
  } catch (error) {
    console.error("Register Failed", error);
    throw error;
  }
};

export const login = async (user) => {
  try {
    const response = await apiService.post("/login", user);
    return response;
  } catch (error) {
    console.error("login Failed", error);
    throw error;
  }
};

export const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("checkedCart");
  window.location.href = "/";
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiService.post("/forgot-password", email);
    return response;
  } catch (error) {
    console.error("Failed", error);
    throw error;
  }
};


export const checkToken = async (token) => {
  try {
    const response = await apiService.post("/check-token", { token });
    return response;
  } catch (error) {
    console.error("failed", error);
    throw error;
  }
};

export const updatePassword = async (token, password) => {
  try {
    const response = await apiService.post(`/update-password/${token}`, { password });
    return response;
  } catch (error) {
    console.error("failed", error);
    throw error;
  }
};

export const searchProduct = async (product) => {
  try {
    const response = await apiService.get(`/products/search?query=${encodeURIComponent(product)}`)
    return response
  } catch (error) {
    console.error('failed get searched product', error)
    throw error
  }
}

export const createAlamat = async (data) => {
  const userId = localStorage.getItem('userid');
  try {
    const response = await apiService.post(`/createAlamat`, {
      userId: userId,
      alamat: data.alamat,
      kotaId: data.kota,
      provinsiId: data.provinsi,
      kodePos: data.kodePos,
    });
    return response;
  } catch (error) {
    console.error('failed to create alamat', error);
    throw error;
  }
}

export const getAlamat = async () => {
  try {
    const response = await apiService.get(`/getAlamat`);
    return response
  } catch (error) {
    console.error('failed to get alamat', error)
    throw error;

  }
}

export const setAlamat = async (data) => {
  try {
    const response = await apiService.patch(`/choosenAlamat`, { data });
    return response;
  } catch (error) {
    console.error('failed to set default alamat', error);
    throw error;
  }
}

export const updateAlamat = async (updateData) => {
  try {
    const response = await apiService.put(`/updateAlamat`, { updateData });
    return response;
  } catch (error) {
    console.error('failed update alamat', error);
    throw error;
  }
}

export const deleteAlamat = async (id) => {
  const userId = localStorage.getItem('userid')
  try {
    const response = await apiService.delete(`/deleteAlamat/${id}`, {
      data: { userId }
    });
    return response;
  } catch (error) {
    console.error('failed delete alamat', error);
    throw error;
  }
}

export const getProvinceRajaOngkir = async () => {
  try {
    const response = await apiService.get(`/getProvince`);
    return response;
  } catch (error) {
    console.error('failed get province', error);
    throw error;
  }
}

export const getCityRajaOngkir = async () => {
  try {
    const response = await apiService.get(`/getCity`);
    return response;
  } catch (error) {
    console.error('failed get city', error);
    throw error;
  }
}

export const getOngkir = async (data) => {
  try {
    const response = await apiService.post('/getOngkir', { data });
    return response;
  } catch (error) {
    console.error('failed fetch ongkir', error);
    throw error;
  }
}

export const connectJasaToCartItems = async (data) => {
  try {
    const response = await apiService.post(`/connectJasaCart`, { data });
    return response;
  } catch (error) {
    console.error('failed fetch endpoint', error);
    throw error;
  }
}

export const postPesan = async (data) => {
  try {
    const response = await apiService.post(`/postPesan`, { data });
    return response;
  } catch (error) {
    console.error('failed post pesan', error);
    throw error;
  }
}

export const getPayment = async (data) => {
  try {
    const response = await apiService.post(`/getPayment`, { data });
    return response;
  } catch (error) {
    console.error('failed get payment', error);
    throw error;
  }
}

export const getCheckoutPayment = async () => {
  const userId = localStorage.getItem('userid');
  try {
    const response = await apiService.post('/getCheckoutPayment', { userId });
    return response;
  } catch (error) {
    console.error('failed get checkout payment', error);
    throw error;
  }
}