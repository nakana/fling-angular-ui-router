// ビューモデルの保存
var saveViewModel = function(uuid, viewModel) {
    // 記憶する最大の件数(仮)
    var MAX_NUM = 20;

    // 保存済みデータを取り出す
    var viewModelsAry = null;
    var uuidAry = null;
    var savedModels = sessionStorage.getItem('savedModels');
    if (savedModels) {
        viewModelsAry = JSON.parse(savedModels);
        uuidAry = JSON.parse(sessionStorage.getItem('uuidOrder'));
    } else {
        viewModelsAry = [];
        uuidAry = [];
    }

    var newItem = {'uuid': uuid, 'viewModel': viewModel};
    viewModelsAry.push(newItem);
    uuidAry.push(uuid);
    // 最大件数を超える場合は古いものを1件削除
    if (viewModelsAry.length > MAX_NUM) {
        viewModelsAry.shift();
        uuidAry.shift();
    }

    // session storageに保存
    sessionStorage.setItem('savedModels', JSON.stringify(viewModelsAry));
    sessionStorage.setItem('uuidOrder', JSON.stringify(uuidAry));
};

// UUIDによる保存順序の取得
var findOrderById = function(uuid) {
    var order = sessionStorage.getItem('uuidOrder');
    if (order) {
        var orderAry = JSON.parse(order);
        for (var i = 0; i < orderAry.length; i++) {
            if (orderAry[i] === uuid) {
                return i;
            }
        }
    }
    return -1;
};

// ビューモデル全件の取得
var loadViewModel = function() {
    var viewModelsAry = null;
    var savedModels = sessionStorage.getItem('savedModels');
    if (savedModels) {
        viewModelsAry = JSON.parse(savedModels);
    } else {
        viewModelsAry = [];
    }
    return viewModelsAry;
};

// UUIDによるビューモデルの取得
var loadViewModelById = function(uuid) {
    var viewModelsAry = loadViewModel();
    var index = findOrderById(uuid);

    if (index >= 0) {
        return viewModelsAry[index].viewModel;
    }
    return {};
};

// 基準からN個進んだ(戻った)履歴のビューモデルを取得
var historyGo = function(currentUuid, number) {
    var viewModelsAry = loadViewModel();
    var currentIndex = findOrderById(currentUuid);

    // 戻るもしくは進んだ後のインデックスを取得
    var afterIndex = currentIndex + number;
    if (afterIndex >= 0) {
        var modelMap = viewModelsAry[afterIndex];
        if (modelMap) {
            return modelMap.viewModel;
        }
    }
    return {};
};
