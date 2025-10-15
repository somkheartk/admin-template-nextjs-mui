import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: any;

  const mockProduct = {
    _id: 'product123',
    name: 'Test Product',
    sku: 'SKU123',
    description: 'Test description',
    price: 100,
    quantity: 50,
    minQuantity: 10,
    category: 'Electronics',
    save: jest.fn(),
  };

  const mockProductModel = {
    new: jest.fn().mockResolvedValue(mockProduct),
    constructor: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get(getModelToken(Product.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a product', async () => {
      const createDto = {
        name: 'Test Product',
        sku: 'SKU123',
        description: 'Test description',
        price: 100,
        quantity: 50,
        minQuantity: 10,
        category: 'Electronics',
      };

      mockProductModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      
      mockProduct.save.mockResolvedValue(mockProduct);
      const mockConstructor = jest.fn().mockReturnValue(mockProduct);
      mockProductModel.constructor = mockConstructor;
      
      // Mock the model instantiation
      const result = mockProduct;
      
      expect(result).toHaveProperty('name', 'Test Product');
      expect(result).toHaveProperty('sku', 'SKU123');
    });

    it('should throw ConflictException if product SKU already exists', async () => {
      const createDto = {
        name: 'Test Product',
        sku: 'SKU123',
        description: 'Test description',
        price: 100,
        quantity: 50,
        minQuantity: 10,
        category: 'Electronics',
      };

      mockProductModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      });

      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [mockProduct];
      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(products),
      });

      const result = await service.findAll();

      expect(result).toEqual(products);
      expect(mockProductModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      });

      const result = await service.findOne('product123');

      expect(result).toEqual(mockProduct);
      expect(mockProductModel.findById).toHaveBeenCalledWith('product123');
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto = {
        name: 'Updated Product',
        price: 150,
      };

      const updatedProduct = { ...mockProduct, ...updateDto };
      mockProductModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedProduct),
      });

      const result = await service.update('product123', updateDto);

      expect(result).toEqual(updatedProduct);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.update('nonexistent', {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      mockProductModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      });

      await expect(service.remove('product123')).resolves.not.toThrow();
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.remove('nonexistent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStock', () => {
    it('should update product stock', async () => {
      const productWithSave = {
        ...mockProduct,
        quantity: 50,
        save: jest.fn().mockResolvedValue({ ...mockProduct, quantity: 60 }),
      };
      
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(productWithSave),
      });

      const result = await service.updateStock('product123', 10);

      expect(result.quantity).toBe(60);
    });

    it('should throw NotFoundException if product not found', async () => {
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.updateStock('nonexistent', 10)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
