import { NFTStorage, File } from 'nft.storage'
const NFT_STORAGE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweENkMzMwOTNDZGQ0ODVCMmViODY1RjMyNTYwMDhDODUwMTc2NEM2MWEiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4Mzc5OTY3MTQyMywibmFtZSI6Im1ldGFzcXVhcmUifQ.0pcthdkmqba_nZZrpFHQ3y6bsJqTWA6sg-jHCDaYalU'
async function storeNFT(image, name, symbol, description, fee, noOfParticipants) {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    return nftstorage.store({
        image,
         name,symbol, description, fee, noOfParticipants
    });
}
async function main(image, name, symbol, description, fee, noOfParticipants) {
    const result = await storeNFT(image, name,symbol, description, fee, noOfParticipants)
    return(result)
}

export default main;