import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import {
  iRealEstateCreate,
  iReturnRealEstate,
} from "../../interfaces/realEstate.schemas";

export const realEstateCreateService = async (
  data: iRealEstateCreate
): Promise<iReturnRealEstate> => {
  const realRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const address: Repository<Address> = AppDataSource.getRepository(Address);
  const category: Repository<Category> = AppDataSource.getRepository(Category);

  if (data.address.number) {
    const addressAlreadyExists = await address.findOneBy({
      number: data.address.number,
    });
    if (addressAlreadyExists) {
      throw new AppError("Address already exists", 409);
    }
  }

  const createAddress = address.create(data.address);
  await address.save(createAddress);

  const findCategory = await category.findOneBy({
    id: data.categoryId!,
  });

  const createRealEstate = realRepo.create({
    value: data.value,
    size: data.size,
    address: createAddress,
    category: findCategory!,
  });

  const returnCreateRealEstate = await realRepo.save(createRealEstate);

  return returnCreateRealEstate;
};
