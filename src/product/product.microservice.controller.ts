import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller("product")
export class ProductMicroserviceController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern("hello")
  async hello(data: string) {
    console.log(data);
    return "Hello keldi";
  }

  @MessagePattern("salom")
  async salom(data: string) {
    console.log(data);
    return "Salom keldi";
  }

  @EventPattern("product_created")
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // @Get()
  // findAll() {
  //   return this.productService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.productService.findOne(id);
  // }

  @EventPattern("product_updated")
  update(@Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+updateProductDto.id, updateProductDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(id);
  // }
}
