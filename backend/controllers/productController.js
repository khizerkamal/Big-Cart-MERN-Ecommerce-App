exports.getProducts = (req,res) => {
    res.status(200).json({
        status: 'success',
        data: {
            message: "I am lots of products!"
        }
    })
}