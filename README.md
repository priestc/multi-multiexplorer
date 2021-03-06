# multi-multiexplorer

This is a javascript library for fetching blockchain data from multiexplorer nodes.
This library strives to the the easiest and most reliable way to get blockchain
data for any cryptocurrency.

## Usage

Just embed the `multimultiexplorer.js` file into your page, and then call the
`multimultiexplorer` function.

The first argument is the fetching parameters. Here you specify what data you want
to fetch. The second argument is the callback function. When the fetch is complete
the callback will be called, with one parameter `result` which is the object returned from
multiexplorer. Refer to the Multiexplorer API documentation to get a detailed specification
of the returned result object.

## Examples

```javascript
for(var currency of ['btc', 'ltc', 'doge']) {
    multimultiexplorer({
        data: 'current_price',
        fiat: 'usd',
        currency: currency
    }, function(result) {
        console.log("got price for usd/" + result.currency[0] + "!", result.current_price);
    });
}

multimultiexplorer({
    data: 'block',
    currency: 'btc',
    block_number: 976,
    service_mode: 'random'
}, function(result) {
    // this one calls a random blockchain service each time.
    console.log("block 976 was mined on:", result.block.time);
    console.log("block data courtesy of:", result.service_name);
});

multimultiexplorer({
    data: 'address_balance',
    currency: 'btc',
    address: '1GkQmKAmHtNfnD3LHhTkewJxKHVSta4m2a'
}, function(result) {
    console.log("got balance!", result.address_balance);
});

multimultiexplorer({
    data: 'address_balance',
    currency: 'ltc',
    addresses: ['Lf9W9tho7cux9UnSKxcurkLjqwpWQjcJwt', 'LiF1KBeTuoqDnN89wwq4wZQYPmfpw4Cxa7']
}, function(result) {
    console.log("got multiple balances!", result.balance.total_balance);
});
```

# Using custom MultiExplorer servers

The global variable `MULTIEXPLORER_MIRRORS` contains a list of servers that the
library uses. If you want to change them, set the variable before calling
`multimultiexplorer`.

```javascript
MULTIEXPLORER_MIRRORS = ['s1.custom.com', 's2.custom.com']
multimultiexplorer({
    data: 'address_balance',
    currency: 'ltc',
    addresses: ['Lf9W9tho7cux9UnSKxcurkLjqwpWQjcJwt', 'LiF1KBeTuoqDnN89wwq4wZQYPmfpw4Cxa7']
}, function(result) {
    console.log("got multiple balances!", result.balance.total_balance);
});
```
