// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function projectAPI(req, res) {
    const { name } = req.query
    let description ="A homage to the original CryptoPunks by LarvaLabs.A play on identity – stored on the Ethererum Blockchain.10k avatars; One per wallet.";
    res.status(200).json({ name, description })
}
