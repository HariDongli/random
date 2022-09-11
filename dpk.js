const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  
  //should be moved to env variables 
  const TRIVIAL_PARTITION_KEY = "0"; // process.env.TRIVIAL_PARTITION_KEY
  const MAX_PARTITION_KEY_LENGTH = 256; //process.env.MAX_PARTITION_KEY_LENGTH

  let dpKey=TRIVIAL_PARTITION_KEY;
  // return '0' if no event or false
  if(!event)
    return dpKey

  const {partitionKey} = event;

  if(!partitionKey){
     // no partitionKey or partitionKey with falsy values
     const data = JSON.stringify(event);
     dpKey = crypto.createHash("sha3-512").update(data).digest("hex");
    return dpKey;
  }

  dpKey = partitionKey
  if(typeof partitionKey!=='string' )
    dpKey = JSON.stringify(partitionKey);
  // if it's greater than MAX_PARTITION_KEY_LENGTH
  if(dpKey.length > MAX_PARTITION_KEY_LENGTH){
    dpKey = crypto.createHash("sha3-512").update(dpKey).digest("hex");
  }
  return dpKey
};
