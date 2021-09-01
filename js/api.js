const searchButton = document.getElementById('search-btn');
const spinner = document.getElementById('spinner');
const booksContainer = document.getElementById('books-container');
spinner.classList.add('d-none');

const fetchedData = async url => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

searchButton.addEventListener('click', () => {
  const inputField = document.getElementById('input-field');
  const totalResult = document.getElementById('total-result');
  const searchText = inputField.value;
  inputField.value = '';
  totalResult.textContent = '';
  booksContainer.textContent = '';

  document.getElementById('spinner').classList.remove('d-none');

  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  fetchedData(url)
    .then(books => {
      const p = document.createElement('p');
      p.className = 'text-center';
      p.innerText = 'Result Found: ' + books.docs.length;
      totalResult.appendChild(p);
      displaySearchResults(books.docs)
    });
});

const displaySearchResults = books => {
  // console.log(books); // array
  // const booksContainer = document.getElementById('books-container');
  booksContainer.textContent = '';
  document.getElementById('spinner').classList.add('d-none');
  books.forEach(book => {
    const { title, author_name, first_publish_year, publisher, cover_i } = book;
    const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    const div = document.createElement('div');
    div.className = 'col';
    div.innerHTML = `
      <div class="card h-100">
        <img src="${imgSrc}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${author_name}</p>
          <p class="card-text">${publisher}</p>
          <p class="card-text">${first_publish_year}</p>
        </div>
      </div>
    `;
    booksContainer.appendChild(div);
  });
}