'use client';

import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { useCluster } from '@providers/cluster';
import { displayAddress, TokenLabelInfo } from '@utils/tx';
import { useClusterPath } from '@utils/url';
import Link from 'next/link';
import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

// import { getTokenInfoWithoutOnChainFallback } from '@utils/token-info';

import { pubkeyToString } from '@/src/utils';
import { fetchToken, Token } from '@metaplex-foundation/mpl-toolbox';
import { publicKey } from '@metaplex-foundation/umi';
import { PublicKey } from '@solana/web3.js';
import { Copyable } from './Copyable';

type Props = {
  pubkey: PublicKey;
  alignRight?: boolean;
  link?: boolean;
  raw?: boolean;
  truncate?: boolean;
  truncateUnknown?: boolean;
  truncateChars?: number;
  useMetadata?: boolean;
  overrideText?: string;
  tokenLabelInfo?: TokenLabelInfo;
  fetchTokenLabelInfo?: boolean;
};

export function Address({
  pubkey,
  alignRight,
  link,
  raw,
  truncate,
  truncateUnknown,
  truncateChars,
  useMetadata,
  overrideText,
  tokenLabelInfo,
  fetchTokenLabelInfo,
}: Props) {
  const address = pubkey.toBase58();
  const { cluster } = useCluster();
  const addressPath = useClusterPath({ pathname: `/address/${address}` });

  const display = displayAddress(address, cluster, tokenLabelInfo);
  if (truncateUnknown && address === display) {
    truncate = true;
  }

  let addressLabel = raw ? address : display;

  const metaplexData = useTokenMetadata(useMetadata, address);
  if (metaplexData && metaplexData.data) {
    addressLabel = pubkeyToString(metaplexData.data.publicKey);
  }

  const tokenInfo = useTokenInfo(fetchTokenLabelInfo, address);
  if (tokenInfo) {
    addressLabel = displayAddress(address, cluster, tokenInfo);
  }

  if (truncateChars && addressLabel === address) {
    addressLabel = addressLabel.slice(0, truncateChars) + '…';
  }

  if (overrideText) {
    addressLabel = overrideText;
  }

  const content = (
    <Copyable text={address} replaceText={!alignRight}>
      <span className="font-monospace">
        {link ? (
          <Link
            className={truncate ? 'text-truncate address-truncate' : ''}
            href={addressPath}
          >
            {addressLabel}
          </Link>
        ) : (
          <span className={truncate ? 'text-truncate address-truncate' : ''}>
            {addressLabel}
          </span>
        )}
      </span>
    </Copyable>
  );

  return (
    <>
      <div
        className={`d-none d-lg-flex align-items-center ${
          alignRight ? 'justify-content-end' : ''
        }`}
      >
        {content}
      </div>
      <div className="d-flex d-lg-none align-items-center">{content}</div>
    </>
  );
}
const useTokenMetadata = (useMetadata: boolean | undefined, pubkey: string) => {
  const [data, setData] = useState<Token>();
  const { url } = useCluster();

  useAsyncEffect(
    async (isMounted) => {
      if (!useMetadata) return;
      if (pubkey && !data) {
        try {
          const umi = createUmi(url, { commitment: 'confirmed' });
          const token = await fetchToken(umi, publicKey(pubkey));

          if (isMounted()) {
            setData(token);
          }
        } catch {
          if (isMounted()) {
            setData(undefined);
          }
        }
      }
    },
    [useMetadata, pubkey, url, data, setData]
  );
  return { data };
};

const useTokenInfo = (
  fetchTokenLabelInfo: boolean | undefined,
  pubkey: string
) => {
  const [info, setInfo] = useState<TokenLabelInfo>();
  const { cluster, url } = useCluster();

  useAsyncEffect(
    async (isMounted) => {
      if (!fetchTokenLabelInfo) return;
      if (!info) {
        try {
          const umi = createUmi(url, { commitment: 'confirmed' });
          const token = await fetchToken(umi, publicKey(pubkey));

          if (isMounted()) {
            setInfo({ name: 'Placeholder', symbol: 'PS' });
          }
        } catch {
          if (isMounted()) {
            setInfo(undefined);
          }
        }
      }
    },
    [fetchTokenLabelInfo, pubkey, cluster, url, info, setInfo]
  );

  return info;
};
