// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function helloAPI(req, res) {
    const { id } = req.query
    res.status(200).json({ id })
}
