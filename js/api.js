const searchButton = document.getElementById('search-btn');
const booksContainer = document.getElementById('books-container');
const errorMessageDiv = document.getElementById('error-message');
// spinner.classList.add('d-none');

// data fatch
const fetchedData = async url => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// spinner toggle
const toggleSpinnrer = displayStyle => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = displayStyle;
}

// button handler
searchButton.addEventListener('click', () => {
  const inputField = document.getElementById('input-field');
  const totalResult = document.getElementById('total-result');
  const searchText = inputField.value;
  inputField.value = '';
  totalResult.textContent = '';
  booksContainer.textContent = '';
  errorMessageDiv.textContent = '';

  console.log(searchText);
  if (searchText.length === 0) {
    displayErrorMessage(searchText);
  }
  else {
    toggleSpinnrer('block');
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetchedData(url)
      .then(books => displaySearchResults(books, searchText));
  }
});

// number of search result
const displayNumberOfResult = number => {
  const totalResult = document.getElementById('total-result');
  const p = document.createElement('p');
  let result = number;
  if (result > 20) result = 20;
  p.className = 'text-center';
  p.innerText = `Showing ${result} of ${number} result found`;
  totalResult.appendChild(p);
}

// display error message
const displayErrorMessage = (searchText) => {
  errorMessageDiv.textContent = '';
  const p = document.createElement('p');
  p.className = 'text-center bg-warning fw-bold fs-3';
  p.innerText = `No result found for ${searchText}`;
  errorMessageDiv.appendChild(p);
}

// display all search books
const displaySearchResults = (books, searchText) => {
  console.log(books); // array

  if (books.docs.length === 0) {
    toggleSpinnrer('none');
    displayErrorMessage(searchText);
  }
  else {
    toggleSpinnrer('none');
    displayNumberOfResult(books.numFound);

    books.docs.slice(0, 20).forEach(book => {
      const { title, author_name, first_publish_year, publisher, cover_i } = book;

      const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

      const div = document.createElement('div');
      div.className = 'col';
      div.innerHTML = `
        <div class="card h-100">
          <img src="${imgSrc}" class="card-img-top h-50" alt="${imgSrc}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${author_name ? `Writer: ${author_name[0]}` : ''}</p>
            <p class="card-text">${publisher ? `Publisher: ${publisher[0]}` : ''}</p>
            <p class="card-text">First Pulbish Year: ${first_publish_year}</p>
          </div>
        </div>
      `;
      booksContainer.appendChild(div);
    });
  }
}