// NEED WORK
let records =[
    {id: 1,
        sid: 8888, 
        username: 'Jack', 
        password: 'XXX', 
        hint: 'jack$123', 
        firstName:'Jack', 
        lastName:'Johnson',
        displayName:'Jack Johnson', 
        email:'jj@example.org' }]

exports.findById = function(id, cb){
    console.log(`findById: ${id}`);
    process.nextTick(()=>{
        // if there is a recrod matched the provided id 
        // return the record  cb(null, record)
        // otherwise return cb(new Error(`User ${id} does not exist`))
    })
}
exports.findByUsername = function(username, cb){
    console.log(`findByUsername: ${username}`);
    process.nextTick(()=>{
        //if there is a matched return the record return cb(null, record)
        //otherwise return cb(null, null)
    })
}