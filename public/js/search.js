const searchCatHandler = async (event) => {
    event.preventDefault();
  
    const category = document.querySelector('#category-search').value.trim();
  
    if (category) {
        document.location.replace(`/searchResults/cat/${category}`)
    } else {
            alert('Please fill a field');
    }
  };

  const searchLocHandler = async (event) => {
    event.preventDefault();
  
    const location = document.querySelector('#location-search').value.trim();
  
    if (location) {
        document.location.replace(`/searchResults/loc/${location}`)
    } else {
            alert('Please fill a field');
    }
  };

document
    .querySelector('#submit-search-location')
    .addEventListener('click', searchLocHandler);

document
    .querySelector('#submit-search-category')
    .addEventListener('click', searchCatHandler);