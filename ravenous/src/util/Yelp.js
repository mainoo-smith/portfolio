const apiKey = 'R1PJO7E16byFdQhmeIDdB0-1dm0gWoBrgZepdOkUX0TinCDiV8w-TmRvAmhPA3x_LN9PIvsG3iO0hmfsjaFpyzanDfdP2P6D5OpZem4LleHik2KkvZQ0vrVTWtQMX3Yx';
const Yelp = {
    search(term, location, sortBy) {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }).then(response => {
          console.log(response);
        return response.json();
      }).then(jsonResponse => {
       if(jsonResponse.businesses) {
          return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }));
        }
      });
    }
  };
  
  export default Yelp;