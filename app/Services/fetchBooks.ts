import filterBooks from "./filterBooks";
async function searchBooks() {
  try {
    const response = await fetch(
      "https://www.stands4.com/services/v2/literature.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          uid: `${process.env.NEXT_PUBLIC_USER_UID}`,
          tokenid: `${process.env.NEXT_PUBLIC_TOKEN_ID}`,
          term: "",
          format: "json",
        }),
      },
    );

    const data = await response.json();
    return filterBooks(data.result);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
}

export default searchBooks;
