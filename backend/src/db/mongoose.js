const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://fzea:activeme@cluster0.bolzh.azure.mongodb.net/ilog-db-api', {
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true
})

