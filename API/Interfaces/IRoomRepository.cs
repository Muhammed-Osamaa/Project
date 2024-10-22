using System;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces;

public interface IRoomRepository
{
    Task<IEnumerable<RoomDto>> GetRoomsAsync();
    Task<RoomDto?> GetRoomByIdAsync(int id);
    Task<IEnumerable<RoomDto>> FilterRooms(string country , int roomType);
    Task<bool> SaveAllAsync();
    Task<Room> AddRoomAsync(RoomDto roomDTO);
    void UpdateRoom(Room room);
    void DeleteRoom(Room room);
    Task<Room?> GetRoomWithIdAsync(int id);
}
