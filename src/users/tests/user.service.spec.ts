import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../application/user.service';
import { User } from '../domain/user.entity';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should create a user', async () => {
    const user = new User();
    const repo = module.get(getRepositoryToken(User));

    user.name = 'Rafansa';
    user.email = 'rafansa@gmail.com';
    user.password = 'asddsa';
    (repo.save as jest.Mock).mockImplementation(async (entity: User) => {
      return {
        ...entity,
        id: 'uuid-1234',
        is_authenticated: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const result = await service.createUser(user);


    expect(repo.save).toHaveBeenCalledWith(user);
    expect(result.id).toBeDefined();
    expect(result.is_authenticated).toBe(false);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });


  it('should get all users', async () => {
    const repo = module.get(getRepositoryToken(User));
    const users = [new User(), new User()];
    (repo.find as jest.Mock).mockResolvedValue(users);

    const result = await service.getAllUsers();

    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual(users);
  });

  it('should get user by id', async () => {
    const repo = module.get(getRepositoryToken(User));
    const user = new User();
    user.id = 'uuid-1234';
    (repo.findOne as jest.Mock).mockResolvedValue(user);

    const result = await service.getUserById('uuid-1234');

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 'uuid-1234' } });
    expect(result).toEqual(user);
  });
});
