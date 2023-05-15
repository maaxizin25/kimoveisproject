import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { iReturnManyRealEstate } from "../../interfaces/realEstate.schemas";

export const listAllRealEstateService =
  async (): Promise<iReturnManyRealEstate> => {
    const realRepo = AppDataSource.getRepository(RealEstate);

    const listAllRepo = await realRepo
      .createQueryBuilder("realEstate")
      .innerJoinAndSelect("realEstate.address", "realAddress")
      .getMany();

    return listAllRepo;
  };
