# multi-multiexplorer

This is a javascript library for fetching blockchain data from multiexplorer nodes.

## Usage

Just embed the `multimultiexplorer.js` file into your page, and then call the
`multimultiexplorer` function.

The first argument is the fetching parameters. Here you specify what data you want
to fetch. The second argument is the callback function. When the fetch is complete
the callback will be called, with one parameter `result` which is the object returned from
multiexplorer. Refer to the Multiexplorer API documentation to get a detailed specification
of the returned result object.

## Examples

    for(var currency of ['btc', 'ltc', 'doge']) {
        multimultiexplorer({
            data: 'current_price',
            fiat: 'usd',
            currency: currency
        }, function(result) {
            console.log("got price for usd -> " + currency + "!", result.current_price);
        });
    }

    multimultiexplorer({
        data: 'block',
        currency: 'btc',
        block_number: 976,
    }, function(result) {
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
