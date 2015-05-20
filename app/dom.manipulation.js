(function($) {
    'use strict';
    
    /*
     * Login
     */
    $('.btn-login').on('click', function(){
        $('.login-window').fadeToggle().toggleClass('hide');
    });
    
    /*
     * Journey Challenge
     */    
    $('#btnProvideReason, #btnLoginCollapsed').on('click', function(){
        $('.provide-reason').modal();
    });
    
})(jQuery);