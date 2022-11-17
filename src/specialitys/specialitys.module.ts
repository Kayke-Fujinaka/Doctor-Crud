import { Module } from '@nestjs/common';
import { SpecialitysService } from './services/specialitys.service';
import { SpecialitysController } from './specialitys.controller';

@Module({
  controllers: [SpecialitysController],
  providers: [SpecialitysService],
})
export class SpecialitysModule {}
