const searchButton = document.getElementById('search-btn');
const booksContainer = document.getElementById('books-container');
const errorMessageDiv = document.getElementById('error-message');
// spinner.classList.add('d-none');

const fetchedData = async url => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const toggleSpinnrer = displayStyle => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = displayStyle;
}

searchButton.addEventListener('click', () => {
  const inputField = document.getElementById('input-field');
  const totalResult = document.getElementById('total-result');
  const searchText = inputField.value;
  inputField.value = '';
  totalResult.textContent = '';
  booksContainer.textContent = '';
  errorMessageDiv.textContent = '';


  if (searchText.length === 0) {
    displayErrorMessage();
  }
  else {
    toggleSpinnrer('block');
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetchedData(url)
      .then(books => {
        displaySearchResults(books.docs);
      });
  }
});

// number of search result
const displayNumberOfResult = number => {
  const totalResult = document.getElementById('total-result');
  const p = document.createElement('p');
  p.className = 'text-center';
  p.innerText = 'Result Found: ' + number;
  totalResult.appendChild(p);
}

// display error message
const displayErrorMessage = () => {
  errorMessageDiv.textContent = '';
  const p = document.createElement('p');
  p.className = 'text-center bg-warning fw-bold fs-3';
  p.innerText = 'No result found';
  errorMessageDiv.appendChild(p);
}

// display all search books
const displaySearchResults = books => {
  console.log(books); // array

  if (books.length === 0) {
    toggleSpinnrer('none');
    displayErrorMessage();
  }
  else {
    toggleSpinnrer('none');
    displayNumberOfResult(books.length);
    books.forEach(book => {
      const { title, author_name, first_publish_year, publisher, cover_i } = book;
      if (cover_i !== undefined) {
        const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

        // console.log(cover_i);

        const div = document.createElement('div');
        div.className = 'col';
        div.innerHTML = `
          <div class="card h-100">
            <img src="${imgSrc}" class="card-img-top h-50" alt="...">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">Writer: ${author_name}</p>
              <p class="card-text">Publisher: ${publisher}</p>
              <p class="card-text">First Pulbish Year: ${first_publish_year}</p>
            </div>
          </div>
        `;
        booksContainer.appendChild(div);
      }
    });
  }
}