// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function imageAPI(req, res) {
    const { data } = req.query;
    const decoded = data.toString().replace("data:image/png;base64,", "");
    const imageResp = new Buffer(decoded, "base64");

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': imageResp.length
    });
    res.end(imageResp);
    // res.status(200).json({ name: 'John Doe' })
}
