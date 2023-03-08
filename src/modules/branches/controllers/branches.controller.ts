import { Controller } from '@nestjs/common';
import { BranchesService } from '../services/branches.service';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}
}
