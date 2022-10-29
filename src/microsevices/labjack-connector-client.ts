import { ClientOptions, Transport } from '@nestjs/microservices';

export const labjackConnectorClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:4001',
    package: 'labjack_connector',
    protoPath: 'proto/labjack-connector.proto',
  },
};
