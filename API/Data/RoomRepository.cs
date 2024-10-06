using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Utility;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class RoomRepository(DataContext context , IMapper mapper) : IRoomRepository
{
      public async Task<IEnumerable<RoomDto>> GetRoomsAsync()
    {
        return await context.Rooms.ProjectTo<RoomDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0 ;
    }

    public async Task<RoomDto?>  GetRoomByIdAsync(int id)
    {
        return await context.Rooms.Where(x => x.RoomID == id)
        .ProjectTo<RoomDto>(mapper.ConfigurationProvider).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<RoomDto>> FilterRooms(string country, int roomType)
    {
        return await context.Rooms.Where(x => x.Country == country && (int)x.RoomType == roomType)
        .ProjectTo<RoomDto>(mapper.ConfigurationProvider).ToListAsync();
    }
}
