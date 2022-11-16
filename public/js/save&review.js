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

  saveToListHandler = async (e) => {
    e.preventDefault();

    const listing_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/listing/savedlisting`, {
        method: 'POST',
        body: JSON.stringify({ listing_id }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

  }

document
    .querySelector('#submit-review')
    .addEventListener('click', newListingHandler);

document
    .querySelector('#submit-tosave')
    .addEventListener('click', saveToListHandler);