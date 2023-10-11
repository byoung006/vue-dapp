
import {Network, Alchemy} from 'alchemy-sdk';

interface GetNftImagesFromAddressOptionsInterface {
    pageSize?: number;
    excludeFilters?: string[];
}

export const fetchNFTs = async (address:string, key) => {
    const settings = {
        apiKey:key,
        network: Network.MATIC_MAINNET,
    };

    const alchemy = new Alchemy(settings);
    let retryRequests = 0;
if (retryRequests > 5) return;
console.log(address, 'address');

// Get all the NFTs owned by an address
    const nfts  = await alchemy.nft.getNftsForOwner(address);
    console.log(nfts, 'nfts');
    retryRequests++;
    return nfts;

}

export async function getNftImagesFromAddress(address: string, key:string):Promise<any[][]>{
    const settings = {
        apiKey:key,
        network: Network.MATIC_MAINNET,
    };
    const nftArray:string[] = [];

    const alchemy = new Alchemy(settings);
    const options = {pageSize:20, excludeFilters: ["SPAM"]}<GetNftImagesFromAddressOptionsInterface>;
    const nft = await alchemy.nft.getNftsForOwner(address,options)
        console.log(nft.ownedNfts, 'nft');
       return nft.ownedNfts.map((nft) => nft.media.map((media) => media.gateway));

}
