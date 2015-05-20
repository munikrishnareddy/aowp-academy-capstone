(function($) {
    'use strict';
    
    // Login
    $('#btnLogin, #btnLoginCollapsed').on('click', function(){
        $('.login-window').fadeToggle().toggleClass('hide');
    });
    
    // On login, collapse button should disappear
    // This should be adapted depending on the framework
    if(location.href.indexOf('login') !== -1)
        $('button.navbar-toggle').remove();
    
    
})(jQuery);