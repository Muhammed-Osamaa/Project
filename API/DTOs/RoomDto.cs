using System;
using API.Utility;

namespace API.DTOs;

public class RoomDto
{
    public int RoomID { get; set; }
    public string? RoomDescribtion { get; set; }
    public string? RoomTitle { get; set; }
    public string? RoomAddress { get; set; }

    public string? RoomOwner { get; set; }
    public string? City { get; set; }

    public string? Country { get; set; }

    public int Price { get; set; }
    public int Rating { get; set; }

    public RoomType? RoomType { get; set; }
    public bool IsActive { get; set; }
    public List<PhotoDto>? Photo { get; set; }
}
