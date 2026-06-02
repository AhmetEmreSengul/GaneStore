using System.Security.Claims;
using GaneStore.Data;
using GaneStore.Models;
using Microsoft.EntityFrameworkCore;

namespace GaneStore.Dtos;

public static class GamesEndpoints
{
    const string GetGameEndpointName = "GetGame";



    public static void MapGamesEndpoints(this WebApplication app)
    {

        var group = app.MapGroup("/games");

        group.MapGet("/", async (GameStoreContext dbContext) => await dbContext.Games.Include(game => game.Genre).Select(game => new GameSummaryDto(
            game.Id,
            game.Name,
            game.Genre!.Name,
            game.Price,
            DateOnly.FromDateTime(game.ReleaseDate)
        )).AsNoTracking().ToListAsync());

        group.MapGet("/my-games", async (GameStoreContext dbContext, ClaimsPrincipal user) =>
        {

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Results.Unauthorized();
            }

            var games = await dbContext.Games.Include(game => game.Genre).Where(game => game.UserId == userId).Select(game => new GameSummaryDto(
                game.Id,
                game.Name,
                game.Genre!.Name,
                game.Price,
                DateOnly.FromDateTime(game.ReleaseDate)
            )).AsNoTracking().ToListAsync();

            return Results.Ok(games);
        });

        group.MapGet("/{id}", async (int id, GameStoreContext dbContext) =>
        {
            var game = await dbContext.Games.FindAsync(id);

            return game is null ? Results.NotFound("Game not found") : Results.Ok(
              new GameDetailsDto(
                  game.Id,
                  game.Name,
                  game.GenreId,
                  game.Price,
                  DateOnly.FromDateTime(game.ReleaseDate)
              )
            );


        }).WithName(GetGameEndpointName);

        group.MapPost("/", async (CreateGameDto newGame, GameStoreContext dbContext, ClaimsPrincipal user) =>
        {

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Results.Unauthorized();
            }

            Game game = new()
            {
                Name = newGame.Name,
                GenreId = newGame.GenreId,
                Price = newGame.Price,
                ReleaseDate = newGame.ReleaseDate.ToDateTime(TimeOnly.MinValue),
                UserId = userId
            };


            dbContext.Games.Add(game);
            await dbContext.SaveChangesAsync();

            GameDetailsDto gameDto = new(
                game.Id,
                game.Name,
                game.GenreId,
                game.Price,
                DateOnly.FromDateTime(game.ReleaseDate)
            );

            return Results.CreatedAtRoute(GetGameEndpointName, new { id = gameDto.Id }, gameDto);
        }).RequireAuthorization();

        group.MapPut("/{id}", async (int id, UpdateGameDto updatedGame, GameStoreContext dbContext, ClaimsPrincipal user) =>
        {
            var existingGame = await dbContext.Games.FindAsync(id);

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            if (existingGame is null)
            {
                return Results.NotFound("Game not found");
            }

            if (existingGame.UserId != userId)
            {
                return Results.Forbid();
            }

            existingGame.Name = updatedGame.Name;
            existingGame.GenreId = updatedGame.GenreId;
            existingGame.Price = updatedGame.Price;
            existingGame.ReleaseDate = updatedGame.ReleaseDate.ToDateTime(TimeOnly.MinValue);

            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        }).RequireAuthorization();

        group.MapDelete("/{id}", async (int id, GameStoreContext dbContext, ClaimsPrincipal user) =>
        {

            var userId = user.FindFirstValue(ClaimTypes.NameIdentifier);

            var game = await dbContext.Games.FindAsync(id);

            if (game is null)
            {
                return Results.NotFound("Game not found");
            }

            if (game.UserId != userId)
            {
                return Results.Forbid();
            }

            await dbContext.Games.Where(game => game.Id == id).ExecuteDeleteAsync();

            return Results.Content("Deleted");
        }).RequireAuthorization();
    }

}