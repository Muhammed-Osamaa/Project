using System;
using System.ComponentModel.DataAnnotations;
using API.Utility;

namespace API.Entities;

public class Room
{
    [Key]
    public int RoomID { get; set; }
 
    public required string RoomDescribtion { get; set; }

    public required string RoomTitle { get; set; }
    public required string RoomAddress { get; set; }
    public required string RoomOwner { get; set; }
    //public required string RoomOwnerID { get; set; }

    public required string City { get; set; }

    public required string Country { get; set; }
    public  int Price { get; set; }
    public  int Rating { get; set; }

    public required RoomType RoomType { get; set; }

    //public int CountDays {  get; set; }
    public bool IsActive { get; set; } //status

    public List<Photos> Photo { get; set; } = [];
   // public List<RoomBookingDetails> RoomBookingDetails { get; set; } = [];
}
