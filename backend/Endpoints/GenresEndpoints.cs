using GaneStore.Dtos;
using Microsoft.EntityFrameworkCore;

namespace GaneStore.Data;

public static class GenresEndpoints
{
    public static void MapGenresEndpoints(this WebApplication app)
    {

        var group = app.MapGroup("/genres");

        app.MapGet("/", async (GameStoreContext db) => await db.Genres.Select(genre => new GenreDto(genre.Id, genre.Name)).AsNoTracking().ToListAsync());
    }
}