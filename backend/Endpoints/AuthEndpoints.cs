using GaneStore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GaneStore.Dtos;

namespace GaneStore.Endpoints;

public static class AuthENdpoints
{
    public static void MapAuthEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/auth");

        group.MapGet("/check", async (ClaimsPrincipal principal, UserManager<ApplicationUser> userManager) =>
        {
            var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
            {
                return Results.Unauthorized();
            }

            var user = await userManager.FindByIdAsync(userId);

            if (user is null)
            {
                return Results.Unauthorized();
            }

            return Results.Ok(new
            {
                id = user.Id,
                email = user.Email,
                username = user.UserName
            });
        }).RequireAuthorization();

        group.MapPost("/register", async (UserManager<ApplicationUser> userManager, RegisterDto dto) =>
        {
            ApplicationUser user = new()
            {
                UserName = dto.Username,
                Email = dto.Email,
            };

            var result = await userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return Results.BadRequest(result.Errors);
            }

            return Results.Ok();
        });

        group.MapPost("/login", async (UserManager<ApplicationUser> userManager, IConfiguration config, LoginDto dto) =>
        {
            var user = await userManager.FindByEmailAsync(dto.Email);

            if (user is null)
            {
                return Results.BadRequest("User not found");
            }

            bool validPassword = await userManager.CheckPasswordAsync(user, dto.Password);

            if (!validPassword)
            {
                return Results.BadRequest("Invalid credentials");
            }

            var claims = new[]
            {
              new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtKey"]!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(config["JwtKey"], config["JwtKey"], claims, expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);

            return Results.Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    username = user.UserName
                }
            });
        });
    }
}