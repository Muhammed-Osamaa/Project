using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController(IRoomRepository roomRepository) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms() {
            var rooms = await roomRepository.GetRoomsAsync();
            return Ok(rooms);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoom(int id) {
            var room = await roomRepository.GetRoomByIdAsync(id);
            if(room == null) return NotFound();
            return Ok(room);
        }

        [HttpGet("filter/{city}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoom(string city , [FromQuery] int roomType) {
            var getRoomByFilter = await roomRepository.FilterRooms(city,roomType);
            if(getRoomByFilter.Count() == 0) return NotFound();
            return Ok(getRoomByFilter);
        }
    }
}
