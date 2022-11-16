const searchHandler = async (event) => {
    event.preventDefault();
  
    const category = document.querySelector('#category-search').value.trim();
    const location = document.querySelector('#location-search').value.trim();
  
    if (category || location) {
        const response = await fetch(`/searchResults`, {
            method: 'POST',
            body: JSON.stringify({ category, location }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {

        } else {
            alert('Failed to create listing - please ensure fields are correctly filled out')
        }

    } else {
            alert('Please fill a field');
    }
  };

document
    .querySelector('#submit-search')
    .addEventListener('click', searchHandler);