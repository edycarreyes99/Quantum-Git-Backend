import { Controller } from '@nestjs/common';
import { CommitsService } from '../services/commits.service';

@Controller('commits')
export class CommitsController {
  constructor(private readonly commitsService: CommitsService) {}
}
