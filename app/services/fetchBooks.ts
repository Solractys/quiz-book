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
          term: "Drama",
          format: "json",
        }),
      },
    );
    return filterBooks(await response.json());
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
  }
}
export default searchBooks;
