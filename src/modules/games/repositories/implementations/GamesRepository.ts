import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;
  private usersRepository: Repository<User>;

  constructor() {
    this.repository = getRepository(Game);
    this.usersRepository = getRepository(User);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return this.repository.createQueryBuilder("games").where("games.title ILIKE :param", { param: `%${param}%` }).getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("select count(*) from games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return this.usersRepository
    .createQueryBuilder("users")
    .innerJoinAndSelect("users.games", "games", "games.id=:id", { id })
    .getMany();
      // Complete usando query builder
  }
}
