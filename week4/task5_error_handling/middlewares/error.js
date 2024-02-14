function handleAllErros(err, req, res, next) {

  res.status(err.status || 500).json({ messages: err.message || "Error occurred." });
}

module.exports={handleAllErros};