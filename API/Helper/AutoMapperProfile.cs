using System;
using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Room,RoomDto>();
        CreateMap<Photos,PhotoDto>();
    }
}
