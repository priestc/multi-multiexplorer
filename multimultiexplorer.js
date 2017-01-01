var MULTIEXPLORER_MIRRORS = [
    'http://localhost:8001',
    'https://multiexplorer.com',
];

function _try_service(index, path, success_callback) {
    var this_host = MULTIEXPLORER_MIRRORS[index]
    if(!this_host) {
        throw "Exhausted all multiexplorer mirrors."
    }
    var url = this_host + path;

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(request.readyState == 4) { // DONE
            if(request.status == 200) {
                var parsed = JSON.parse(request.response);
                parsed.multiexplorer_host = this_host;
                success_callback(parsed);
            } else {
                _try_service(index + 1, path, success_callback)
            }
        }
    };
    request.open('GET', url, true);
    request.send();
}

function _build_args(opts, names) {
    var args = [];
    for (name of names) {
        if(opts[name]) {
            if(name == 'addresses') {
                args.push("addresses=" + opts['addresses'].join(','));
            } else {
                args.push(name + "=" + opts[name]);
            }
        }
    }
    return args.join("&");
}

function multimultiexplorer(opts, callback) {
    var data = opts['data'];
    var mode = opts['service_mode'] || "fallback";

    if(data == 'current_price') {
        var choices = ['fiat', 'currency'];
    }
    if(data == 'address_balance') {
        var choices = ['currency', 'address', 'addresses'];
    }
    if(data == 'unspent_outputs') {
        var choices = ['currency', 'address', 'addresses'];
    }
    if(data == 'block') {
        var choices = ['currency', 'block_number', 'block_hash', 'latest'];
        data = "get_block";
    }
    if(data == 'optimal_fee') {
        var choices = ['currency'];
        data = "get_optimal_fee";
    }
    if(data == 'push_tx') {
        var choices = ['currency', 'tx'];
    }

    var path = "/api/" + data + "/" + mode + "?" + _build_args(opts, choices);
    _try_service(0, path, callback);
}
