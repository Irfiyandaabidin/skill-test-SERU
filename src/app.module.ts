import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { VehicleBrandModule } from './vehicle-brand/vehicle-brand.module';
import { VehicleModelModule } from './vehicle-model/vehicle-model.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { VehicleYearModule } from './vehicle-year/vehicle-year.module';
import { PricelistModule } from './pricelist/pricelist.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    VehicleBrandModule,
    VehicleModelModule,
    VehicleTypeModule,
    VehicleYearModule,
    PricelistModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
