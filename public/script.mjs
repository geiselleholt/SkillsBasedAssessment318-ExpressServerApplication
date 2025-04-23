

document.getElementById("searchForm");

searchForm.addEventListener("submit", handleSearchForm);

async function handleSearchForm(e) {
    e.preventDefault();
    const title = document.getElementById("movieTitle").value;
    const resultsDiv = document.getElementById("results");

    try {
      const response = await axios(`/api/batmanMovies?title=${title}`);
      const movie = response.data;
      console.log(movie);

      if (!movie) {
        resultsDiv.innerHTML = `<p>No movie found for "${title}"</p>`;
        return;
      }

      resultsDiv.innerHTML = `
        <h2>Results:</h2>
        <h3>Title: ${movie[0].title} Year: ${movie[0].year}</h3>
        <p>Bruce Wayne played by: ${movie[0].bruceWayne}</p>
      `;
    } catch (err) {
      resultsDiv.innerHTML = `<p>Error Retrieving Data</p>`;
      console.error(err);
    }
  };
