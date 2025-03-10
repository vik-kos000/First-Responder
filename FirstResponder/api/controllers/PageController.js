module.exports = {
    homepage: function (req, res) {
        return res.view('pages/homepage', { pageClass: 'homepage' }); 
    },

    listPage: function (req, res) {
        return res.view('pages/listpage', { pageClass: 'listpage' }); 
    },

    detailsPage: function (req, res) {
        return res.view('pages/detailspage', { pageClass: 'detailspage' }); 
    }
};
