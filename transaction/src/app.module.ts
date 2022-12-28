import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { TransactionController } from './transaction/adapters/in/transaction.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction/entity/transaction.entity';
import { TransactionPersistenceService } from './transaction/adapters/out/transaction-persistence.service';
import { TransactionPostgresService } from './transaction/adapters/out/transaction-postgres.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Transaction]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [Transaction],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'ANTIFRAUD_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'antifraud',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'antifraud-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionPersistenceService, TransactionPostgresService],
})
export class AppModule {}
