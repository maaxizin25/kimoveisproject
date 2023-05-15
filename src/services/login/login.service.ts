import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors";
import { iLogin } from "../../interfaces/login.interfaces";

export const loginService = async (data: iLogin): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const userExists = await userRepo.findOne({
    where: {
      email: data.email,
    },
  });

  if (!userExists) {
    throw new AppError("Invalid credentials", 401);
  }

  const passMatch: boolean = await compare(data.password, userExists.password);

  if (!passMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    {
      admin: userExists.admin,
    },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: String(userExists.id),
    }
  );

  return token;
};
