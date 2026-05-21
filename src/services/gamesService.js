import axiosInstance from "../api/axios";

export async function getGames(params = {}) {
  const response = await axiosInstance.get("/games", {
    params,
  });

  return response.data;
}

export async function getGameDetails(id) {
  const response = await axiosInstance.get(`/games/${id}`);

  return response.data;
}

export async function getGameAchievements(id) {
  const response = await axiosInstance.get(`/games/${id}/achievements`);

  return response.data;
}

export async function getGameTrailers(id) {
  const response = await axiosInstance.get(`/games/${id}/movies`);

  return response.data;
}

export async function getPublisherGames(id, params = {}) {
  const response = await axiosInstance.get("/games", {
    params: {
      publishers: id,
      ...params,
    },
  });

  return response.data;
}