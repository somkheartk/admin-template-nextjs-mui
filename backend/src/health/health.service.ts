import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class HealthService {
  constructor(@InjectConnection() private connection: Connection) {}

  check() {
    const isDbConnected = this.connection.readyState === 1;

    return {
      status: isDbConnected ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        status: isDbConnected ? 'connected' : 'disconnected',
        name: this.connection.name,
      },
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
