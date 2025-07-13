import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../domain/product.entity';
import { CatalogService } from '../application/catalog.service';

describe('ProductService', () => {
  let service: CatalogService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        CatalogService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatalogService>(CatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const product = new Product();
    const repo = module.get(getRepositoryToken(Product));

    product.name = 'Test Product';
    product.price = 100;
    product.description = 'This is a test product';
    (repo.save as jest.Mock).mockImplementation(async (entity: Product) => {
      return {
        ...entity,
        id: 'uuid-1234',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const result = await service.createProduct(product);

    expect(repo.save).toHaveBeenCalledWith(product);
    expect(result.id).toBeDefined();
    expect(result.name).toBe('Test Product');
    expect(result.description).toBe('This is a test product');
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it('should handle errors when creating a product', async () => {
    const product = new Product();
    const repo = module.get(getRepositoryToken(Product));

    (repo.save as jest.Mock).mockImplementation(() => {
      throw new Error('Database error');
    });

    await expect(service.createProduct(product)).rejects.toThrow(
      'Database error',
    );
  });

  it('should get all products', async () => {
    const repo = module.get(getRepositoryToken(Product));
    const products = [new Product(), new Product()];
    (repo.find as jest.Mock).mockResolvedValue(products);

    const result = await service.getAllProducts();

    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(products);
  });

  it('should get product by id', async () => {
    const repo = module.get(getRepositoryToken(Product));
    const product = new Product();
    product.id = 'uuid-1234';
    (repo.findOne as jest.Mock).mockResolvedValue(product);

    const result = await service.getProductById('uuid-1234');

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1234' } });
    expect(result).toEqual(product);
  });

  it('should edit product by id', async () => {
    const repo = module.get(getRepositoryToken(Product));

    const existingProduct = new Product();
    existingProduct.id = 'uuid-1234';
    existingProduct.name = 'Old Product Name';
    existingProduct.price = 20;

    (repo.findOne as jest.Mock).mockResolvedValue(existingProduct);

    const updatedProduct = {
      ...existingProduct,
      name: 'Updated Product Name',
      price: 25,
    };
    (repo.save as jest.Mock).mockResolvedValue(updatedProduct);

    const result = await service.updateProduct('uuid-1234', {
      name: 'Updated Product Name',
      price: 25,
    });

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1234' } });
    expect(repo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'uuid-1234',
        name: 'Updated Product Name',
        price: 25,
      }),
    );

    expect(result?.name).toBe('Updated Product Name');
    expect(result?.price).toBe(25);
  });


  it('should delete product by id', async () => {
    const repo = module.get(getRepositoryToken(Product));
    (repo.delete as jest.Mock).mockResolvedValue({ affected: 1 });

    const result = await service.deleteProduct('uuid-1234');

    expect(repo.delete).toHaveBeenCalledWith('uuid-1234');
    expect(result).toBe(true);
  });
});
