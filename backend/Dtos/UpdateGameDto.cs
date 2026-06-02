using System.ComponentModel.DataAnnotations;

namespace GaneStore.Dtos;

public record UpdateGameDto(
    [Required][StringLength(30)][MinLength(3)] string Name,
    [Range(1, 50)] int GenreId,
    [Required][Range(1, 300)] decimal Price,
    DateOnly ReleaseDate
);