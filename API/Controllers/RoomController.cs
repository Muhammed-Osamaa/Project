using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController(IRoomRepository roomRepository , IMapper mapper) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
        {
            var rooms = await roomRepository.GetRoomsAsync();
            return Ok(rooms);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoom(int id)
        {
            var room = await roomRepository.GetRoomByIdAsync(id);
            if (room == null) return NotFound();
            return Ok(room);
        }

        [HttpGet("filter/{city}")]
        public async Task<ActionResult<IEnumerable<Room>>> GetRoom(string city, [FromQuery] int roomType)
        {
            var getRoomByFilter = await roomRepository.FilterRooms(city, roomType);
            if (getRoomByFilter.Count() == 0) return NotFound();
            return Ok(getRoomByFilter);
        }

        [HttpPost("dashboard/room/create")]
        public async Task<ActionResult> CreateRoom(RoomDto roomDto) {
            if (roomDto == null) return NotFound("not Found Room");
            var room =  await roomRepository.AddRoomAsync(roomDto);
            if (await roomRepository.SaveAllAsync()) return Ok(room.RoomID);
            return NotFound();
        }

        [HttpPut("dashboard/room/{id}")]
        public async Task<ActionResult> UpdateRoom(int id , [FromBody] RoomDto roomDto) {
            var room = await roomRepository.GetRoomByIdAsync(id);
            if(room == null) return NotFound("the room is not found");
            var roomUpdate=mapper.Map<Room>(roomDto);
            roomRepository.UpdateRoom(roomUpdate);
            if (await roomRepository.SaveAllAsync()) return NoContent();
            return NotFound();
        }

        [HttpDelete("dashboard/delete/{id}")]
        public async Task<ActionResult> DeleteRoom(int id) {
            var room = await roomRepository.GetRoomWithIdAsync(id);
            if(room is null) return NotFound();
            roomRepository.DeleteRoom(room);
            if(await roomRepository.SaveAllAsync()) return Ok();
            return NotFound();
        }
    }
}
