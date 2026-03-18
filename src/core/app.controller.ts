import { Controller, Get } from '@nestjs/common';
import { timestamp } from 'rxjs';

@Controller()
export class AppController {

    @Get('health')
    heathCheck(){
        return {status: 'ok', timestamp: new Date().toISOString() };
    }
}
