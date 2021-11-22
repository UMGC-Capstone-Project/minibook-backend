import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewsPostEntity } from './feed/entities/news-post.entity';
import { UsersModule } from './user/users.module';
import { FeedModule } from './feed/feed.module';
import { PostEntity } from './feed/entities/post.entity';
import { UserEntity } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

const certKey = Buffer.from(`-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUJ+17wuTGyyBPcI4pySoJYjNwbbMwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvNWRlM2Y2YTYtNzI4YS00MDNmLTk4MzgtMWY4ZWRmZjFh
M2RlIFByb2plY3QgQ0EwHhcNMjExMTIyMDkzMzM5WhcNMzExMTIwMDkzMzM5WjA6
MTgwNgYDVQQDDC81ZGUzZjZhNi03MjhhLTQwM2YtOTgzOC0xZjhlZGZmMWEzZGUg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALlegzSm
x1V9eqHvZD7u9uuedQ+kDllSkq/exZMYvdhR3ZK4TyersmO9/3Js2ixP63QJWiBQ
4a8rgnU4NFDtG5ektWt71P4UepANNlvngl8F0ANiI2t7h0iSHjWQ0FWVTNedBWg1
tvbEPNWLD8grtrgp2xYkPE+8H5eR5Yab5cCE8ivhqD4ze1u6B/1AFStIYCeQ96Pa
hKm0y1HKeJVSWdnxXT+4Ol3+N23xWDqWvSJtdJIbUyOLSoZygvia7qkf6/GT4uBU
du46ftT4lx6rPCYnYWtK+d9Uo6cgZNCTxclwkMbZbjhuaxcWSyMm28TUiYe/VIcJ
lSngIi1IMW7clGBxAlIGMsUDdlmahXsbkHRjvZUuiq9haI3wqeS0oyesr3JHerMY
SoSNme6Wa4B82upMJmc+3WEQpiUhDh2PI+Tx3mZrFuEFyebU4g3W1zJPIvYqkbWn
NyNKtB+5sF/7roql31FT468IOl5IKyuT5Ticu2Ukrfewy2BBywFWcifLEwIDAQAB
oz8wPTAdBgNVHQ4EFgQUwX5YF/wS0mbsA6ZYRhRWNSAkTeowDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAH59PGPGYW0Vx90m
6jHOgbky/86fPkNyU5LOtfm9jLadP3MQ3bmIa/iwC2Q/cc8VtUAWgYsxcqWBtcht
6/8HEugRXQfMH1vuMzOE/cea6/7GDH9HM26J7n1TlqzQaw5meHWNnhDfU4Y1joUu
XvdVCamIBaER+rngA8AyCfSjUC7ETOzviwStgChg40O93isR1riCshfKbfweIbGc
S5Ro2BntNCm0Dv281hEHLZ9DydP4RPwOFWlUyiepbU30zDA9pZQRWf635wi3kJio
EjOsp72HFhlNQdF6CkHLxpTCq4GB5DPDMj//nps45OQXcqNOfnd2Wp3dnzp6RD+3
Udj7deCC0xgI2qLo7o50Fp/ex7/so8/ekdvg0MRo/jUahL1M/p1MizSdg5ds7tu1
22YYkePuCrCHiz6oSjgS2IEGUzoJPz2rZaC+3ilm6Vwmi8ctaKDgfb6ZO0xqhePO
xRa9OIeZ7iZzfhUNnqTTpecZadpTfYkWf/93uuN9j0Kq6PMJ+w==
-----END CERTIFICATE-----`)


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(
      {
        name: 'default',
        type: "postgres",
        url: process.env.DB_CONNECTION_STRING,
        ssl: {
          ca: certKey
        },
        synchronize: Boolean(process.env.DB_SYNCHRONIZE),
        entities: [
          UserEntity,
          NewsPostEntity,
          PostEntity
        ]
      }
    ),
    AuthModule,
    UsersModule,
    FeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
