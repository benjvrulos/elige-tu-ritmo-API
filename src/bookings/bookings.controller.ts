import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
} from '@nestjs/common';

import { BookingsService } from './providers/bookings.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { UpdatePendingBookingDto } from './dtos/update-pending-book.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Auth(AuthType.None)
  @Post()
  create(
    @Body()
    dto: CreateBookingDto,
  ) {
    return this.bookingsService.create(dto);
  }

  @Auth(AuthType.None)
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.bookingsService.findOne(id);
  }

  @Auth(AuthType.None)
  @Patch(':id')
  updatePending(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdatePendingBookingDto,
  ) {
    return this.bookingsService.updatePending(id, dto);
  }
}
