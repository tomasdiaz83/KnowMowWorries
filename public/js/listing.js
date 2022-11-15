const newListingHandler = async (event) => {
    event.preventDefault();

    console.log("Function called")
  
    const title = document.querySelector('#title-listing').value.trim();
    const category = document.querySelector('#category-listing').value.trim();
    const description = document.querySelector('#description-listing').value.trim();
    const location = document.querySelector('#location-listing').value.trim();
    const pricing = document.querySelector('#pricing-listing').value.trim();

    console.log (title + " " + category + " " + description + " " + location + " " + pricing);
  
    if (title && category && description && location && pricing) {
        const response = await fetch(`/api/listings/create`, {
            method: 'POST',
            body: JSON.stringify({ title, category, description, location, pricing }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create listing - please ensure fields are correctly filled out')
        }

    } else {
            alert('Please fill out all fields');
    }
  };

document
    .querySelector('#create-listing')
    .addEventListener('click', newListingHandler);