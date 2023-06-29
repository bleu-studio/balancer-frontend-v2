import { reactive } from 'vue';
import { useQuery, UseQueryOptions } from '@tanstack/vue-query';

import QUERY_KEYS from '@/constants/queryKeys';
import { SubgraphMetadata } from '@/services/bleu/metadata/types';
import { metadataSubgraphService } from '@/services/bleu/metadata/metadata-subgraph.service';

/**
 * TYPES
 */
type QueryOptions = UseQueryOptions<SubgraphMetadata[]>;

/**
 * @summary Fetches Pool Metadata list from subgraph
 */
export default function useMetadatasQuery(
  ids: string[],
  options: QueryOptions = {}
) {
  /**
   * QUERY INPUTS
   */
  const queryKey = QUERY_KEYS.Metadata.Current(ids[0]);

  const queryFn = async () => {
    const customPoolMetadata = await metadataSubgraphService.pools.get({
      where: { id_in: ids },
    });

    return customPoolMetadata;

    // return (await ipfsService.get(customPoolMetadata.metadataCID).then(res => {
    //   return res;
    // })) as Promise<SubgraphMetadataCID[]>;
  };

  /**
   * QUERY OPTIONS
   */
  const queryOptions = reactive({
    enabled: true,
    ...options,
  });

  return useQuery<SubgraphMetadata[]>(
    queryKey,
    queryFn,
    queryOptions as QueryOptions
  );
}
