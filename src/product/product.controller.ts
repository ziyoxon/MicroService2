import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';
import { response } from 'express';

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService,
    private readonly httpservice: HttpService
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post(":id/like")
  async likeBoss(@Param("id") id: string) {
    const product = await this.productService.findOne(+id);
    if (!product) {
      throw new NotFoundException("Bunday error mavjud emas");
    }
    product.likes++;
    await product.save();
    try {
      this.httpservice.post(`http://localhost:3000/product/${id}/like`).subscribe((response) => {
        console.log(response);
      })
    } catch (error) {
      
    }
    return product;
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }
}
