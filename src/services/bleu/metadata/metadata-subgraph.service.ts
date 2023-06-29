import { MetadataEntity } from './entities/pool/pool.entity';
import { MetadatasEntity } from './entities/pools/pools.entity';
import { metadataSubgraphClient } from './metadata-subgraph.client';

export class MetadataSubgraphService {
  pool: MetadataEntity;
  pools: MetadatasEntity;

  constructor(readonly client = metadataSubgraphClient) {
    this.pool = new MetadataEntity(this);
    this.pools = new MetadatasEntity(this);
  }
}

export const metadataSubgraphService = new MetadataSubgraphService();
