import axios from "axios";
export const searchBooks = async (query: string) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=1&key=AIzaSyDSyk_VEd-a_zSWN0uXHaNJGOB6y9ZQGnM`;

  try {
    const response = await axios.get(url);
    console.log(response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Erro ao buscar livro", error);
    return [];
  }
};
