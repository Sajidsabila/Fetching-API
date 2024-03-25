$(document).ready(() => {
  const getFilm = () => {
    $.ajax({
      url: "http://www.omdbapi.com",
      type: "GET",
      dataType: "json",
      data: {
        apiKey: "c86fe9c4",
        s: $("#keyword").val(),
      },
      success: function (result) {
        if (result.Response === "True" && result.Poster !== "N/A") {
          let movies = result.Search;
          $.each(movies, (index, data) => {
            $("#list-movie").append(`
                    <div class="col-sm-3 text-center mt-2">
                        <div class="card">
                          <div class="card-header">
                            ${data.Title}
                          </div>
                          <div class="card-body">
                            <img src="${data.Poster}" alt="${data.Title}" width="200">
                            <p><strong class="badge badge-warning"><h5>${data.Type}</h5></strong></p>
                            <p class="card-text">${data.Year}</p>
                            <a href="#" class="btn btn-primary btn-sm detail-movie" 
                                data-toggle="modal" 
                                data-target="#detailMovie" data-id="${data.imdbID}">See detail</a>
                          </div>
                        </div>
                    </div>
                `);
          });

          $("#keyword").val("");
        } else {
          $("#list-movie").html(
            `<p class="col-sm-12 alert alert-danger">film Tidak ditemukan</p>`
          );
        }
      },
    });
  };

  $("#search").click(() => {
   getFilm();
  });

  $('#keyword').keyup( (event) => {
    if(event.key == "Enter"){
        getFilm();
    }
   
  });

  $('#list-movie').on('click', '.detail-movie', function(){
    let movieId = $(this).data('id');

    $.ajax({
        url: "http://www.omdbapi.com",
        type: "GET",
        dataType: "json",
        data: {
            apiKey: "c86fe9c4",
            i: movieId
        },
         success: (dataMovie) => {
         
            if(dataMovie.Response === 'True'){
                $('.modal-body').html(`
                    <div class="row">
                        <div class="col-sm-5">
                        <img src="${dataMovie.Poster}" alt="${dataMovie.Title}">
                        </div>
                        <div class="col-sm-7">
                        <h3>${dataMovie.Title}</h3>
                        <p>${dataMovie.Plot}</p>
                        <p class="fw-bold">Tahun Rilis : <span class="bg-primary text-white">${dataMovie.Released}</span></p>
                        <p class="fw-bold">Durasi Film : <span class="bg-primary text-white">${dataMovie.Runtime}</span></p>
                        <p class="fw-bold">Aktor Film : <span class="bg-primary text-white">${dataMovie.Actors}</span></p>                       
                        </div>
                    </div>
                `)
            }
         }
    })
  })
});
