var saveViewModel = function(viewModel){
    var data = JSON.parse(sessionStorage.getItem('viewModel'));
    data.push(viewModel);
    sessionStorage.setItem('viewModel', JSON.stringify(data));
};

var loadViewModel = function(viewModel){


};
