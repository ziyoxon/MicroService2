import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './schemas/product.schema';
import { ProductMicroserviceController } from './product.microservice.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    HttpModule
  ],
  controllers: [ProductController,ProductMicroserviceController],
  providers: [ProductService],
})
export class ProductModule {}
