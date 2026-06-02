using Microsoft.AspNetCore.Identity;

namespace GaneStore.Models;

public class ApplicationUser : IdentityUser
{
    public List<Game> GamesCreated { get; set; } = [];
}