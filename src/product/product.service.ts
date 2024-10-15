import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product, ProductDocument } from "./schemas/product.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument> 
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto); 
  }

  findAll() {
    return this.productModel.find(); 
  }

  findOne(id: number) {
    return this.productModel.findOne({id});
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
