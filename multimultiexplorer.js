var HOSTS = [
    'http://localhost:8001',
    'https://multiexplorer.com',
];

function try_service(index, path, success_callback) {
    console.log("trying", index);
    if(!HOSTS[index]) {
        return
    }
    var url = HOSTS[index] + path;
    console.log("trying url", url);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(request.readyState == 4) { // DONE
            if(request.status == 200) {
                success_callback(JSON.parse(request.response));
            } else {
                console.log("failure:", index);
                try_service(index + 1, path, success_callback)
            }
        }
    };
    request.open('GET', url, true);
    request.send();
}

function build_args(opts, names) {
    var args = [];
    for (name of names) {
        if(opts[name]) {
            args.push(name + "=" + opts[name]);
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

    var path = "/api/" + data + "/" + mode + "?" + build_args(opts, choices);
    try_service(0, path, callback);
}
