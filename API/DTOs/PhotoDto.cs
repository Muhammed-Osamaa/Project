using System.ComponentModel.DataAnnotations.Schema;

namespace API.DTOs;

[Table("Photos")]
public class PhotoDto
{
    public int Id {get; set;}
    public string? Url { get; set; }
}