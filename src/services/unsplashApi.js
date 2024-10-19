import axios from 'axios';

const ACCESS_KEY = 'y9Ev-VUZj4Kq_Bd6KNtWIJcJYI8pW7AjLr_ZRkfveds';
const BASE_URL = 'https://api.unsplash.com';

const unsplashApi = {
  getPhotos: async (page = 1, perPage = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/photos`, {
        params: {
          client_id: ACCESS_KEY,
          page,
          per_page: perPage,
        },
      });
      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching photos:", error);
      throw error;
    }
  },

  getPhotoDetails: async (photoId) => {
    try {
      const response = await axios.get(`${BASE_URL}/photos/${photoId}`, {
        params: {
          client_id: ACCESS_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching photo details:", error);
      throw error;
    }
  },
};

export default unsplashApi;