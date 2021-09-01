const searchButton = document.getElementById('search-btn');

const fetchedData = async url => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

searchButton.addEventListener('click', () => {
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  inputField.value = '';

  // console.log(inputValue);
  const url = `http://openlibrary.org/search.json?q=${searchText}`;
  fetchedData(url)
    .then(books => console.log(books.docs));
});