const newListingHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment-field').value.trim();

    const listing_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    if (comment) {
        const response = await fetch(`/api/reviews/`, {
            method: 'POST',
            body: JSON.stringify({ comment, listing_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create review - please ensure field is correctly filled out')
        }

    } else {
        alert('Please fill out a review');
    }
  };

document
    .querySelector('#submit-review')
    .addEventListener('click', newListingHandler);