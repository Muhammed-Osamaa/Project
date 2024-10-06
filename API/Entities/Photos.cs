namespace API.Entities;

public class Photos
{
    public int Id { get; set; }
    public required string Url { get; set; }

    //navigation
    public int RoomId { get; set; }
    public Room Room { get; set; } = null!;
}