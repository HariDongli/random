const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");
describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the given input as is if length is less than MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: "testKey"});
    expect(trivialKey).toBe('testKey')
  });
  it("Returns the given input as string if length is less than MAX_PARTITION_KEY_LENGTH", () => {
    const pk ={ k: "testKey"}
    const trivialKey = deterministicPartitionKey({partitionKey: pk});
    expect(trivialKey).toBe(JSON.stringify(pk))
  });
  it("Returns hash of the object in absence of partitionKey in the event", () => {
    const pk ={ k: "testKey"}
    const candidate = crypto.createHash("sha3-512").update(JSON.stringify(pk)).digest("hex");
    const trivialKey = deterministicPartitionKey(pk);
    expect(trivialKey).toBe(candidate);
  });
  it("Returns the hash if the given paritiion key exceeds the length of MAX_PARTITION_KEY_LENGTH", () => {
    const pk = (()=>{
      let s=''
      for(let i=0;i<100;i++){
        s += String(i)+"-"
      }
      console.log(s.length);
      return s
    })();
    const candidate = crypto.createHash("sha3-512").update(pk).digest("hex");
    const trivialKey = deterministicPartitionKey({partitionKey: pk});
    expect(trivialKey).toBe(candidate);
  });

  it("Returns the hash if the given paritiion is not truthy value", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 0});
    const candidate = crypto.createHash("sha3-512").update(JSON.stringify({partitionKey: 0})).digest("hex");
    expect(trivialKey).toBe(candidate)
  });

  it("Returns the hash if the given event is a number", () => {
    const trivialKey = deterministicPartitionKey(1000);
    const candidate = crypto.createHash("sha3-512").update(JSON.stringify(1000)).digest("hex");
    expect(trivialKey).toBe(candidate)
  });
  it("Returns  0 if the given event is a NaN", () => {
    const trivialKey = deterministicPartitionKey(NaN);
    expect(trivialKey).toBe('0')
  });
  it("Returns  0 if the given event is a false", () => {
    const trivialKey = deterministicPartitionKey(false);
    expect(trivialKey).toBe('0')
  });
  it("Returns  0 if the given event is a 0", () => {
    const trivialKey = deterministicPartitionKey(0);
    expect(trivialKey).toBe('0')
  });

  it("Returns empty object as string if the given partitionKey is a regex", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: /agc/g});
    expect(trivialKey).toBe('{}')
  });
});
