// import { getMintAccountDataSerializer } from '@metaplex-foundation/mpl-toolbox';
// import { Connection } from '@solana/web3.js';

// type MasterEditionData =
//   | programs.metadata.MasterEditionV1
//   | programs.metadata.MasterEditionV2;
// type EditionData = programs.metadata.Edition;

// export type EditionInfo = {
//   masterEdition?: MasterEditionData;
//   edition?: EditionData;
// };

// export default async function getEditionInfo(
//   metadata: any,
//   connection: Connection
// ): Promise<EditionInfo> {
//   try {
//     const edition = await getAccount
//       (
//       connection,
//       metadata.mint
//     );

//     if (edition) {
//       if (
//         edition.key === programs.metadata.Key.MasterEditionV1 ||
//         edition.key === programs.metadata.Key.MasterEditionV2
//       ) {
//         return {
//           edition: undefined,
//           masterEdition: edition as unknown as MasterEditionData,
//         };
//       }

//       // This is an Edition NFT. Pull the Parent (MasterEdition)
//       const masterEdition = await programs.metadata.Edition.fromAccountAddress(
//         connection,
//         (edition as EditionData).parent
//       );
//       if (masterEdition) {
//         return {
//           edition: edition as EditionData,
//           masterEdition: masterEdition as unknown as MasterEditionData,
//         };
//       }
//     }
//   } catch {
//     /* ignore */
//   }

//   return {
//     edition: undefined,
//     masterEdition: undefined,
//   };
// }
